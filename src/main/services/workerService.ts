import * as XLSX from 'xlsx'
import { client } from '../database'

const updateDepartmentsTable = async () => {
  const createQuery = `
    CREATE TABLE IF NOT EXISTS departments (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE,
      is_active BOOLEAN DEFAULT true
    );
  `

  try {
    await client.query(createQuery)
    console.log('Таблица departments обновлена или уже существует')
  } catch (error) {
    console.error('Ошибка при обновлении таблицы departments:', error)
    throw error
  }
}

const recreateWorkersTable = async () => {
  const dropQuery = `DROP TABLE IF EXISTS workers;`
  const createQuery = `
    CREATE TABLE workers (
      id SERIAL PRIMARY KEY,
      full_name TEXT,
      position TEXT,
      department TEXT
    );
  `

  try {
    await client.query(dropQuery)
    await client.query(createQuery)
    console.log('Таблица workers пересоздана')
  } catch (error) {
    console.error('Ошибка при создании таблицы workers:', error)
    throw error
  }
}

const updateDepartments = async (departments: string[]) => {
  try {
    const deactivateQuery = `UPDATE departments SET is_active = false;`
    await client.query(deactivateQuery)

    const queryInsertOrUpdate = `
      INSERT INTO departments (name, is_active)
      VALUES ($1, true)
      ON CONFLICT (name) DO UPDATE SET is_active = true;
    `

    for (const department of departments) {
      await client.query(queryInsertOrUpdate, [department])
    }
    console.log('Департаменты успешно обновлены')
  } catch (error) {
    console.error('Ошибка при обновлении департаментов:', error)
    throw error
  }
}

export const insertWorkers = async (workers) => {
  const query = `
    INSERT INTO workers (full_name, position, department)
    VALUES ($1, $2, $3);
  `

  try {
    for (const worker of workers) {
      await client.query(query, [worker.full_name, worker.position, worker.department])
    }
    console.log('Данные успешно вставлены в таблицу workers')
  } catch (error) {
    console.error('Ошибка при вставке данных сотрудников:', error)
    throw error
  }
}

export const processWorkersFile = async (filePath: string) => {
  try {
    const workbook = XLSX.readFile(filePath)
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
    const rawData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })

    let currentDepartment = ''
    const workers: any[] = []
    const departments: string[] = []

    rawData.forEach((row: any) => {
      if (row[0] && typeof row[0] === 'string' && row[0].includes('Участок')) {
        currentDepartment = row[0].trim()

        if (!departments.includes(currentDepartment)) {
          departments.push(currentDepartment)
        }
      } else if (row[0] && typeof row[0] === 'number' && row[3] && row[6]) {
        const worker = {
          full_name: row[3].trim(),
          position: row[6].trim(),
          department: currentDepartment
        }

        workers.push(worker)
      }
    })

    if (workers.length) {
      await updateDepartmentsTable()

      await recreateWorkersTable()

      await insertWorkers(workers)
      await updateDepartments(departments)
    }
  } catch (error) {
    console.error('Ошибка при обработке файла:', error)
    throw error
  }
}

export const getAllWorkers = async () => {
  const query = `
    SELECT * FROM workers
    `

  try {
    const res = await client.query(query)
    return { success: true, data: res.rows }
  } catch (error) {
    console.error('Ошибка при получении сотрудников:', error)
    return { success: false, error }
  }
}

export const getAllDepartments = async () => {
  const query = `SELECT * FROM departments;`

  try {
    const res = await client.query(query)
    return { success: true, data: res.rows }
  } catch (error) {
    console.error('Ошибка при получении департаментов:', error)
    return { success: false, error }
  }
}
