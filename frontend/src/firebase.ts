import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Thêm dòng này để lấy bộ công cụ xác thực
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbQCiPwQd0qGDucXxNVwXH_FfryMcnrvc",
  authDomain: "e-learning-46b1f.firebaseapp.com",
  projectId: "e-learning-46b1f",
  storageBucket: "e-learning-46b1f.firebasestorage.app",
  messagingSenderId: "373014788289",
  appId: "1:373014788289:web:9824f3fb2fcaab49727c40",
  measurementId: "G-6EY03FBTER"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// --- THÊM PHẦN NÀY ---
export const auth = getAuth(app);
export { RecaptchaVerifier, signInWithPhoneNumber };