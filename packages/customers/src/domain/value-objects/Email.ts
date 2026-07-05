import { ValueObject, Result, Errors } from "@studio/shared";

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(email: string): Result<Email> {
    if (!email || email.trim() === "") {
      return Result.failure(Errors.validation("Email cannot be empty."));
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Result.failure(Errors.validation("Invalid email format."));
    }

    return Result.success(new Email({ value: email.toLowerCase().trim() }));
  }
}
