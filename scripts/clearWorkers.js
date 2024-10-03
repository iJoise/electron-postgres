const { Client } = require('pg')

const client = new Client({
  user: 'dmt',
  host: 'localhost',
  database: 'database',
  password: 'qweasdzxc',
  port: 5432
})

const clearDepartmentsAndWorkersTable = async () => {
  try {
    await client.connect() // Подключаемся к базе данных

    // Очищаем таблицу users
    const queryDepartments = 'DROP TABLE IF EXISTS departments CASCADE;'
    await client.query(queryDepartments)

    console.log('Таблица departments успешно очищена')

    // Очищаем таблицу users
    const queryWorkers = 'DROP TABLE IF EXISTS workers CASCADE;'
    await client.query(queryWorkers)

    console.log('Таблица workers успешно очищена')
  } catch (error) {
    console.error('Ошибка при очистке таблицы:', error)
  } finally {
    await client.end()
  }
}

clearDepartmentsAndWorkersTable()
