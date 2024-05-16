import { Box } from 'native-base'
import { Botao } from './Botao'
import { EntradaTexto } from './EntradaTexto'

export function Buscar(){
    return(
        <Box w="100%" borderRadius="lg" p={3} mt={5} shadow="1" borderRightRadius="md">
        <EntradaTexto
          placeholder="Digite a especialidade"
        />
        <EntradaTexto
          placeholder="Digite sua localização"
        />
        <Botao mt={4} mb={3}>
          Buscar
        </Botao>
      </Box>
    )
}