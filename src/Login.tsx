import { VStack, Text, Box, Link } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { Title } from './components/Title';
import { Botao } from './components/Botao';
import { EntradaTexto } from './components/EntradaTexto';
import { useState } from 'react';
import { loginUser } from './services/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('teste2123@gmail.com');
  const [senha, setSenha] = useState('1234123');

  async function signInWithEmailAndPassword() {
    const result = await loginUser(email, senha);

    if(result)
      navigation.navigate('Tabs')
  }

  return (
    <VStack flex={1} alignItems="center" justifyContent={'center'} p={5}>
      <Title>
        Faça login em sua conta
      </Title>
      <Box>
        <EntradaTexto
          label="Email"
          placeholder="Insira seu endereço de e-mail"
          onChangeText={(texto) => setEmail(texto)}
        />
        <EntradaTexto
          label="Senha"
          placeholder="Insira sua senha"
          onChangeText={(texto) => setSenha(texto)}
        />
      </Box>

      <Botao onPress={() => signInWithEmailAndPassword() }>Entrar</Botao>

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