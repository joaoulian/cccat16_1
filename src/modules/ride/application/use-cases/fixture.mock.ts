import { Account } from "../../../identity/domain/entities/account";
import { validCPF } from "../../../identity/domain/value-objects/mocks/cpf.mock";
import { validEmail } from "../../../identity/domain/value-objects/mocks/email.mock";
import { AccountRepositoryMemoryImpl } from "../../../identity/infra/repositories/account-repository-memory-impl";
import { RideRepositoryMemoryImpl } from "../../infra/repositories/ride-repository-memory-impl";
import { AcceptRide, AcceptRideInput } from "./accept-ride";
import { GetRide, GetRideInput } from "./get-ride";
import { RequestRide, RequestRideInput } from "./request-ride";
import { StartRide, StartRideInput } from "./start-ride";

export class Fixture {
  rideRepository: RideRepositoryMemoryImpl;
  accountRepository: AccountRepositoryMemoryImpl;

  constructor() {
    this.rideRepository = new RideRepositoryMemoryImpl();
    this.accountRepository = new AccountRepositoryMemoryImpl();
  }

  requestRide(input: RequestRideInput) {
    const useCase = new RequestRide(
      this.rideRepository,
      this.accountRepository
    );
    return useCase.execute(input);
  }

  getRide(input: GetRideInput) {
    const useCase = new GetRide(this.rideRepository, this.accountRepository);
    return useCase.execute(input);
  }

  acceptRide(input: AcceptRideInput) {
    const useCase = new AcceptRide(this.rideRepository, this.accountRepository);
    return useCase.execute(input);
  }

  startRide(input: StartRideInput) {
    const useCase = new StartRide(this.rideRepository);
    return useCase.execute(input);
  }

  async persistPassenger(): Promise<Account> {
    const passenger = Account.create({
      name: "Passenger Y",
      email: validEmail(),
      cpf: validCPF(),
      isDriver: false,
      isPassenger: true,
    });
    await this.accountRepository.create(passenger);
    return passenger;
  }

  async persistDriver(): Promise<Account> {
    const driver = Account.create({
      name: "Driver X",
      email: validEmail(),
      cpf: validCPF(),
      isDriver: true,
      isPassenger: false,
      carPlate: "ABC1234",
    });
    await this.accountRepository.create(driver);
    return driver;
  }
}
