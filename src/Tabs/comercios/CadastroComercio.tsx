import { Text, Box, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';

import { Alerta } from '../../components/Alerta';
import { Botao } from '../../components/Botao';
import { EntradaTexto } from '../../components/EntradaTexto';
import { Title } from '../../components/Title';

import { formCadastro } from '../../utils/formCadastro';

import { salvarComercio } from '../../services/firestore';
import { uploadArquivoPorUlr } from '../../services/storage';

import * as ImagePicker from 'expo-image-picker';
import { Image, TouchableOpacity } from 'react-native';
import uploadImagemPadrao from '../../assets/upload.png';

export default function CadastroComercio({ navigation, route }) {
  const [statusError, setStatusError] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [data, setData] = useState(route?.params || {});
  const [image, setImage] = useState(route?.params?.urlImagem);

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
    const lstOpcionais = formCadastro[1].entradaTexto.filter(item => item.opcional == true).map(item => item.value);
    const isEmpty = Object.entries(data).some(([key, value]) => value === '' && !lstOpcionais.includes(key));

    if (isEmpty) {
      setStatusError(true);
      console.log("Algum campo obrigatório não foi preenchido: ", data);
      setMensagem("Por favor, preencha todos os campos");
      return;
    }

    try {
      let comercioData = { ...data };

      if (data.urlImagem) {
        const url = await uploadArquivoPorUlr(data.urlImagem, 'comercios/');
        if (url)
          comercioData.urlImagem = url;
      }

      if (image) {
        const url = await uploadArquivoPorUlr(image, 'comercios/');
        if (url)
          comercioData.urlImagem = url
      }

      await salvarComercio(route?.params?.id, comercioData);

      navigation.goBack();

    } catch (error) {
      console.error("Erro ao cadastrar o comércio:", error);
    }
  }

  async function selecionarImagemGaleria() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <ScrollView flex={1}>
      <Box p={5}>
        <Title mt={0}>
          Cadastrar Comércio
        </Title>

        <Text m={4}>
          Faça o upload de uma foto de capa mostrando o que há de melhor.
        </Text>

        <TouchableOpacity
          style={{
            width: 190,
            height: 142,
            marginRight: 23,
            alignSelf: 'center',
          }}
          onPress={selecionarImagemGaleria}
        >
          <Image
            source={image ? { uri: image } : uploadImagemPadrao}
            style={{ width: 190, height: 142 }}
          />
        </TouchableOpacity>

        {
          formCadastro[1].entradaTexto.map((entrada) => {
            if (entrada.visible === false) return null;
            
            return <EntradaTexto
              {...entrada}
              data={data}
              key={entrada.id}
              value={data[entrada.value]}
              onChangeText={texto => setValue(texto, entrada.value)}
            />
          })
        }

        <Botao onPress={() => cadastrarComercio()} bgColor={"blue.800"} mt={4}>Cadastrar</Botao>

        <Alerta
          mensagem={mensagem}
          error={statusError}
          setError={setStatusError}
        />
      </Box>
    </ScrollView>
  );
}