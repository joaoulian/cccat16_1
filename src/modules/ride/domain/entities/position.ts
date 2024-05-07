import crypto from "crypto";
import { Coord } from "../value-objects/coord";

export interface PositionProps {
  id: string;
  rideId: string;
  coord: Coord;
  date: Date;
}

export class Position {
  private constructor(private props: PositionProps) {}

  get id(): string {
    return this.props.id;
  }

  get rideId(): string {
    return this.props.rideId;
  }

  get lat(): number {
    return this.props.coord.getLatitude();
  }

  get long(): number {
    return this.props.coord.getLongitude();
  }

  get date(): Date {
    return this.props.date;
  }

  static create(props: CreateProps): Position {
    const id = crypto.randomUUID();
    return new Position({
      id: id,
      coord: new Coord(props.lat, props.long),
      rideId: props.rideId,
      date: new Date(),
    });
  }

  static restore(props: RestoreProps): Position {
    return new Position({
      id: props.id,
      coord: new Coord(props.lat, props.long),
      rideId: props.rideId,
      date: props.date,
    });
  }
}

interface CreateProps {
  rideId: string;
  lat: number;
  long: number;
}

interface RestoreProps {
  id: string;
  rideId: string;
  lat: number;
  long: number;
  date: Date;
}
