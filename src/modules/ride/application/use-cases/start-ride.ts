import { RideRepository } from "../repositories/ride-repository";

export class StartRide {
  constructor(private rideRepository: RideRepository) {}

  async execute({ rideId }: StartRideInput): Promise<void> {
    const ride = await this.rideRepository.findById(rideId);
    if (!ride) {
      throw new Error("Ride not found");
    }
    ride.start();
    await this.rideRepository.save(ride);
  }
}

export interface StartRideInput {
  rideId: string;
}
