import { PrismaClient } from '.prisma/client';
import Fastify from 'fastify';
import { nanoid } from 'nanoid';

const fastify = Fastify({ logger: true });
const genId = () => nanoid(16);
const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });

//@ts-ignore
const seeData = async () => {
  try {
    if ((await db.post.count()) === 0)
      return await Promise.all([
        db.post.create({
          data: {
            id: genId(),
            slug: 'ultimate-node-stack',
            title: 'The Ultimate Node/Dev Stack',
          },
        }),
        db.post.create({
          data: {
            id: genId(),
            slug: 'Furure blog post',
            title: 'futurre blog text',
          },
        }),
      ]);

    return null;
  } catch (error) {
    console.log({ error: error.message });
  }
};

seeData();

fastify.get('/', async () => {
  return db.post.findMany();
});

const port = process.env.PORT ?? 8000;
const start = async () => {
  try {
    await fastify.listen(port, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
