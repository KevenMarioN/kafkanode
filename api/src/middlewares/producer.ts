import { NextFunction, Request, Response, Router } from "express";
import { Kafka, logLevel } from "kafkajs";

const producerMiddlerware = Router();

const kafka = new Kafka({
  clientId: 'certification',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({groupId : 'certificate-group-receiver'});

producerMiddlerware.use(async(request: Request, response: Response, next: NextFunction) => {

  request.producer = producer;
  next();
});

async function run() {
  const topic = 'certification-response';
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({topic });
  await consumer.run({
    eachMessage : async ({topic,partition,message}) => {
      console.log('Resposta',String(message.value));
    }
  });
}
run();

export default producerMiddlerware;