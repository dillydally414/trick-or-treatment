import { NextApiHandler } from "next";
import connect from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const medicationId = req.body.params.medicationId

  const sqlGetMedicationBrandNames = "SELECT t.name AS name, m.medication_id AS medication_id, t.unit_price AS price, trade_name_id FROM medication m JOIN trade_name t USING(medication_id) WHERE m.medication_id = ?"

  const { connection, closeConnection } = await connect();
  await connection.query(sqlGetMedicationBrandNames, [medicationId]).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err);
  });
  closeConnection();
}

export default handler;