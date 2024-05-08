import { Fixture } from "./fixture.mock";

describe("Finish ride", () => {
  let fixture: Fixture;

  beforeEach(() => {
    fixture = new Fixture();
  });

  test("Deve encerrar uma corrida", async function () {
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
    await fixture.startRide({
      rideId,
    });
    await fixture.updatePosition({
      lat: -27.584905257808835,
      long: -48.545022195325124,
      rideId,
    });
    await fixture.updatePosition({
      lat: -27.496887588317275,
      long: -48.522234807851476,
      rideId,
    });
    // act
    await fixture.finishRide({
      rideId,
    });
    // assert
    const ride = await fixture.getRide({ rideId });
    expect(ride?.status).toEqual("completed");
    expect(ride?.fare).toEqual(21);
    expect(ride?.distance).toEqual(10);
  });

  test("Deve processar o pagamento", async function () {
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
    await fixture.startRide({
      rideId,
    });
    await fixture.updatePosition({
      lat: -27.584905257808835,
      long: -48.545022195325124,
      rideId,
    });
    await fixture.updatePosition({
      lat: -27.496887588317275,
      long: -48.522234807851476,
      rideId,
    });
    // act
    await fixture.finishRide({
      rideId,
    });
    // assert
    const ride = await fixture.getRide({ rideId });
    expect(fixture.processPaymentSpy).toBeCalledTimes(1);
    expect(fixture.processPaymentSpy).toHaveBeenCalledWith(rideId, ride.fare);
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
      fixture.finishRide({
        rideId,
      })
    ).rejects.toThrow("Ride not in progress");
  });
});
