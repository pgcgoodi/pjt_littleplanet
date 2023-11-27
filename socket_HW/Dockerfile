FROM python:3.9

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y python3-pip

RUN apt-get install -y libgl1-mesa-glx

RUN pip3 install -r requirements.txt

EXPOSE 12345

CMD ["python3", "server.py"]