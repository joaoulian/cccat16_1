import { AccountRepository } from "../../../identity/application/repositories/account-repository";
import { Account } from "../../../identity/domain/entities/account";
import { validCPF } from "../../../identity/domain/value-objects/mocks/cpf.mock";
import { validEmail } from "../../../identity/domain/value-objects/mocks/email.mock";
import { AccountRepositoryMemoryImpl } from "../../../identity/infra/repositories/account-repository-memory-impl";
import { PaymentGatewayMemoryImpl } from "../../infra/gateways/payment-gateway-memory-impl";
import { PositionRepositoryMemoryImpl } from "../../infra/repositories/position-repository-memory-impl";
import { RideRepositoryMemoryImpl } from "../../infra/repositories/ride-repository-memory-impl";
import { PaymentGateway } from "../gateway/payment-gateway";
import { PositionRepository } from "../repositories/position-repository";
import { RideRepository } from "../repositories/ride-repository";
import { AcceptRide, AcceptRideInput } from "./accept-ride";
import { FinishRide, FinishRideInput } from "./finish-ride";
import { GetRide, GetRideInput } from "./get-ride";
import { RequestRide, RequestRideInput } from "./request-ride";
import { StartRide, StartRideInput } from "./start-ride";
import { UpdatePosition, UpdatePositionInput } from "./update-position";

export class Fixture {
  readonly rideRepository: RideRepository;
  readonly accountRepository: AccountRepository;
  readonly positionRepository: PositionRepository;
  readonly paymentGateway: PaymentGateway;

  readonly processPaymentSpy: jest.SpyInstance<
    Promise<{ status: "success" | "failed" }>,
    [rideId: string, amount: number]
  >;

  constructor() {
    this.rideRepository = new RideRepositoryMemoryImpl();
    this.accountRepository = new AccountRepositoryMemoryImpl();
    this.positionRepository = new PositionRepositoryMemoryImpl();
    this.paymentGateway = new PaymentGatewayMemoryImpl();
    this.processPaymentSpy = jest.spyOn(this.paymentGateway, "processPayment");
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

  updatePosition(input: UpdatePositionInput) {
    const useCase = new UpdatePosition(
      this.rideRepository,
      this.positionRepository
    );
    return useCase.execute(input);
  }

  finishRide(input: FinishRideInput) {
    const useCase = new FinishRide(
      this.rideRepository,
      this.positionRepository,
      this.paymentGateway
    );
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
