// import { Client } from 'pg'
const { Client } = require('pg')

const client = new Client({
  user: 'dmt',
  host: 'localhost',
  database: 'database',
  password: 'qweasdzxc',
  port: 5432
})

const clearUsersTable = async () => {
  try {
    await client.connect() // Подключаемся к базе данных

    // Очищаем таблицу users
    const query = 'DROP TABLE IF EXISTS users CASCADE;'
    await client.query(query)

    console.log('Таблица пользователей успешно очищена')
  } catch (error) {
    console.error('Ошибка при очистке таблицы пользователей:', error)
  } finally {
    await client.end() // Закрываем соединение с базой данных
  }
}

clearUsersTable()
