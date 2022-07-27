import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCXOCQun2h01FP_k_9dq3EsrcSJiEviRFE",
  authDomain: "priority-todo-def4f.firebaseapp.com",
  projectId: "priority-todo-def4f",
  storageBucket: "priority-todo-def4f.appspot.com",
  messagingSenderId: "195986426623",
  appId: "1:195986426623:web:d33c4c253c0103a5635aca"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);