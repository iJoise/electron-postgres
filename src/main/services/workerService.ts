import * as XLSX from 'xlsx'
import { client } from '../database'

const recreateDepartmentsTable = async () => {
  const dropQuery = `DROP TABLE IF EXISTS departments CASCADE;`
  const createQuery = `
    CREATE TABLE departments (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE
    );
  `

  try {
    await client.query(dropQuery)
    await client.query(createQuery)
    console.log('Таблица departments пересоздана')
  } catch (error) {
    console.error('Ошибка при создании таблицы departments:', error)
    throw error
  }
}

const recreateWorkersTable = async () => {
  const dropQuery = `DROP TABLE IF EXISTS workers CASCADE;`
  const createQuery = `
    CREATE TABLE workers (
      id SERIAL PRIMARY KEY,
      full_name TEXT,
      position TEXT,
      department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL
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

const getOrCreateDepartment = async (departmentName: string) => {
  const querySelect = `SELECT id FROM departments WHERE name = $1`
  const queryInsert = `INSERT INTO departments (name) VALUES ($1) RETURNING id`

  try {
    const res = await client.query(querySelect, [departmentName])
    if (res.rows.length > 0) {
      return res.rows[0].id
    } else {
      const insertRes = await client.query(queryInsert, [departmentName])
      return insertRes.rows[0].id
    }
  } catch (error) {
    console.error('Ошибка при работе с таблицей departments:', error)
    throw error
  }
}

export const insertWorkers = async (workers) => {
  const query = `
    INSERT INTO workers (full_name, position, department_id)
    VALUES ($1, $2, $3);
  `

  try {
    for (const worker of workers) {
      const departmentId = await getOrCreateDepartment(worker.department)
      await client.query(query, [worker.full_name, worker.position, departmentId])
    }
    console.log('Данные успешно вставлены в таблицу workers')
  } catch (error) {
    console.error('Ошибка при вставке данных сотрудников:', error)
    throw error
  }
}

const recreateDepartmentsAndWorkersTables = async () => {
  try {
    await client.query('DELETE FROM workers')

    await recreateDepartmentsTable()

    await recreateWorkersTable()

    console.log('Таблицы departments и workers успешно пересозданы')
  } catch (error) {
    console.error('Ошибка при пересоздании таблиц:', error)
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

    rawData.forEach((row: any) => {
      if (row[0] && typeof row[0] === 'string' && row[0].includes('Участок')) {
        currentDepartment = row[0].trim()
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
      await recreateDepartmentsAndWorkersTables()

      await insertWorkers(workers)
    }
  } catch (error) {
    console.error('Ошибка при обработке файла:', error)
    throw error
  }
}

export const getAllWorkers = async () => {
  const query = `
    SELECT 
      workers.id, 
      workers.full_name, 
      workers.position, 
      departments.name AS department 
    FROM workers
    LEFT JOIN departments ON workers.department_id = departments.id;
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
  const query = `
    SELECT id, name 
    FROM departments;
  `

  try {
    const res = await client.query(query)
    return { success: true, data: res.rows }
  } catch (error) {
    console.error('Ошибка при получении департаментов:', error)
    return { success: false, error }
  }
}
