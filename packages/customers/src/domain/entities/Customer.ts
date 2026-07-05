import { BaseEntity, Result, Errors } from "@studio/shared";
import { Email } from "../value-objects/Email.js";
import { PhoneNumber } from "../value-objects/PhoneNumber.js";

export interface CustomerProps {
  organizationId: string;
  name: string;
  email: Email;
  phoneNumber: PhoneNumber;
  status: "ACTIVE" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}

export class Customer extends BaseEntity<string> {
  private _props: CustomerProps;

  private constructor(id: string, props: CustomerProps) {
    super(id);
    this._props = props;
  }

  public get organizationId(): string {
    return this._props.organizationId;
  }

  public get name(): string {
    return this._props.name;
  }

  public get email(): Email {
    return this._props.email;
  }

  public get phoneNumber(): PhoneNumber {
    return this._props.phoneNumber;
  }

  public get status(): "ACTIVE" | "ARCHIVED" {
    return this._props.status;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get updatedAt(): Date {
    return this._props.updatedAt;
  }

  public updateDetails(name: string, email: Email, phoneNumber: PhoneNumber): void {
    this._props.name = name;
    this._props.email = email;
    this._props.phoneNumber = phoneNumber;
    this._props.updatedAt = new Date();
  }

  public archive(): void {
    this._props.status = "ARCHIVED";
    this._props.updatedAt = new Date();
  }

  public restore(): void {
    this._props.status = "ACTIVE";
    this._props.updatedAt = new Date();
  }

  public static create(id: string, props: CustomerProps): Result<Customer> {
    if (!id) {
      return Result.failure(Errors.validation("Customer ID is required."));
    }
    if (!props.organizationId) {
      return Result.failure(Errors.validation("Organization ID is required."));
    }
    if (!props.name || props.name.trim() === "") {
      return Result.failure(Errors.validation("Customer name cannot be empty."));
    }

    return Result.success(new Customer(id, props));
  }
}
