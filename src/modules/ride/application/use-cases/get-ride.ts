import { AccountRepository } from "../../../identity/application/repositories/account-repository";
import { RideRepository } from "../repositories/ride-repository";

export class GetRide {
  constructor(
    private readonly rideRepository: RideRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute({ rideId }: GetRideInput): Promise<GetRideOutput> {
    const ride = await this.rideRepository.findById(rideId);
    if (!ride) {
      throw new Error("Ride not found");
    }
    const passenger = await this.accountRepository.findById(ride.passengerId);
    if (!passenger) {
      throw new Error("Passenger not found");
    }
    const driver = ride.driverId
      ? await this.accountRepository.findById(ride.driverId)
      : undefined;
    return {
      rideId: ride.id,
      fromLat: ride.fromLat,
      fromLong: ride.fromLong,
      toLat: ride.toLat,
      toLong: ride.toLong,
      status: ride.status,
      passengerId: passenger.id,
      passengerName: passenger.name,
      passengerEmail: passenger.email,
      driverId: driver?.id,
      driverName: driver?.name,
      driverEmail: driver?.email,
      fare: ride.fare,
      distance: ride.distance,
    };
  }
}

export interface GetRideInput {
  rideId: string;
}

export interface GetRideOutput {
  rideId: string;
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
  status: string;
  passengerId: string;
  passengerName: string;
  passengerEmail: string;
  driverId?: string;
  driverName?: string;
  driverEmail?: string;
  fare?: number;
  distance?: number;
}
