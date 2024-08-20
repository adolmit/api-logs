import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: cert("config-firebase.json"),
});

const db = getFirestore();
export default db;
