import collections
from functools import partial
import time

import numpy as np
from PIL import Image
import svgwrite
import gstreamer

from pose_engine import PoseEngine
from pose_engine import KeypointType

import RPi.GPIO as GPIO

import subprocess
import json
import redis
import sys
import socket
from dotenv import load_dotenv
import os

load_dotenv()

email = sys.argv[1]

server_ip = os.getenv('SERVER_IP')
server_port = 12345
socket_client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socket_client.connect((server_ip, server_port))

redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT')
redis_password = os.getenv('REDIS_PASSWORD')

redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, charset="utf-8", decode_responses=True, db=2)

# servoPin = 18
# SERVO_MAX_DUTY = 12.1
# SERVO_MIN_DUTY = 2.2
# global angle
# angle = 90

# GPIO.setmode(GPIO.BCM)
# GPIO.setup(servoPin, GPIO.OUT)
# servo = GPIO.PWM(servoPin, 50)
# servo.start(0)

def setServoPos(degree):
    duty = SERVO_MIN_DUTY+(degree*(SERVO_MAX_DUTY-SERVO_MIN_DUTY)/180.0)
    GPIO.setup(servoPin, GPIO.OUT)
    servo.ChangeDutyCycle(duty)
    time.sleep(0.025)
    GPIO.setup(servoPin, GPIO.IN)

EDGES = (
    (KeypointType.NOSE, KeypointType.LEFT_EYE),
    (KeypointType.NOSE, KeypointType.RIGHT_EYE),
    (KeypointType.NOSE, KeypointType.LEFT_EAR),
    (KeypointType.NOSE, KeypointType.RIGHT_EAR),
    (KeypointType.LEFT_EAR, KeypointType.LEFT_EYE),
    (KeypointType.RIGHT_EAR, KeypointType.RIGHT_EYE),
    (KeypointType.LEFT_EYE, KeypointType.RIGHT_EYE),
    (KeypointType.LEFT_SHOULDER, KeypointType.RIGHT_SHOULDER),
    (KeypointType.LEFT_SHOULDER, KeypointType.LEFT_ELBOW),
    (KeypointType.LEFT_SHOULDER, KeypointType.LEFT_HIP),
    (KeypointType.RIGHT_SHOULDER, KeypointType.RIGHT_ELBOW),
    (KeypointType.RIGHT_SHOULDER, KeypointType.RIGHT_HIP),
    (KeypointType.LEFT_ELBOW, KeypointType.LEFT_WRIST),
    (KeypointType.RIGHT_ELBOW, KeypointType.RIGHT_WRIST),
    (KeypointType.LEFT_HIP, KeypointType.RIGHT_HIP),
    (KeypointType.LEFT_HIP, KeypointType.LEFT_KNEE),
    (KeypointType.RIGHT_HIP, KeypointType.RIGHT_KNEE),
    (KeypointType.LEFT_KNEE, KeypointType.LEFT_ANKLE),
    (KeypointType.RIGHT_KNEE, KeypointType.RIGHT_ANKLE),
)

def shadow_text(dwg, x, y, text, font_size=16):
    dwg.add(dwg.text(text, insert=(x + 1, y + 1), fill='black',
                     font_size=font_size, style='font-family:sans-serif'))
    dwg.add(dwg.text(text, insert=(x, y), fill='white',
                     font_size=font_size, style='font-family:sans-serif'))


