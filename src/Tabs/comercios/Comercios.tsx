import { VStack, ScrollView, Button } from "native-base";
import { useEffect, useState } from "react";
import { retornarListaComercios } from "../../services/firestore";
import { CardListagem } from "../../components/CardListagem";
import { RefreshControl } from "react-native";

export default function Comercios({ navigation }) {
    const [comercios, setComercios] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function listarDadosComericios() {
        setRefreshing(true);
        const comercios = await retornarListaComercios();
        setComercios(comercios);
        setRefreshing(false);
    }

    useEffect(() => { listarDadosComericios() }, []);

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
                <Button onPress={() => navigation.navigate('CadastroComercio')}>Adicionar</Button>
                <VStack w="100%" >
                    {
                        comercios?.map((comercio) => {
                            return <CardListagem
                                key={comercio.id}
                                nome={comercio.nome}
                                foto={comercio.foto}
                                data={comercio?.timestamp?.toDate().toLocaleDateString()}
                                nameNavegation="CadastroComercio"
                                navigation={navigation}
                                dados={comercio}
                            />
                        })
                    }
                </VStack>
            </VStack>
        </ScrollView>
    )
}