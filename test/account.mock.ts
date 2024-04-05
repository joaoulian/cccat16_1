export function mockValidPassenger() {
  return {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    isPassenger: true,
  };
}

export function mockValidDriver() {
  return {
    ...mockValidPassenger(),
    isDriver: true,
    isPassenger: false,
    carPlate: "ABC1234",
  };
}

export function mockInvalidName(): string {
  return "123";
}

export function mockInvalidEmail(): string {
  return "x";
}

export function mockInvalidCPF(): string {
  return "1234566789123456789";
}

export function mockInvalidCarPlate(): string {
  return "123";
}
