import React, { useEffect, useState } from 'react';
import './RightSideBar.css';
import { doc, updateDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { auth, db } from "../api/Firebase"; 
import { onAuthStateChanged } from "firebase/auth"; 

// Felhasználói adatok figyelése valós időben
const listenToUserData = (uid: string, setUserData: (data: any) => void, setError: (error: string | null) => void) => {
  const userDocRef = doc(db, "users", uid); // Reference to the user's document

  const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      setUserData(docSnapshot.data()); // Állapot frissítése új adatokkal
    } else {
      setError("User document does not exist");
    }
  }, (error) => {
    console.error("Error fetching real-time user data:", error);
    setError("Failed to fetch real-time user data");
  });

  return unsubscribe; // Visszatérési érték a figyelő leállításához
};

interface RightSideBarProps {
  isRightHidden: boolean;
  setRightIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightSideBar: React.FC<RightSideBarProps> = ({
  isRightHidden,
  setRightIsHidden,
}) => {
  const [userData, setUserData] = useState<any>(null); // Felhasználói adatok tárolása
  const [loading, setLoading] = useState<boolean>(true); // Betöltési állapot kezelése
  const [error, setError] = useState<string | null>(null); // Hibakezelés

  // Oldalsáv láthatóságának váltása
  const handleToggle = () => {
    setRightIsHidden(prev => !prev); // Láthatóság váltása
  };

  // Felhasználói adatok lekérése hitelesítéskor
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(true);
        setError(null); // Hibakezelés alaphelyzetbe
  
         // Valós idejű figyelés beállítása
        const unsubscribeFromSnapshot = listenToUserData(
          user.uid,
          setUserData,
          setError
        );
  
        setLoading(false); // Betöltés kikapcsolása, ha figyelő beállítva
  
        return () => {
          unsubscribeFromSnapshot(); // Firestore figyelő leállítása
        };
      } else {
        setUserData(null); // Alaphelyzetbe, ha nincs hitelesített felhasználó
      }
    });
  
    return () => unsubscribe(); // Auth listener leállítása komponens eltávolításakor
  }, []);

// Film eltávolítása a felhasználó listájából Firebase-ben
const removeMovieFromList = async (uid: string, listType: 'like' | 'dislike' | 'mark', movie: { title: string; image: string }) => {
  const userDocRef = doc(db, "users", uid);

  try {
    await updateDoc(userDocRef, {
      [listType]: arrayRemove(movie), // Film eltávolítása a listából
    });
    console.log(`Movie "${movie.title}" removed from ${listType}`);
  } catch (error) {
    console.error("Error removing movie:", error);
  }
};

// Film törlése kezelése a megfelelő listáról és UI frissítése
const handleDelete = async (listType: 'like' | 'dislike' | 'mark', movie: { title: string; image: string }) => {
  const user = auth.currentUser;
  if (user) {
    await removeMovieFromList(user.uid, listType, movie); // Film eltávolítása Firebase-ből
    setUserData((prevData: any) => ({
      ...prevData,
      [listType]: prevData[listType].filter((m: { title: string; image: string }) => m.title !== movie.title), // Remove from UI state based on title
    }));
  }
};

  return (
    <div className={`right-container ${isRightHidden ? 'hidden' : ''}`}>
      <span className={`header-text ${isRightHidden ? 'hidden' : ''}`}>My List</span>
      <img
        src={`eye${isRightHidden ? '-hidden' : ''}.png`}
        alt="hide-button-right"
        onClick={handleToggle}
        className={`${isRightHidden ? 'hidden' : ''}`}
      />
      {!isRightHidden && (
        <div className='list-container'>
          {loading && <p>Loading user data...</p>}
          {error && <p>{error}</p>}
          {userData ? (
            <div>
              <h3>Marked Movies</h3>
              {userData.mark && userData.mark.length > 0 ? (
                <ul className='marked-movie'>
                  {userData.mark.map((movie: any, index: number) => (
                    
                    <li key={index} style={{ backgroundImage: `url(${movie.image})`}}>
                      <span className='card-shadow'>
                      {movie.title} 
                      <button onClick={() => handleDelete('mark', movie)}><span className='line'/></button>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No marked movies found.</p>
              )}

              <h3>Liked Movies</h3>
              {userData.like && userData.like.length > 0 ? (
                <ul className='liked-movie'>
                  {userData.like.map((movie: any, index: number) => (
                    <li key={index} style={{ backgroundImage: `url(${movie.image})`}}>
                                            <span className='card-shadow'>
                      {movie.title} 
                      <button onClick={() => handleDelete('like', movie)}><span className='line'/></button>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No liked movies found.</p>
              )}
            </div>
          ) : (
            <p>No user data found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
