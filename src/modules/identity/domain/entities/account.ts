import crypto from "crypto";
import { CarPlate } from "../value-objects/car-plate";
import { CPF } from "../value-objects/cpf";
import { Email } from "../value-objects/email";
import { Name } from "../value-objects/name";

export interface AccountProps {
  id: string;
  email: Email;
  name: Name;
  cpf: CPF;
  isDriver: boolean;
  isPassenger: boolean;
  carPlate?: CarPlate;
}

export class Account {
  private readonly props: AccountProps;

  private constructor(props: AccountProps) {
    this.props = { ...props };
  }

  get id(): string {
    return this.props.id;
  }

  get email(): string {
    return this.props.email.getValue();
  }

  get name(): string {
    return this.props.name.getValue();
  }

  get isDriver(): boolean {
    return this.props.isDriver;
  }

  get isPassenger(): boolean {
    return this.props.isPassenger;
  }

  get carPlate(): string | null {
    return this.props.carPlate?.getValue() ?? null;
  }

  get cpf(): string {
    return this.props.cpf.getValue();
  }

  static create(props: CreateInput): Account {
    const id = crypto.randomUUID();
    const carPlate = props.carPlate ? new CarPlate(props.carPlate) : undefined;
    const cpf = new CPF(props.cpf);
    const email = new Email(props.email);
    const name = new Name(props.name);
    return new Account({
      id,
      name,
      cpf,
      email,
      carPlate,
      isDriver: props.isDriver,
      isPassenger: props.isPassenger,
    });
  }

  static restore(props: RestoreInput): Account {
    const carPlate = props.carPlate ? new CarPlate(props.carPlate) : undefined;
    const cpf = new CPF(props.cpf);
    const email = new Email(props.email);
    const name = new Name(props.name);
    return new Account({
      id: props.id,
      name,
      cpf,
      email,
      carPlate,
      isDriver: props.isDriver,
      isPassenger: props.isPassenger,
    });
  }
}

export interface CreateInput {
  email: string;
  name: string;
  isDriver: boolean;
  isPassenger: boolean;
  carPlate?: string;
  cpf: string;
}

export interface RestoreInput {
  id: string;
  email: string;
  name: string;
  isDriver: boolean;
  isPassenger: boolean;
  carPlate?: string;
  cpf: string;
}
