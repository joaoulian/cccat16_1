import axios from "axios";
import pgp from "pg-promise";
import {
  mockInvalidCPF,
  mockInvalidCarPlate,
  mockInvalidEmail,
  mockInvalidName,
  mockValidDriver,
  mockValidPassenger,
} from "./modules/identity/domain/account.mock";

axios.defaults.validateStatus = function () {
  return true;
};

const connection = pgp()("postgres://postgres:123456@localhost:5432/app");

afterAll(async () => {
  await connection.$pool.end();
});

test("Deve criar uma conta para um passageiro", async function () {
  // arrange
  const input = mockValidPassenger();
  // act
  const output = await axios.post("http://localhost:3000/signup", input);
  // assert
  expect(output.status).toBe(200);
  expect(output.data).toHaveProperty("accountId");
  const [acc] = await connection.query(
    "select * from cccat16.account where email = $1",
    [input.email]
  );
  expect(acc.account_id).toEqual(output.data.accountId);
  expect(acc.is_passenger).toBeTruthy();
  expect(acc.cpf).toEqual(input.cpf);
  expect(acc.car_plate).toEqual(null);
  expect(acc.is_driver).toBeFalsy();
  expect(acc.name).toEqual(input.name);
  expect(acc.email).toEqual(input.email);
});

test("Deve criar uma conta para um motorista", async function () {
  // arrange
  const input = mockValidDriver();
  // act
  const output = await axios.post("http://localhost:3000/signup", input);
  // assert
  expect(output.status).toBe(200);
  expect(output.data).toHaveProperty("accountId");
  const [acc] = await connection.query(
    "select * from cccat16.account where email = $1",
    [input.email]
  );
  expect(acc.account_id).toEqual(output.data.accountId);
  expect(acc.is_passenger).toBeFalsy();
  expect(acc.cpf).toEqual(input.cpf);
  expect(acc.car_plate).toEqual(input.carPlate);
  expect(acc.is_driver).toBeTruthy();
  expect(acc.name).toEqual(input.name);
  expect(acc.email).toEqual(input.email);
});

test("Deve criar uma conta para um motorista-passageiro", async function () {
  // arrange
  const input = {
    ...mockValidDriver(),
    isPassenger: true,
  };
  // act
  const output = await axios.post("http://localhost:3000/signup", input);
  // assert
  expect(output.status).toBe(200);
  expect(output.data).toHaveProperty("accountId");
  const [acc] = await connection.query(
    "select * from cccat16.account where email = $1",
    [input.email]
  );
  expect(acc.account_id).toEqual(output.data.accountId);
  expect(acc.is_passenger).toBeTruthy();
  expect(acc.is_driver).toBeTruthy();
  expect(acc.car_plate).toEqual(input.carPlate);
});

test("Deve retornar um erro -4 quando já existe uma conta com o mesmo email cadastrado", async function () {
  // arrange
  const input = mockValidPassenger();
  await axios.post("http://localhost:3000/signup", input);
  // act
  const output = await axios.post("http://localhost:3000/signup", input);
  // assert
  expect(output.status).toBe(422);
  expect(output.data).toBe(-4);
});

test("Deve retornar um erro -3 quando o nome é inválido", async function () {
  // arrange
  const invalidName = mockInvalidName();
  const input = {
    ...mockValidPassenger(),
    name: invalidName,
  };
  // act
  const output = await axios.post("http://localhost:3000/signup", input);
  // assert
  expect(output.status).toBe(422);
  expect(output.data).toBe(-3);
});

test("Deve retornar um erro -2 quando o email é inválido", async function () {
  // arrange
  const invalidEmail = mockInvalidEmail();
  const input = {
    ...mockValidPassenger(),
    email: invalidEmail,
  };
  // act
  const output = await axios.post("http://localhost:3000/signup", input);
  // assert
  expect(output.status).toBe(422);
  expect(output.data).toBe(-2);
});

test("Deve retornar um erro -1 quando o CPF do passageiro é inválido", async function () {
  // arrange
  const invalidCPF = mockInvalidCPF();
  const input = {
    ...mockValidPassenger(),
    cpf: invalidCPF,
  };
  // act
  const output = await axios.post("http://localhost:3000/signup", input);
  // assert
  expect(output.status).toBe(422);
  expect(output.data).toBe(-1);
});

test("Deve retornar um erro -5 quando a placa do motorista é inválida", async function () {
  // arrange
  const invalidCarPlate = mockInvalidCarPlate();
  const input = {
    ...mockValidDriver(),
    carPlate: invalidCarPlate,
  };
  // act
  const output = await axios.post("http://localhost:3000/signup", input);
  // assert
  expect(output.status).toBe(422);
  expect(output.data).toBe(-5);
});

test("Deve ignorar a placa do carro quando está criando um passageiro", async function () {
  // arrange
  const invalidCarPlate = mockInvalidCarPlate();
  const input = {
    ...mockValidPassenger(),
    carPlate: invalidCarPlate,
  };
  // act
  const output = await axios.post("http://localhost:3000/signup", input);
  // assert
  expect(output.status).toBe(200);
  expect(output.data).toHaveProperty("accountId");
  const [acc] = await connection.query(
    "select * from cccat16.account where email = $1",
    [input.email]
  );
  expect(acc.account_id).toEqual(output.data.accountId);
  expect(acc.car_place).toEqual(undefined);
});
