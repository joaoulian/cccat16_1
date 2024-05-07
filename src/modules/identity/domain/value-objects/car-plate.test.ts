import { CarPlate } from "./car-plate";

test.each(["ABC1234", "AAA1111", "AAA0000"])(
  "Deve testar uma placa válida: %s",
  function (value: string) {
    // act
    const carPlate = new CarPlate(value);
    // assert
    expect(carPlate).toBeInstanceOf(CarPlate);
    expect(carPlate.getValue()).toEqual(value);
  }
);

test.each([undefined, null, "123123", "ABC12", "ABC", "ABCABC", "AAA-1-1-1-1"])(
  "Deve testar uma placa inválida: %s",
  function (value: any) {
    // act and assert
    expect(() => new CarPlate(value)).toThrow("Invalid car plate");
  }
);
