export class Coord {
  private latitude: number;
  private longitude: number;

  constructor(lat: number, long: number) {
    if (lat < -90 || lat > 90) throw new Error("Invalid latitude");
    if (long < -180 || long > 180) throw new Error("Invalid longitude");
    this.latitude = lat;
    this.longitude = lat;
  }

  getLatitude(): number {
    return this.latitude;
  }

  getLongitude(): number {
    return this.longitude;
  }
}
