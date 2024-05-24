import { auth } from '../config/firebaseConfig';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    AuthErrorCodes, 
    UserCredential
} from "firebase/auth";

interface CreateUserResult {
    success: boolean;
    error?: string;
    email?: string;
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
            break;
    }

    return message
}

export async function createUser(email: string, senha: string): Promise<CreateUserResult> {
    try {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const userEmail = userCredential.user.email;
        return userEmail ? { success: true, email: userEmail } : { success: false, error: 'Erro ao gerar token' };
    } catch (error) {
        console.log(handleAuthError(error));
        return { success: false, error: error.message };
    }
}

export async function loginUser(email, senha): Promise<boolean> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        console.log("login");
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
