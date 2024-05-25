import { db } from '../config/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

export async function salvarComercio(data: any) {
    try {
        await addDoc(collection(db, "comercios"), data);
        return 'ok';
    } catch (error) {
        console.log(error);
        return false;
    }
}
