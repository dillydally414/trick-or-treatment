import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const connect = async () => {
  const connection = await db;
  await connection.connect();
  const closeConnection = async () => { await connection.end(); }
  return {
    connection,
    closeConnection
  }
}

export default connect;
