import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

const firebaseConfig = {
  apiKey: "AIzaSyC-Qx8cyZtpIWKHwK_TDwY1chH14tzYPdQ",
  authDomain: "resource-sharing-app-b2860.firebaseapp.com",
  projectId: "resource-sharing-app-b2860",
  storageBucket: "resource-sharing-app-b2860.appspot.com",
  messagingSenderId: "641217505764",
  appId: "1:641217505764:web:b1ee6d993c9fcf0f86fff1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
