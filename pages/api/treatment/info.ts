import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const { medicationId } = req.query

  const sqlGetMedicationInfo = "SELECT m.name AS name, m.method AS method FROM medication m WHERE m.medication_id = ?"

  await handleQuery({
    query: sqlGetMedicationInfo,
    values: medicationId,
    res: res
  });
}

export default handler;