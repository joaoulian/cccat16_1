import { CPF } from "./cpf";

test.each(["97456321558", "71428793860", "87748248800"])(
  "Deve testar um cpf válido: %s",
  function (value: any) {
    // act
    const cpf = new CPF(value);
    // assert
    expect(cpf).toBeInstanceOf(CPF);
    expect(cpf.getValue()).toEqual(value);
  }
);

test.each([undefined, null, "11111111111", "123", "1234566789123456789"])(
  "Deve testar um cpf inválido: %s",
  function (value: any) {
    // act and assert
    expect(() => new CPF(value)).toThrow("Invalid CPF");
  }
);
