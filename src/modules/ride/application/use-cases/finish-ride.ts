import DistanceCalculator from "../../domain/services/distance-calculator";
import { PositionRepository } from "../repositories/position-repository";
import { RideRepository } from "../repositories/ride-repository";

export class FinishRide {
  constructor(
    private rideRepository: RideRepository,
    private positionRepository: PositionRepository
  ) {}

  async execute({ rideId }: FinishRideInput): Promise<void> {
    const ride = await this.rideRepository.findById(rideId);
    if (!ride) {
      throw new Error("Ride not found");
    }
    const positions = await this.positionRepository.getByRideId(rideId);
    const distance = DistanceCalculator.calculate(positions);
    ride.finish(distance);
    await this.rideRepository.save(ride);
  }
}

export interface FinishRideInput {
  rideId: string;
}
