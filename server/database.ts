import mysql from 'mysql2';
import 'dotenv/config';
import { NextApiResponse } from 'next';

type QueryProps = {
  query: string
  values?: string | string[] | number[]
  res?: NextApiResponse
}

export const handleQuery = async (props: QueryProps) => {
  const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }).promise();
  const result = await db.query(props.query, typeof props.values === "string" ? [props.values] : props.values).then((result) => {
    props.res?.status(200).json(result);
    return result[0];
  }).catch((err) => {
    props.res?.status(500).json(err);
    return undefined;
  });
  await db.end();
  return result;
}

export const urlPrefix = `http${process.env.NODE_ENV === "development" ? '' : 's'}://${process.env.VERCEL_URL}`;