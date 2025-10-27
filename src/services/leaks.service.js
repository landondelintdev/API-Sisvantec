import { firestore } from "../config/firebase.js";

export const getAllReportsService = async () => {
  const snapshot = await firestore.collection("leaks").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
