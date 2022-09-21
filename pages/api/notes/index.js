import nc from "next-connect";
import cors from "cors";
import { mysql } from "../../../lib/mysql";

const handler = nc()
  .use(cors())
  .get(async (req, res) => {
    try {
      await mysql.connect();
      let results = await mysql.query("SELECT * FROM notes");
      await mysql.end();
      await mysql.quit();
      res.status(200).send(results.map((element) => element));
    } catch (ex) {
      res.status(500).send({ msg: "Internal Error" });
      console.log(ex);
      res.end();
    }
  })
  .post(async (req, res) => {
    try {
      await mysql.connect();
      const { user, note } = req.body;
      let results = await mysql.query(
        "INSERT INTO notes (username, note) VALUES(?,?)",
        [user, note]
      );
      await mysql.end();
      await mysql.quit();
      res.status(200).send({ msg: "Nota Agregada con Éxito" });
    } catch (ex) {
      res.status(500).send({ msg: "Internal Error" });
      console.log(ex);
      res.end();
    }
  });
export default handler;
