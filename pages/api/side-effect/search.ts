import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const { searchField } = req.query
  const queryField = '%' + searchField + '%'

  const sqlGetSideEffect = "SELECT * FROM side_effect WHERE name LIKE ?"

  await handleQuery({
    query: sqlGetSideEffect,
    values: queryField,
    res: res
  });
}

export default handler;