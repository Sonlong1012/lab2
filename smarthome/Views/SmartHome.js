import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Thay 'FontAwesome' bằng font icon bạn muốn sử dụng
import axios from 'axios';
import { text } from '@fortawesome/fontawesome-svg-core';


const HomeIcon = () => {

const [data,setData] = useState([]);

  useEffect(() => {

    // gọi api
    axios.get("http:/10.106.21.140:50555/getAllFarms")
    .then(respone => {
      console.log(respone.data)
      setData(respone.data)
    })
    .catch(error => console.log(error));
    }, []);
    
    const handleButtonOn = async () => {
      try {
      const result = await fetch('http://10.106.21.140/turnonLed');
      console.log('done');
      } catch (error) {
      console.error(error);
      }
      }
      const handleButtonOff = async () => {
        try {
        const result = await fetch('http://10.106.21.140/turnoffLed');
        console.log('done');
        } catch (error) {
        console.error(error);
        }
        }
      
  return (
            <View style={styles.container}>
      <Icon name="home" size={30} color="yellow" />
      <Text style={styles.text}>SMART HOME</Text>
      <Text style={styles.text}>ON / OFF LIGHT</Text>
      <View style={styles.main}>
<Pressable style={styles.btnOn} onPress={() =>
handleButtonOn()} >
<Text style={styles.btnText}> ON </Text>
</Pressable>
<Pressable style={styles.btnOff} onPress={() => handleButtonOff()}>
<Text style={styles.btnText}> OFF </Text>
</Pressable>
</View>
 <View>
      {data.map((item) => (

        <Text>
           {item.tensanpham}
        </Text>       
     )
       )}   
    </View> 
    </View>
);
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
   backgroundColor: '#424242',
    justifyContent: 'center',
},
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10, // Khoảng cách giữa biểu tượng và văn bản
  },
  main: {
    
  justifyContent: 'space-around',  // Tạo khoảng trắng đều ở cả hai bên của mỗi nút
  paddingHorizontal: 40,
  },
  
  btnOn: {
    backgroundColor: 'blue',
    width: '100%',
    color: '#FFF',
    marginBottom: 5,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    },
    btnOff: {
    backgroundColor: 'red',
    width: '100%',
    color: '#FFF',
    marginBottom: 5,
    marginTop: 5,
    marginRight:60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    },
    btnText: {
    color: '#FFF'
    }
});

export default HomeIcon;
