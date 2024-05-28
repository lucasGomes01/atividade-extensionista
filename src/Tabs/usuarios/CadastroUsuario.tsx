import { Box, ScrollView } from 'native-base';
import { Title } from '../../components/Title';
import { Botao } from '../../components/Botao';
import { EntradaTexto } from '../../components/EntradaTexto';
import { formCadastro } from '../../utils/formCadastro';
import { createUser } from '../../services/auth';
import { useEffect, useState } from 'react';
import { salvarUsuario } from '../../services/firestore';
import { Alerta } from '../../components/Alerta';

export default function Cadastro({ navigation, route }) {
  const [statusError, setStatusError] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [data, setData] = useState(route?.params || {});

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
    const isEmpty = Object.values(data).some(value => value === '');

    if (isEmpty) {
      setStatusError(true);
      setMensagem("Por favor preencha todos os campos");
      return;
    }
    else if (data["senha"] !== data["senhaConfirmacao"]) {
      setStatusError(true);
      setMensagem("As senhas não coincidem");
      return;
    }

    const createUserResult = !!!route?.params?.id ? await createUser(data["email"], data["senha"]) : { success: true };

    if (createUserResult.success) {
      setValue("senha", "");
      setValue("senhaConfirmacao", "");

      const result = await salvarUsuario(route?.params?.id, { email: data["email"], nome: data["nome"], uid: createUserResult.uid || data["uid"] });

      if (result === 'ok') {
        console.log('Usuario cadastrado com sucesso');
        navigation.goBack();
      }
    }
    else {
      setStatusError(true);
      setMensagem(createUserResult.error || 'Erro ao cadastrar usuario');
    }
  }

  return (
    <ScrollView flex={1} p={5}>
      <Title>
        Cadastrar Novo Usuário
      </Title>
      <Box>
        {
          formCadastro[0].entradaTexto.map((entrada) => {
            if (entrada.show != false) {
              return <EntradaTexto
                label={entrada.label}
                placeholder={entrada.placeholder}
                key={entrada.id}
                value={data[entrada.value]}
                onChangeText={texto => setValue(texto, entrada.value)}
              />
            }
          })
        }
      </Box>

      <Botao onPress={() => cadastrarUsuario()} bgColor={"blue.800"} mt={4}>Cadastrar</Botao>

      <Alerta
        mensagem={mensagem}
        error={statusError}
        setError={setStatusError}
      />
    </ScrollView>
  );
}