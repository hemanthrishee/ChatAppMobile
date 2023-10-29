import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { createContext, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { ThemeProvider, useNavigation } from '@react-navigation/native'
import Middle from './Middle'

export const SetLoggedContext = createContext()

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [un, setUn] = useState("")
    const [logged, setLogged] = useState(false)
    const navigate = useNavigation()

    function validate() {
        if (email === "" && password === "") {
            setError("Fill all the fields")
            return false
        }
        return true
    }

    async function loginSubmit() {
        if (validate()) {
            const response = await fetch("https://chat-app-mern-server.onrender.com/login", {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: email, password: password}),
                method: "POST",
            });
            const data = await response.json();
            if (data.status === "yeah") {
                setError("")
                setUn(data.name)
                setLogged(true)
            }
            else {
                setError("Invalid Email or Password")
            }
            setEmail("")
            setPassword("")
        }
    }

    return (
        <SetLoggedContext.Provider value={setLogged}>
            <View style={styles.superContainer}>
                {!logged ? <View style={styles.container}>
                    <Text style={styles.text}>Login</Text>
                    <TextInput placeholder='Enter Email' style={styles.input} value={email} onChangeText={txt => {setEmail(txt)}} />
                    <TextInput secureTextEntry={true} placeholder='Enter Password' style={styles.input} value={password} onChangeText={txt => {setPassword(txt)}}/>
                    <TouchableOpacity style={styles.btn} onPress={()=> {loginSubmit()}}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 20}} onPress={()=>{navigate.navigate("Signup")}}>
                        <Text>Didn't Create an Account already? Proceed to Sign up</Text>
                    </TouchableOpacity>
                    <Text style={{color: "red"}}>{error}</Text>
                </View>: <Middle name = {un} />}
            </View>
        </SetLoggedContext.Provider>
    )
}

export default Login

const styles = StyleSheet.create({
    superContainer: {
        flex: 1,
        justifyContent: 'center'
    },
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