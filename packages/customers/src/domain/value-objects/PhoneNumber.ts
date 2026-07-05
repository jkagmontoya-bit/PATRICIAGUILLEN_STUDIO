import { ValueObject, Result, Errors } from "@studio/shared";

interface PhoneNumberProps {
  value: string;
}

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
  private constructor(props: PhoneNumberProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(phoneNumber: string): Result<PhoneNumber> {
    if (!phoneNumber || phoneNumber.trim() === "") {
      return Result.failure(Errors.validation("Phone number cannot be empty."));
    }

    // A simple validation for phone numbers
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      return Result.failure(Errors.validation("Phone number must be between 7 and 15 digits."));
    }

    return Result.success(new PhoneNumber({ value: phoneNumber.trim() }));
  }
}
