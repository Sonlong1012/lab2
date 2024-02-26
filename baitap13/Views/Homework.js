// import React from "react";
// import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import init from "react_native_mqtt";
// init({
// size: 10000,
// storageBackend: AsyncStorage,
// defaultExpires: 1000 * 3600 * 24,
// enableCache: true,
// sync: {},
// });
// const options = {
// host: "broker.emqx.io",
// port: 8083,
// path: "/sonlong_test1",
// id: "id_" + parseInt(Math.random() * 100000),
// };
// //
// const client = new Paho.MQTT.Client(options.host, options.port, options.path);
// const TurnOnOffLedScreen_Mqtt = ({ navigation }) => {
// const [msg, setMsg] = useState("No message");
// const [statusLed, setStatusLed] = useState("off");
// useEffect(() => {
// //step 1 connect Mqtt broker
// connect();
// // step 3 handling when message arrived
// client.onMessageArrived = onMessageArrived;
// }, []);
// const connect = () => {
// client.connect({
// onSuccess: () => {
// console.log("connect MQTT broker ok!");
// //step 2 subscribe topic
// subscribeTopic(); // ledstatus
// },
// useSSL: false,
// timeout: 5,
// onFailure: () => {
// console.log("connect fail");
// connect();
// console.log("reconnect ...");
// },
// });
// };
// const publishTopic = (deviceStatus) => {
// const s ='{"message":"turn on/offled","name":"led","status":"'+deviceStatus+'"}';
// var message = new Paho.MQTT.Message(s);
// message.destinationName = "sonlong\\leadstatus";
// client.send(message);
// };
// const subscribeTopic = () => {
// client.subscribe("sonlong\\leadstatus", { qos: 0 });
// };
// const onMessageArrived = async (message) => {
// console.log("onMessageArrived:" + message.payloadString);
// setMsg(message.payloadString);
// const jsondata=JSON.parse(message.payloadString);
// console.log(jsondata.message);
// setStatusLed(jsondata.status);
// };
// const handleButtonOn = async () => {
// //connect();
// const result = fetch('http://10.106.21.251/turnonLed');
// console.log("turn on led...");
// publishTopic("on");
// };
// const handleButtonOff = async () => {
// const result =  fetch('http://10.106.21.251/turnoffLed');
// console.log("turn off led...");
// publishTopic("off");
// };
// return (
// <View style={styles.containerLedView}>
// <View style={styles.header}>
// <Ionicons name="home" size={64} color="orange" />
// <Text style={styles.title}>Smart Home</Text>
// <Text style={styles.subTitle}>ON / OFF LIGHT</Text>
// </View>
// <View style={styles.main}>
// {statusLed == "on" ? (
// <View style={styles.boxLightOn}>
// <Ionicons name="bulb" size={64} color="orange" />
// </View>
// ) : (
// <View style={styles.boxLightOff}>
// <Ionicons name="bulb" size={64} color="grey" />
// </View>
// )}
// <View style={styles.controlGroup}>
// <TouchableOpacity
// style={[styles.btnOff, styles.btn]}
// onPress={() => handleButtonOff()}
// >
// <Text style={styles.btnText}>OFF</Text>
// </TouchableOpacity>
// <TouchableOpacity
// style={[styles.btnOn, styles.btn]}
// onPress={() => handleButtonOn()}
// >
// <Text style={styles.btnText}>ON</Text>
// </TouchableOpacity>
// </View>
// <Text style={styles.subTitle}>{msg}</Text>
// </View>
// </View>
// );
// };
// const styles = StyleSheet.create({
// containerLedView: {
// flex: 1,
// backgroundColor: "#212121",
// padding: 15,
// },
// header: {
// alignItems: "center",
// },
// title: {
// fontSize: 40,
// fontStyle: "bold",
// color: "orange",
// },
// subTitle: {
// fontSize: 20,
// fontStyle: "bold",
// color: "white",
// },
// main: {
// flex: 5,
// marginTop: 30,
// alignItems: "center",
// },
// controlGroup: {
// flexDirection: "row",
// justifyContent: "center",
// marginTop: 10,
// },
// btn: {
// alignItems: "center",
// width: 100,
// marginBottom: 5,
// marginTop: 5,
// justifyContent: "center",
// marginRight: 15,
// padding: 15,
// borderRadius: 5,
// },
// btnOn: {
// backgroundColor: "blue",
// },
// btnOff: {
// backgroundColor: "red",
// },
// btnText: {
// color: "#FFFFFF",
// },
// img: {
// width: 100,
// height: 100,
// borderRadius: 100 / 2,
// },
// footer: {},
// boxLightOff: {
// width: 100,
// height: 100,
// borderWidth: 2,
// borderRadius: 5,
// borderColor: "grey",
// padding: 15,
// },
// boxLightOn: {
// width: 100,
// height: 100,
// borderWidth: 2,
// borderRadius: 5,
// borderColor: "orange",
// padding: 15,
// },
// });
// export default TurnOnOffLedScreen_Mqtt;



