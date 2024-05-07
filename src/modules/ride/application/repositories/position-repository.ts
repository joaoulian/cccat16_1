import { Position } from "../../domain/entities/position";

export interface PositionRepository {
  create(position: Position): Promise<void>;
  getByRideId(rideId: string): Promise<Position[]>;
}
