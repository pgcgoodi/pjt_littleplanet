import base64
import eventlet
import socketio
import threading
import time
import urllib.parse
from dotenv import load_dotenv
import os

load_dotenv()

server_ip = os.getenv('SERVER_IP')
server_port = int(os.getenv('SERVER_PORT'))

sio = socketio.Server(cors_allowed_origins=["http://localhost:3000", "http://littleplanet.kids:3000", "https://littleplanet.kids"])
app = socketio.WSGIApp(sio)

# 이미지 업데이트 주기 (초)
image_update_interval = 0.2  # 예시: 5초마다 이미지 업데이트

client_threads = {}
client_emails = {}

def send_updated_image(email, sid, filename):
    image_path = f'/home/ubuntu/user/{email}/{filename}'  # 이미지 경로로 대체

    while True:
        if not client_threads.get(sid, True):
            break
        try:
            with open(image_path, 'rb') as image_file:
                image_data = image_file.read()
                image_base64 = base64.b64encode(image_data).decode('utf-8')
                sio.emit('image', {'url': f'data:image/jpeg;base64,{image_base64}'}, room=sid)
                
        except Exception as e:
            print(f'Error sending image: {str(e)}')
        eventlet.sleep(image_update_interval)

@sio.event
def connect(sid, environ):
    query = environ.get('QUERY_STRING')
    parsed = urllib.parse.parse_qs(query)
    email = parsed.get('userMail')[0]
    filename = parsed.get('fileName')[0]

    image_thread = eventlet.spawn(send_updated_image, email, sid, filename)
    client_threads[sid] = image_thread
    client_emails[sid] = email

@sio.event
def disconnect(sid):
    client_thread = client_threads.get(sid)
    if client_thread:
        client_threads[sid] = None
        del client_emails[sid]
    print(f'Client {sid} disconnected')

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen((server_ip, server_port)), app)
