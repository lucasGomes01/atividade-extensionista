import { Text, Avatar, VStack, HStack, Button, Spacer } from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";

interface CardListagemProps {
    nome: string;
    foto: string;
    data?: string;
    nameNavegation: string;
    navigation: any;
    dados: any;
}

export function CardListagem({
    nome,
    foto,
    data,
    dados,
    navigation,
    nameNavegation
}: CardListagemProps) {
    return (
        <VStack w="100%" p="2" borderRadius="xs" shadow="1" mb="1">
            <HStack w="100%" alignItems="center">
                <Avatar size="md" source={{ uri: foto }} />
                <VStack pl="4" flex={1}>
                    <Text fontSize="md" bold>{nome}</Text>
                    <Text>{data}</Text>
                </VStack>
                <Ionicons name={"create-outline"} onPress={() => { navigation.navigate(nameNavegation, dados) }} size={23} color="blue" />
                <Ionicons name={"trash-outline"} size={23} color="blue" />
            </HStack>
        </VStack>
    );
}