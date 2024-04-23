declare module "*.firebaseConfig" {
    import { FirebaseApp } from "firebase/app";
    import { Firestore } from "firebase/firestore";
  
    const app: FirebaseApp;
    const db: Firestore;
  
    export { app, db };
  }
  