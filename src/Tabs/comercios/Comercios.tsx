import { Alert, RefreshControl } from "react-native";
import { VStack, ScrollView, Button } from "native-base";
import { useEffect, useState } from "react";

import { detectarAtualizacaoDocumento, excluirComercio, retornarListaComercios } from "../../services/firestore";

import { CardListagem } from "../../components/CardListagem";
import imgPadrao from '../../assets/upload.png';
export default function Comercios({ navigation }) {
    const [comercios, setComercios] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

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

    useEffect(() => {
        listarDadosComericios();
        detectarAtualizacaoDocumento('comercios', setComercios);
    }, []);

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
                                data={comercio?.timestamp?.toDate().toLocaleDateString()}
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