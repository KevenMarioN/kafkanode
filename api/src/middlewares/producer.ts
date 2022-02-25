import { NextFunction, Request, Response, Router } from "express";
import { Kafka, logLevel } from "kafkajs";

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
const consumer = kafka.consumer({groupId : 'certificate-group-receiver'});

producerMiddlerware.use(async(request: Request, response: Response, next: NextFunction) => {

  request.producer = producer;
  next();
});

async function run() {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({topic : 'certification-response'});
  await consumer.run({
    eachMessage : async ({topic,partition,message}) => {
      console.log('Resposta',message);
    }
  });
}
run();

export default producerMiddlerware;