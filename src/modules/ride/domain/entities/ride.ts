import crypto from "crypto";
import { Coord } from "../value-objects/coord";
import { Segment } from "../value-objects/segment";

type RideStatus =
  | "requested"
  | "accepted"
  | "in-progress"
  | "canceled"
  | "completed";

export interface RideProps {
  id: string;
  passengerId: string;
  driverId?: string;
  status: RideStatus;
  date: Date;
  segment: Segment;
}

export class Ride {
  private constructor(private props: RideProps) {}

  get id(): string {
    return this.props.id;
  }

  get passengerId(): string {
    return this.props.passengerId;
  }

  get driverId(): string | undefined {
    return this.props.driverId;
  }

  get status(): string {
    return this.props.status;
  }

  get date(): Date {
    return this.props.date;
  }

  get fromLat(): number {
    return this.props.segment.getFrom().getLatitude();
  }

  get fromLong(): number {
    return this.props.segment.getFrom().getLongitude();
  }

  get toLat(): number {
    return this.props.segment.getTo().getLatitude();
  }

  get toLong(): number {
    return this.props.segment.getTo().getLongitude();
  }

  static create(props: CreateProps): Ride {
    const segment = new Segment(
      new Coord(props.fromLat, props.fromLong),
      new Coord(props.toLat, props.toLong)
    );
    const id = crypto.randomUUID();
    return new Ride({
      id: id,
      passengerId: props.passengerId,
      driverId: props.driverId,
      status: "requested",
      date: new Date(),
      segment,
    });
  }

  static restore(props: RestoreProps) {
    const segment = new Segment(
      new Coord(props.fromLat, props.fromLong),
      new Coord(props.toLat, props.toLong)
    );
    return new Ride({
      id: props.id,
      passengerId: props.passengerId,
      driverId: props.driverId,
      status: props.status as RideStatus,
      date: props.date,
      segment,
    });
  }
}

interface CreateProps {
  passengerId: string;
  driverId?: string;
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
}

interface RestoreProps {
  id: string;
  status: string;
  passengerId: string;
  date: Date;
  driverId?: string;
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
}
