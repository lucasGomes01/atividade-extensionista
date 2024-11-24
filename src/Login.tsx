import { VStack, Text, Box, Link } from 'native-base';
import { recuperarDadosUsuario } from "./services/firestore";
import { Title } from './components/Title';
import { Botao } from './components/Botao';
import { EntradaTexto } from './components/EntradaTexto';
import { useEffect, useState } from 'react';
import { loginUser } from './services/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const dadosUsuario = await getCachedUser();
      console.log("Dados do usuário recuperados do cache:", dadosUsuario);
      if (dadosUsuario)
        navigation.navigate('Tabs')
    };
    fetchUserData();
  }, []);

  async function signInWithEmailAndPassword() {
    const uid = await loginUser(email, senha);

    if (uid) {
      const dadosUsuario = await recuperarDadosUsuario(uid);

      if(dadosUsuario["mudarSenha"])
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

      <Botao onPress={() => signInWithEmailAndPassword()}>Entrar</Botao>
    </VStack>
  );
}