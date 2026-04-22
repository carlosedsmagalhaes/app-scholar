import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import routes from './routes';

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333; 
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});