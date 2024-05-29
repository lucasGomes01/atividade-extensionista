import { Text, Avatar, VStack, HStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

interface CardListagemProps {
    nome: string;
    foto: string;
    data?: string;
    nameNavegation: string;
    navigation: any;
    dados: any;
    excluirItem?: () => void;
}

export function CardListagem({
    nome,
    foto,
    data,
    dados,
    navigation,
    nameNavegation,
    excluirItem
}: CardListagemProps) {
    return (
        <VStack w="100%" p="2" borderRadius="xs" shadow="1" mb="1">
            <HStack w="100%" alignItems="center">
                <Avatar size="md" source={{ uri: foto }} />
                <VStack pl="4" flex={1}>
                    <Text fontSize="md" bold>{nome}</Text>
                    <Text>{data}</Text>
                </VStack>
                <TouchableOpacity
                    onPress={() => { navigation.navigate(nameNavegation, dados) }}
                >
                    <Ionicons name={"create-outline"} size={23} color="blue" />
                </TouchableOpacity>
                {excluirItem && (
                    <TouchableOpacity
                        onPress={() => { excluirItem() }}
                    >
                        <Ionicons name={"trash-outline"} size={23} color="blue" />
                    </TouchableOpacity>
                )}
            </HStack>
        </VStack>
    );
}