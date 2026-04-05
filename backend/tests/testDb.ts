// src/testDb.ts
import pool from './db';

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected, time is:', res.rows[0]);
  } catch (err) {
    console.error('DB connection error:', err);
  } finally {
    pool.end();
  }
})();