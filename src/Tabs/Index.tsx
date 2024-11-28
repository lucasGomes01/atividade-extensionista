import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Usuarios from "./usuarios/Usuarios";
import Comercios from "./comercios/Comercios";

const Tab = createMaterialTopTabNavigator();

const screenOptions = {
    tabBarStyle: {
        backgroundColor: "#2D3DCE"
    },
    tabBarActiveTintColor: "#FFFFFF",
    tabBarInactiveTintColor: "#BFBFBF",
}

const tabs = [
    {
        name: "Administradores",
        component: Usuarios
    },
    {
        name: "Comércios",
        component: Comercios
    }
]

export default function Tabs() {
    return (
        <Tab.Navigator 
            screenOptions={screenOptions}
        >
            {tabs.map((tab) => (
            <Tab.Screen 
                key={tab.name}
                name={tab.name}
                component={tab.component} 
            />
        ))
        }       
        </Tab.Navigator>
    )
}