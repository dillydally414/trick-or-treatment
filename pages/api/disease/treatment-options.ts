import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const { diseaseId } = req.query

  const sqlGetKnownTreatmentOptions = "SELECT m.medication_id, m.name FROM disease d JOIN known_treatment t USING(disease_id) JOIN medication m USING(medication_id) WHERE d.disease_id = ?"

  await handleQuery({
    query: sqlGetKnownTreatmentOptions,
    values: diseaseId,
    res: res
  });
}

export default handler;