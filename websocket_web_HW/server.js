require("dotenv").config();
const WebSocket = require("ws");
const http = require("http");
const redis = require("redis");

const server_port = process.env.SERVER_PORT;

// HTTP 서버 생성
const server = http.createServer((req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "http://littleplanet.kids:3000",
    "https://littleplanet.kids"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running");
});

// WebSocket 서버 생성
const wss = new WebSocket.Server({ server });

// Redis 인증 연결
const redisClientVerify = redis.createClient({
  url: process.env.REDIS_URL_0,
});

// Redis 명령 연결
const redisClientCommand = redis.createClient({
  url: process.env.REDIS_URL_1,
});

// Redis 좌표 연결
const redisClientCoordinate = redis.createClient({
  url: process.env.REDIS_URL_2,
});

// Redis 방향 연결
const redisClientMove = redis.createClient({
  url: process.env.REDIS_URL_3,
});

redisClientVerify.on("connect", () =>
  console.log("Redis 인증에 연결되었습니다.")
);
redisClientCommand.on("connect", () =>
  console.log("Redis 명령에 연결되었습니다.")
);
redisClientCoordinate.on("connect", () =>
  console.log("Redis 좌표에 연결되었습니다.")
);
redisClientMove.on("connect", () =>
  console.log("Redis 좌표에 연결되었습니다.")
);

redisClientVerify.connect();
redisClientCommand.connect();
redisClientCoordinate.connect();
redisClientMove.connect();

// 클라이언트가 연결될 때 실행될 콜백
wss.on("connection", (ws, req) => {
  console.log("Client connected");

  // 클라이언트로부터 메시지를 수신할 때 실행될 콜백
  ws.on("message", async (message) => {
    const mes = JSON.parse(message);
    console.log(mes);
    let pastposition = ['0'];
    let pastdir = 'none';
    if (mes.type === "HW" && mes.email) {
      ws.email = mes.email;
      while (true) {
        const command = await redisClientCommand.get(ws.email);
        if (command !== "start") {
          break;
        }
        const len = await redisClientCoordinate.lLen(ws.email);
        if (len === 28) {
          const coordinate = await redisClientCoordinate.lRange(
            ws.email,
            12,
            15
          );
          const move = await redisClientMove.get(ws.email);
          if (JSON.stringify(pastposition) === JSON.stringify(coordinate) && JSON.stringify(pastdir) === JSON.stringify(move)) continue;
          pastposition = coordinate;
          pastdir = move;
          msg = {
            type: "HW",
            lefthandX: coordinate[2],
            lefthandY: coordinate[3],
            righthandX: coordinate[0],
            righthandY: coordinate[1],
            movedir: move,
            // move = left, right, center
          };
          ws.send(JSON.stringify(msg));
        }
      }
    }
  });

  // 클라이언트와 연결이 끊겼을 때 실행될 콜백
  ws.on("close", () => {
    console.log("Client disconnected");
  });

  return;
});

// 서버를 7777 포트에서 시작
server.listen(server_port, async () => {
  console.log(`WebSocket server is listening on port ${server_port}`);
});
