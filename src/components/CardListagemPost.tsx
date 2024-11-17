import { Text, VStack, HStack, Box, Image } from 'native-base';
import { Rating } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";

import imagemPadrao from '../assets/upload.jpeg';

//import { Image, TouchableOpacity, View } from 'react-native';
import { BotaoCadastro } from './BotaoCadastro';

interface CardListagemPostProps {
    nome: string;
    foto: string;
    data?: string;
    nameNavegation: string;
    navigation: any;
    dados: any;
    excluirItem?: () => void;
}

const StarRating = ({ rating }) => {
    const fullStars = '★'.repeat(Math.floor(rating));
    const emptyStars = '☆'.repeat(5 - Math.floor(rating));
    return <Text style={{ fontSize: 12, backgroundColor: '#FFD700' }}>{fullStars + emptyStars}</Text>;
};

export function CardListagemPost({
    nome,
    foto,
    data,
    dados,
    navigation,
    nameNavegation
}: CardListagemPostProps) {
    return (
        <Box
            bg="gray.100"
            shadow={2}
            rounded="lg"
            p={3}
            my={2}
            mx={4}
            flexDirection="row"
            alignItems="center"
        >
            <Image
                source={foto ? { uri: foto } : imagemPadrao}
                alt={nome}
                width={170}
                height={170}
                borderRadius={10}
            />
            <VStack flex={1} ml={3} height={"100%"} backgroundColor={'amber.100'}>
                <Text bold fontSize="lg">{nome}</Text>
                <HStack space={5}>
                    <StarRating rating={dados.rating || 0} />
                    <Text color="gray.500" fontSize={9.4}>Hoje: {dados.horario || "18:00 - 22:30"}</Text>
                </HStack>
                <Text color="gray.700" fontSize={8}>Telefone: {dados.telefone1 + (dados.telefone2 && " / " + dados.telefone2)}</Text>
                <Text color="gray.700" paddingTop={1} fontSize={8}>{dados.envio || "Delivery"}</Text>
                <Text color="gray.700" paddingTop={1} fontSize={8} height={65}>{dados.descricao}</Text>
                <Text color="gray.700" paddingTop={2} fontSize={8}>{dados.endereco || "Barra Bonita sp, Avenida Pedro Ometto, N° 021 - Centro"}</Text>
            </VStack>
        </Box>
    );
};