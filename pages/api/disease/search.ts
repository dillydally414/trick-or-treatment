import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const { searchField } = req.query
  const queryField = '%' + searchField + '%'

  const sqlGetDisease = "SELECT * FROM disease WHERE name LIKE ?"

  await handleQuery({
    query: sqlGetDisease,
    values: queryField,
    res: res
  });
}

export default handler;