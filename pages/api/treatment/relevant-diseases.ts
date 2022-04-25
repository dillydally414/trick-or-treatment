import { NextApiHandler } from "next";
import connect from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const medicationId = req.body.params.medicationId

  const sqlGetMedicationRelevantDiseases = "SELECT d.name, d.disease_id FROM medication m JOIN known_treatment t USING(medication_id) JOIN disease d USING(disease_id) WHERE m.medication_id = ?"

  const { connection, closeConnection } = await connect();
  await connection.query(sqlGetMedicationRelevantDiseases, [medicationId]).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err);
  });
  closeConnection();
}

export default handler;