import { Request, Response, Router } from "express";
import { CompressionTypes } from "kafkajs";

const certificationRouter = Router();

certificationRouter.post('/certifications', async (request: Request, response: Response) => {
  const message = {
    id : '8ju23n8hf8',
    name : 'Keven Mário Novais',
    course : "Kafka com Node.js",
    grade : 5
  };
  await request.producer.send({
    topic : 'issue-certificate',
    compression : CompressionTypes.GZIP,
    messages : [
      { 
      value : JSON.stringify(message),
      key : '1'
    },
    ],
  });
  return response.json({ ok: true });
});

export default certificationRouter;