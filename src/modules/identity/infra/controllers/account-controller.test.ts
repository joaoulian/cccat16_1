import axios from "axios";
import pgp from "pg-promise";
import {
  mockInvalidName,
  mockValidPassenger,
} from "../../application/use-cases/account.mock";

axios.defaults.validateStatus = function () {
  return true;
};

const connection = pgp()("postgres://postgres:123456@localhost:5432/app");

afterAll(async () => {
  await connection.$pool.end();
});

describe("POST /signup", () => {
  test("Deve criar uma conta com sucesso", async function () {
    // arrange
    const input = mockValidPassenger();
    // act
    const output = await axios.post("http://localhost:3000/signup", input);
    // assert
    expect(output.status).toEqual(200);
    expect(output.data).toHaveProperty("accountId");
    const account: any = await axios.get(
      `http://localhost:3000/account/${output.data.accountId}`
    );
    expect(account.data).toEqual({
      id: output.data.accountId,
      isPassenger: true,
      isDriver: false,
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      carPlate: null,
    });
  });

  test("Deve retornar um erro caso o input seja inválido", async function () {
    // arrange
    const invalidName = mockInvalidName();
    const input = {
      ...mockValidPassenger(),
      name: invalidName,
    };
    // act
    const output = await axios.post("http://localhost:3000/signup", input);
    // assert
    expect(output.status).toEqual(422);
  });
});

describe("GET /account/:accountId", () => {
  test("Deve retornar uma conta com sucesso", async function () {
    // arrange
    const input = mockValidPassenger();
    const { data: account } = await axios.post(
      "http://localhost:3000/signup",
      input
    );
    // act
    const output = await axios.get(
      `http://localhost:3000/account/${account.accountId}`
    );
    // assert
    expect(output.status).toEqual(200);
    expect(output.data).toEqual({
      id: account.accountId,
      isPassenger: true,
      isDriver: false,
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      carPlate: null,
    });
  });

  test("Deve retornar um erro caso a conta não exista", async function () {
    // arrange
    const accountId = "non-existing-account-id";
    // act
    const output = await axios.get(
      `http://localhost:3000/account/${accountId}`
    );
    // assert
    expect(output.status).toEqual(422);
  });
});
