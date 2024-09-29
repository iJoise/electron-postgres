import { Client } from 'pg'

export const client = new Client({
  user: import.meta.env.VITE_DB_USER,
  host: 'localhost',
  database: 'database',
  password: import.meta.env.VITE_DB_PASS,
  port: 5432
})

client.connect()
