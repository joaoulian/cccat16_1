import { isValidCPF } from "./is-valid-cpf";
import { isValidName } from "./is-valid-name";
import { isValidEmail } from "./is-valid-email";
import { isValidCarPlate } from "./is-valid-car-plate";
import crypto from "crypto";

export interface AccountProps {
  id: string;
  email: string;
  name: string;
  isDriver: boolean;
  isPassenger: boolean;
  carPlate: string | null;
  cpf: string;
}

export class Account {
  private readonly props: AccountProps;
  private constructor(props: AccountProps) {
    if (!isValidName(props.name)) throw new InvalidNameError();
    if (!isValidEmail(props.email)) throw new InvalidEmailError();
    if (!isValidCPF(props.cpf)) throw new InvalidCPFError();
    if (!!props.isDriver && !isValidCarPlate(props.carPlate ?? undefined))
      throw new InvalidCarPlateError();
    this.props = { ...props };
  }

  get id(): string {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get isDriver(): boolean {
    return this.props.isDriver;
  }

  get isPassenger(): boolean {
    return this.props.isPassenger;
  }

  get carPlate(): string | null {
    return this.props.carPlate;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  static create(props: Omit<AccountProps, "id">): Account {
    const id = crypto.randomUUID();
    return new Account({ ...props, id });
  }

  static restore(props: AccountProps): Account {
    return new Account(props);
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
