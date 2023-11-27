import socket
from _thread import *
import subprocess
import redis

from dotenv import load_dotenv
import os

load_dotenv()

server_ip = os.getenv('SERVER_IP')
server_port = int(os.getenv('SERVER_PORT'))

redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT')
redis_password = os.getenv('REDIS_PASSWORD')

redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, charset="utf-8", decode_responses=True, db=1)

print('start')
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind((server_ip, server_port))
server_socket.listen()

def recvall(sock, count, timeout = 5):
    buf = b''
    sock.settimeout(timeout)
    while count:
        try:
            newbuf = sock.recv(count)
            if not newbuf:
                return None
            buf += newbuf
            count -= len(newbuf)
        except socket.timeout:
            return None
    return buf

def threaded(client_socket, addr):
    print('connect', flush=True)
    flag = None
    cam_flag = False
    while True:
        email_length = recvall(client_socket, 16)
        if email_length is not None:
            email_data = recvall(client_socket, int(email_length))
            email = email_data.decode()
            flag = email
            value = redis_client.get(email)
            if value == "start":
                if cam_flag:
                    cam_flag = False
                    continue
                subprocess.Popen(["python3", "/home/ubuntu/character/trans.py", email])
            elif value == "cam":
                cam_flag = True
                image_length = recvall(client_socket, 16)
                image_data = recvall(client_socket, int(image_length))
                image_path = f"/home/ubuntu/user/{email}/cam.jpg"
                with open(image_path, "wb") as file:
                    file.write(image_data)

        else:
            if flag is not None:
                value = redis_client.get(flag)
                if value != "start" and value != "cam":
                    print('disconnect', flush=True)
                    client_socket.close()
                    break

try:
    while True:
        client_socket, addr = server_socket.accept()
        start_new_thread(threaded, (client_socket, addr))

except Exception as e:
    print(e)

finally:
    server_socket.close()
