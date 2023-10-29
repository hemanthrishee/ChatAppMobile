import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const Chats = ({room, name, socket}) => {
    const scrollViewRef = useRef(null)
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [messageListGettingToggle, setMessageListGettingToggle] = useState(true);

    async function sendMessage(event) {
        if (message !== "")
        {
            const messageData = {
                room: room,
                username: name,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + ("0" + new Date(Date.now()).getMinutes()).substr(-2),
                t: "message"
            };

            await socket.emit("send_message", messageData);
            setMessageList((d)=> {
                return [...d, messageData];
            });
            setMessage("");
            setMessageListGettingToggle(messageListGettingToggle);
        }
    }

    useMemo(()=> {
        socket.on("recieve_message", (data)=> {
            setMessageList((d)=> {
                return [...d, data];
            });
        });
    }, [socket]);

    useEffect(()=> {
        async function execute()
        {
            const response = await fetch(`https://chat-app-mern-server.onrender.com/get/${room}`);
            const jsonData = await response.json();
            if (jsonData.messages)
            {
                setMessageList(jsonData.messages);
            }
        }
        execute();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.chatWindow}>
                <View style={styles.chatHeader}>
                    <Text style={styles.text}>Room ID: <Text selectable={true} style={{fontWeight: "bold", color: "white"}}>{room}</Text></Text>
                </View>
                <View style={styles.chatBody}>
                    <ScrollView onContentSizeChange={()=> {scrollViewRef.current?.scrollToEnd()}} ref={scrollViewRef}>
                        {messageList.map((content)=> {
                            return content.t !== "announce" ?
                                <View style={content.username === name ? [styles.message, styles.you] : [styles.message, styles.other]} >
                                    <View>
                                        <View style={content.username === name ? [styles.messageContent, styles.messageYou, {borderRadius: 10, borderTopRightRadius: 0}] : [styles.messageContent, styles.messageOther, {borderRadius: 10, borderTopLeftRadius: 0}]}>
                                            <Text style={{width: 100, color: "white", alignSelf: 'flex-end'}}>{content.message}</Text>
                                        </View>
                                        <View style={styles.messageMeta}>
                                            <Text style={styles.time}>{content.time}</Text>
                                            <Text style={styles.author}>{content.username}</Text>
                                        </View>
                                    </View>
                                </View>
                            : <Text style={styles.announce}>{content.message}</Text>;
                        })}
                    </ScrollView>
                </View>
                <View style={styles.chatFooter}>
                    <TextInput value={message} placeholder="Write your message" onChangeText={(txt)=> {setMessage(txt)}} onKeyPress={(event)=> {
                        event.nativeEvent.key === "Enter" && sendMessage();
                    }} style={styles.input} />
                    <TouchableOpacity style={styles.btn} onPress={()=> {sendMessage()}}>
                        <Text style={styles.btnText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Chats

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatWindow: {
        width: 300,
        height: 420
    },
    text: {
        color: "white", 
        backgroundColor: "#263238",
        height: 40,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        width: 300,
    },
    chatBody: {
        height: 300,
        width: 300,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderBlockColor: "#263238",
        flex: 1
    },
    message: {
        height: "auto",
        padding: 10,
        flex: 1,
    },
    messageContent: {
        width: "auto",
        height: "auto",
        maxWidth: 120,
        minHeight: 25,
        backgroundColor: "cornflowerblue",
        color: "white",
        flex: 1,
        alignItems: "center",
        marginRight: 5,
        marginLeft: 5,
        paddingRight: 5,
        paddingLeft: 5,
    },
    btn: {
        marginTop: 10,
        borderWidth: 1,
        width: 100,
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: "#e0dede",
        padding: 10,
        alignSelf: 'center'
    },
    btnText: {
        color: "white"
    },
    input: {
        borderWidth: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        width: 300,
        borderTopWidth: 0,
        height: 50,
        paddingLeft: 10
    },
    you: {
        justifyContent: "flex-end",
        borderRadius: 10,
        borderTopRightRadius: 0,
        alignSelf: 'flex-end',
    },
    messageYou: {
        backgroundColor: "#43a047",
    },
    announce: {
        flex: 1,
        alignSelf: 'center',
        color: "grey"
    }
})