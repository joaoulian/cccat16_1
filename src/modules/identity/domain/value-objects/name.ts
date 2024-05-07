export class Name {
  private readonly value: string;

  constructor(value: string) {
    const isValid = this.isValidName(value);
    if (!isValid) throw new InvalidNameError(value);
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  private isValidName(name: string): boolean {
    if (!name) return false;
    return !!name.match(/[a-zA-Z] [a-zA-Z]+/);
  }
}

export class InvalidNameError extends Error {
  constructor(public readonly value: string) {
    super("Invalid name");
  }
}
