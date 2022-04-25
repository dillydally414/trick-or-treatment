import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const medicationId = req.body.params.medicationId

  const sqlGetMedicationBrandNames = "SELECT t.name AS name, m.medication_id AS medication_id, t.unit_price AS price, trade_name_id FROM medication m JOIN trade_name t USING(medication_id) WHERE m.medication_id = ?"

  await handleQuery({
    query: sqlGetMedicationBrandNames,
    values: medicationId,
    res: res
  });
}

export default handler;