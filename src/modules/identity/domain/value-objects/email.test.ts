import { Email } from "./email";

test.each(["joao@domain.com", "joao@domain.com.br", "joao@domain.gov.br"])(
  "Deve testar um email válido: %s",
  function (value: string) {
    // act
    const email = new Email(value);
    // assert
    expect(email).toBeInstanceOf(Email);
    expect(email.getValue()).toEqual(value);
  }
);

test.each([undefined, null, "11111111111", "J", " ", "joao@"])(
  "Deve testar um email inválido: %s",
  function (value: any) {
    // act and assert
    expect(() => new Email(value)).toThrow("Invalid email");
  }
);
