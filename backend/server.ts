import express from 'express';
import cors from 'cors';
import dns from "node:dns";
import { config } from 'dotenv';
import routes from './routes';
import net from "net";

dns.setDefaultResultOrder("ipv4first");
config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/smtp-test", (_, res) => {
  const socket = net.createConnection({
    host: "smtp.gmail.com",
    port: 587,
  });

  socket.on("connect", () => {
    socket.destroy();
    res.send("Conectou");
  });

  socket.on("error", (err) => {
    console.error(err);
    res.status(500).json(err);
  });

  socket.setTimeout(10000, () => {
    socket.destroy();
    res.status(500).send("Timeout");
  });
});

const PORT = process.env.PORT || 3333; 
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${PORT}`);
});