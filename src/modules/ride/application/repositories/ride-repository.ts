import { Ride } from "../../domain/entities/ride";

export interface RideRepository {
  save(ride: Ride): Promise<void>;
  findById(id: string): Promise<Ride | null>;
  hasActiveRideByPassengerId(passengerId: string): Promise<boolean>;
  hasActiveRideByDriverId(driverId: string): Promise<boolean>;
}
