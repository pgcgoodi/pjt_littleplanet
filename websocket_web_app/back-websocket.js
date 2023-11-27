require("dotenv").config();
const WebSocket = require("ws");
const http = require("http");

const server_port = process.env.SERVER_PORT;

// HTTP 서버 생성
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running");
});

// WebSocket 서버 생성
const wss = new WebSocket.Server({ server });

// IP를 key로, 웹소켓 배열을 value로 갖는 Map
let clients = [];

// 클라이언트가 연결될 때 실행될 콜백
wss.on("connection", (ws, req) => {
  console.log("Client connected");
  // const ip = req.headers["x-forwarded"] || req.socket.remoteAddress
  // ws.ip = ip
  // if (ws.readyState === ws.OPEN) {
  //   ws.send(`Server: Welcome Client[${ip}]`);
  // }
  // 클라이언트들을 담는 배열에 추가
  clients.push(ws);

  // 클라이언트로부터 메시지를 수신할 때 실행될 콜백
  ws.on("message", async (message) => {
    const mes = JSON.parse(message);
    console.log(mes);
    // 메세지 타입이 web이거나 app이라면 처음 이메일을 등록하는 메세지이니
    if (mes.type === "web" && mes.email) {
      // 이 클라이언트의 이메일은 방금 받은 이메일로 등록
      ws.email = mes.email;
      ws.send(JSON.stringify(`hi ${ws.email} web`));
      ws.send(JSON.stringify("이메일 등록 성공"));
    }
    if (mes.type === "app" && mes.email) {
      // 이 클라이언트의 이메일은 방금 받은 이메일로 등록
      ws.email = mes.email;
      ws.send(JSON.stringify(`hi ${ws.email} app`));
      ws.send(JSON.stringify("app 이메일 등록 성공"));
    }

    // 메시지를 다시 클라이언트로 보내기
    // clients.forEach((client) => {
    //   client.send(`${message}`)
    //   client.send(JSON.stringify('이메일 안같아도 보낼수 있는 메세지'))
    //   console.log(client.email)
    // })
    // 메세지를 보낸 클라이언트와 같은 이메일로 등록된 클라이언트에게 메세지 돌리기
    clients.forEach((client) => {
      if (client.email === ws.email) {
        client.send(JSON.stringify(mes));
        // client.send(`메세지 json 변환해서 보낸 형식 ${JSON.stringify(mes)}`)
      }
    });
  });

  // 클라이언트와 연결이 끊겼을 때 실행될 콜백
  ws.on("close", () => {
    console.log("Client disconnected");
    // 현재 클라이언트들 담은 배열에서 해당 클라이언트 제거
    clients = clients.filter((client) => client !== ws);
  });

  return;
});

// 서버를 7777 포트에서 시작
server.listen(server_port, async () => {
  console.log(`WebSocket server is listening on port ${server_port}`);
});
