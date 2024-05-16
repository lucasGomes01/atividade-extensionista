import { VStack, Text, Divider, ScrollView } from "native-base";
import { CardConsulta } from "../components/CardConsulta";
import { Title } from "../components/Title";
import { Botao } from "../components/Botao";

export default function Principal() {
    return (
        <ScrollView p="5">
            <Title color='blue.500'>Minhas consultas</Title>
            <Botao mt="5" mb="5">Agendar nova consulta</Botao>

            <Title color="blue.500" fontSize="lg" alignSelf='flex-start' mb='2'>Próximas consultas</Title>
            <CardConsulta 
                nome='Dr. Lucas'
                especialidade='Cardiologista'
                foto='https://github.com/lucasGomes01.png'
                data='15/06/2024'
                foiAgendado
            />

            <Divider mt="5" />

            <Title color="blue.500" fontSize="lg" alignSelf='flex-start' mb='2'>Consultas passadas</Title>
            <CardConsulta 
                nome='Dr. Lucas'
                especialidade='Cardiologista'
                foto='https://github.com/lucasGomes01.png'
                data='15/06/2024'
                foiAtendido
            />
            <CardConsulta 
                nome='Dr. Lucas'
                especialidade='Cardiologista'
                foto='https://github.com/lucasGomes01.png'
                data='15/06/2024'
                foiAtendido
            />
            <CardConsulta 
                nome='Dr. Lucas'
                especialidade='Cardiologista'
                foto='https://github.com/lucasGomes01.png'
                data='15/06/2024'
                foiAtendido
            />
        </ScrollView>
    )
}