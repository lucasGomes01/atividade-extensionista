import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

export async function uploadArquivoPorUlr(url: string, urlDestino: string): Promise<string> {
    const downloadArquivo = await fetch(url);
    const blobArquivo = await downloadArquivo.blob();
    const nomeArquivo = '/' + Math.random().toString(36).substring(7) + '.jpg';
    const caminhoArquivo = urlDestino + nomeArquivo;
    const refArquivo = ref(storage, caminhoArquivo);

    try {
        await uploadBytes(refArquivo, blobArquivo);
        const url = await getDownloadURL(refArquivo);
        console.log("Imagem enviada com sucesso:", url);
        return url;
    }
    catch (error) {
        console.log("Erro ao realizar o upload da imagem:", error);
    };
}

// export async function downloadImagem(url: string) {
//     const imagemRef = ref(storage, 'images/stars.jpg');

//     getDownloadURL(imagemRef).then((url) => {
//         return url;
//     }).catch((error) => {
//         console.log("Erro ao retornar a imagem:", error);
//         return '';
//     });
// }