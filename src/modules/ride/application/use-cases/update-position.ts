import { Position } from "../../domain/entities/position";
import { PositionRepository } from "../repositories/position-repository";
import { RideRepository } from "../repositories/ride-repository";

export class UpdatePosition {
  constructor(
    private readonly rideRepository: RideRepository,
    private readonly positionRepository: PositionRepository
  ) {}

  async execute({ rideId, lat, long }: UpdatePositionInput): Promise<void> {
    const ride = await this.rideRepository.findById(rideId);
    if (!ride) {
      throw new Error("Ride not found");
    }
    if (!ride.isInProgress()) throw new Error("Ride not in progress");
    const position = Position.create({
      rideId,
      lat,
      long,
    });
    await this.positionRepository.create(position);
  }
}

export interface UpdatePositionInput {
  rideId: string;
  lat: number;
  long: number;
}
