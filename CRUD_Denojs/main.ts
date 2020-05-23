import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import * as yup from 'https://cdn.pika.dev/yup@^0.28.1';

const env = config();

interface RequestError extends Error {
  status: number;
};

interface Dinosaur {
  id?: string;
  name: string;
  image: string;
};

//validator body
const dinosaurSchema = yup.object().shape({
  name: yup.string().trim().min(2).required(),
  image: yup.string().trim().url().required()
});

const DB = new Map<string, Dinosaur>();

// Router
const router = new Router();

router.get('/hello', (ctx) => {
ctx.response.body = {
  message: 'Hello World, DenoJS!'
  };
});

router.get('/dinosaurs', (ctx) => {
  let body = ctx.response.body
  body = [...DB.values()];

  if (!body.length) {
    ctx.response.status = 204;
    ctx.response.body = []
  } else {
    ctx.response.body = body
  }
});

router.post('/dinosaurs', async (ctx) => {
  try {
    const body = await ctx.request.body();

    if (body.type !== 'json') throw new Error('Invalid Body');

    const dinosaur = (await dinosaurSchema.validate(body.value) as Dinosaur);
    dinosaur.id = v4.generate();
    DB.set(dinosaur.id, dinosaur);

    ctx.response.body = dinosaur;

  } catch (error) {
    const err = new Error('Unprocessable Entity') as RequestError;
    err.status = 422;
    throw err;
  };
});

router.delete('/dinosaurs/:id', (ctx) => {
  const { id } = ctx.params;

  try {
    if (id && DB.has(id)) {
      ctx.response.status = 200;
      ctx.response.body = 'Success';
      DB.delete(id);
    }
  } catch (error) {
    const err = new Error('No content') as RequestError;
    err.status = 204;
    throw error;
  }
});

const app = new Application();

// handle error global
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const error = err as RequestError;
    ctx.response.status = error.status || 500;
    ctx.response.body = {
      message: error.message,
    };
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

// Server
console.log('Listening on http://localhost:8000');
await app.listen({ port: 8000 });
