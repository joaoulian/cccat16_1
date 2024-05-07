import { Fixture } from "./fixture.mock";

describe("Request Ride", () => {
  let fixture: Fixture;

  beforeEach(() => {
    fixture = new Fixture();
  });

  test("Deve solicitar uma corrida", async function () {
    // arrange
    const passenger = await fixture.persistPassenger();
    const input = {
      passengerId: passenger.id,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    };
    // act
    const response = await fixture.requestRide(input);
    // assert
    const ride = await fixture.getRide({ rideId: response.rideId });
    expect(ride).not.toBeNull();
    expect(ride?.status).toEqual("requested");
    expect(ride?.fromLat).toEqual(input.fromLat);
    expect(ride?.fromLong).toEqual(input.fromLong);
    expect(ride?.toLat).toEqual(input.toLat);
    expect(ride?.toLong).toEqual(input.toLong);
    expect(ride?.passengerId).toEqual(passenger.id);
    expect(ride?.passengerName).toEqual(passenger.name);
    expect(ride?.passengerEmail).toEqual(passenger.email);
    expect(ride?.driverId).toBeUndefined();
    expect(ride?.driverEmail).toBeUndefined();
    expect(ride?.driverName).toBeUndefined();
  });

  test("Deve falhar caso o passengerId não seja de um passageiro", async function () {
    // arrange
    const driver = await fixture.persistDriver();
    const input = {
      passengerId: driver.id,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    };
    // act and assert
    await expect(() => fixture.requestRide(input)).rejects.toThrow(
      "Account is not from a passenger"
    );
  });

  test("Deve falhar caso o passageiro já tenha uma corrida em andamento", async function () {
    // arrange
    const passenger = await fixture.persistPassenger();
    const input = {
      passengerId: passenger.id,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    };
    await fixture.requestRide(input);
    // act and assert
    await expect(() => fixture.requestRide(input)).rejects.toThrow(
      "Passenger already has a ride in progress"
    );
  });
});
