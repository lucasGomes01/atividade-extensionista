import Login from './src/Login';
import { NativeBaseProvider, StatusBar} from 'native-base';
import { theme } from './src/estilos/temas';
export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.blue[900]} />
      <Login />
    </NativeBaseProvider>
  );
}