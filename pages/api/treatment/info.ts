import { NextApiHandler } from "next";
import connect from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const medicationId = req.body.params.medicationId

  const sqlGetMedicationInfo = "SELECT m.name AS name, m.method AS method FROM medication m WHERE m.medication_id = ?"

  const { connection, closeConnection } = await connect();
  await connection.query(sqlGetMedicationInfo, [medicationId]).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err);
  });
  closeConnection();
}

export default handler;