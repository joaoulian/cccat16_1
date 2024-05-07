import { Segment } from "../value-objects/segment";

export interface RideProps {
  id: string;
  passengerId: string;
  driverId: string;
  status: string;
  date: Date;
  segment: Segment;
}

export class Ride {
  private constructor(private props: RideProps) {}

  public static create(props: RideProps): Ride {
    return new Ride(props);
  }
}
