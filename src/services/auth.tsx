import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    AuthErrorCodes,
    UserCredential,
    sendPasswordResetEmail,
    updatePassword
} from "firebase/auth";

import { recuperarDadosUsuario, salvarUsuario } from './firestore';

interface CreateUserResult {
    success: boolean;
    error?: string;
    email?: string;
    uid?: string;
}


function handleAuthError(error: any) {
    let message = '';

    switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
            message = 'Email já cadastrado';
            break;
        case AuthErrorCodes.INVALID_EMAIL:
            message = 'Email inválido';
            break;
        case AuthErrorCodes.WEAK_PASSWORD:
            message = 'Senha fraca';
            break;
        default:
            message = 'Erro desconhecido';
            console.log(error);
            break;
    }

    return message
}

export async function createUser(email: string, senha: string): Promise<CreateUserResult> {
    if (!email || !senha) return { success: false, error: 'Email e senha são obrigatórios' };

    try {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const userEmail = userCredential.user.email;
        return userEmail ? { success: true, email: userEmail, uid: userCredential.user.uid } : { success: false, error: 'Erro ao gerar token' };
    } catch (error) {
        const errorMessage = handleAuthError(error);
        console.log(error);
        return { success: false, error: errorMessage };
    }
}

export async function loginUser(email: string, senha: string): Promise<string> {
    try {
        const dadosUsuario = await signInWithEmailAndPassword(auth, email, senha);
        const user = dadosUsuario.user;

        // Salva os dados do usuário no AsyncStorage
        await AsyncStorage.setItem('@userData', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        }));

        console.log("login", email, senha);
        //changePasswordByEmail(email);
        return user.uid;
    } catch (error) {
        console.log("Erro em LoginUser Email:", email, "Senha:", senha, "Erro:", error);
        return "";
    }
}

export async function logoutUser(navigation) {
    signOut(auth)
        .then(() => {
            console.log('Deslogado com sucesso!');

            AsyncStorage.removeItem('@userData');

            navigation.navigate('Listagem');
        })
        .catch((error) => {
            console.error('Erro ao deslogar:', error);
        });
}

export async function changePasswordByEmail(email: string) {
    sendPasswordResetEmail(auth, email).then(function () {
        console.log("E-mail de redefinição de senha enviado.");
    }).catch(function (error) {
        console.error("Erro ao enviar o e-mail de redefinição de senha: ", error);
    });
}

export async function updatePasswordInApp(newPassword: string): Promise<string> {
    const user = auth.currentUser;

    if (user) {
        try {
            await updatePassword(user, newPassword);

            const dadosUsuario = await recuperarDadosUsuario(user.uid);
            await salvarUsuario(dadosUsuario.id, { ...dadosUsuario, mudarSenha: false });

            return "Senha atualizada com sucesso."
        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);
            return "Ocorreu um erro ao alterar a senha"
        }
    } else {
        console.error("Usuário não autenticado.");
    }
}