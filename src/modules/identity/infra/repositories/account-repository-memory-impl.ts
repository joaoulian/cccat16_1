import { AccountRepository } from "../../application/repositories/account-repository";
import { Account } from "../../domain/entities/account";
import { AccountMapper } from "./account-mapper";

export class AccountRepositoryMemoryImpl implements AccountRepository {
  private accounts: Account[] = [];
  constructor() {}

  async create(account: Account) {
    this.accounts.push(account);
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = this.accounts.find((account) => account.email === email);
    return account ?? null;
  }

  async findById(id: string): Promise<Account | null> {
    const account = this.accounts.find((account) => account.id === id);
    return account ?? null;
  }
}
