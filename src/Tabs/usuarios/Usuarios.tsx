import { VStack, ScrollView, Button } from "native-base";
import { useEffect, useState } from "react";
import { retornarListaUsuarios } from "../../services/firestore";
import { CardListagem } from "../../components/CardListagem";

export default function Usuarios({ navigation }) {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function listarDadosComericios() {
            const usuarios = await retornarListaUsuarios();
            setUsuarios(usuarios);
        }

        listarDadosComericios();
    }, []);

    return (
        <ScrollView flex={1} bgColor="white">
            <VStack flex={1} alignItems="flex-end" p={5}>
                <Button onPress={() => navigation.navigate('CadastroUsuario')}>Adicionar</Button>
                <ScrollView w="100%" >
                    {
                        usuarios.map((usuario) => {
                            return <CardListagem
                                key={usuario.id}
                                nome={usuario.nome}
                                foto={usuario.foto}
                                data={usuario.data}
                            />
                        })
                    }
                </ScrollView>
            </VStack>
        </ScrollView>
    )
}