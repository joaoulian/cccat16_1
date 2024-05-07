import { RideRepository } from "../../application/repositories/ride-repository";
import { Ride } from "../../domain/entities/ride";

export class RideRepositoryMemoryImpl implements RideRepository {
  private rides: Ride[] = [];
  constructor() {}

  async save(ride: Ride): Promise<void> {
    const index = this.rides.findIndex((r) => r.id === ride.id);
    if (index >= 0) {
      this.rides[index] = ride;
      return;
    }
    this.rides.push(ride);
    return;
  }

  async findById(id: string): Promise<Ride | null> {
    const ride = this.rides.find((r) => r.id === id);
    return ride ?? null;
  }

  async hasActiveRideByPassengerId(passengerId: string): Promise<boolean> {
    const rides = this.rides.filter(
      (r) =>
        r.passengerId === passengerId &&
        r.status !== "canceled" &&
        r.status !== "completed"
    );
    return rides.length > 0;
  }

  async hasActiveRideByDriverId(driverId: string): Promise<boolean> {
    const rides = this.rides.filter(
      (r) =>
        r.driverId === driverId &&
        r.status !== "canceled" &&
        r.status !== "completed"
    );
    return rides.length > 0;
  }
}
