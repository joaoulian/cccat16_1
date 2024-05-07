import { AccountRepository } from "../../../identity/application/repositories/account-repository";
import { Ride } from "../../domain/entities/ride";
import { RideRepository } from "../repositories/ride-repository";

export class RequestRide {
  constructor(
    private rideRepository: RideRepository,
    private accountRepository: AccountRepository
  ) {}

  async execute({
    passengerId,
    fromLat,
    fromLong,
    toLat,
    toLong,
  }: RequestRideInput): Promise<RequestRideOutput> {
    const passenger = await this.accountRepository.findById(passengerId);
    if (!passenger?.isPassenger) {
      throw new Error("Account is not from a passenger");
    }
    const hasActiveRide = await this.rideRepository.hasActiveRideByPassengerId(
      passengerId
    );
    if (hasActiveRide) {
      throw new Error("Passenger already has a ride in progress");
    }
    const ride = Ride.create({
      passengerId: passengerId,
      fromLat,
      fromLong,
      toLat,
      toLong,
    });
    await this.rideRepository.save(ride);
    return { rideId: ride.id };
  }
}

export interface RequestRideInput {
  passengerId: string;
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
}

export interface RequestRideOutput {
  rideId: string;
}
