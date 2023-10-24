import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigate = useNavigation()
    useEffect(()=> {
        navigate.navigate("Signup")
    })
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sathwik</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: "white",
        fontSize: 30,
    },
});