import express from "express";
import pgp from "pg-promise";
import {
  AccountAlreadyExistsError,
  InvalidCPFError,
  InvalidCarPlateError,
  InvalidEmailError,
  InvalidNameError,
  SignUp,
} from "./modules/identity/use-cases/sign-up";

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  try {
    const useCase = new SignUp(connection);
    const response = await useCase.execute(req.body);
    return res.json(response);
  } catch (error: any) {
    if (error instanceof InvalidCPFError) {
      return fail(res, -1);
    }
    if (error instanceof InvalidEmailError) {
      return fail(res, -2);
    }
    if (error instanceof InvalidNameError) {
      return fail(res, -3);
    }
    if (error instanceof AccountAlreadyExistsError) {
      return fail(res, -4);
    }
    if (error instanceof InvalidCarPlateError) {
      return fail(res, -5);
    }
    return fail(res, 0);
  } finally {
    await connection.$pool.end();
  }
});

app.listen(3000);

function fail(res: express.Response, result: number) {
  return res.status(422).send(result + "");
}
