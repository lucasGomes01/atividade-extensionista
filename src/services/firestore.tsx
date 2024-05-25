import { db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function salvarComercio(data: any) {
    try {
        await addDoc(collection(db, "comercios"), data);
        return 'ok';
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function listarComercios() {
    const querySnapshot = await getDocs(collection(db, "comercios"));
    const comercios = querySnapshot.docs.map((doc) => doc.data());
    return comercios;
}