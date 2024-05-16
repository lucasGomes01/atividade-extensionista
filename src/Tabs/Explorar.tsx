import { VStack, Text, ScrollView } from "native-base";
import { Buscar } from "../components/Busca";
import { Title } from "../components/Title";
import { CardConsulta } from "../components/CardConsulta";

export default function Explorar() {
    return (
        <ScrollView flex={1} bgColor="white">
            <VStack flex={1} alignItems="flex-start" justifyContent="flex-start" p={5}>
                <Buscar></Buscar>

                <Title color='blue.500' alignSelf='center'>Resultados da busca</Title>

                {[1, 2, 3, 4].map((_, index) => (
                    <VStack key={index} w="100%">
                        <CardConsulta
                            nome='Dr. Lucas'
                            especialidade='Cardiologista'
                            foto='https://github.com/lucasGomes01.png'
                            vaiAgendar
                        />
                    </VStack>
                ))}
            </VStack>
        </ScrollView>
    )
}