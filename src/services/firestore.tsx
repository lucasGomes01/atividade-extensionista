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
    try {
        const querySnapshot = await getDocs(collection(db, "comercios"));

        let comercios = [];
        querySnapshot.docs.forEach((doc) => {doc.data()
            let comercio = {id: doc.id, ...doc.data()};
            comercios.push(comercio);
        });
        return comercios;    
    }
    catch (error) {
        console.log(error);
        return [];
    }
}