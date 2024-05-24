import { VStack } from "native-base";
import { Title } from "./components/Title";
import { Botao } from "./components/Botao";

export default function Cadastros({ navigation }) {
    return (
        <VStack flex={1} alignItems="center" justifyContent={'center'} p={5}>
            <Title>
                Cadastros
            </Title>
            <Botao onPress={() => navigation.navigate('CadastroUsuario')}>Cadastrar Usuario</Botao>
            <Botao onPress={() => navigation.navigate('CadastroComercio')}>Cadastrar Comercio</Botao>
        </VStack>
    )
}