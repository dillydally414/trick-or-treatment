import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const medicationId = req.body.params.medicationId

  const sqlGetMedicationRelevantDiseases = "SELECT d.name, d.disease_id FROM medication m JOIN known_treatment t USING(medication_id) JOIN disease d USING(disease_id) WHERE m.medication_id = ?"

  await handleQuery({
    query: sqlGetMedicationRelevantDiseases,
    values: medicationId,
    res: res
  });
}

export default handler;