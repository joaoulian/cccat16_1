import { AccountRepositoryMemoryImpl } from "../../infra/repositories/account-repository-memory-impl";
import {
  mockInvalidCPF,
  mockInvalidCarPlate,
  mockInvalidEmail,
  mockInvalidName,
  mockValidDriver,
  mockValidPassenger,
} from "./account.mock";
import { AccountAlreadyExistsError, SignUp } from "./sign-up";
import { AccountRepository } from "../repositories/account-repository";
import { InvalidNameError } from "../../domain/value-objects/name";
import { InvalidEmailError } from "../../domain/value-objects/email";
import { InvalidCPFError } from "../../domain/value-objects/cpf";
import { InvalidCarPlateError } from "../../domain/value-objects/car-plate";

let useCase: SignUp;
let accountRepository: AccountRepository;
beforeEach(() => {
  accountRepository = new AccountRepositoryMemoryImpl();
  useCase = new SignUp(accountRepository);
  jest.clearAllMocks();
});

test("Deve criar uma conta para um passageiro", async function () {
  // arrange
  const input = mockValidPassenger();
  // act
  const output = await useCase.execute(input);
  // assert
  expect(output.accountId).toBeDefined();
  const acc = await accountRepository.findByEmail(input.email);
  expect(acc?.id).toEqual(output.accountId);
  expect(acc?.isPassenger).toBeTruthy();
  expect(acc?.cpf).toEqual(input.cpf);
  expect(acc?.carPlate).toEqual(null);
  expect(acc?.isDriver).toBeFalsy();
  expect(acc?.name).toEqual(input.name);
  expect(acc?.email).toEqual(input.email);
});

test("Deve criar uma conta para um motorista", async function () {
  // arrange
  const input = mockValidDriver();
  // act
  const output = await useCase.execute(input);
  // assert
  expect(output.accountId).toBeDefined();
  const acc = await accountRepository.findByEmail(input.email);
  expect(acc?.id).toEqual(output.accountId);
  expect(acc?.isPassenger).toBeFalsy();
  expect(acc?.cpf).toEqual(input.cpf);
  expect(acc?.carPlate).toEqual(input.carPlate);
  expect(acc?.isDriver).toBeTruthy();
  expect(acc?.name).toEqual(input.name);
  expect(acc?.email).toEqual(input.email);
});

test("Deve criar uma conta para um motorista-passageiro", async function () {
  // arrange
  const input = {
    ...mockValidDriver(),
    isPassenger: true,
  };
  // act
  const output = await useCase.execute(input);
  // assert
  expect(output.accountId).toBeDefined();
  const acc = await accountRepository.findByEmail(input.email);
  expect(acc?.id).toEqual(output.accountId);
  expect(acc?.isPassenger).toBeTruthy();
  expect(acc?.isDriver).toBeTruthy();
  expect(acc?.carPlate).toEqual(input.carPlate);
});

test("Deve retornar um erro quando já existe uma conta com o mesmo email cadastrado", async function () {
  // arrange
  const input = mockValidPassenger();
  await useCase.execute(input);
  // act and assert
  await expect(() => useCase.execute(input)).rejects.toThrowError(
    AccountAlreadyExistsError
  );
  const createAccountSpy = jest.spyOn(accountRepository, "create");
  expect(createAccountSpy).not.toHaveBeenCalled();
});

test("Deve retornar um erro quando o nome é inválido", async function () {
  // arrange
  const invalidName = mockInvalidName();
  const input = {
    ...mockValidPassenger(),
    name: invalidName,
  };
  // act and assert
  await expect(() => useCase.execute(input)).rejects.toThrowError(
    InvalidNameError
  );
  const createAccountSpy = jest.spyOn(accountRepository, "create");
  expect(createAccountSpy).not.toHaveBeenCalled();
});

test("Deve retornar um erro quando o email é inválido", async function () {
  // arrange
  const invalidEmail = mockInvalidEmail();
  const input = {
    ...mockValidPassenger(),
    email: invalidEmail,
  };
  // act and assert
  await expect(() => useCase.execute(input)).rejects.toThrowError(
    InvalidEmailError
  );
  const createAccountSpy = jest.spyOn(accountRepository, "create");
  expect(createAccountSpy).not.toHaveBeenCalled();
});

test("Deve retornar um erro quando o CPF do passageiro é inválido", async function () {
  // arrange
  const invalidCPF = mockInvalidCPF();
  const input = {
    ...mockValidPassenger(),
    cpf: invalidCPF,
  };
  // act and assert
  await expect(() => useCase.execute(input)).rejects.toThrowError(
    InvalidCPFError
  );
  const createAccountSpy = jest.spyOn(accountRepository, "create");
  expect(createAccountSpy).not.toHaveBeenCalled();
});

test("Deve retornar um erro quando a placa do motorista é inválida", async function () {
  // arrange
  const invalidCarPlate = mockInvalidCarPlate();
  const input = {
    ...mockValidDriver(),
    carPlate: invalidCarPlate,
  };
  // act and assert
  await expect(() => useCase.execute(input)).rejects.toThrowError(
    InvalidCarPlateError
  );
  const createAccountSpy = jest.spyOn(accountRepository, "create");
  expect(createAccountSpy).not.toHaveBeenCalled();
});
