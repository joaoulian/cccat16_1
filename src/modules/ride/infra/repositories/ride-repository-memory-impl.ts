import { RideRepository } from "../../application/repositories/ride-repository";
import { Ride } from "../../domain/entities/ride";

export class RideRepositoryMemoryImpl implements RideRepository {
  private rides: Ride[] = [];
  constructor() {}

  async create(ride: Ride) {
    this.rides.push(ride);
  }

  async findById(id: string): Promise<Ride | null> {
    const ride = this.rides.find((r) => r.id === id);
    return ride ?? null;
  }

  async hasActiveRideByPassengerId(passengerId: string): Promise<boolean> {
    const rides = this.rides.filter(
      (r) => r.passengerId === passengerId && r.status !== "canceled"
    );
    return rides.length > 0;
  }
}
