import { auth } from '../config/firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    AuthErrorCodes,
    UserCredential,
    sendPasswordResetEmail
} from "firebase/auth";

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

export async function loginUser(email: string, senha: string): Promise<boolean> {
    try {
        await signInWithEmailAndPassword(auth, email, senha);
        
        console.log("login", email, senha);
        //changePasswordByEmail(email);
        return true;
    } catch (error) {
        console.log("LoginUser", error, email, senha);
        return false;
    }
}

export async function changePasswordByEmail(email: string) {
    sendPasswordResetEmail(auth, email).then(function () {
        console.log("E-mail de redefinição de senha enviado.");
    }).catch(function (error) {
        console.error("Erro ao enviar o e-mail de redefinição de senha: ", error);
    });
}