// src/config/firebase.js
import admin from "firebase-admin";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Leer Service Account
const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, "utf8")
);

// Inicializar Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Exportar módulos
export const auth = admin.auth();
export const firestore = admin.firestore();
export const storage = admin.storage();
