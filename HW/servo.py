import redis
import sys
from dotenv import load_dotenv
import os
import pigpio
from time import sleep

load_dotenv()
email = sys.argv[1]

redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT')
redis_password = os.getenv('REDIS_PASSWORD')

redis_client1 = redis.Redis(host=redis_host, port=redis_port, password=redis_password, charset="utf-8", decode_responses=True,db=4)
redis_client2 = redis.Redis(host=redis_host, port=redis_port, password=redis_password, charset="utf-8", decode_responses=True,db=3)
redis_client3 = redis.Redis(host=redis_host, port=redis_port, password=redis_password, charset="utf-8", decode_responses=True,db=2)

def rotate_servo(degree):
    pi.set_servo_pulsewidth(18, degree)
    sleep(0.001)

pi = pigpio.pi()
angle = 1550
rotate_servo(angle)

while True:
    if redis_client3.llen(email) == 28:
        mid_point = redis_client1.get(email)
        if mid_point is None:
            continue

        if float(mid_point) > 360:
            redis_client2.set(email, "right")
            angle = angle + 5
            if angle > 2500:
                angle = 2500
                continue
            rotate_servo(angle)

        elif float(mid_point) < 280:
            redis_client2.set(email, "left")
            angle = angle - 5
            if angle < 500:
                angle = 500
                continue
            rotate_servo(angle)

        else:
            redis_client2.set(email, "center")