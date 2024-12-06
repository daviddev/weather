import React from "react";
import Home from "../screens/home";
import Settings from "../screens/settings";
import { RouterEnum } from "../enums/router";
import Details from "../../src/screens/details";
import Header from "../../src/components/header";
import { NavigationType } from "../types/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<NavigationType>();

const Navigation = (): React.JSX.Element => (
    <>
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={RouterEnum.HOME}
                screenOptions={{
                    headerShown: true,
                    header: (props) => <Header {...props} />
                }}
            >
                <Stack.Screen component={Home} name={RouterEnum.HOME} />
                <Stack.Screen component={Details} name={RouterEnum.DETAILS} />
                <Stack.Screen component={Settings} name={RouterEnum.SETTINGS} />
            </Stack.Navigator>
        </NavigationContainer>
    </>
);

export default Navigation;
