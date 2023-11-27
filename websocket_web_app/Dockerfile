# node 이미지를 사용합니다.
FROM node:18.18.2

# work dir 고정
WORKDIR /server

# host pc의 현재경로의 폴더를 workdir의 폴더로 복사
ADD ./ ./

# 5000 포트 오픈
EXPOSE 7777

# container 실행 시 자동으로 실행할 command. node 시작함
CMD ["node", "back-websocket.js"]
