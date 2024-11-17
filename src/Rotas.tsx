import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

const Tab = createNativeStackNavigator();

import CadastroComercio from "./Tabs/comercios/CadastroComercio";
import CadastroUsuario from "./Tabs/usuarios/CadastroUsuario";
import Home from "./Home";
import Listagem from "./Listagem";
import Login from "./Login";
import Tabs from "./Tabs/Index";

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
                <Tab.Screen name="Listagem" component={Listagem} options={{ headerShown: false }} />
                <Tab.Screen name="Login" component={Login} options={options} />
                <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Tab.Screen name="CadastroUsuario" component={CadastroUsuario} options={options} />
                <Tab.Screen name="CadastroComercio" component={CadastroComercio} options={options} />
                <Tab.Screen name="Tabs" component={Tabs} options={options} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}