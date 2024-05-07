export const validCpfs = ["97456321558", "71428793860", "87748248800"];
export const invalidCpfs = [
  undefined,
  null,
  "11111111111",
  "123",
  "1234566789123456789",
];

export function validCPF(): string {
  return validCpfs[Math.floor(Math.random() * validCpfs.length)];
}
