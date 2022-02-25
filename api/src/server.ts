import express from 'express';
import 'express-async-errors';
import producerMiddlerware from './middlewares/producer';

import certificationRouter from './routes/certification.route';

const app = express();

app.use(express.json());
app.use(producerMiddlerware);
app.use(certificationRouter);

app.listen(3333, () => {
  console.log('Running in port 3333! 👾👾👾👾👾👾👾👾 🔫');
});