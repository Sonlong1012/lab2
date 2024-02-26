import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";

const SmartHome = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    //goi duong api
    axios.get("http://192.168.100.2:3333/getAllRooms")
    .then(response => {
      //in ra du lieu tra ve
      console.log(response.data);
      setData(response.data);
    })
    .catch(error=>console.log(error))
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="home" style={styles.icon} size={50} />
        <Text style={styles.txtTitle}>SmartHome</Text>
        <Text style={styles.txtSubTitle}>List Rooms</Text>
      </View>
      <View style={styles.main}>
        {data.map((item) => (
          <View style={styles.itemBox} key={item.name}>
            <TouchableOpacity>
             <Image
                style={styles.img}
                source={require("../assets/" + item.image)} // Sử dụng require trực tiếp
              />
              
            </TouchableOpacity>
            <View>
              <Text style={styles.itemText1}>{item.name}</Text>
              <Text style={styles.itemText2}>{item.description}</Text>
            </View>
          </View>
        )
        )}
      </View>
      <View style={styles.footer}>
        <Text>THCNTT</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#424242',
    //     justifyContent: 'flex-start'
    //     },
    container: {
        flex: 1,
        backgroundColor: '#ffffff', // Set your background color
        justifyContent: 'flex-start'
      },
      header: {
        // Add styles for your header
      },
      icon: {
        // Add styles for your icon
      },
      txtTitle: {
        // Add styles for your title
      },
      txtSubTitle: {
        // Add styles for your subtitle
      },
      main: {
        // Add styles for your main content
      },
      itemBox: {
        // Add styles for each item box
      },
      img: {
        width: 100,
        height: 100,
        resizeMode: 'cover', // or 'contain' based on your requirement
      },
      itemText1: {
        // Add styles for your item text 1
      },
      itemText2: {
        // Add styles for your item text 2
      },
      footer: {
        // Add styles for your footer
      },
});

export default SmartHome;