import mysql from 'mysql2';
import { config } from 'dotenv';
import { NextApiResponse } from 'next';

config();
/*
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();*/

type QueryProps = {
  query: string
  values: string | string[]
  res: NextApiResponse
}

export const handleQuery = async (props: QueryProps) => {
  const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }).promise();
  await db.query(props.query, typeof props.values === "string" ? [props.values] : props.values).then((result) => {
    props.res.status(200).json(result);
  }).catch((err) => {
    props.res.status(500).json(err);
  });
  db.end();
}