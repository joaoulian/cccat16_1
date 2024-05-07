export const validEmails = [
  "joao@domain.com",
  "joao@domain.com.br",
  "joao@domain.gov.br",
];

export const invalidEmails = [
  undefined,
  null,
  "11111111111",
  "J",
  " ",
  "joao@",
];

export function validEmail(): string {
  return validEmails[Math.floor(Math.random() * validEmails.length)];
}
