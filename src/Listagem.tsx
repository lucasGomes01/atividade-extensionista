import { VStack, ScrollView } from "native-base";
import { useEffect, useState } from "react";
import { retornarListaComercios } from "./services/firestore";
import { RefreshControl } from "react-native";
import { BotaoCadastro } from "./components/BotaoCadastro";
import { CardListagemPost } from "./components/CardListagemPost";
import { Text } from "react-native";
import { BarraPesquisa } from "./components/BarraPesquisa";
import { BarraCategorias } from "./components/BarraCategorias";

export default function Listagem({ navigation }) {
    const [categoriasSelecionadas, setcategoriasSelecionadas] = useState([]);
    const [blDadosNaoEcontrador, setDadosNaoEncontrados] = useState(false);
    const [filtro, setfiltro] = useState(null);
    const [comercios, setComercios] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function listarDadosComercios(filtro?: string, categoriaId?: string[]) {
        setRefreshing(true);
        const comercios = await retornarListaComercios(filtro, categoriaId);
        setComercios(comercios);
        setDadosNaoEncontrados(comercios.length === 0);
        setRefreshing(false);
    }

    async function pesquisar(filtroPesquisa: string) {
        setfiltro(filtroPesquisa);
        await listarDadosComercios(filtroPesquisa, categoriasSelecionadas);
    }

    async function filtrarBuscaCategoria(categoriaId: string) {
        let categorias = categoriasSelecionadas;

        if (categorias.filter(e => e === categoriaId).length === 1)
            categorias = categorias.filter(e => e !== categoriaId);
        else
            categorias.push(categoriaId);

        setcategoriasSelecionadas(categorias);
        await listarDadosComercios(filtro, categorias);
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
                    pesquisar={(filtro) => pesquisar(filtro)}
                ></BarraPesquisa>
                <BarraCategorias
                    pesquisar={(categoria) => filtrarBuscaCategoria(categoria)}
                    categoriasSelecionadas={categoriasSelecionadas}
                ></BarraCategorias>
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
                    blDadosNaoEcontrador ? <Text >Não foi possível encontrar resultados para a busca</Text> :  <Text>Carregando...</Text> 
                )}
            </ScrollView>

            <BotaoCadastro onPress={() => { navigation.navigate('Login') }} />
        </VStack>
    )
}