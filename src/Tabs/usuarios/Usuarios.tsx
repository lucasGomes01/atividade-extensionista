import { VStack, ScrollView, Button } from "native-base";
import { useEffect, useState } from "react";
import { retornarListaUsuarios } from "../../services/firestore";
import { CardListagem } from "../../components/CardListagem";
import { RefreshControl } from "react-native";

export default function Usuarios({ navigation }) {
    const [usuarios, setUsuarios] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function listarDadosUsuarios() {
        setRefreshing(true);
        const usuarios = await retornarListaUsuarios();
        setUsuarios(usuarios);
        setRefreshing(false);
    }

    useEffect(() => { listarDadosUsuarios(); }, []);

    return (
        <ScrollView
            flex={1}
            bgColor="white"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={listarDadosUsuarios}
                />
            }>
            <VStack flex={1} alignItems="flex-end" p={5}>
                <Button onPress={() => navigation.navigate('CadastroUsuario')}>Adicionar</Button>
                <VStack w="100%" >
                    {
                        usuarios.map((usuario) => {
                            return (
                                <CardListagem
                                    key={usuario.id}
                                    nome={usuario.nome}
                                    foto={usuario.foto}
                                    data={usuario?.timestamp?.toDate().toLocaleDateString()}
                                    nameNavegation="CadastroUsuario"
                                    navigation={navigation}
                                    dados={usuario}
                                />
                            );
                        })
                    }
                </VStack>
            </VStack>
        </ScrollView>
    )
}