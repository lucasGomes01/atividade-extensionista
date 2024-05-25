import { Image, Box, ScrollView } from 'native-base';
import { Title } from './components/Title';
import { Botao } from './components/Botao';
import { EntradaTexto } from './components/EntradaTexto';
import { formCadastro } from './utils/formCadastro';
import React, { useState } from 'react';

import { salvarComercio } from './services/firestore';

export default function CadastroComercio({ navigation }) {
  var data = {};

  function setValue(texto: string, campo: string) {
    data[campo] = texto;
  }

  async function cadastrarComercio() {
    const result = await salvarComercio(data);
    
    if (result === 'ok') {
      console.log('Comercio cadastrado com sucesso');

      navigation.goBack();
    } else {
      console.log('Erro ao cadastrar comercio');
    }
  }

  return (
    <ScrollView flex={1} p={5}>
      <Title>
        Cadastrar Novo Usuário
      </Title>
      <Box>
        {
          formCadastro[1].entradaTexto.map((entrada) => {
            return <EntradaTexto 
                label={entrada.label} 
                placeholder={entrada.placeholder} 
                key={entrada.id}
                onChangeText={texto => setValue(texto, entrada.value)}
              />
          })
        }
      </Box>

      <Botao onPress={() => cadastrarComercio()} bgColor={"blue.800"} mt={4}>Cadastrar</Botao>
    </ScrollView>
  );
}