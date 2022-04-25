import { NextApiHandler } from "next";
import connect from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const diseaseId = req.body.params.diseaseId

  const sqlGetKnownTreatmentOptions = "SELECT m.medication_id, m.name FROM disease d JOIN known_treatment t USING(disease_id) JOIN medication m USING(medication_id) WHERE d.disease_id = ?"

  const { connection, closeConnection } = await connect();
  await connection.query(sqlGetKnownTreatmentOptions, [diseaseId]).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err);
  });
  closeConnection();
}

export default handler;