import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import init from "react_native_mqtt";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

const options = {
  host: "broker.emqx.io",
  port: 8083,
  path: "/sonlong_test1",
  id: "id_" + parseInt(Math.random() * 100000),
};

const client = new Paho.MQTT.Client(options.host, options.port, options.path);

const TurnOnOffLedScreen_Mqtt = ({ navigation }) => {
  const [msg, setMsg] = useState("No message");
  const [statusLed, setStatusLed] = useState("off");
  const [temperature, setTemperature] = useState("N/A");
  const [humidity, setHumidity] = useState("N/A");

  useEffect(() => {
    connect();
    client.onMessageArrived = onMessageArrived;
  }, []);

  const connect = async () => {
    console.log("connect MQTT broker ok!");
    client.connect({
      onSuccess: () => {
        console.log("connect ok!");
        subscribeTopic();
      },
      useSSL: false,
      timeout: 3,
      onFailure: () => {
        console.log("fail");
      },
    });
  };

  const subscribeTopic = () => {
    client.subscribe("sonlong/temp", { qos: 0 });
    client.subscribe("sonlong/humid", { qos: 0 });
  };

  const onMessageArrived = async (message) => {
    console.log("onMessageArrived:" + message.payloadString);
    setMsg(message.payloadString);
    const jsondata = JSON.parse(message.payloadString);
    console.log(jsondata.message);
    setStatusLed(jsondata.status);

    // Check if the message contains temperature data
    if (jsondata.name === "temperature") {
      setTemperature(jsondata.value);
    }

    // Check if the message contains humidity data
    if (jsondata.name === "humidity") {
      setHumidity(jsondata.value);
    }
  };

  const publishTopic = (deviceStatus) => {
    const s =
      '{"message":"turn on/offled","name":"led","status":"' + deviceStatus + '"}';
    var message = new Paho.MQTT.Message(s);
    message.destinationName = "sonlong/temp";
    client.send(message);
  };

  const handleButtonOn = async () => {
    console.log("turn on led...");
    publishTopic("on");
  };

  const handleButtonOff = async () => {
    console.log("turn off led...");
    publishTopic("off");
  };

  return (
    <View style={styles.containerLedView}>
      <View style={styles.header}>
        <Ionicons name="home" size={64} color="orange" />
        <Text style={styles.title}>Smart Home</Text>
        <Text style={styles.subTitle}>ON / OFF LIGHT</Text>
      </View>
      <View style={styles.main}>
        {statusLed == "on" ? (
          <View style={styles.boxLightOn}>
            <Ionicons name="bulb" size={64} color="orange" />
          </View>
        ) : (
          <View style={styles.boxLightOff}>
            <Ionicons name="bulb" size={64} color="grey" />
          </View>
        )}
        <View style={styles.controlGroup}>
          <TouchableOpacity
            style={[styles.btnOff, styles.btn]}
            onPress={() => handleButtonOff()}
          >
            <Text style={styles.btnText}>OFF</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnOn, styles.btn]}
            onPress={() => handleButtonOn()}
          >
            <Text style={styles.btnText}>ON</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subTitle}>Temperature: {temperature} °C</Text>
        <Text style={styles.subTitle}>Humidity: {humidity} %</Text>
        <Text style={styles.subTitle}>{msg}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLedView: {
    flex: 1,
    backgroundColor: "#212121",
    padding: 15,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontStyle: "bold",
    color: "orange",
  },
  subTitle: {
    fontSize: 20,
    fontStyle: "bold",
    color: "white",
  },
  main: {
    flex: 5,
    marginTop: 30,
    alignItems: "center",
  },
  controlGroup: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  btn: {
    alignItems: "center",
    width: 100,
    marginBottom: 5,
    marginTop: 5,
    justifyContent: "center",
    marginRight: 15,
    padding: 15,
    borderRadius: 5,
  },
  btnOn: {
    backgroundColor: "blue",
  },
  btnOff: { backgroundColor: "red" },
  btnText: {
    color: "#FFFFFF",
  },
  boxLightOff: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    padding: 15,
  },
  boxLightOn: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "orange",
    padding: 15,
  },
});

export default TurnOnOffLedScreen_Mqtt;