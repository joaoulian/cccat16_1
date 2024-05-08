import { Position } from "../entities/position";
import DistanceCalculator from "./distance-calculator";

test("Deve somar a distância entre todas as posições", () => {
  // arrange
  const positions = [
    Position.create({
      lat: -27.584905257808835,
      long: -48.545022195325124,
      rideId: "ride-id",
    }),
    Position.create({
      lat: -27.496887588317275,
      long: -48.522234807851476,
      rideId: "ride-id",
    }),
  ];
  // act
  const distance = DistanceCalculator.calculate(positions);
  // assert
  expect(distance).toEqual(10);
});
