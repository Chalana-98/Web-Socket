import http from "http";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { WebSocket, WebSocketServer } from "ws";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//create server
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

//create  a new websocket connection
wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected");

  wss.on("message", (data) => {
    console.log("Received message from client: ", data);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  ws.on("close", () => {
    console.log("Client has disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});