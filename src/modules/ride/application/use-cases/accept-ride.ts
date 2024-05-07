import { AccountRepository } from "../../../identity/application/repositories/account-repository";
import { RideRepository } from "../repositories/ride-repository";

export class AcceptRide {
  constructor(
    private rideRepository: RideRepository,
    private accountRepository: AccountRepository
  ) {}

  async execute({ driverId, rideId }: AcceptRideInput): Promise<void> {
    const ride = await this.rideRepository.findById(rideId);
    if (!ride) {
      throw new Error("Ride not found");
    }
    const driver = await this.accountRepository.findById(driverId);
    if (!driver?.isDriver) {
      throw new Error("Account is not from a driver");
    }
    const hasActiveRide = await this.rideRepository.hasActiveRideByDriverId(
      driver.id
    );
    if (hasActiveRide) throw new Error("Driver has an active ride");
    ride.accept(driverId);
    await this.rideRepository.save(ride);
  }
}

export interface AcceptRideInput {
  rideId: string;
  driverId: string;
}
