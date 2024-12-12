const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Конфигурация подключения к PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'spacecraft_db',
  password: '1',
  port: 5432,
});

// Получение списка лучших результатов
app.get('/api/scores', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT nickname, time, fuel, speed FROM scores WHERE success = true ORDER BY time ASC LIMIT 10'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Сохранение нового результата
app.post('/api/scores', async (req, res) => {
  const { nickname, time, fuel, speed, success } = req.body;
  
  if (!nickname || typeof time !== 'number') {
    return res.status(400).json({ error: 'Неверные данные' });
  }

  try {
    await pool.query(
      `INSERT INTO scores (nickname, time, fuel, speed, success) 
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (nickname) 
       DO UPDATE SET 
         time = EXCLUDED.time,
         fuel = EXCLUDED.fuel,
         speed = EXCLUDED.speed,
         success = EXCLUDED.success,
         created_at = CURRENT_TIMESTAMP
       WHERE scores.time > EXCLUDED.time OR NOT scores.success`,
      [nickname, time, fuel, speed, success]
    );
    res.status(201).json({ message: 'Результат сохранен' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
}); 