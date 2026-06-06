import express from 'express';
import cors from 'cors';
import dns from "node:dns";
import { config } from 'dotenv';
import routes from './routes';

dns.setDefaultResultOrder("ipv4first");
config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333; 
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${PORT}`);
});