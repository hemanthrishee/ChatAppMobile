import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Signup from '../screens/Signup'
import Login from '../screens/Login'
import Middle from '../screens/Middle'

const Stack = createStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Signup"} component={Signup} options={{headerShown: false}} />
                <Stack.Screen name={"Login"} component={Login} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator