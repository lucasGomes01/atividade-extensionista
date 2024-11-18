import { VStack, ScrollView } from "native-base";
import { useEffect, useState } from "react";
import { detectarAtualizacaoDocumento, retornarListaComercios } from "./services/firestore";
import { RefreshControl } from "react-native";
import { BotaoCadastro } from "./components/BotaoCadastro";
import { CardListagemPost } from "./components/CardListagemPost";
import { Text } from "react-native"; 

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
        const fetchData = async () => {
            await listarDadosComercios();
            //detectarAtualizacaoDocumento('Comercios', setComercios);
        };

        fetchData();
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