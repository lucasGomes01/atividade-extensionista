import { Button, HStack, ScrollView, VStack } from "native-base";
import { CardListagem } from "./components/CardListagem";
import React, { useEffect, useState } from "react";
import { listarComercios } from "./services/firestore";

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CadastroUsuario from "./Tabs/usuarios/CadastroUsuario";
import CadastroComercio from "./Tabs/comercios/CadastroComercio";

const Tab = createMaterialTopTabNavigator();

export default function Cadastros({ navigation }) {


    return (
        <VStack flex={1} alignItems="center" justifyContent={'center'} p={4}>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ title: 'Cadastrar Usuario' }} />
                    <Tab.Screen name="CadastroComercio" component={CadastroComercio} options={{ title: 'Cadastrar Comercio' }} />
                </Tab.Navigator>
            </NavigationContainer>
            {/* <HStack>
                <Button onPress={() => navigation.navigate('CadastroUsuario')}>Cadastrar Usuario</Button>

            </HStack> */}
            {/* <ScrollView w="100%" >
                {
                    comercios.map((comercio) => {
                        return <CardListagem
                            key={comercio.id}
                            nome={comercio.nome}
                            foto={comercio.foto}
                            data={comercio.data}
                        />
                    })
                }
            </ScrollView> */}
        </VStack>
    )
}