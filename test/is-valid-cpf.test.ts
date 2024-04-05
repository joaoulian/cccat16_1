import { isValidCPF } from "../src/is-valid-cpf";

test.each(["97456321558", "71428793860", "87748248800"])(
  "Deve testar um cpf válido: %s",
  function (cpf: any) {
    expect(isValidCPF(cpf)).toBe(true);
  }
);

test.each([undefined, null, "11111111111", "123", "1234566789123456789"])(
  "Deve testar um cpf inválido: %s",
  function (cpf: any) {
    expect(isValidCPF(cpf)).toBe(false);
  }
);
