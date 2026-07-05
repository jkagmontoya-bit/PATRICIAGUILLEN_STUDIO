import { BaseEntity, Result, Errors } from "@studio/shared";

export interface ClinicalHistoryProps {
  organizationId: string;
  customerId: string;
  recordNumber: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ClinicalHistory extends BaseEntity<string> {
  private _props: ClinicalHistoryProps;

  private constructor(id: string, props: ClinicalHistoryProps) {
    super(id);
    this._props = props;
  }

  public get organizationId(): string {
    return this._props.organizationId;
  }

  public get customerId(): string {
    return this._props.customerId;
  }

  public get recordNumber(): string {
    return this._props.recordNumber;
  }

  public get notes(): string {
    return this._props.notes;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get updatedAt(): Date {
    return this._props.updatedAt;
  }

  public updateNotes(notes: string): void {
    this._props.notes = notes;
    this._props.updatedAt = new Date();
  }

  public static create(id: string, props: ClinicalHistoryProps): Result<ClinicalHistory> {
    if (!id) {
      return Result.failure(Errors.validation("History ID is required."));
    }
    if (!props.organizationId) {
      return Result.failure(Errors.validation("Organization ID is required."));
    }
    if (!props.customerId) {
      return Result.failure(Errors.validation("Customer ID is required."));
    }
    if (!props.recordNumber || props.recordNumber.trim() === "") {
      return Result.failure(Errors.validation("Record number is required."));
    }

    return Result.success(new ClinicalHistory(id, props));
  }
}
