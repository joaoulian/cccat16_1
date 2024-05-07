import { Account } from "../../domain/entities/account";
import { AccountRepository } from "../repositories/account-repository";

export class SignUp {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({
    cpf,
    email,
    name,
    carPlate,
    isDriver,
    isPassenger,
  }: SignUpInput): Promise<SignUpOutput> {
    const accountWithSameEmail = await this.accountRepository.findByEmail(
      email
    );
    if (!!accountWithSameEmail) throw new AccountAlreadyExistsError();
    const account = Account.create({
      name,
      email,
      cpf,
      isDriver: !!isDriver,
      isPassenger: !!isPassenger,
      carPlate,
    });
    await this.accountRepository.create(account);
    return { accountId: account.id };
  }
}

export interface SignUpInput {
  name: string;
  email: string;
  cpf: string;
  isDriver?: boolean;
  isPassenger?: boolean;
  carPlate?: string;
}

export interface SignUpOutput {
  accountId: string;
}

export class AccountAlreadyExistsError extends Error {
  constructor() {
    super("Account already exists");
  }
}
