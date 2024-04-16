import { Account } from "../../domain/account";

export class AccountMapper {
  static toDomain(account: any): Account {
    return Account.restore({
      id: account.account_id,
      email: account.email,
      name: account.name,
      isDriver: account.is_driver ?? false,
      isPassenger: account.is_passenger ?? false,
      carPlate: account.car_plate,
      cpf: account.cpf,
    });
  }
}
