import { isValidEmail } from "./is-valid-email";

test.each(["joao@domain.com", "joao@domain.com.br", "joao@domain.gov.br"])(
  "Deve testar um email válido: %s",
  function (email: string) {
    expect(isValidEmail(email)).toBeTruthy();
  }
);

test.each([undefined, null, "11111111111", "J", " ", "joao@"])(
  "Deve testar um email inválido: %s",
  function (email: any) {
    expect(isValidEmail(email)).toBeFalsy();
  }
);
