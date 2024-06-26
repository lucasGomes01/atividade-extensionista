import { Box, ScrollView } from 'native-base';
import { Title } from '../../components/Title';
import { Botao } from '../../components/Botao';
import { EntradaTexto } from '../../components/EntradaTexto';
import { formCadastro } from '../../utils/formCadastro';
import React, { useEffect, useState } from 'react';

import { salvarComercio } from '../../services/firestore';
import { Alerta } from '../../components/Alerta';
import { uploadArquivoPorUlr } from '../../services/storage';

export default function CadastroComercio({ navigation, route }) {
  const [statusError, setStatusError] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [data, setData] = useState(route?.params || {});

  useEffect(() => {
    const initialData = {};
    formCadastro[1].entradaTexto.forEach((entrada) => {
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

  async function cadastrarComercio() {
    const isEmpty = Object.values(data).some(value => value === '');

    if (isEmpty) {
      setStatusError(true);
      setMensagem("Por favor preencha todos os campos");
      return;
    }

    let result = '';
    if (data.urlImagem) {
      await uploadArquivoPorUlr(data.urlImagem, 'comercios/').then(async (url) => {
        result = await salvarComercio(route?.params?.id, { ...data, urlImagem: url });
      });
    }
    else {
      result = await salvarComercio(route?.params?.id, data);
    }

    if (result === 'ok') {
      navigation.goBack();
    } else {
      console.log('Erro ao cadastrar comércio');
    }
  }

  return (
    <ScrollView flex={1} p={5}>
      <Title>
        Cadastrar Comércio
      </Title>
      <Box>
        {
          formCadastro[1].entradaTexto.map((entrada) => {
            return <EntradaTexto
              label={entrada.label}
              placeholder={entrada.placeholder}
              key={entrada.id}
              value={data[entrada.value]}
              onChangeText={texto => setValue(texto, entrada.value)}
            />
          })
        }
      </Box>

      <Botao onPress={() => cadastrarComercio()} bgColor={"blue.800"} mt={4}>Cadastrar</Botao>

      <Alerta
        mensagem={mensagem}
        error={statusError}
        setError={setStatusError}
      />
    </ScrollView>
  );
}