import fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import websocket, { SocketStream } from '@fastify/websocket';

const server: FastifyInstance = fastify({ logger: true });

server.register(cors, { origin: "*" });
server.register(websocket);

server.register(async function (fastify) {
  fastify.get('/', { websocket: true }, (connection: SocketStream, req: FastifyRequest) => {
    connection.socket.on('message', (message: string) => {
      // message.toString() === 'hi from client'
      connection.socket.send('hi from server');
    })
  })
});

// Run the server!
const start = async () => {
  try {
    await server.listen({ port: 8080 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();

