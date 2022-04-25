import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const diseaseId = req.body.params.diseaseId

  const sqlGetDiseaseInfo = "SELECT d.name AS name, d.description AS description, c.name AS disease_class_name FROM disease d JOIN disease_class c USING(disease_class_id) WHERE d.disease_id = ?"

  await handleQuery({
    query: sqlGetDiseaseInfo,
    values: diseaseId,
    res: res
  });
}

export default handler;