import { ValueObject, Result, Errors } from "@studio/shared";

interface SpecialistStatusProps {
  value: "ACTIVE" | "SUSPENDED" | "ARCHIVED";
}

export class SpecialistStatus extends ValueObject<SpecialistStatusProps> {
  private constructor(props: SpecialistStatusProps) {
    super(props);
  }

  public get value(): "ACTIVE" | "SUSPENDED" | "ARCHIVED" {
    return this.props.value;
  }

  public static create(status: string): Result<SpecialistStatus> {
    const uppercaseStatus = status?.toUpperCase();
    if (uppercaseStatus === "ACTIVE" || uppercaseStatus === "SUSPENDED" || uppercaseStatus === "ARCHIVED") {
      return Result.success(new SpecialistStatus({ value: uppercaseStatus }));
    }
    return Result.failure(Errors.validation(`Invalid SpecialistStatus: ${status}`));
  }
}
