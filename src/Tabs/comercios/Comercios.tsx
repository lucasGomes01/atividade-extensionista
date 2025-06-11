import { Alert, RefreshControl } from "react-native";
import { VStack, ScrollView, Button } from "native-base";
import { useCallback, useEffect, useState } from "react";

import { detectarAtualizacaoDocumento, excluirComercio, retornarListaComercios } from "../../services/firestore";

import { CardListagem } from "../../components/CardListagem";
import imgPadrao from '../../assets/upload.png';
import { auth } from "../../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Comercios({ navigation }) {
    const [comercios, setComercios] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (!auth.currentUser) {
                AsyncStorage.removeItem('@userData');
                navigation.navigate('Login');
                return;
            }

            listarDadosComericios();
            detectarAtualizacaoDocumento('comercios', setComercios);
        }, [])
    );

    async function listarDadosComericios() {
        setRefreshing(true);
        const comercios = await retornarListaComercios();
        setComercios(comercios);
        setRefreshing(false);
    }

    async function excluir(dados: any) {
        Alert.alert(
            "Excluir Comércio",
            `Deseja excluir o Comércio ${dados.nome}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: async () => {
                        await excluirComercio(dados.id);
                    },
                    style: "default"
                }
            ]
        );
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

    return (
        <ScrollView
            flex={1}
            bgColor="white"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={listarDadosComericios}
                />
            }
        >
            <VStack flex={1} alignItems="flex-end" p={5}>
                <Button
                    backgroundColor={"#2D3DCE"}
                    onPress={() => navigation.navigate('CadastroComercio')}>Adicionar
                </Button>
                <VStack w="100%" >
                    {
                        comercios?.map((comercio) => {
                            return <CardListagem
                                key={comercio.id}
                                nome={comercio.nome}
                                foto={comercio.urlImagem || imgPadrao.uri}
                                data={timestampToDate(comercio?.timestamp)}
                                nameNavegation="CadastroComercio"
                                navigation={navigation}
                                dados={comercio}
                                mostrarFoto={true}
                                excluirItem={() => excluir(comercio)}
                            />
                        })
                    }
                </VStack>
            </VStack>
        </ScrollView>
    )
}