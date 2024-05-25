import { VStack } from "native-base";
import { Title } from "./components/Title";
import { Botao } from "./components/Botao";
import { BotaoCadastro } from "./components/BotaoCadastro";

export default function Home({ navigation }) {
    return (
        <VStack flex={1} alignItems="center" justifyContent={'center'} p={5}>
            <Title>
                Home
            </Title>
            <BotaoCadastro onPress={() => {navigation.navigate('Cadastros')}} />
        </VStack>
    )
}