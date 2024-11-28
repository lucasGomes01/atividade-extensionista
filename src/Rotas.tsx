import React from "react";
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Box } from "native-base";

import CadastroComercio from "./Tabs/comercios/CadastroComercio";
import CadastroUsuario from "./Tabs/usuarios/CadastroUsuario";
import Home from "./Home";
import Listagem from "./Listagem";
import Login from "./Login";
import Tabs from "./Tabs/Index";
import MudarSenha from "./MudarSenha";

const Tab = createNativeStackNavigator();

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2D3DCE',
        height: 100,
        color: 'white',
    },
    headerTitle: {
        color: 'white',
    },
});

function options(title: string) {
    return {
        headerShown: true,
        headerTitleStyle: styles.headerTitle,
        headerStyle: styles.header,
        title: title,
        // headerLeft: () => (
        //     <Box w="55%">
        //         <Ionicons
        //             name={"arrow-back"}
        //             color={"white"}
        //             size={30}
        //             style={{ marginRight:30 }}
        //             onPress={() => navigation.replace('Home')}
        //         />
        //     </Box>
        // )
    };
}

function optionsTabs({ navigation }) {
    return {
        headerShown: true,
        headerTitleStyle: styles.headerTitle,
        headerStyle: styles.header,
        title: "Cadastros",
        headerLeft: () => (
            <Box>
                <Ionicons
                    name={"arrow-back"}
                    color={"white"}
                    size={30}
                    style={{ marginRight:30 }}
                    onPress={() => navigation.replace('Listagem')}
                />
            </Box>
        )
    };
}

export default function Rotas() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Listagem" component={Listagem} options={{ headerShown: false }} />
                <Tab.Screen name="Login" component={Login} options={options("Login")} />
                <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Tab.Screen name="CadastroUsuario" component={CadastroUsuario} options={options("Cadastro de Administradores")} />
                <Tab.Screen name="CadastroComercio" component={CadastroComercio} options={options("Cadastro de Comércios")} />
                <Tab.Screen name="MudarSenha" component={MudarSenha} options={options("Vamos mudar a senha?")} />
                <Tab.Screen name="Tabs" component={Tabs} options={optionsTabs} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}