def draw_pose(dwg, pose, src_size, inference_box, color='yellow', threshold=0.45):
    global angle
    box_x, box_y, box_w, box_h = inference_box
    scale_x, scale_y = src_size[0] / box_w, src_size[1] / box_h
    xys = {}
    for label, keypoint in pose.keypoints.items():
        if keypoint.score < threshold: continue
        # Offset and scale to source coordinate space.
        kp_x = int((keypoint.point[0] - box_x) * scale_x)
        kp_y = int((keypoint.point[1] - box_y) * scale_y)

        xys[label] = (kp_x, kp_y)
        dwg.add(dwg.circle(center=(int(kp_x), int(kp_y)), r=5,
                           fill='cyan', fill_opacity=keypoint.score, stroke=color))

    if (KeypointType.LEFT_EYE in xys) and (KeypointType.RIGHT_EYE in xys) and (KeypointType.LEFT_WRIST in xys) and (KeypointType.RIGHT_WRIST in xys) and (KeypointType.LEFT_ELBOW in xys) and (KeypointType.RIGHT_ELBOW in xys) and (KeypointType.LEFT_SHOULDER in xys) and (KeypointType.RIGHT_SHOULDER in xys) and (KeypointType.LEFT_HIP in xys) and (KeypointType.RIGHT_HIP in xys) and (KeypointType.LEFT_KNEE in xys) and (KeypointType.RIGHT_KNEE in xys) and (KeypointType.LEFT_ANKLE in xys) and (KeypointType.RIGHT_ANKLE in xys):

        if redis_client.llen(email) == 0:
            print("detect")
            socket_client.sendall((str(len(email))).encode().ljust(16) + email.encode())
            if (xys[KeypointType.RIGHT_HIP][0] > xys[KeypointType.LEFT_HIP][0]):
                xys[KeypointType.LEFT_HIP], xys[KeypointType.RIGHT_HIP] = xys[KeypointType.RIGHT_HIP], xys[KeypointType.LEFT_HIP]

            if (xys[KeypointType.RIGHT_KNEE][0] > xys[KeypointType.LEFT_KNEE][0]):
                xys[KeypointType.LEFT_KNEE], xys[KeypointType.RIGHT_KNEE] = xys[KeypointType.RIGHT_KNEE], xys[KeypointType.LEFT_KNEE]

            redis_client.rpush(email, xys[KeypointType.LEFT_EYE][0], xys[KeypointType.LEFT_EYE][1], xys[KeypointType.RIGHT_EYE][0], xys[KeypointType.RIGHT_EYE][1], xys[KeypointType.LEFT_SHOULDER][0], xys[KeypointType.LEFT_SHOULDER][1], xys[KeypointType.RIGHT_SHOULDER][0], xys[KeypointType.RIGHT_SHOULDER][1], xys[KeypointType.LEFT_ELBOW][0], xys[KeypointType.LEFT_ELBOW][1], xys[KeypointType.RIGHT_ELBOW][0], xys[KeypointType.RIGHT_ELBOW][1], xys[KeypointType.LEFT_WRIST][0], xys[KeypointType.LEFT_WRIST][1], xys[KeypointType.RIGHT_WRIST][0], xys[KeypointType.RIGHT_WRIST][1], xys[KeypointType.LEFT_HIP][0], xys[KeypointType.LEFT_HIP][1], xys[KeypointType.RIGHT_HIP][0], xys[KeypointType.RIGHT_HIP][1], xys[KeypointType.LEFT_KNEE][0], xys[KeypointType.LEFT_KNEE][1], xys[KeypointType.RIGHT_KNEE][0], xys[KeypointType.RIGHT_KNEE][1], xys[KeypointType.LEFT_ANKLE][0], xys[KeypointType.LEFT_ANKLE][1], xys[KeypointType.RIGHT_ANKLE][0], xys[KeypointType.RIGHT_ANKLE][1])
    
    for a, b in EDGES:
        if a not in xys or b not in xys: continue
        ax, ay = xys[a]
        bx, by = xys[b]
        dwg.add(dwg.line(start=(ax, ay), end=(bx, by), stroke=color, stroke_width=2))


def avg_fps_counter(window_size):
    window = collections.deque(maxlen=window_size)
    prev = time.monotonic()
    yield 0.0  # First fps value.

    while True:
        curr = time.monotonic()
        window.append(curr - prev)
        prev = curr
        yield len(window) / sum(window)


def run(inf_callback, render_callback):
    default_model = 'models/mobilenet/posenet_mobilenet_v1_075_%d_%d_quant_decoder_edgetpu.tflite'
    src_size = (640, 480)
    appsink_size = (640, 480)
    model = default_model % (481, 641)

    print('Loading model: ', model)
    engine = PoseEngine(model)
    input_shape = engine.get_input_tensor_shape()
    inference_size = (input_shape[2], input_shape[1])

    gstreamer.run_pipeline(partial(inf_callback, engine), partial(render_callback, engine),
                           src_size, inference_size,
                           mirror=True
                           )


def main():
    n = 0
    sum_process_time = 0
    sum_inference_time = 0
    ctr = 0
    fps_counter = avg_fps_counter(30)

    def run_inference(engine, input_tensor):
        return engine.run_inference(input_tensor)

    def render_overlay(engine, output, src_size, inference_box):
        nonlocal n, sum_process_time, sum_inference_time, fps_counter

        svg_canvas = svgwrite.Drawing('', size=src_size)
        start_time = time.monotonic()
        outputs, inference_time = engine.ParseOutput()
        end_time = time.monotonic()
        n += 1
        sum_process_time += 1000 * (end_time - start_time)
        sum_inference_time += inference_time * 1000

        avg_inference_time = sum_inference_time / n
        text_line = 'PoseNet: %.1fms (%.2f fps) TrueFPS: %.2f Nposes %d' % (
            avg_inference_time, 1000 / avg_inference_time, next(fps_counter), len(outputs)
        )

        shadow_text(svg_canvas, 10, 20, text_line)
        if len(outputs) > 0:
            draw_pose(svg_canvas, outputs[0], src_size, inference_box)
        return (svg_canvas.tostring(), False)

    run(run_inference, render_overlay)

if __name__ == '__main__':
    main()
