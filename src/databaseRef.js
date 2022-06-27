import { collection } from "firebase/firestore";
import { db } from "./firebase-config";

export const DatabaseRef = collection(db, "restaurant-menu");
