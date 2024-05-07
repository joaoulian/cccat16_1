import { Fixture } from "./fixture.mock";

describe("Accept Ride", () => {
  let fixture: Fixture;

  beforeEach(() => {
    fixture = new Fixture();
  });

  test("Deve aceitar uma corrida", async function () {
    // arrange
    const passenger = await fixture.persistPassenger();
    const driver = await fixture.persistDriver();
    const { rideId } = await fixture.requestRide({
      passengerId: passenger.id,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    });
    // act
    await fixture.acceptRide({
      driverId: driver.id,
      rideId: rideId,
    });
    // assert
    const ride = await fixture.getRide({ rideId });
    expect(ride).not.toBeNull();
    expect(ride?.status).toBe("accepted");
    expect(ride?.driverId).toBe(driver.id);
    expect(ride?.driverName).toBe(driver.name);
    expect(ride?.driverEmail).toBe(driver.email);
  });

  test("Deve falhar caso o driverId não seja o ID de um motorista", async function () {
    // arrange
    const passenger = await fixture.persistPassenger();
    const { rideId } = await fixture.requestRide({
      passengerId: passenger.id,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    });
    // act and assert
    await expect(() =>
      fixture.acceptRide({
        driverId: passenger.id,
        rideId: rideId,
      })
    ).rejects.toThrow("Account is not from a driver");
  });

  test("Deve falhar caso o motorista já tenha alguma corrida ativa", async function () {
    // arrange
    const passenger = await fixture.persistPassenger();
    const passenger2 = await fixture.persistPassenger();
    const driver = await fixture.persistDriver();
    const { rideId } = await fixture.requestRide({
      passengerId: passenger.id,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    });
    const { rideId: rideId2 } = await fixture.requestRide({
      passengerId: passenger2.id,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    });
    await fixture.acceptRide({
      driverId: driver.id,
      rideId: rideId,
    });
    // act and assert
    await expect(() =>
      fixture.acceptRide({
        driverId: driver.id,
        rideId: rideId2,
      })
    ).rejects.toThrow("Driver has an active ride");
  });
});
