import { CPF } from "./cpf";
import { invalidCpfs, validCpfs } from "./mocks/cpf.mock";

test.each(validCpfs)("Deve testar um cpf válido: %s", function (value: any) {
  // act
  const cpf = new CPF(value);
  // assert
  expect(cpf).toBeInstanceOf(CPF);
  expect(cpf.getValue()).toEqual(value);
});

test.each(invalidCpfs)(
  "Deve testar um cpf inválido: %s",
  function (value: any) {
    // act and assert
    expect(() => new CPF(value)).toThrow("Invalid CPF");
  }
);
