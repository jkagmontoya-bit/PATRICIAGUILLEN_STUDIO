import { Result, Errors } from "@studio/shared";
import { FirebaseConnection } from "@studio/firebase";
import { Customer } from "../../domain/entities/Customer.js";
import { CustomerRepository } from "../../domain/repositories/CustomerRepository.js";
import { Email } from "../../domain/value-objects/Email.js";
import { PhoneNumber } from "../../domain/value-objects/PhoneNumber.js";

export class FirestoreCustomerRepository implements CustomerRepository {
  private get collection() {
    return FirebaseConnection.db.collection("customers");
  }

  public async save(customer: Customer): Promise<Result<void>> {
    try {
      await this.collection.doc(customer.id).set({
        organizationId: customer.organizationId,
        name: customer.name,
        email: customer.email.value,
        phoneNumber: customer.phoneNumber.value,
        status: customer.status,
        createdAt: customer.createdAt.toISOString(),
        updatedAt: customer.updatedAt.toISOString(),
      });
      return Result.success();
    } catch (error: any) {
      return Result.failure(Errors.infrastructure("Failed to save customer to Firestore.", error));
    }
  }

  public async findById(organizationId: string, id: string): Promise<Result<Customer | null>> {
    try {
      const doc = await this.collection.doc(id).get();
      if (!doc.exists) {
        return Result.success(null);
      }
      
      const data = doc.data()!;
      if (data.organizationId !== organizationId) {
        return Result.success(null); // Tenant isolation check
      }

      const emailResult = Email.create(data.email);
      const phoneResult = PhoneNumber.create(data.phoneNumber);
      if (emailResult.isFailure) return Result.failure(emailResult.error);
      if (phoneResult.isFailure) return Result.failure(phoneResult.error);

      const customerResult = Customer.create(doc.id, {
        organizationId: data.organizationId,
        name: data.name,
        email: emailResult.value,
        phoneNumber: phoneResult.value,
        status: data.status,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      });

      return customerResult;
    } catch (error: any) {
      return Result.failure(Errors.infrastructure("Failed to find customer by ID in Firestore.", error));
    }
  }

  public async findByEmail(organizationId: string, email: string): Promise<Result<Customer | null>> {
    try {
      const query = await this.collection
        .where("organizationId", "==", organizationId)
        .where("email", "==", email.toLowerCase().trim())
        .limit(1)
        .get();

      if (query.empty) {
        return Result.success(null);
      }

      const doc = query.docs[0];
      const data = doc.data()!;

      const emailResult = Email.create(data.email);
      const phoneResult = PhoneNumber.create(data.phoneNumber);
      if (emailResult.isFailure) return Result.failure(emailResult.error);
      if (phoneResult.isFailure) return Result.failure(phoneResult.error);

      const customerResult = Customer.create(doc.id, {
        organizationId: data.organizationId,
        name: data.name,
        email: emailResult.value,
        phoneNumber: phoneResult.value,
        status: data.status,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      });

      return customerResult;
    } catch (error: any) {
      return Result.failure(Errors.infrastructure("Failed to find customer by email in Firestore.", error));
    }
  }
}
