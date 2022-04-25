import { NextApiHandler } from "next";
import connect from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const medicationId = req.body.params.medicationId

  const sqlGetMedicationKnownSideEffectsInfo = "SELECT s.name FROM medication m JOIN known_side_effect k USING(medication_id) JOIN side_effect s USING(side_effect_id) WHERE m.medication_id = ?"

  const { connection, closeConnection } = await connect();
  await connection.query(sqlGetMedicationKnownSideEffectsInfo, [medicationId]).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err);
  });
  closeConnection();
}

export default handler;