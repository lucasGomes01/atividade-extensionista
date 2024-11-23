import { HStack, View, Text } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
//import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { retornarListaCombo } from '../services/firestore';

import { StyleSheet } from 'react-native';

interface ComboxProps {
  value?: string;
  colecao: string;
  onChangeSelect?: (arg0: string) => void;
}

export function Combox({
  value,
  colecao,
  onChangeSelect
}: ComboxProps) {
  const [dadosCombox, setdadosCombox] = useState(null);
  const dropdownRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const recuperardadosCombox = async () => {
      const data = await retornarListaCombo(colecao);
      setdadosCombox(data);

      if (data && value) {
        selecionarPorCodigo(value, data);
      }
    };

    recuperardadosCombox();
  }, [colecao]);

  const selecionarPorCodigo = (codigo: string, data: object) => {
    const dados = data || dadosCombox;

    if (dados && dropdownRef.current) {
      const index = dados.findIndex(item => item.id === codigo);

      if (index !== -1) {
        dropdownRef.current.selectIndex(index);
        setSelectedItem(dados[index]);
      }
    }
  };
  
  return (
    <HStack
      w="100%"
      borderRadius="lg"
      shadow={2}
      bg="gray.100"
      alignItems="center"
    >
      <SelectDropdown
        ref={dropdownRef}
        data={dadosCombox}
        onSelect={(selectedItem) => {
          onChangeSelect && onChangeSelect(selectedItem.id);
        }}
        renderButton={(selectedItem) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.nome) || 'selecione...'}
              </Text>
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
              <Text style={styles.dropdownItemTxtStyle}>{item.nome}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </HStack>
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    height: 45,
    backgroundColor: '#E9ECEF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
