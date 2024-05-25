import { VStack, Text, Box, Link } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { Title } from './components/Title';
import { Botao } from './components/Botao';
import { EntradaTexto } from './components/EntradaTexto';

export default function Login({navigation}) {
  return (
    <VStack flex={1} alignItems="center" justifyContent={'center'} p={5}>
      <Title>
        Faça login em sua conta
      </Title>
      <Box>
        <EntradaTexto
          label="Email"
          placeholder="Insira seu endereço de e-mail"
        />
        <EntradaTexto
          label="Senha"
          placeholder="Insira sua senha"
        />
      </Box>

      <Botao onPress={() => navigation.navigate('Cadastros')}>Entrar</Botao>

      <Link href='' mt={2}>
        Esqueceu sua senha?
      </Link>

      <Box
        w={'100%'}
        mt={8}
        flexDirection={'row'}
        justifyContent={'center'}
      >
        <Text>Ainda não tem cadastro? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text
            color={'blue.500'}
          >
            Faça seu cadastro!
          </Text>
        </TouchableOpacity>
      </Box>

    </VStack>
  );
}