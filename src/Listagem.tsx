import { VStack, ScrollView } from "native-base";
import { useEffect, useState } from "react";
import { retornarListaComercios } from "./services/firestore";
import { RefreshControl } from "react-native";
import { BotaoCadastro } from "./components/BotaoCadastro";
import { CardListagemPost } from "./components/CardListagemPost";
import { Text } from "react-native";
import { BarraPesquisa } from "./components/BarraPesquisa";

export default function Listagem({ navigation }) {
    const [comercios, setComercios] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function listarDadosComercios(filtro?: string) {
        setRefreshing(true);
        const comercios = await retornarListaComercios(filtro);
        setComercios(comercios);
        setRefreshing(false);
    }

    async function pesquisar(teste: string) {
        await listarDadosComercios(teste);
    }

    useEffect(() => {
        listarDadosComercios();
        //detectarAtualizacaoDocumento('Comercios', setComercios);
    }, []);

    return (
        <VStack height={'100%'} >
            <ScrollView
                flex={1}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={listarDadosComercios}
                    />
                }
            >
                <BarraPesquisa
                    pesquisar={(teste) => pesquisar(teste)}
                ></BarraPesquisa>
                {comercios?.length > 0 ? (
                    comercios?.map((comercio) => {
                        return (
                            <CardListagemPost
                                key={comercio.id}
                                nome={comercio.nome}
                                foto={comercio.urlImagem}
                                data={comercio?.timestamp?.toDate().toLocaleDateString()}
                                nameNavegation="CadastroComercio"
                                navigation={navigation}
                                dados={comercio}
                            />
                        );
                    })
                ) : (
                    <Text>Carregando...</Text>
                )}
            </ScrollView>

            <BotaoCadastro onPress={() => { navigation.navigate('Login') }} />
        </VStack>
    )
}