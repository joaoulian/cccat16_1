import pgp from "pg-promise";
import { RideRepository } from "../../application/repositories/ride-repository";
import { Ride } from "../../domain/entities/ride";
import pg from "pg-promise/typescript/pg-subset";

export class RideRepositoryPostgresImpl implements RideRepository {
  constructor(private readonly connection: pgp.IDatabase<{}, pg.IClient>) {}

  async save(ride: Ride): Promise<void> {
    const existent = await this.findById(ride.id);
    if (existent) {
      await this.connection.query(
        "update cccat16.ride set status = $1, driver_id = $2 where ride_id = $3",
        [ride.status, ride.driverId, ride.id]
      );
      return;
    }
    await this.connection.query(
      "insert into cccat16.ride (ride_id, passenger_id, from_lat, from_long, to_lat, to_long, status, date) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        ride.id,
        ride.passengerId,
        ride.fromLat,
        ride.fromLong,
        ride.toLat,
        ride.toLong,
        ride.status,
        ride.date,
      ]
    );
  }

  async findById(rideId: any): Promise<Ride | null> {
    const [rideData] = await this.connection.query(
      "select * from cccat16.ride where ride_id = $1",
      [rideId]
    );
    if (!rideData) return null;
    const ride = Ride.restore({
      id: rideData.ride_id,
      passengerId: rideData.passenger_id,
      driverId: rideData.driver_id,
      fromLat: parseFloat(rideData.from_lat),
      fromLong: parseFloat(rideData.from_long),
      toLat: parseFloat(rideData.to_lat),
      toLong: parseFloat(rideData.to_long),
      status: rideData.status,
      date: rideData.date,
      distance: rideData.distance,
      fare: rideData.fare,
    });
    return ride;
  }

  async hasActiveRideByPassengerId(passengerId: string): Promise<boolean> {
    const [rideData] = await this.connection.query(
      "select * from cccat16.ride where passenger_id = $1 and status <> 'canceled' or status <> 'completed'",
      [passengerId]
    );
    return !!rideData;
  }

  async hasActiveRideByDriverId(driverId: string): Promise<boolean> {
    const [rideData] = await this.connection.query(
      "select * from cccat16.ride where driver_id = $1 and status <> 'canceled' or status <> 'completed'",
      [driverId]
    );
    return !!rideData;
  }
}
