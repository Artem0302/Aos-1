import "./App.css";
import { useState } from "react";

//создать подключение
const socket = new WebSocket("ws://localhost:8081");

socket.onopen = (e) => {
  console.log("соединение установлено");
};

// обработчик входящих сообщений

function App() {
  const [value, setValue] = useState("");
  const [keyStart, setStart] = useState(0);
  const [keyLength, setLength] = useState(0);
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  socket.onmessage = function (event) {
    const incomingMessage = event.data;
    setText(incomingMessage);
    console.log(incomingMessage, "server");
    setText(text + "\n" + incomingMessage);
    setTime(Date.now() - time);
  };
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "1001px",
        flex: 1,
        backgroundColor: "silver",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <textarea
          style={{ margin: 50 }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div
          style={{
            textAlign: "center",
          }}
        >
          <p>set start position </p>
          <input
            style={{ margin: 50 }}
            value={keyStart}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <p>set length</p>
          <input
            style={{ margin: 50 }}
            value={keyLength}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div style={{ margin: 50 }}>
          <button
            style={{ margin: 50 }}
            onClick={() => {
              setText("");
              setTime(Date.now());
              const data = JSON.stringify({
                text: value,
                start: keyStart,
                length: keyLength,
              });
              socket.send(data);
            }}
          >
            Sort
          </button>
          <button
            style={{ margin: 50 }}
            onClick={() => alert("Time of sort: " + time + "\n(in milisec)")}
          >
            Get Time of last sort
          </button>
          <button
            style={{ margin: 50 }}
            onClick={() => alert("Артем Алексеев")}
          >
            Who?
          </button>
        </div>
      </div>
      <p style={{ fontSize: 20, margin: 50 }}>{text}</p>
    </div>
  );
}

export default App;
