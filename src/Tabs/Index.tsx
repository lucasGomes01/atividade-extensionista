import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//import Principal from "./Principal";
import Comercios from "./comercios/Comercios";

const Tab = createMaterialTopTabNavigator();

const screenOptions = {
    tabBarStyle: {
        backgroundColor: "#002851"
    },
    tabBarActiveTintColor: "#339cff",
    tabBarInactiveTintColor: "#fff",
}

const tabs = [
    {
        name: "Administradores",
        component: Comercios
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