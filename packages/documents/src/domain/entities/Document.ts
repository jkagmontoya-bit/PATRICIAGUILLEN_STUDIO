import { BaseEntity, Result, Errors } from "@studio/shared";

export interface DocumentProps {
  organizationId: string;
  name: string;
  category: string;
  status: "DRAFT" | "SIGNED" | "ARCHIVED";
  storagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Document extends BaseEntity<string> {
  private _props: DocumentProps;

  private constructor(id: string, props: DocumentProps) {
    super(id);
    this._props = props;
  }

  public get organizationId(): string {
    return this._props.organizationId;
  }

  public get name(): string {
    return this._props.name;
  }

  public get category(): string {
    return this._props.category;
  }

  public get status(): "DRAFT" | "SIGNED" | "ARCHIVED" {
    return this._props.status;
  }

  public get storagePath(): string {
    return this._props.storagePath;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get updatedAt(): Date {
    return this._props.updatedAt;
  }

  public sign(): void {
    this._props.status = "SIGNED";
    this._props.updatedAt = new Date();
  }

  public archive(): void {
    this._props.status = "ARCHIVED";
    this._props.updatedAt = new Date();
  }

  public static create(id: string, props: DocumentProps): Result<Document> {
    if (!id) {
      return Result.failure(Errors.validation("Document ID is required."));
    }
    if (!props.organizationId) {
      return Result.failure(Errors.validation("Organization ID is required."));
    }
    if (!props.name || props.name.trim() === "") {
      return Result.failure(Errors.validation("Document name cannot be empty."));
    }
    if (!props.storagePath || props.storagePath.trim() === "") {
      return Result.failure(Errors.validation("Storage path is required."));
    }

    return Result.success(new Document(id, props));
  }
}
