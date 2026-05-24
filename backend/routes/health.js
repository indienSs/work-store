export default async function (fastify) {
  fastify.get('/health', async (request, reply) => {
    try {
      await fastify.db.query('SELECT 1');
      return { status: 'ok', database: 'connected' };
    } catch (err) {
      reply.status(500).send({ status: 'error', database: 'disconnected' });
    }
  });
}