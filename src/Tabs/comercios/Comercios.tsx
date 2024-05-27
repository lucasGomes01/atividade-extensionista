import { VStack, ScrollView, Button } from "native-base";
import { useEffect, useState } from "react";
import { listarComercios } from "../../services/firestore";
import { CardListagem } from "../../components/CardListagem";

export default function Comercios({ navigation }) {
    const [comercios, setComercios] = useState([]);

    useEffect(() => {
        async function listarDadosComericios() {
            const comercios = await listarComercios();
            setComercios(comercios);
        }

        listarDadosComericios();
    }, []);

    return (
        <ScrollView flex={1} bgColor="white">
            <VStack flex={1} alignItems="flex-end" p={5}>
                <Button onPress={() => navigation.navigate('CadastroComercio')}>Adicionar</Button>
                <ScrollView w="100%" >
                    {
                        comercios.map((comercio) => {
                            return <CardListagem
                                key={comercio.id}
                                nome={comercio.nome}
                                foto={comercio.foto}
                                data={comercio.data}
                            />
                        })
                    }
                </ScrollView>
            </VStack>
        </ScrollView>
    )
}