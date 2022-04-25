import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const { searchField } = req.query
  const queryField = '%' + searchField + '%'

  const sqlGetTreatment = "SELECT * FROM medication WHERE name LIKE ?"

  await handleQuery({
    query: sqlGetTreatment,
    values: queryField,
    res: res
  });
}

export default handler;