import nc from "next-connect";
import cors from "cors";
import { mysql } from "../../../lib/mysql";

const handler = nc().use(cors());
export default handler;
