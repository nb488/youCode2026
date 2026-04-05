import pool from './db';

(async () => {
  try {
    const result = await pool.query('SELECT organizer_id, name, email, password FROM Organizer');
    console.log(result.rows);
  } catch (err) {
    console.error('Error querying organizers:', err);
  } finally {
    await pool.end();
  }
})();