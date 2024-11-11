
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