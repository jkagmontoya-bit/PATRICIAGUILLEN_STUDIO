import { onRequest } from "firebase-functions/v2/https";
import { FirebaseConnection } from "@studio/firebase";
import { Result } from "@studio/shared";

// Initialize Firebase
FirebaseConnection.initialize();

export const healthCheck = onRequest((request, response) => {
  const check = Result.success({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "patriciaguillenvaler-studio-platform"
  });
  
  response.status(200).json(check.value);
});
