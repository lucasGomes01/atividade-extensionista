import { db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs } from "firebase/firestore";

// Cadastros
export async function salvarComercio(data: any) {
    try {
        await addDoc(collection(db, "comercios"), data);
        return 'ok';
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function salvarUsuario(data: any) {
    try {
        await addDoc(collection(db, "users"), data);
        return 'ok';
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Listas
export async function retornarListaComercios() {
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

export async function retornarListaUsuarios() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));

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