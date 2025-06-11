import { Text, VStack, HStack, Box, Image } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import imagemPadrao from '../assets/upload.png';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

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
    return <Text style={{ fontSize: 12, color: '#FFD700', top: -4 }}>{fullStars + emptyStars}</Text>;
};

export function CardListagemPost({
    nome,
    foto,
    data,
    dados,
    navigation,
    nameNavegation
}: CardListagemPostProps) {
    const [expand, setExpand] = useState(false);

    const handleExpand = () => {
        setExpand(!expand);
    };

    function timestampToHour(timestamp: { seconds: number, nanoseconds: number }): string {
        const data = new Date(timestamp.seconds * 1000); // Converte segundos para milissegundos
        return data.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }

    return (
        <TouchableOpacity onPress={handleExpand}>
            <Box
                bg="gray.100"
                shadow={2}
                rounded="lg"
                height={expand ? 250 : undefined}
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
                    height={expand ? 230 : 170}
                    borderRadius={10}
                />
                <VStack flex={1} ml={3} height={"100%"}>
                    <Text bold fontSize="lg">{nome}</Text>
                    <HStack space={5}>
                        <StarRating rating={dados.PontuacaoGoogle || 1} />
                        <Text color="gray.500" fontSize={9.4}>Hoje: {(dados.HorarioAbertura && timestampToHour(dados.HorarioAbertura)) + " - " + (dados.HorarioFechamento && timestampToHour(dados.HorarioFechamento))}</Text>
                    </HStack>
                    <Text fontSize={8}>Telefone: {dados.telefone1 + (dados.telefone2 ? " / " + dados.telefone2 : "")}</Text>
                    <Text paddingTop={1} fontSize={8}>{[dados.Balcao && 'Balcão', dados.Delivery && 'Delivery'].filter(Boolean).join(' / ')}</Text>
                    <Text paddingTop={1} fontSize={8} height={65}>{dados.descricao}</Text>
                    {
                        expand && (
                            <Text paddingTop={1} fontSize={10} ><Icon name="facebook" size={10} color="#000" /> {dados.facebook}</Text>
                        )
                    }
                    {
                        expand && (
                            <Text fontSize={10} ><Icon name="instagram" size={10} color="#000" /> {dados.instagram}</Text>
                        )
                    }
                    <Text paddingTop={1} fontSize={8}>{dados.endereco || "Barra Bonita sp, Avenida Pedro Ometto, N° 021 - Centro"}</Text>
                </VStack>
            </Box>
        </TouchableOpacity>
    );
};