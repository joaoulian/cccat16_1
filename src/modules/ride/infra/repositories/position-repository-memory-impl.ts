import { PositionRepository } from "../../application/repositories/position-repository";
import { Position } from "../../domain/entities/position";

export class PositionRepositoryMemoryImpl implements PositionRepository {
  private positions: Position[] = [];
  constructor() {}

  async create(position: Position): Promise<void> {
    this.positions.push(position);
  }

  async getByRideId(rideId: string): Promise<Position[]> {
    return this.positions.filter((p) => p.rideId === rideId);
  }
}
