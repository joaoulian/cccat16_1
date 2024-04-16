import { Account } from "../../domain/account";

export interface AccountRepository {
  create(account: Account): Promise<void>;
  findByEmail(email: string): Promise<Account | null>;
}
