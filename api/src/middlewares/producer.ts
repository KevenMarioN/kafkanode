import { NextFunction, Request, Response, Router } from "express";
import { Kafka } from "kafkajs";

const producerMiddlerware = Router();

const kafka = new Kafka({
  clientId: 'certification',
  brokers: ['localhost:9092'],
  retry : {
    initialRetryTime : 300,
    retries : 10
  },
});

const producer = kafka.producer();

producerMiddlerware.use(async(request: Request, response: Response, next: NextFunction) => {

  request.producer = producer;
  next();
});

async function run() {
  await producer.connect();
}
run();

export default producerMiddlerware;