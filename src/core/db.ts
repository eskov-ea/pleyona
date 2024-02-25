import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();


const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;

const pool: mysql.Pool = mysql.createPool({
  host: 'localhost',
  port: 8888,
  user: 'admin',
  database: 'passengers',
  password: '1234',
  charset: 'utf8mb4'
});

export default async (query: string, params: any[] = []):Promise<any> => {
  const connection = await pool.getConnection();
  try {
    console.log("starting transaction...", query, params);
    await connection.beginTransaction();

    console.log("running query...");
    let queryResult = await connection.query(query, params);
    
    console.log("committing transaction...");
    await connection.commit();
    console.log("transaction committed.");
    return queryResult;
  } catch(err) {
    console.error("an error occurred:", err);
    throw err;
  }
}