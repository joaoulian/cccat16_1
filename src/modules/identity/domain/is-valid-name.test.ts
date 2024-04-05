import { isValidName } from "./is-valid-name";

test.each(["Joao Bacana", "J B"])(
  "Deve testar um nome válido: %s",
  function (name: string) {
    expect(isValidName(name)).toBeTruthy();
  }
);

test.each([undefined, null, "11111111111", "J", " G"])(
  "Deve testar um nome inválido: %s",
  function (name: any) {
    expect(isValidName(name)).toBeFalsy();
  }
);
