import { initializeApp, getApps, getApp, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

export class FirebaseConnection {
  private static appInstance: App;
  private static firestoreInstance: Firestore;
  private static authInstance: Auth;

  public static initialize(): void {
    if (getApps().length === 0) {
      this.appInstance = initializeApp();
    } else {
      this.appInstance = getApp();
    }
    this.firestoreInstance = getFirestore(this.appInstance);
    this.authInstance = getAuth(this.appInstance);
  }

  public static get db(): Firestore {
    if (!this.firestoreInstance) {
      this.initialize();
    }
    return this.firestoreInstance;
  }

  public static get auth(): Auth {
    if (!this.authInstance) {
      this.initialize();
    }
    return this.authInstance;
  }
}
