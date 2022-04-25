import { NextApiHandler } from "next";
import connect from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const searchForDisease = req.body.params.searchField
  const queryField = '%' + searchForDisease + '%'

  const sqlGetDisease = "SELECT * FROM disease WHERE name LIKE ?"

  const { connection, closeConnection } = await connect();
  await connection.query(sqlGetDisease, [queryField]).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err);
  })
  closeConnection();
}

export default handler;