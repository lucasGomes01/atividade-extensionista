import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { StyleSheet } from 'react-native';
import { NavigationAction, NavigationContainer } from "@react-navigation/native";

const Tab = createNativeStackNavigator();

import Cadastros from "./Cadastros";
import CadastroComercio from "./CadastroComercio";
import CadastroUsuario from "./CadastroUsuario";
import Home from "./Home";
import Login from "./Login";
import { Box } from "native-base";

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'blue',
        height: 100,
        color: 'white',
    },
    headerTitle: {
        color: 'white',
    },
});

function options({ navigation }) {
    return {
        headerShown: true,
        headerTitleStyle: styles.headerTitle,
        headerStyle: styles.header,
        // headerLeft: () => (
        //     <Box w="55%">
        //         <Ionicons
        //             name={"arrow-back"}
        //             color={"white"}
        //             size={30}
        //             onPress={() => navigation.replace('Home')}
        //         />
        //     </Box>
        // )
    };
}

export default function Rotas() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Login" component={Login} options={options} />
                <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Tab.Screen name="Cadastros" component={Cadastros} options={options} />
                <Tab.Screen name="CadastroUsuario" component={CadastroUsuario} options={options} />
                <Tab.Screen name="CadastroComercio" component={CadastroComercio} options={options} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}