import { Client } from 'pg'
import bcrypt from 'bcrypt'

const client = new Client({
  user: import.meta.env.VITE_DB_USER,
  host: 'localhost',
  database: 'database',
  password: import.meta.env.VITE_DB_PASS,
  port: 5432
})

client.connect()

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}
const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

export const createUserTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      login TEXT UNIQUE,
      fullName TEXT,
      password TEXT,
      role TEXT
    );
  `
  const defaultPassword = await hashPassword(import.meta.env.VITE_DB_ROOT_PASS)
  const insertDefaultUserQuery = `
    INSERT INTO users (login, fullName, password, role)
    SELECT 'root', 'Default Admin', '${defaultPassword}', 'super-admin'
    WHERE NOT EXISTS (
      SELECT 1 FROM users WHERE login = 'root'
    );
  `

  try {
    await client.query(createTableQuery)
    console.log('Таблица пользователей успешно создана или уже существует')

    await client.query(insertDefaultUserQuery)
    console.log('Пользователь по умолчанию создан или уже существует')
  } catch (error) {
    console.error(
      'Ошибка при создании таблицы пользователей или добавлении пользователя по умолчанию:',
      error
    )
  }
}

export const addUser = async (login: string, fullName: string, password: string, role: string) => {
  const hashedPassword = await hashPassword(password)

  const query = `
    INSERT INTO users (login, fullName, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `
  try {
    const res = await client.query(query, [login, fullName, hashedPassword, role])
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

export const loginUser = async (login: string, password: string) => {
  const query = `
    SELECT * FROM users WHERE login = $1;
  `

  try {
    const res = await client.query(query, [login])

    if (res.rows.length === 0) {
      return { success: false, message: 'Пользователь не найден' }
    }

    const user = res.rows[0]

    const isPasswordValid = verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return { success: false, message: 'Неверный пароль' }
    }

    return { success: true, user }
  } catch (error) {
    console.error('Ошибка при авторизации пользователя:', error)
    return { success: false, error: error }
  }
}
