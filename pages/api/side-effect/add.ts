import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const { did, mid, uid, seid } = JSON.parse(req.body);

  if (typeof did !== "number"
    || typeof mid !== "number"
    || typeof uid !== "number"
    || typeof seid !== "number") {
    res.status(400).end();
    return;
  }

  const sqlInsertSideEffect = "INSERT INTO reported_side_effect(disease_id, medication_id, user_id, side_effect_id) values (?, ?, ?, ?)"

  await handleQuery({
    query: sqlInsertSideEffect,
    values: [did, mid, uid, seid],
    res: res
  });
}

export default handler;