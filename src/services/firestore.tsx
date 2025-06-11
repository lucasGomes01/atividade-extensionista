import { auth, db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc, serverTimestamp, deleteDoc, query, onSnapshot, orderBy, where } from "firebase/firestore";

// Cadastros
export async function salvarComercio(comercioId: string, data: any): Promise<string> {
    console.log(data);
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

export async function salvarCategoriaComercio(categoriaComercioId: string, data: any) {
    try {
        if (!!!categoriaComercioId) {
            await addDoc(collection(db, "categoriaComercio"), { ...data, timestamp: serverTimestamp() });
        }
        else {
            const usuarioRef = doc(db, "categoriaComercio", categoriaComercioId);
            await updateDoc(usuarioRef, { ...data, user: auth.currentUser.uid, timestamp: serverTimestamp() });
        }

        return 'ok';
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function salvarUsuario(usuarioId: string, data: any) {
    console.log("dados recebidos:", usuarioId, data)
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

export async function excluirUsuario(usuarioId: string) {
    try {
        await deleteDoc(doc(db, "users", usuarioId));

        return 'ok';
    } catch (error) {
        console.log("Erro ao deletar o usuario:", error);
        return false;
    }
}

// Consultas
export async function recuperarDadosUsuario(uid: string) {
    try {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
        } else {
            console.log("Nenhum usuário encontrado com esse UID");
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return null;
    }
}


// Listas
export async function retornarListaSimplesColecao(colecao: string) {
    try {
        const q = query(collection(db, colecao), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        let dados = [];
        querySnapshot.docs.forEach((doc) => {
            doc.data()
            let dado = { id: doc.id, ...doc.data() };
            dados.push(dado);
        });
        return dados;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

export async function retornarListaComercios(filtro?: string, categoriasId?: string[]) {
    if (filtro || categoriasId?.length > 0)
        console.log("Filtros ativos:", filtro, categoriasId)

    try {
        const queryConstraints = [];

        if (filtro) {
            queryConstraints.push(where("nome", ">=", filtro));
            queryConstraints.push(where("nome", "<=", filtro + "\uf8ff"));
        }

        if (categoriasId?.length > 0)
            queryConstraints.push(where("categoria", "in", categoriasId));

        queryConstraints.push(orderBy("timestamp", "desc"));

        const q = query(collection(db, "comercios"), ...queryConstraints);
        const querySnapshot = await getDocs(q);

        let comercios = [];
        querySnapshot.docs.forEach((doc) => {
            doc.data()
            let comercio = { id: doc.id, ...(doc.data() as object) };
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
    if (auth.currentUser.uid == "") {
        console.log("Usuário não autenticado");
        return [];
    }

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
    try {
        const q = query(collection(db, collectionName), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });

            setCollection(items);
        });
    } catch (error) {
        console.error("Erro ao detectar atualizações:", error);
    }
}

// Cargas iniciais
function cadastroComercios() {
    let dados = [
      
    ]

    dados.forEach(async (item) => {
        await salvarComercio('', item);
    });
}

function cadastrarCategorias() {
    let dados = [
        {
            nome: "Artesanatos",
            icone: "<FontAwesome6 name=\"shirt\" size={24} color=\"black\" />",
            usuarioAtualizacao: "lucas.gomes"
        },
        {
            nome: "Lanches",
            icone: "<MaterialIcons name=\"lunch-dining\" size={24} color=\"black\" />",
            usuarioAtualizacao: "lucas.gomes"
        },
        {
            nome: "Sorvetes",
            icone: "<MaterialIcons name=\"icecream\" size={24} color=\"black\" />",
            usuarioAtualizacao: "lucas.gomes"
        },
        {
            nome: "Bebidas",
            icone: "<Entypo name=\"drink\" size={24} color=\"black\" />",
            usuarioAtualizacao: "lucas.gomes"
        },
    ];

    dados.forEach(async (item) => {
        await salvarCategoriaComercio('', item);
    });
}

//cadastrarCategorias();
//cadastroComercios()