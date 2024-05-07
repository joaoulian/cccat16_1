import { Coord } from "./coord";

export class Segment {
  constructor(private readonly from: Coord, private readonly to: Coord) {}

  getDistance() {
    const earthRadius = 6371;
    const degreesToRadians = Math.PI / 180;
    const deltaLat =
      (this.to.getLatitude() - this.from.getLatitude()) * degreesToRadians;
    const deltaLon =
      (this.to.getLongitude() - this.from.getLongitude()) * degreesToRadians;
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(this.from.getLatitude() * degreesToRadians) *
        Math.cos(this.to.getLatitude() * degreesToRadians) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return Math.round(distance);
  }
}
