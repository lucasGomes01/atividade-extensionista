import { VStack, ScrollView, Button } from "native-base";
import { useEffect, useState } from "react";
import { detectarAtualizacaoDocumento, retornarListaComercios, retornarListaUsuarios } from "./services/firestore";
import { CardListagem } from "./components/CardListagem";
import { RefreshControl } from "react-native";
import { BotaoCadastro } from "./components/BotaoCadastro";
import { CardListagemPost } from "./components/CardListagemPost";

export default function Listagem({ navigation }) {
    const [comercios, setComercios] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function listarDadosComercios() {
        setRefreshing(true);
        const comercios = await retornarListaComercios();
        setComercios(comercios);
        setRefreshing(false);
    }

    useEffect(() => {
        listarDadosComercios();
        detectarAtualizacaoDocumento('Comercios', setComercios);
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
                {
                    comercios?.map((comercio) => {
                        return <CardListagemPost
                            key={comercio.id}
                            nome={comercio.nome}
                            foto={comercio.urlImagem}
                            data={comercio?.timestamp?.toDate().toLocaleDateString()}
                            nameNavegation="CadastroComercio"
                            navigation={navigation}
                            dados={comercio}
                        />
                    })
                }
            </ScrollView>

            <BotaoCadastro onPress={() => { navigation.navigate('Login') }} />
        </VStack>
    )
}