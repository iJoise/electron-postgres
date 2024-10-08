import { client } from '../database'

const tableNames = ['doloto', 'vzd', 'telemetry', 'bb', 'well']

export const createTableAndInsertData = async (
  tableType: string,
  element: { number: string; mileage: number }
) => {
  if (!tableNames.includes(tableType)) {
    throw new Error('Некорректное имя таблицы.')
  }

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableType} (
      id SERIAL PRIMARY KEY,
      number TEXT UNIQUE NOT NULL,
      mileage REAL DEFAULT 0
    );
  `

  try {
    await client.query(createTableQuery)
    console.log(`Таблица ${tableType} успешно создана или уже существует.`)

    const insertQuery = `
    INSERT INTO ${tableType} (number, mileage)
    VALUES ($1, $2)
    ON CONFLICT (number) DO NOTHING;
  `
    const res = await client.query(insertQuery, [element.number, element.mileage])

    console.log(`Элемент с номером ${element.number} успешно добавлен в таблицу ${tableType}.`)

    return { success: true, data: res.rows }
  } catch (error) {
    console.error(
      `Ошибка при создании таблицы или добавлении данных в таблицу ${tableType}:`,
      error
    )

    return {
      success: false,
      error: `Ошибка при создании таблицы или добавлении данных в таблицу ${tableType}: ${error}`
    }
  }
}

export const getAllElements = async (tableType: string) => {
  if (!tableNames.includes(tableType)) {
    throw new Error('Некорректное имя таблицы.')
  }

  const query = `SELECT * FROM ${tableType};`

  try {
    const res = await client.query(query)

    return { success: true, data: res.rows }
  } catch (error) {
    console.error(`Ошибка при получении данных из таблицы ${tableType}:`, error)

    return {
      success: false,
      error: `Ошибка при получении данных из таблицы ${tableType}: ${error}`
    }
  }
}

export const deleteElement = async (tableType: string, identifier: string | number) => {
  if (!tableNames.includes(tableType)) {
    throw new Error('Некорректное имя таблицы.')
  }

  let query
  let values

  if (typeof identifier === 'number') {
    query = `
      DELETE FROM ${tableType}
      WHERE id = $1
      RETURNING *;
    `
    values = [identifier]
  } else {
    query = `
      DELETE FROM ${tableType}
      WHERE number = $1
      RETURNING *;
    `
    values = [identifier]
  }

  try {
    const res = await client.query(query, values)
    if (res.rowCount === 0) {
      console.log(`Элемент не найден для удаления в таблице ${tableType}.`)

      return { success: false, message: 'Элемент не найден' }
    }
    console.log(`Элемент успешно удалён из таблицы ${tableType}:`, res.rows[0])

    return { success: true, data: res.rows[0] }
  } catch (error) {
    console.error(`Ошибка при удалении элемента из таблицы ${tableType}:`, error)

    return {
      success: false,
      error: `Ошибка при удалении элемента из таблицы ${tableType}: ${error}`
    }
  }
}
