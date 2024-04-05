import { isValidCarPlate } from "./is-valid-car-plate";

test.each(["ABC1234", "AAA1111", "AAA0000"])(
  "Deve testar uma placa válida: %s",
  function (carPlate: string) {
    expect(isValidCarPlate(carPlate)).toBeTruthy();
  }
);

test.each([undefined, null, "123123", "ABC12", "ABC", "ABCABC", "AAA-1-1-1-1"])(
  "Deve testar uma placa inválida: %s",
  function (carPlate: any) {
    expect(isValidCarPlate(carPlate)).toBeFalsy();
  }
);
