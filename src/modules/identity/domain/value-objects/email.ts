export class Email {
  private readonly value: string;

  constructor(value: string) {
    const isValid = this.isValidEmail(value);
    if (!isValid) throw new InvalidEmailError(value);
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  private isValidEmail(email: string): boolean {
    if (!email) return false;
    return !!email.match(/^(.+)@(.+)$/);
  }
}

export class InvalidEmailError extends Error {
  constructor(readonly value: string) {
    super("Invalid email");
  }
}
