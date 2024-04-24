import { NativeBaseProvider, StatusBar } from 'native-base';
import { theme } from './src/estilos/temas';
import Rotas from './src/Rotas';
export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.blue[900]} />
      <Rotas />
    </NativeBaseProvider>
  );
}