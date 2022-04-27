import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const { did, mid, uid, start_date, end_date, rating } = JSON.parse(req.body);

  console.log(typeof did);
  console.log(typeof mid);
  console.log(typeof uid);
  console.log(typeof start_date);

  if (typeof did !== "number"
    || typeof mid !== "number"
    || typeof uid !== "number"
    || typeof start_date !== "string") {
    res.status(400).end();
    return;
  }

  let values = [did, mid, uid, start_date.substring(0, 10)];
  let sqlInsertSideEffect = "INSERT INTO reported_treatment(disease_id, medication_id, user_id, start_date"
  if (typeof end_date === "string") {
    sqlInsertSideEffect += ", end_date";
    values.push(end_date.substring(0, 10));
  }
  if (typeof rating === "string") {
    sqlInsertSideEffect += ", rating";
    values.push(rating);
  }

  sqlInsertSideEffect += `) VALUES (${values.map(val => '?').join(', ')})`;

  await handleQuery({
    query: sqlInsertSideEffect,
    values: values.map(val => val.toString()),
    res: res
  });
}

export default handler;