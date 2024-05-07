import { Account } from "../../domain/entities/account";

export interface AccountRepository {
  create(account: Account): Promise<void>;
  findByEmail(email: string): Promise<Account | null>;
  findById(id: string): Promise<Account | null>;
}
