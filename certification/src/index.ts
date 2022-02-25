import { Kafka } from "kafkajs";
import { v4 } from 'uuid';
const kafka = new Kafka({
  clientId: 'certification',
  brokers: ['localhost:9092'],
});

const topic = 'issue-certificate';
const consumer = kafka.consumer({groupId : 'fisrt'});
const producer = kafka.producer();
let counter = 0;
const run = async () => {
  await consumer.connect();
  await consumer.subscribe({topic});
  await consumer.run({
    eachMessage : async ({topic,partition,message}) => {
      counter++;
      const prefix = `${topic}[${partition}] | ${message.offset} / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);
      const payload = JSON.parse(message!.value);
      setTimeout(() => {
        producer.send({
          topic : 'certification-response',
          messages: [
            {
              value : `Certicado do usuário ${payload.user.name} ${counter} - number: ${v4()} gerado!`
            }
          ]
        });
      },3000);
    }
  });
}

run().catch(console.error);