import React, {createContext, useContext, useState, useEffect} from 'react'
import { auth, db } from "./firebase";
import { collection, doc, getDoc } from 'firebase/firestore'
const DataContext = createContext()

export function useData() {
    return useContext(DataContext)
}

export function DataProvider({children}) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const listen = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userId = user.uid
                const userDocRef = doc(db, "users", userId)

                try {
                    const userDocSnapshot = await getDoc(userDocRef)
                    if (userDocSnapshot.exists()) {
                        const data = userDocSnapshot.data()
                        setUserData(data)
                    } else {
                        setUserData(null)
                    }
                } catch (error) {
                    console.error("Error getting user data:", error)
                    setUserData(null)
                }
            } else {
                setUserData(null)
            }
        });
        return listen
    }, []);
    const data = {
        userData,
    }
    return (
        <DataContext.Provider value ={data}>
            {children}
        </DataContext.Provider>
    )
}