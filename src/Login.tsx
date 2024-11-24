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
    <VStack flex={1} alignItems="center" p={2}>
      <Title>
        Área Restrita
      </Title>
      <Text mt={10} style={{ textAlign: 'justify' }}>
      Para realizar novos cadastros, é necessário ser um administrador. 
      Se deseja cadastrar sua loja ou tornar-se um administrador, entre em contato conosco! 
      Estamos à disposição para ajudar.
      </Text>

      <Box
        w={'100%'}
        mt={6}
        p={2}
      >
      <Text>Contato: suporte.login@gmail.com.br</Text>
      </Box>

      <Box mt={16}>
        <EntradaTexto
          label="Email"          
          placeholder="Insira seu endereço de e-mail"
          opcional={false}
          onChangeText={(texto) => setEmail(texto)}
        />
        <EntradaTexto
          label="Senha"
          placeholder="Insira sua senha"
          opcional={false}
          onChangeText={(texto) => setSenha(texto)}
        />
      </Box>

      <Botao onPress={() => signInWithEmailAndPassword() }>Entrar</Botao>
    </VStack>
  );
}