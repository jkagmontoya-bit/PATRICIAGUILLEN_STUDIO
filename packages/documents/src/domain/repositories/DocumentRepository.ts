import { Result } from "@studio/shared";
import { Document } from "../entities/Document.js";

export interface DocumentRepository {
  save(document: Document): Promise<Result<void>>;
  findById(organizationId: string, id: string): Promise<Result<Document | null>>;
  findAll(organizationId: string): Promise<Result<Document[]>>;
}
