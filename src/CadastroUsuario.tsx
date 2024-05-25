import { Box, ScrollView } from 'native-base';
import { Title } from './components/Title';
import { Botao } from './components/Botao';
import { EntradaTexto } from './components/EntradaTexto';
import { formCadastro } from './utils/formCadastro';
import { createUser } from './services/auth';

export default function Cadastro() {
  async function cadastrarUsuario() {
    const result = await createUser("teste152tr33i1dt358r@gmail.com", "teste1");
    console.log(result);
  }

  return (
    <ScrollView flex={1} p={5}>
      <Title>
        Cadastrar Novo Usuário
      </Title>
      <Box>
        {
          formCadastro[0].entradaTexto.map((entrada) => {
            return <EntradaTexto label={entrada.label} placeholder={entrada.placeholder} key={entrada.id} />
          })
        }
      </Box>

      <Botao onPress={() => cadastrarUsuario()} bgColor={"blue.800"} mt={4}>Cadastrar</Botao>
    </ScrollView>
  );
}