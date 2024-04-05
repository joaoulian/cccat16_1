import crypto from "crypto";
import express from "express";
import pgp from "pg-promise";
import { validate } from "./validateCpf";
const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  try {
    const id = crypto.randomUUID();
    const [acc] = await connection.query(
      "select * from cccat16.account where email = $1",
      [req.body.email]
    );
    if (!!acc) return fail(res, -4);
    if (!req.body.name.match(/[a-zA-Z] [a-zA-Z]+/)) return fail(res, -3);
    if (!req.body.email.match(/^(.+)@(.+)$/)) return fail(res, -2);
    if (!validate(req.body.cpf)) return fail(res, -1);
    if (
      req.body.isDriver &&
      (!req.body.carPlate || !req.body.carPlate.match(/[A-Z]{3}[0-9]{4}/))
    )
      return fail(res, -5);
    await connection.query(
      "insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        id,
        req.body.name,
        req.body.email,
        req.body.cpf,
        req.body.isDriver ? req.body.carPlate : null,
        !!req.body.isPassenger,
        !!req.body.isDriver,
      ]
    );
    res.json({
      accountId: id,
    });
  } finally {
    await connection.$pool.end();
  }
});

app.listen(3000);

function fail(res: express.Response, result: number) {
  return res.status(422).send(result + "");
}
