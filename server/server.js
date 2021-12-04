const WebSocketServer = require("ws");

// подключённые клиенты
const clients = {};

// WebSocket-сервер на порту 8081
const wsServer = new WebSocketServer.Server({
  port: 8081,
});

function sort(text) {
  console.log(text);
}

wsServer.on("connection", function (ws) {
  const id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on("message", function (message) {
    const data = JSON.parse(message);
    let mas = data.text.split("\n");
    let flag = false;
    for (let i = 0; i < mas.length; i++) {
      if (mas[i].length < data.length || data.start >= data.length) {
          console.log(mas[i],data.length,data.start,'hello');
        flag = true;
        break;
      }
      mas[i] = mas[i].slice(data.start, data.length) + `${i}`;
    }
    if (flag) {
      for (let key in clients) {
        clients[key].send("not valid");
      }
    } else {
      mas = mas.sort();
      mas = mas.map((el) => data.text.split("\n")[el.slice(-1)]);
      for (let key in clients) {
        mas.forEach((el) => clients[key].send(el));
      }
    }
  });

  ws.on("close", function () {
    console.log("соединение закрыто " + id);
    delete clients[id];
  });
});
