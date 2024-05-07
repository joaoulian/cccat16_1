import pgp from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";
import { PositionRepository } from "../../application/repositories/position-repository";
import { Position } from "../../domain/entities/position";

export class PositionRepositoryPostgresImpl implements PositionRepository {
  constructor(private readonly connection: pgp.IDatabase<{}, pg.IClient>) {}

  async create(position: Position): Promise<void> {
    await this.connection.query(
      "insert into cccat16.position (position_id, ride_id, lat, long, date) values ($1, $2, $3, $4, $5)",
      [position.id, position.rideId, position.lat, position.long, position.date]
    );
  }

  async getByRideId(rideId: string): Promise<Position[]> {
    const result = await this.connection.query(
      "select position_id, ride_id, lat, long, date from cccat16.position where ride_id = $1",
      [rideId]
    );
    return result.map((r: any) =>
      Position.restore({
        id: r.position_id,
        rideId: r.ride_id,
        lat: r.lat,
        long: r.long,
        date: r.date,
      })
    );
  }
}
