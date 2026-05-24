export default async function (fastify) {
  fastify.get('/jobs', async (request, reply) => {
    try {
      const data = await fastify.db.query(`
        SELECT *
        FROM jobs
      `);
      return { status: 'ok', data: data.rows };
    } catch (err) {
      reply.status(500).send({ status: 'error', message: err.message });
    }
  });
}