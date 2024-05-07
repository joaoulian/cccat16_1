import { Fixture } from "./fixture.mock";

describe("Start Ride", () => {
  let fixture: Fixture;

  beforeEach(() => {
    fixture = new Fixture();
  });

  test("Deve iniciar a corrida", async function () {
    // arrange
    const passenger = await fixture.persistPassenger();
    const { rideId } = await fixture.requestRide({
      passengerId: passenger.id,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    });
    const driver = await fixture.persistDriver();
    await fixture.acceptRide({
      driverId: driver.id,
      rideId,
    });
    // act
    await fixture.startRide({
      rideId,
    });
    // assert
    const ride = await fixture.getRide({ rideId });
    expect(ride).not.toBeNull();
    expect(ride?.status).toBe("in-progress");
  });

  test("Deve falhar caso a corrida não tenha sido aceita", async function () {
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
      fixture.startRide({
        rideId,
      })
    ).rejects.toThrow("Ride not accepted");
  });
});
