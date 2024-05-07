import { Name } from "./name";

test.each(["Joao Bacana", "J B"])(
  "Deve testar um nome válido: %s",
  function (value: string) {
    // act
    const name = new Name(value);
    // assert
    expect(name).toBeInstanceOf(Name);
    expect(name.getValue()).toEqual(value);
  }
);

test.each([undefined, null, "11111111111", "J", " G"])(
  "Deve testar um nome inválido: %s",
  function (value: any) {
    // act and assert
    expect(() => new Name(value)).toThrow("Invalid name");
  }
);
