import React, {createContext, useContext, useState, useEffect, useLayoutEffect} from 'react'
import { auth, db } from "./firebase";
import { collection, doc, getDoc } from 'firebase/firestore'
import { useAuth } from './AuthContext';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const listen = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, 'users', userId);
        try {
          const userDocSnapshot = await getDoc(userDocRef);
          console.log('Snapshot exists:', userDocSnapshot.exists());
          console.log('User data:', userDocSnapshot.data());

          if (userDocSnapshot.exists()) {
            const data = userDocSnapshot.data();
            setUserData(data);
            console.log('User data set:', data);
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.log('Error getting user data:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    });
    return listen;
  }, []);

  return (
    <DataContext.Provider value={{userData}}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext)
}

// export const useData = () => {
//   return useContext(DataContext);
// };

// export default DataContext;