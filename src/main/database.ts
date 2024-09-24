import { Client } from 'pg'

const client = new Client({
  user: import.meta.env.VITE_DB_USER,
  host: 'localhost',
  database: 'database',
  password: import.meta.env.VITE_DB_PASS,
  port: 5432
})

client.connect()

export const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      login TEXT UNIQUE,
      fullName TEXT,
      password TEXT,
      role TEXT
    );
  `
  try {
    await client.query(query)
    console.log('Таблица пользователей успешно создана или уже существует')
  } catch (error) {
    console.error('Ошибка при создании таблицы пользователей:', error)
  }
}

export const addUser = async (login: string, fullName: string, password: string, role: string) => {
  const query = `
    INSERT INTO users (login, fullName, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `
  try {
    const res = await client.query(query, [login, fullName, password, role])
    return { success: true, user: res.rows[0] }
  } catch (error) {
    console.error('Ошибка при добавлении пользователя:', error)
    return { success: false, error: error }
  }
}

export const getUsers = async () => {
  const query = `SELECT * FROM users`
  try {
    const res = await client.query(query)
    return res.rows
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error)
    return []
  }
}
