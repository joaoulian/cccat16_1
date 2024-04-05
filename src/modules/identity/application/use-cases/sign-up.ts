import crypto from "crypto";
import { isValidCPF } from "../../domain/is-valid-cpf";
import { isValidName } from "../../domain/is-valid-name";
import { isValidEmail } from "../../domain/is-valid-email";
import { isValidCarPlate } from "../../domain/is-valid-car-plate";
import { AccountRepository } from "../repositories/AccountRepository";

export interface SignUpRequest {
  name: string;
  email: string;
  cpf: string;
  isDriver?: boolean;
  isPassenger?: boolean;
  carPlate?: string;
}

export interface SignUpResponse {
  accountId: string;
}

export class SignUp {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({
    cpf,
    email,
    name,
    carPlate,
    isDriver,
    isPassenger,
  }: SignUpRequest): Promise<SignUpResponse> {
    const accountWithSameEmail = await this.accountRepository.findByEmail(
      email
    );
    if (!!accountWithSameEmail) throw new AccountAlreadyExistsError();
    if (!isValidName(name)) throw new InvalidNameError();
    if (!isValidEmail(email)) throw new InvalidEmailError();
    if (!isValidCPF(cpf)) throw new InvalidCPFError();
    if (!!isDriver && !isValidCarPlate(carPlate))
      throw new InvalidCarPlateError();
    const id = crypto.randomUUID();
    await this.createAccount({
      id,
      name,
      email,
      cpf,
      isDriver: !!isDriver,
      carPlate: isDriver ? carPlate! : null,
      isPassenger: !!isPassenger,
    });
    return { accountId: id };
  }

  private async createAccount({
    carPlate,
    cpf,
    email,
    id,
    isDriver,
    isPassenger,
    name,
  }: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    isDriver: boolean;
    carPlate: string | null;
    isPassenger: boolean;
  }) {
    await this.accountRepository.create({
      id,
      name,
      email,
      cpf,
      carPlate,
      isDriver,
      isPassenger,
    });
  }
}

export class AccountAlreadyExistsError extends Error {
  constructor() {
    super("Account already exists");
  }
}

export class InvalidNameError extends Error {
  constructor() {
    super("Invalid name");
  }
}

export class InvalidEmailError extends Error {
  constructor() {
    super("Invalid email");
  }
}

export class InvalidCPFError extends Error {
  constructor() {
    super("Invalid CPF");
  }
}

export class InvalidCarPlateError extends Error {
  constructor() {
    super("Invalid car plate");
  }
}
