import { VStack, ScrollView, Button } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { detectarAtualizacaoDocumento, excluirUsuario, retornarListaUsuarios } from "../../services/firestore";
import { CardListagem } from "../../components/CardListagem";
import { Alert, RefreshControl } from "react-native";
import { auth } from "../../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Usuarios({ navigation }) {
    const [usuarios, setUsuarios] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function listarDadosUsuarios() {
        const usuarios = await retornarListaUsuarios();
        setUsuarios(usuarios);
    }

    function timestampToDate(timestamp: { seconds: number, nanoseconds: number }): string {
        if(!timestamp)
            return;

        try {
            const data = new Date(timestamp.seconds * 1000);

            return data.toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }).replace(',', ' -');
        }
        catch (error) {
            console.error("Erro ao converter timestamp para data:", error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            if (!auth.currentUser) {
                AsyncStorage.removeItem('@userData');
                navigation.navigate('Login');
                return;
            }

            detectarAtualizacaoDocumento('users', setUsuarios);
        }, [])
    );

    async function excluir(dados: any) {
        if (dados.id === 'ogvttAHBcl75lgYrIGUq') {
            Alert.alert(
                "Usuário Restrito",
                "Não é possível excluir o usuário 'lucas'!",
                [{
                    text: "OK",
                    style: "default"
                }]
            );

            return;
        }

        Alert.alert(
            "Excluir Usuário",
            `Deseja excluir o usuário "${dados.nome}"?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: async () => {
                        await excluirUsuario(dados.id);
                    },
                    style: "default"
                }
            ]
        );
    }

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
                <Button
                    backgroundColor={"#2D3DCE"}
                    onPress={() => navigation.navigate('CadastroUsuario')}>Adicionar
                </Button>

                <VStack w="100%" >
                    {
                        usuarios.map((usuario) => {
                            return (
                                <CardListagem
                                    key={usuario.id}
                                    nome={usuario.nome}
                                    foto={usuario.foto}
                                    data={timestampToDate(usuario?.timestamp)}
                                    nameNavegation="CadastroUsuario"
                                    navigation={navigation}
                                    dados={usuario}
                                    excluirItem={() => excluir(usuario)}
                                />
                            );
                        })
                    }
                </VStack>
            </VStack>
        </ScrollView>
    )
}