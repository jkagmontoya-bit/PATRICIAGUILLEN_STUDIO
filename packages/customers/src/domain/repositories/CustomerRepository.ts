import { Result } from "@studio/shared";
import { Customer } from "../entities/Customer.js";

export interface CustomerRepository {
  save(customer: Customer): Promise<Result<void>>;
  findById(organizationId: string, id: string): Promise<Result<Customer | null>>;
  findByEmail(organizationId: string, email: string): Promise<Result<Customer | null>>;
}
