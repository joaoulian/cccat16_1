import { Email } from "./email";
import { invalidEmails, validEmails } from "./mocks/email.mock";

test.each(validEmails)(
  "Deve testar um email válido: %s",
  function (value: string) {
    // act
    const email = new Email(value);
    // assert
    expect(email).toBeInstanceOf(Email);
    expect(email.getValue()).toEqual(value);
  }
);

test.each(invalidEmails)(
  "Deve testar um email inválido: %s",
  function (value: any) {
    // act and assert
    expect(() => new Email(value)).toThrow("Invalid email");
  }
);
