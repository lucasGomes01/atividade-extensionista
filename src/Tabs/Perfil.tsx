import { VStack, Text, ScrollView, Avatar, Divider } from "native-base";

import { Title } from "../components/Title";

export default function Perfil() {
    return (
        <ScrollView flex={1}>
            <VStack flex={1} alignItems={"center"} p={5}>
                <Title color={"blue.500"}>Meu perfil</Title>
                <Avatar mt={5} size={"xl"} source={{ uri: "https://github.com/lucasGomes01.png" }} />
                
                <Title color={"blue.500"}>Informações pessoais</Title>
                <Title fontSize={"lg"} mb={1}>Nome Usuário</Title>
                <Text>12/12/2012</Text>
                <Text>São Paulo</Text>

                <Divider mt={5} />

                <Title color={"blue.500"} mb={1}>Histórico médico</Title>
                <Text>Bronquite</Text>
                <Text>Sinusite</Text>
            </VStack>
        </ScrollView>
    )
}