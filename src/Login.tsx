import { VStack, Text, Box, Link } from 'native-base';
import { recuperarDadosUsuario } from "./services/firestore";
import { Title } from './components/Title';
import { Botao } from './components/Botao';
import { EntradaTexto } from './components/EntradaTexto';
import { useEffect, useState } from 'react';
import { loginUser } from './services/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('teste.fffff@gmail.com');
  const [senha, setSenha] = useState('ne46ks');

  useEffect(() => {
    const fetchUserData = async () => {
      const dadosUsuario = await getCachedUser();

      if (dadosUsuario)
        navigation.navigate('Tabs');
    };
    fetchUserData();
  }, []);

  async function signInWithEmailAndPassword() {
    const uid = await loginUser(email, senha);

    if (uid) {
      const dadosUsuario = await recuperarDadosUsuario(uid);

      if (dadosUsuario["mudarSenha"])
        navigation.navigate('MudarSenha')
      else
        navigation.navigate('Tabs')
    }
  }

  async function getCachedUser() {
    //await AsyncStorage.clear();

    try {
      const userData = await AsyncStorage.getItem('@userData');
      if (userData !== null) {
        const user = JSON.parse(userData);
        console.log("Dados do usuário recuperados do cache:", user);
        return user;
      } else {
        console.log("Nenhum dado de usuário no cache.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao recuperar dados do usuário:", error.message);
    }
  }

  return (
    <VStack flex={1} alignItems="center" p={2}>
      <Title>
        Área Restrita
      </Title>
      <Text mt={5} style={{ textAlign: 'justify' }}>
        Para realizar novos cadastros, é necessário ser um administrador.
        Se deseja cadastrar sua loja ou tornar-se um administrador, entre em contato conosco!
        Estamos à disposição para ajudar.
      </Text>

      <Box
        w={'100%'}
        mt={6}
        pl={2}
        pr={2}
      >
        <Text>Contato: suporte.login@gmail.com.br</Text>
      </Box>

      <Box pl={2} pr={2}>
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

      <Botao
        children={'Entrar'}
        autoSize={true}
        bgColor={'#FFF'}
        ftColor={'#2D3DCE'}
        style={{
          borderColor: '#2D3DCE',
          borderWidth: 3,
          borderRadius: 50,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}
        w={'95%'}
        onPress={() => signInWithEmailAndPassword()}
      >
      </Botao>
    </VStack>
  );
}