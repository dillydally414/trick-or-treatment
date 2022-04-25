import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const medicationId = req.body.params.medicationId

  const sqlGetMedicationKnownSideEffectsInfo = "SELECT s.name FROM medication m JOIN known_side_effect k USING(medication_id) JOIN side_effect s USING(side_effect_id) WHERE m.medication_id = ?"

  await handleQuery({
    query: sqlGetMedicationKnownSideEffectsInfo,
    values: medicationId,
    res: res
  });
}

export default handler;