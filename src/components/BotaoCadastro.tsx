import { StyleSheet, TouchableOpacity, Text } from "react-native";

const styles = StyleSheet.create({
    botao: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 50,
      height: 50,
      backgroundColor: 'blue',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textoBotao: {
      fontSize: 30,
      color: 'white',
      fontWeight: 'bold',
    }
  });

  export function BotaoCadastro({ onPress }) {
    return (
      <TouchableOpacity style={styles.botao} onPress={onPress}>
        <Text style={styles.textoBotao}>+</Text>
      </TouchableOpacity>
    );
  }