
import { VStack, Text, Box } from 'native-base';
import { Title } from "./components/Title";
import { EntradaTexto } from './components/EntradaTexto';
import { Botao } from './components/Botao';
import { useState } from 'react';
import { Alerta } from './components/Alerta';
import { updatePasswordInApp } from './services/auth';

export default function MudarSenha({ navigation }) {
    const [senha, setSenha] = useState('');
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

    const [statusError, setStatusError] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const alterarSenha = async () => {
        if (senha !== confirmacaoSenha) {
            setStatusError(true);
            setMensagem('As senhas não correspondem. Verifique e tente novamente.');
            return;
        }

        if (senha == "") {
            setStatusError(true);
            setMensagem('Digite a nova senha antes de prosseguir.');
            return;
        }

        if (senha.length < 6) {
            setStatusError(true);
            setMensagem('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        const resultado = await updatePasswordInApp(senha);
        setStatusError(true);
        setMensagem(resultado);

        navigation.navigate('Tabs');
    }

    return (
        <VStack flex={1} alignItems="center" p={2}>
            <Title>
                Nova Senha
            </Title>
            
            <Text mt={5} style={{ textAlign: 'justify' }}>
                Você fez login com uma senha temporária fornecida por um administrador.
                Vamos muda-la para uma de sua preferencia.
            </Text>

            <Box m={2}>
                <EntradaTexto
                    label="Nova Senha"
                    placeholder="Sua Nova Senha"
                    opcional={false}
                    onChangeText={(texto) => setSenha(texto)}
                />
                <EntradaTexto
                    label="Confirmar Senha"
                    placeholder="Confirmar Senha"
                    opcional={false}
                    onChangeText={(texto) => setConfirmacaoSenha(texto)}
                />
            </Box>

            <Botao
                children={'Confirmar'}
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
                onPress={alterarSenha}
            >
            </Botao>

            <Alerta
                mensagem={mensagem}
                error={statusError}
                setError={setStatusError}
            />
        </VStack>
    )
}