import { Ride } from "../../domain/entities/ride";

export interface RideRepository {
  create(ride: Ride): Promise<void>;
  findById(id: string): Promise<Ride | null>;
  hasActiveRideByPassengerId(passengerId: string): Promise<boolean>;
}
