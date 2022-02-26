import { CompressionTypes, Kafka } from "kafkajs";
import { v4 } from 'uuid';
const kafka = new Kafka({
  clientId: 'certification',
  brokers: ['localhost:9092'],
  retry : {
    initialRetryTime : 300,
    retries : 10
  }, 
});

const topic = 'issue-certificate';
const consumer = kafka.consumer({groupId : 'fisrt'});
const producer = kafka.producer();
const run = async () => {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({topic});
  await consumer.run({
    eachMessage : async ({topic,partition,message}) => {
      const prefix = `${topic}[${partition}] | ${message.offset} / ${message.timestamp}`;
      const messageSend =  `${prefix} - [Certificado gerado!] - ${v4()}`;
      setTimeout(async() => {
       await producer.send({
          topic : 'certification-response',
          compression : CompressionTypes.GZIP,
          messages : [
            { 
            value : messageSend,
            key : '1'
          },
          ],
        });
      },3000);
    }
  });
}

run().catch(console.error);