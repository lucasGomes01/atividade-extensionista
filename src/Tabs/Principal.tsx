import { VStack, Image, Box, ScrollView, Text, Divider } from "native-base";
import Logo from '../assets/Logo.png';

import { depoimentos } from "../utils/mock";
import { Title } from "../components/Title";
import { Buscar } from "../components/Busca";

export default function Principal(){
  return (
    <ScrollView flex={1} bgColor="white">
      <VStack flex={1} alignItems="flex-start" justifyContent="flex-start" p={5}>
        <Image source={Logo} alt="Logo" mt={3} />
        <Title color="blue.500">Boas-vindas!</Title>

        <Buscar></Buscar>

        <Title mt='3' color="blue.800" alignSelf="center">Depoimentos</Title>
        <VStack space={3} divider={<Divider />} w="100%">
          {
            depoimentos.map(depoimento => (
              <Box key={depoimento.id} w="100%" borderRadius="lg" p={3} pb={1}>
                <Text color="gray.300" fontSize="md" textAlign="justify">
                  {depoimento.text}
                </Text>
                <Text color="gray.500" fontSize="lg" fontWeight="bold" alignSelf="center">{depoimento.titulo}</Text>
              </Box>
            ))
          }
        </VStack>
      </VStack>
    </ScrollView>
  );
}