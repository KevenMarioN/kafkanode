import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: 'certification',
  brokers: ['localhost:9092'],
});

const topic = 'issue-certificate';

const consumer = kafka.consumer({groupId : 'fisrt'});

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({topic});
  await consumer.run({
    eachMessage : async ({topic,partition,message}) => {
      const prefix = `${topic}[${partition}] | ${message.offset} / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);
    }
  });
}

run().catch(console.error);