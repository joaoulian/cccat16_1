import { Fixture } from "./fixture.mock";

describe("Update position", () => {
  let fixture: Fixture;

  beforeEach(() => {
    jest.clearAllMocks();
    fixture = new Fixture();
  });

  test("Deve iniciar a corrida", async function () {
    // arrange
    const now = new Date("2021-07-10 13:00:00");
    jest.useFakeTimers().setSystemTime(now);
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
    await fixture.startRide({
      rideId,
    });
    // act
    await fixture.updatePosition({
      rideId,
      lat: -27.584905257808835,
      long: -48.545022195325124,
    });
    // assert
    const positions = await fixture.positionRepository.getByRideId(rideId);
    expect(positions).toHaveLength(1);
    expect(positions[0].rideId).toEqual(rideId);
    expect(positions[0].lat).toEqual(-27.584905257808835);
    expect(positions[0].long).toEqual(-48.545022195325124);
    expect(positions[0].date).toEqual(now);
  });

  test("Deve falhar caso a corrida não esteja em progresso", async function () {
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
    // act and assert
    await expect(() =>
      fixture.updatePosition({
        rideId,
        lat: -27.584905257808835,
        long: -48.545022195325124,
      })
    ).rejects.toThrow("Ride not in progress");
  });
});
