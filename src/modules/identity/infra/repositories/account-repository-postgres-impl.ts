import { AccountRepository } from "../../application/repositories/account-repository";
import pg from "pg-promise/typescript/pg-subset";
import pgp from "pg-promise";
import { Account } from "../../domain/entities/account";
import { AccountMapper } from "./account-mapper";

export class AccountRepositoryPostgresImpl implements AccountRepository {
  constructor(private readonly connection: pgp.IDatabase<{}, pg.IClient>) {}

  async create(account: Account): Promise<void> {
    await this.connection.query(
      "insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        account.id,
        account.name,
        account.email,
        account.cpf,
        account.carPlate,
        account.isPassenger,
        account.isDriver,
      ]
    );
  }

  async findByEmail(email: string): Promise<Account | null> {
    const result = await this.connection.query(
      "select * from cccat16.account where email = $1",
      [email]
    );
    const account = result?.at(0);
    return account ? AccountMapper.toDomain(account) : null;
  }

  async findById(id: string): Promise<Account | null> {
    const result = await this.connection.query(
      "select * from cccat16.account where account_id = $1",
      [id]
    );
    const account = result?.at(0);
    return account ? AccountMapper.toDomain(account) : null;
  }
}
