import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const searchForTreatment = req.body.params.searchField
  const queryField = '%' + searchForTreatment + '%'

  const sqlGetTreatment = "SELECT * FROM medication WHERE name LIKE ?"

  await handleQuery({
    query: sqlGetTreatment,
    values: queryField,
    res: res
  });
}

export default handler;