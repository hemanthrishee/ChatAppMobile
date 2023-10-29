import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import io from "socket.io-client";
import Chats from './Chats';
import { SetLoggedContext } from './Login';
import { SetSignupLogged } from './Signup';
const randomize = require("randomatic")

const socket = io.connect("https://chat-app-mern-server.onrender.com");

const Middle = ({name}) => {
    const [room, setRoom] = useState("")
    const [joinedRoom, setJoinedRoom] = useState(false)
    const [wrongRoom, setWrongRoom] = useState("neutral")
    const setLogged = useContext(SetLoggedContext)
    const setSignupLogged = useContext(SetSignupLogged)

    async function joinRoom() {
        const response = await fetch("https://chat-app-mern-server.onrender.com/rooms", {
            headers: {
                "Content-Type": "application/json"
            },
    
            body: JSON.stringify({room: room}),
            method: "POST"
        });
    
        const data = await response.json();
        setWrongRoom(data.status)
        if (wrongRoom === "no")
        {
            socket.emit("join_room", {room: room, username: name});
            socket.emit("send_message", {
                room: room,
                username: name,
                message: `${name} joined the chat`,
                time: new Date(Date.now()).getHours() + ":" + ("0" + new Date(Date.now()).getMinutes()).substr(-2),
                t: "announce"
            });
            setJoinedRoom(true);
        }
    }

    function createNewRoom() {
        const roomID = randomize('0', 8);
        socket.emit("join_room", {room: roomID, username: name});
        socket.emit("send_message", {
            room: roomID,
            username: name,
            message: `${name} joined the chat`,
            time: new Date(Date.now()).getHours() + ":" + ("0" + new Date(Date.now()).getMinutes()).substr(-2),
            t: "announce"
        });
        setJoinedRoom(true);
        setRoom(roomID);
    }

    function updatedLogged() {
        if (setLogged) {
            setLogged(false)
        }
        if (setSignupLogged) {
            setSignupLogged(false)
        }
    }

    return (
        <View>
            {!joinedRoom ? <View style={styles.container}>
                <Text style={styles.username}>Username: {name}</Text>
                <TouchableOpacity style={styles.btn} onPress={()=> {createNewRoom()}}>
                    <Text style={styles.btnText}>Create New Room</Text>
                </TouchableOpacity>
                <TextInput placeholder='Enter Room ID' style={styles.input} value={room} onChangeText={txt => {setRoom(txt)}} />
                <TouchableOpacity style={styles.joinBtn} onPress={()=> {joinRoom()}}>
                    <Text style={styles.btnText}>Join Room</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutBtn} onPress={()=> {updatedLogged()}}>
                    <Text style={styles.btnText}>LogOut</Text>
                </TouchableOpacity>
                {wrongRoom === "yeah" ? <Text style={styles.error}>Invalid Room ID, try again</Text> : null}
            </View> : <Chats room={room} name={name} socket={socket} />}
        </View>
    )
}

export default Middle

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    username: {
        fontWeight: "bold",
        fontSize: 30,
        height: 50
    },
    btn: {
        marginTop: 10,
        borderWidth: 1,
        width: 200,
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: "green",
        padding: 10,
        height: 45
    },
    joinBtn: {
        marginTop: 10,
        borderWidth: 1,
        width: 200,
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: "purple",
        padding: 10,
        height: 45
    },
    logoutBtn: {
        marginTop: 10,
        borderWidth: 1,
        width: 200,
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: "#863440",
        padding: 10,
        height: 45
    },
    btnText: {
        color: "white"
    },
    input: {
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
        borderRadius: 20,
        width: 200,
        height: 45
    },
    error: {
        marginTop: 20,
        color: "red"
    }
})