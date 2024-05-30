import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

export async function uploadArquivoPorUlr(url: string, urlDestino: string) {
    const downloadArquivo = await fetch(url);
    const blobArquivo = await downloadArquivo.blob();
    const nomeArquivo = '/' + Math.random().toString(36).substring(7) + '.jpg';
    const caminhoArquivo = urlDestino + nomeArquivo;
    const refArquivo = ref(storage, caminhoArquivo);

    await uploadBytes(refArquivo, blobArquivo).then((arquivo) => {
        console.log('Upload por url', arquivo);
    }).catch((error) => {
        console.log("Erro ao fazer o upload da imagem:", error);
    });
}

export async function downloadImagem() {
    const imagemRef = ref(storage, 'images/stars.jpg');

    getDownloadURL(imagemRef).then((url) => {
        return url;
    }).catch((error) => {
        console.log("Erro ao retornar a imagem:", error);
        return '';
    });
}