import { Coord } from "./coord";
import { Segment } from "./segment";

test("Deve calcular a distância entre duas coordenadas", () => {
  const from = new Coord(-27.584905257808835, -48.545022195325124);
  const to = new Coord(-27.496887588317275, -48.522234807851476);
  const segment = new Segment(from, to);
  expect(segment.getDistance()).toBe(13);
});
