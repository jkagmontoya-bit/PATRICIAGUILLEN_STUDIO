import { Result } from "@studio/shared";
import { ClinicalHistory } from "../entities/ClinicalHistory.js";

export interface ClinicalHistoryRepository {
  save(history: ClinicalHistory): Promise<Result<void>>;
  findById(organizationId: string, id: string): Promise<Result<ClinicalHistory | null>>;
  findByCustomerId(organizationId: string, customerId: string): Promise<Result<ClinicalHistory | null>>;
}
