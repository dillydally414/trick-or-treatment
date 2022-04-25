import { NextApiHandler } from "next";
import connect from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const diseaseId = req.body.params.diseaseId

  const sqlGetDiseaseInfo = "SELECT d.name AS name, d.description AS description, c.name AS disease_class_name FROM disease d JOIN disease_class c USING(disease_class_id) WHERE d.disease_id = ?"

  const { connection, closeConnection } = await connect();
  await connection.query(sqlGetDiseaseInfo, [diseaseId]).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
  closeConnection();
}

export default handler;