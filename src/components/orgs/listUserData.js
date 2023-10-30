import { db } from "../../firebase"
import { where, collection, get, query, getDocs } from 'firebase/firestore'
export const listOrgUsers = async (orgName) => {
    const usersCollection =  collection(db, "users")
    const usersQuery = query(usersCollection, where('orgs', 'array-contains', orgName));
    try {
        const querySnapshot = await getDocs(usersQuery);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        //console.log(users);
        return users;
      } catch (error) {
        console.error('Error getting users:', error);
        return [];
      }
}