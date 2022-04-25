import { NextApiHandler } from "next";
import connect from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const searchForTreatment = req.body.params.searchField
  console.log(searchForTreatment)
  const queryField = '%' + searchForTreatment + '%'

  const sqlGetTreatment = "SELECT * FROM medication WHERE name LIKE ?"

  const { connection, closeConnection } = await connect();
  await connection.query(sqlGetTreatment, [queryField]).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    console.log(err)
    res.status(500).json(err);
  })
  closeConnection();
}

export default handler;