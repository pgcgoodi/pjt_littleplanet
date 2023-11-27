import socket
import sys
import cv2
import numpy as np
import redis
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
redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, charset="utf-8", decode_responses=True, db=1)

cam = cv2.VideoCapture(0)
cam.set(3, 640)
cam.set(4, 480)
encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 70]

while True:
    ret, frame = cam.read()
    result, frame = cv2.imencode('.jpg', frame, encode_param)
    data  = np.array(frame)
    stringData = data.tostring()

    socket_client.sendall((str(len(email))).encode().ljust(16) + email.encode())
    socket_client.sendall((str(len(stringData))).encode().ljust(16) + stringData)
    
    value = redis_client.get(email)
    if value != "cam": break

socket_client.close()
cam.release()