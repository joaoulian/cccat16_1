import { AccountRepository } from "../repositories/account-repository";

export class GetAccount {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({ accountId }: GetAccountInput): Promise<GetAccountOutput> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new AccountNotFound();
    return {
      id: account.id,
      isPassenger: account.isPassenger,
      isDriver: account.isDriver,
      name: account.name,
      email: account.email,
      cpf: account.cpf,
      carPlate: account.carPlate,
    };
  }
}

export interface GetAccountInput {
  accountId: string;
}

export interface GetAccountOutput {
  id: string;
  isPassenger: boolean;
  isDriver: boolean;
  name: string;
  email: string;
  cpf: string;
  carPlate: string | null;
}

export class AccountNotFound extends Error {
  constructor() {
    super("Account not found");
  }
}
