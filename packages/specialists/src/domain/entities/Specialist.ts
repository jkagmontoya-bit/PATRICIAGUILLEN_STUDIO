import { BaseEntity, Result, Errors } from "@studio/shared";
import { SpecialistStatus } from "../value-objects/SpecialistStatus.js";

export interface SpecialistProps {
  organizationId: string;
  name: string;
  specialty: string;
  status: SpecialistStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Specialist extends BaseEntity<string> {
  private _props: SpecialistProps;

  private constructor(id: string, props: SpecialistProps) {
    super(id);
    this._props = props;
  }

  public get organizationId(): string {
    return this._props.organizationId;
  }

  public get name(): string {
    return this._props.name;
  }

  public get specialty(): string {
    return this._props.specialty;
  }

  public get status(): SpecialistStatus {
    return this._props.status;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get updatedAt(): Date {
    return this._props.updatedAt;
  }

  public updateDetails(name: string, specialty: string): void {
    this._props.name = name;
    this._props.specialty = specialty;
    this._props.updatedAt = new Date();
  }

  public activate(): void {
    const activeStatus = SpecialistStatus.create("ACTIVE");
    if (activeStatus.isSuccess) {
      this._props.status = activeStatus.value;
      this._props.updatedAt = new Date();
    }
  }

  public suspend(): void {
    const suspendedStatus = SpecialistStatus.create("SUSPENDED");
    if (suspendedStatus.isSuccess) {
      this._props.status = suspendedStatus.value;
      this._props.updatedAt = new Date();
    }
  }

  public archive(): void {
    const archivedStatus = SpecialistStatus.create("ARCHIVED");
    if (archivedStatus.isSuccess) {
      this._props.status = archivedStatus.value;
      this._props.updatedAt = new Date();
    }
  }

  public static create(id: string, props: SpecialistProps): Result<Specialist> {
    if (!id) {
      return Result.failure(Errors.validation("Specialist ID is required."));
    }
    if (!props.organizationId) {
      return Result.failure(Errors.validation("Organization ID is required."));
    }
    if (!props.name || props.name.trim() === "") {
      return Result.failure(Errors.validation("Specialist name cannot be empty."));
    }

    return Result.success(new Specialist(id, props));
  }
}
