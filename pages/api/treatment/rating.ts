import { NextApiHandler } from "next";
import { handleQuery } from "../../../server/database";

const handler: NextApiHandler = async (req, res) => {
  const { medicationId } = req.query;

  const sqlGetAverageRating = "select round(avg(rating), 1) as 'avg_rating' from reported_treatment join medication using(medication_id) where medication_id = ?";

  await handleQuery({
    query: sqlGetAverageRating,
    values: medicationId,
    res: res
  });
}

export default handler;