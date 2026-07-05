import { Result, Errors } from "@studio/shared";
import { FirebaseConnection } from "@studio/firebase";
import { Specialist } from "../../domain/entities/Specialist.js";
import { SpecialistRepository } from "../../domain/repositories/SpecialistRepository.js";
import { SpecialistStatus } from "../../domain/value-objects/SpecialistStatus.js";

export class FirestoreSpecialistRepository implements SpecialistRepository {
  private get collection() {
    return FirebaseConnection.db.collection("specialists");
  }

  public async save(specialist: Specialist): Promise<Result<void>> {
    try {
      await this.collection.doc(specialist.id).set({
        organizationId: specialist.organizationId,
        name: specialist.name,
        specialty: specialist.specialty,
        status: specialist.status.value,
        createdAt: specialist.createdAt.toISOString(),
        updatedAt: specialist.updatedAt.toISOString(),
      });
      return Result.success();
    } catch (error: any) {
      return Result.failure(Errors.infrastructure("Failed to save specialist to Firestore.", error));
    }
  }

  public async findById(organizationId: string, id: string): Promise<Result<Specialist | null>> {
    try {
      const doc = await this.collection.doc(id).get();
      if (!doc.exists) {
        return Result.success(null);
      }

      const data = doc.data()!;
      if (data.organizationId !== organizationId) {
        return Result.success(null); // Tenant isolation check
      }

      const statusResult = SpecialistStatus.create(data.status);
      if (statusResult.isFailure) return Result.failure(statusResult.error);

      const specialistResult = Specialist.create(doc.id, {
        organizationId: data.organizationId,
        name: data.name,
        specialty: data.specialty,
        status: statusResult.value,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      });

      return specialistResult;
    } catch (error: any) {
      return Result.failure(Errors.infrastructure("Failed to find specialist by ID in Firestore.", error));
    }
  }

  public async findAll(organizationId: string): Promise<Result<Specialist[]>> {
    try {
      const query = await this.collection
        .where("organizationId", "==", organizationId)
        .get();

      const specialists: Specialist[] = [];
      for (const doc of query.docs) {
        const data = doc.data();
        const statusResult = SpecialistStatus.create(data.status);
        if (statusResult.isFailure) return Result.failure(statusResult.error);

        const specResult = Specialist.create(doc.id, {
          organizationId: data.organizationId,
          name: data.name,
          specialty: data.specialty,
          status: statusResult.value,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        });

        if (specResult.isFailure) return Result.failure(specResult.error);
        specialists.push(specResult.value);
      }

      return Result.success(specialists);
    } catch (error: any) {
      return Result.failure(Errors.infrastructure("Failed to retrieve specialists from Firestore.", error));
    }
  }
}
