import { Result } from "@studio/shared";
import { Specialist } from "../entities/Specialist.js";

export interface SpecialistRepository {
  save(specialist: Specialist): Promise<Result<void>>;
  findById(organizationId: string, id: string): Promise<Result<Specialist | null>>;
  findAll(organizationId: string): Promise<Result<Specialist[]>>;
}
