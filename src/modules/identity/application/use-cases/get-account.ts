import { AccountRepository } from "../repositories/account-repository";

export interface GetAccountRequest {
  accountId: string;
}

export interface GetAccountResponse {
  id: string;
  isPassenger: boolean;
  isDriver: boolean;
  name: string;
  email: string;
  cpf: string;
  carPlate: string | null;
}

export class GetAccount {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({ accountId }: GetAccountRequest): Promise<GetAccountResponse> {
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

export class AccountNotFound extends Error {
  constructor() {
    super("Account not found");
  }
}
