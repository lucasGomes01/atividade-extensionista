import { auth, db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";

// Cadastros
export async function salvarComercio(comercioId: string, data: any) {
    try {
        if (!!!comercioId) {
            await addDoc(collection(db, "comercios"), { ...data, user: auth.currentUser.uid, timestamp: serverTimestamp() });
        }
        else {
            const comercioRef = doc(db, "comercios", comercioId);
            await updateDoc(comercioRef, { ...data, user: auth.currentUser.uid, timestamp: serverTimestamp() });
        }

        return 'ok';
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function salvarUsuario(usuarioId: string, data: any) {
    try {
        if (!!!usuarioId) {
            await addDoc(collection(db, "users"), { ...data, timestamp: serverTimestamp() });
        }
        else {
            const usuarioRef = doc(db, "users", usuarioId);
            await updateDoc(usuarioRef, { ...data, user: auth.currentUser.uid, timestamp: serverTimestamp() });
        }

        return 'ok';
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Excluir 
export async function excluirComercio(comercioId: string) {
    try {
        await deleteDoc(doc(db, "comercios", comercioId));

        return 'ok';
    } catch (error) {
        console.log("Erro ao deletar o documento:", error);
        return false;
    }
}

// Listas
export async function retornarListaComercios() {
    try {
        const querySnapshot = await getDocs(collection(db, "comercios"));

        let comercios = [];
        querySnapshot.docs.forEach((doc) => {
            doc.data()
            let comercio = { id: doc.id, ...doc.data() };
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
        querySnapshot.docs.forEach((doc) => {
            doc.data()
            let comercio = { id: doc.id, ...doc.data() };
            comercios.push(comercio);
        });
        return comercios;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}