import DistanceCalculator from "../../domain/services/distance-calculator";
import { PaymentGateway } from "../gateway/payment-gateway";
import { PositionRepository } from "../repositories/position-repository";
import { RideRepository } from "../repositories/ride-repository";

export class FinishRide {
  constructor(
    private rideRepository: RideRepository,
    private positionRepository: PositionRepository,
    private paymentGateway: PaymentGateway
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
    if (!ride.fare)
      throw new Error("Cannot process payment for a ride without fare");
    await this.paymentGateway.processPayment(ride.id, ride.fare);
  }
}

export interface FinishRideInput {
  rideId: string;
}
