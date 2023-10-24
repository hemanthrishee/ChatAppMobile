import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import validator from 'validator'
import { useNavigation } from '@react-navigation/native'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigation()


    function validate () {
        if (!validator.isEmail(email)) {
            setError("Invalid email format, please re enter the email")
            return false
        }
        else if (password === "" || username === "") {
            setError("Fill all the fields")
            return false
        }
        setError("")
        return true
    }

    async function signUpSubmit() {
        if (validate()) {
            const response = await fetch("https://chat-app-mern-server.onrender.com/register", {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: username, email: email, password: password}),
                method: "POST"
            });
            const data = await response.json();
            if (data.status === "exists") {
                setError("Email Exists, proceed to login")
            }
            else {
                setError("")
                navigate.navigate("Login")
            }
            setEmail("")
            setPassword("")
            setUsername("")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Signup</Text>
            <TextInput placeholder='Enter Email' style={styles.input} value={email} onChangeText={txt => {setEmail(txt)}} />
            <TextInput placeholder='Enter Username' style={styles.input} value={username} onChangeText={txt => {setUsername(txt)}} />
            <TextInput secureTextEntry={true} placeholder='Enter Password' style={styles.input} value={password} onChangeText={txt => {setPassword(txt)}} />
            <TouchableOpacity style={styles.btn} onPress={signUpSubmit}>
                <Text style={styles.btnText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 20}} onPress={()=>{navigate.navigate("Login")}}>
                <Text>Signed In Already? Proceed to Login</Text>
            </TouchableOpacity>
            <Text style={{color: "red"}}>{error}</Text>
        </View>
    )
}

export default Signup

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