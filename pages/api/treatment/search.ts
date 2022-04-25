import { NextApiHandler } from "next";
import db from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const searchForTreatment = req.body.params.searchField
  console.log(searchForTreatment)
  const queryField = '%' + searchForTreatment + '%'

  const sqlGetTreatment = "SELECT * FROM medication WHERE name LIKE ?"
  await db.query(sqlGetTreatment, [queryField]).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    console.log(err)
    res.status(500).json({ error: err.sqlMessage });
  })
}

export default handler;