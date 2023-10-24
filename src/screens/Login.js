import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import validator from 'validator'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigation()

    async function loginSubmit() {
        const response = await fetch("https://chat-app-mern-server.onrender.com/login", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email, password: password}),
            method: "POST"
        });
        const data = await response.json();
        if (data.status === "yeah") {
            setError("")
            navigate.navigate("Middle")
        }
        else {
            setError("Invalid Email or Password")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <TextInput placeholder='Enter Email' style={styles.input} value={email} onChangeText={txt => {setEmail(txt)}} />
            <TextInput secureTextEntry={true} placeholder='Enter Password' style={styles.input} value={password} onChangeText={txt => {setPassword(txt)}}/>
            <TouchableOpacity style={styles.btn} onPress={loginSubmit}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 20}} onPress={()=>{navigate.navigate("Signup")}}>
                <Text>Didn't Create an Account already? Proceed to Sign up</Text>
            </TouchableOpacity>
            <Text style={{color: "red"}}>{error}</Text>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        marginTop: 100,
        fontSize: 30,
        fontWeight: "600"
    },
    input: {
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
        borderRadius: 20,
        width: 300
    },
    btn: {
        marginTop: 10,
        borderWidth: 1,
        width: 100,
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: "green",
        padding: 10
    },
    btnText: {
        color: "white"
    }
})