export class CarPlate {
  private readonly value: string;

  constructor(value: string) {
    const isValid = this.isValidCarPlate(value);
    if (!isValid) throw new InvalidCarPlateError(value);
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  private isValidCarPlate(carPlate?: string): boolean {
    if (!carPlate) return false;
    return !!carPlate.match(/[A-Z]{3}[0-9]{4}/);
  }
}

export class InvalidCarPlateError extends Error {
  constructor(public readonly value: string) {
    super("Invalid car plate");
  }
}
