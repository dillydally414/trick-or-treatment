import { OkPacket } from "mysql2/promise";
import { NextApiHandler } from "next";
import db from "../../../server/database";
import { TreatmentType } from "../../../types";

const handler: NextApiHandler = async (req, res) => {
  const searchForTreatment = req.body.params.searchForTreatment
  const queryField = '%' + searchForTreatment + '%'

  const sqlGetTreatment = "SELECT * FROM medication WHERE name LIKE ?"
  await db.query(sqlGetTreatment, [queryField]).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json({ error: err.sqlMessage });
  })
}

export default handler;