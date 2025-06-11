import { VStack, Text, Box } from 'native-base';
import { recuperarDadosUsuario } from "./services/firestore";
import { Title } from './components/Title';
import { Botao } from './components/Botao';
import { EntradaTexto } from './components/EntradaTexto';
import { useState } from 'react';
import { loginUser } from './services/auth';
import { Alerta } from './components/Alerta';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [statusError, setStatusError] = useState(false);
  const [mensagem, setMensagem] = useState('');

  async function signInWithEmailAndPassword() {
    if (email === '' || senha === '') {
      setStatusError(true);
      setMensagem("Por favor, Informe seu email e senha");
      return;
    }

    const uid = await loginUser(email, senha);

    if (uid) {
      const dadosUsuario = await recuperarDadosUsuario(uid);

      if (dadosUsuario["mudarSenha"])
        navigation.navigate('MudarSenha')
      else
        navigation.navigate('Tabs')
    }
    else {
      setStatusError(true);
      setMensagem("Email ou senha inválidos. Por favor, tente novamente.");
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

      <Alerta
        mensagem={mensagem}
        error={statusError}
        setError={setStatusError}
      />
    </VStack>
  );
}