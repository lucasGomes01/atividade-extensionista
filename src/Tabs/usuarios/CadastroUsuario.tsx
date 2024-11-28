import { Text, Box, ScrollView } from 'native-base';
import { useEffect, useState } from 'react';
import * as Clipboard from 'expo-clipboard';

import { Alerta } from '../../components/Alerta';
import { Botao } from '../../components/Botao';
import { EntradaTexto } from '../../components/EntradaTexto';
import { Title } from '../../components/Title';

import { formCadastro } from '../../utils/formCadastro';

import { createUser } from '../../services/auth';
import { salvarUsuario } from '../../services/firestore';

export default function Cadastro({ navigation, route }) {
  const [data, setData] = useState(route?.params || {});
  const [blExibirCadastro, setExibirCadastro] = useState(true);
  const [statusError, setStatusError] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const initialData = {};
    formCadastro[0].entradaTexto.forEach((entrada) => {
      initialData[entrada.value] = data[entrada.value] || '';
    });
    setData(initialData);
  }, []);

  function setValue(texto: string, campo: string) {
    setData(prevData => ({
      ...prevData,
      [campo]: texto
    }));
  }

  async function cadastrarUsuario() {
    const lstOpcionais = formCadastro[0].entradaTexto.filter(item => item.opcional == true && item.visible == false).map(item => item.value);
    console.log(lstOpcionais);
    const isEmpty = Object.entries(data).some(([key, value]) => value === '' && !lstOpcionais.includes(key));

    if (isEmpty) {
      setStatusError(true);
      setMensagem("Por favor, preencha todos os campos!");
      return;
    }

    let senha = '';
    while (senha.length < 6) {
      senha += Math.random().toString(36).substring(2);
    }

    data["senha"] = senha.substring(0, 6);

    const createUserResult = !!!route?.params?.id ? await createUser(data["email"], data["senha"]) : { success: true };

    if (createUserResult.success) {
      const result = await salvarUsuario(route?.params?.id, { email: data["email"], nome: data["nome"], uid: createUserResult.uid || data["uid"], mudarSenha: true });

      if (result === 'ok') {
        setExibirCadastro(false);
        console.log('Usuario cadastrado com sucesso');
        //navigation.goBack();
      }
    }
    else {
      setStatusError(true);
      setMensagem(createUserResult.error || 'Erro ao cadastrar usuario');
    }
  }

  const copiarParaClipboard = async () => {
    console.log("Copiando senha para o clipboard");
    await Clipboard.setStringAsync(data["senha"]);
  };

  return (
    <ScrollView flex={1} p={5}>
      <Title>Novo Administrador</Title>

      <Box mt={5}>
        {blExibirCadastro ? (
          <>
            <Text mt={5}>
              Por favor, informe o e-mail do usuário que deseja cadastrar. Uma
              senha temporária será gerada após a solicitação. Após isso, copie
              e envie a senha ao usuário.
            </Text>
            {formCadastro[0].entradaTexto.map((entrada) => (
              entrada.visible !== false && (
                <EntradaTexto
                  label={entrada.label}
                  placeholder={entrada.placeholder}
                  key={entrada.id}
                  value={data[entrada.value]}
                  onChangeText={texto => setValue(texto, entrada.value)}
                />
              )
            ))}

            <Botao
              children={'Salvar'}
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
              onPress={cadastrarUsuario}
            >
            </Botao>
          </>
        ) : (
          <>
            <Text>Por favor, copie e envie a senha para o usuário</Text>

            <EntradaTexto
              label="Senha Temporária"
              placeholder="Senha Temporária"
              value={data["senha"]}
            />

            <Botao
              children={'Copiar'}
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
              onPress={copiarParaClipboard}
            >
            </Botao>
          </>
        )}
      </Box>

      <Alerta
        mensagem={mensagem}
        error={statusError}
        setError={setStatusError}
      />
    </ScrollView>
  );
}