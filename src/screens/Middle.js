import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const Middle = () => {
    return (
        <View style={styles.container}>
            <Text>Middle</Text>
        </View>
    )
}

export default Middle

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})