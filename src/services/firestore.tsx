import { auth, db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc, serverTimestamp, deleteDoc, query, onSnapshot, orderBy } from "firebase/firestore";

// Cadastros
export async function salvarComercio(comercioId: string, data: any): Promise<string> {
    try {
        if (!!!comercioId) {
            await addDoc(collection(db, "comercios"), { ...data, user: auth.currentUser.uid, timestamp: serverTimestamp() });
        }
        else {
            const comercioRef = doc(db, "comercios", comercioId);
            await updateDoc(comercioRef, { ...data, user: auth.currentUser.uid, timestamp: serverTimestamp() });
        }

        return 'Comércio salvo com sucesso';
    } catch (error) {
        console.log('Erro ao salvar o comércio', error);
        return 'Erro ao salvar o comércio';
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
        const q = query(collection(db, "comercios"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

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
        const q = query(collection(db, "users"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

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

// Atualização em tempo real
export async function detectarAtualizacaoDocumento(collectionName: string, setCollection: (items: any[]) => void) {
    const q = query(collection(db, collectionName), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });

        setCollection(items);
    });
}