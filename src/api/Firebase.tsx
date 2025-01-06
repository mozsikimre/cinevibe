const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
const FIREBASE_MESUREMENT_ID = import.meta.env.VITE_FIREBASE_MESUREMENT_ID;

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Firebase konfigurációs objektum
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MESUREMENT_ID,
};

// Firebase alkalmazás és szolgáltatások inicializálása
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Firebase szolgáltatások objektum
const firebaseService = {
  saveMovieToFirebase: async (uid: string, movieTitle: string, imageUrl: string, action: "like" | "dislike" | "mark") => {
    const userDocRef = doc(db, "users", uid);
    try {
      await updateDoc(userDocRef, {
        [action]: arrayUnion({ title: movieTitle, image: imageUrl }), 
      });
    } catch (error) {
      console.error("Error saving the movie to Firebase:", error);
    }
  },

  registerUser: async (email: string, password: string, username: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username,
        mark: [], 
        like: [], 
        dislike: [], 
      });
    } catch (error: any) {
      let errorMessage = "Registration failed";
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "This email address is already in use.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email format.";
            break;
          case "auth/operation-not-allowed":
            errorMessage = "This registration method is currently not allowed.";
            break;
          case "auth/weak-password":
            errorMessage = "The password must be at least 6 characters long.";
            break;
          case "auth/network-request-failed":
            errorMessage = "A network error occurred. Please check your internet connection.";
            break;
          case "auth/internal-error":
            errorMessage = "An internal error occurred. Please try again.";
            break;
          default:
            errorMessage = "An unknown error occurred. Please try again.";
        }
      }
      console.error("Error during registration: ", error);
      throw new Error(errorMessage);
    }
  },

  loginUser: async (email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let errorMessage = "Login failed";
      if (error.code) {
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email format.";
            break;
          case "auth/user-disabled":
            errorMessage = "The user account is disabled.";
            break;
          case "auth/user-not-found":
            errorMessage = "No user found with the provided email address.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password.";
            break;
          case "auth/invalid-credential":
            errorMessage = "Invalid credentials. Please try again.";
            break;
          case "auth/operation-not-allowed":
            errorMessage = "This authentication method is currently not allowed.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many attempts. Please try again later.";
            break;
          case "auth/email-already-in-use":
            errorMessage = "This email address is already in use.";
            break;
          case "auth/weak-password":
            errorMessage = "The password must be at least 6 characters long.";
            break;
          case "auth/network-request-failed":
            errorMessage = "A network error occurred. Please check your internet connection.";
            break;
          case "auth/internal-error":
            errorMessage = "An internal error occurred. Please try again.";
            break;
          case "auth/requires-recent-login":
            errorMessage = "Please log in again for security reasons.";
            break;
          default:
            errorMessage = "An unknown error occurred. Please try again.";
        }
      }
      console.error("Error during login: ", error);
      throw new Error(errorMessage);
    }
  },

  googleLogin: async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          username: user.displayName || "Username", 
          mark: [], 
          like: [], 
          dislike: [], 
        });
      }
    } catch (error) {
      console.error("Error during Google login: ", error);
      throw new Error("Google login failed");
    }
  },

  logoutUser: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout: ", error);
      throw new Error("Logout failed");
    }
  },

  resetPassword: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error sending password reset email: ", error);
      throw new Error("Password reset failed");
    }
  },
};

// Exportáljuk a Firebase szolgáltatásokat
export {
  auth,
  db,
  firebaseService,
};
