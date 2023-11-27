import redis
import sys
import subprocess
from dotenv import load_dotenv
import os

load_dotenv()

redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT')
redis_password = os.getenv('REDIS_PASSWORD')
redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, charset="utf-8", decode_responses=True,db=1)

email = sys.argv[1]

while True:
    value = redis_client.get(email)
    if value != "ready":
        print(value)
        if value == "cam":
            subprocess.run(["sudo", "pigpiod"])
            subprocess.Popen(["python3", "servo.py", email])
            subprocess.run(["python3", "cam.py", email])

        elif value == "start":
            subprocess.Popen(["python3", "pose_camera.py", email])
            while True:
                pose_value = redis_client.get(email)
                if pose_value != "start":
                    subprocess.run(["pkill", "-f", "servo.py"])
                    subprocess.run(["pkill", "-f", "pose_camera.py"])
                    subprocess.Popen(["sudo", "killall", "pigpiod"])
                    break
        
        elif value == "logout":
            subprocess.run(["pkill", "-f", "wait.py"])
            subprocess.Popen(["python3", "otp.py"])
            break
