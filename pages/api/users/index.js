import nc from "next-connect";
import cors from "cors";
import { mysql } from "../../../lib/mysql";

const handler = nc()
  .use(cors())
  .get(async (req, res) => {
    try {
      await mysql.connect();
      let users = await mysql.query("SELECT username FROM users");
      await mysql.end();
      await mysql.quit();

      res.json(
        users.map((element) => {
          return element.username;
        })
      );
    } catch (ex) {
      console.error(ex);
      res.status(500).send({ msg: ex });
      res.end();
    }
  })
  .post(async (req, res) => {
    try {
      await mysql.connect();
      const { user, pswd } = req.body;
      console.log(user, pswd);
      let results = await mysql.query("INSERT INTO users VALUES(?,?)", [
        user,
        pswd,
      ]);
      await mysql.end();
      await mysql.quit();
      res.status(200).send({ msg: "Usuario Registrado Con Éxito" });
    } catch (ex) {
      if (ex.errno === 1062)
        res.status(400).send({ msg: "Usuario Ya Registrado" });
      else res.status(500).send({ msg: "Internal Error" });
      res.end();
    }
  });

export default handler;
