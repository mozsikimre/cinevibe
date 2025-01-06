// src/components/authHelpers.ts

import { auth, firebaseService } from '../api/Firebase'; // Firebase beállítások importálása
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Jelenlegi felhasználó adatainak lekérése
export const getUserData = (setUserState: (username: string) => void) => {
  const db = getFirestore();

  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDoc = doc(db, 'users', user.uid); // Hivatkozás a felhasználó dokumentumra
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUserState(userSnapshot.data()?.username || ''); // Felhasználónév frissítése
        } else {
          console.error("The user's document does not exist!");
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    } else {
      setUserState(''); // Nincs bejelentkezett felhasználó
    }
  });
};

// Kijelentkezés kezelése
export const handleLogout = async (setUserState: (username: string) => void) => {
  try {
    await firebaseService.logoutUser();
    setUserState(''); // Felhasználónév törlése kijelentkezés után
  } catch (error) {
    console.error('Error during logout: ', error);
  }
};
