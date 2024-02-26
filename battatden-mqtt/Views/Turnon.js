import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Pressable } from 'react-native';
import { StyleSheet, Text, View,Button,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';

init({
size: 10000,
storageBackend: AsyncStorage,
defaultExpires: 1000 * 3600 * 24,
enableCache: true,
sync : {}
});
const options = {
host: 'broker.emqx.io',
port: 8083,
path: '\sonlong_test1',
id: 'id_' + parseInt(Math.random()*100000)
};
//
const client = new Paho.MQTT.Client(options.host, options.port,
options.path);
export default function App() {
const [msg,setMsg] = useState('No message');
useEffect (()=>{
client.onMessageArrived = onMessageArrived;
})
const connect = () => {
client.connect({
onSuccess: ()=> { console.log('connect ok!')},
useSSL: false,
timeout: 3,
onFailure: ()=> { console.log('fail')}
});
}
const sendMessage = () =>{
//message: noi dung muon gui
var message = new Paho.MQTT.Message(options.id + ': Turn on/offled' );
//destinationName: ten topic da tao trong broker
message.destinationName ='sonlong\\leadstatus';
client.send(message);
}
const subscribeTopic = () => {
client.subscribe('sonlong\\leadstatus', { qos: 0 });
}
const onMessageArrived = (message )=> {
console.log('onMessageArrived:' + message.payloadString);
setMsg(message.payloadString);
if(message.payloadString == "on"){
    try {
        const result = fetch('http://10.106.21.140/turnonLed');
        console.log('done');
        } catch (error) {
        console.error(error);
        }
}
else if(message.payloadString == "off"){
    try {
        const result = fetch('http://10.106.21.140/turnoffLed');
        console.log('done');
        } catch (error) {
        console.error(error);
        }
}
}
return (
<View style={styles.container}>
<View style={styles.header}>
<Text style={styles.txtTitle}> MQTT TEST </Text>
</View>
<View style={styles.main}>
<TouchableOpacity style={styles.btnOn}
onPress={()=>connect()}>
<Text style={styles.btnText}> CONNECT </Text>
</TouchableOpacity>
<TouchableOpacity style={styles.btnOff}
onPress={()=>sendMessage()}>
<Text style={styles.btnText}> SEND MESSAGE TO YOUR TOPIC
</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.btnOff}
onPress={()=>subscribeTopic()}>
<Text style={styles.btnText}> SUBSCRIBE </Text>
</TouchableOpacity>
<Text style={styles.txtSubTitle1}> {msg} </Text>
</View>
<View style={styles.footer}>
<Text style={styles.txtSubTitle1}> THCNTT </Text>
</View>
</View>
)
}
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#424242',
justifyContent: 'flex-start',
padding: 15,
},
txtHelloWorld: {
fontSize: 50
},
header: {
flex: 1,
alignItems:'center',
},
footer: {
flex: 1,
alignItems:'center',
},
txtTitle: {
fontSize: 40,
fontStyle: 'bold',
color: 'orange',
},
txtSubTitle1: {
fontSize: 20,
fontStyle: 'bold',
color: '#FFF',
},
txtItem: {
fontSize: 20,
fontStyle: 'bold',
color: '#424242',
flex: 1
},
main: {
flex: 5,
alignItems: 'center',
padding: 15,
},
item: {
borderRadius: 5,
height: 50,
width: '100%',
backgroundColor: '#eeeeee',
marginBottom:5,
marginTop:5,
alignItems:'center',
flexDirection: 'row',
padding: 5
},
btnOn:{
borderRadius: 5,
height: 50,
width: '100%',
backgroundColor: '#0288d1',
marginBottom:5,
marginTop:5,
justifyContent: 'center',
alignItems:'center',
padding: 5,
},
btnOff:{
borderRadius: 5,
height: 50,
width: '100%',
backgroundColor: 'red',
marginBottom:5,
marginTop:5,
justifyContent: 'center',
alignItems:'center',
padding: 5,
},
btnText: {
color: '#FFF',
fontWeight:'bold'
}
});
