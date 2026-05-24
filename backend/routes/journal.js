export default async function (fastify) {
  
  fastify.get('/journal', async (request, reply) => {
    try {
      const data = await fastify.db.query(`
        SELECT journal.id
          , id_employee
          , id_job
          , id_measure_unit
          , jobs.name
          , journal.value
          , CONCAT_WS(' ', journal.value::text, measure_units.name) AS value_text
          , CONCAT_WS(' ', employees.f, employees.i, employees.o) AS fio
          , completed
          , created
          , updated
        FROM journal
        JOIN employees on journal.id_employee = employees.id
        JOIN jobs on journal.id_job = jobs.id
        JOIN measure_units on journal.id_measure_unit = measure_units.id
      `);
      return { status: 'ok', data: data.rows };
    } catch (err) {
      reply.status(500).send({ status: 'error', message: err.message });
    }
  });

  fastify.post('/journal', async (request, reply) => {
    try {
      const record = JSON.parse(request.body);
      await fastify.db.query(`
        INSERT INTO journal (id_employee, id_job, id_measure_unit, value, completed)
        VALUES ($1, $2, $3, $4, $5)
      `, [record.id_employee, record.id_job, record.id_measure_unit, record.value, record.completed]);
      return { status: 'ok' };
    } catch (err) {
      reply.status(500).send({ status: 'error', message: err.message });
    }
  });

  fastify.put('/journal/:id', async (request, reply) => {
    try {
      const record = JSON.parse(request.body);
      await fastify.db.query(`
        UPDATE journal
        SET id_employee = $1
          , id_job = $2
          , id_measure_unit = $3
          , value = $4
          , completed = $5
          , updated = NOW()
        WHERE id = $6
      `, [record.id_employee, record.id_job, record.id_measure_unit, record.value, record.completed, request.params.id]);
      return { status: 'ok' };
    } catch (err) {
      reply.status(500).send({ status: 'error', message: err.message });
    }
  });

  fastify.delete('/journal/:id', async (request, reply) => {
    try {
      const id = request.params.id;
      await fastify.db.query(`
        DELETE FROM journal
        WHERE id = $1
      `, [id]);
      return { status: 'ok' };
    } catch (err) {
      reply.status(500).send({ status: 'error', message: err.message });
    }
  });
}