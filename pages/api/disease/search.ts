import { NextApiHandler } from "next";
import db from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const searchForDisease = req.body.params.searchField
  const queryField = '%' + searchForDisease + '%'

  const sqlGetDisease = "SELECT * FROM disease WHERE name LIKE ?"
  await db.query(sqlGetDisease, [queryField]).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json({ error: err.sqlMessage });
  })
}

export default handler;