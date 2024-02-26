import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SmartHome = () => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [isFanOn, setIsFanOn] = useState(false);
  const [isTvOn, setIsTvOn] = useState(false);

  const toggleLight = () => {
    setIsLightOn(previousState => !previousState);
  };

  const toggleFan = () => {
    setIsFanOn(previousState => !previousState);
  };

  const toggleTv = () => {
    setIsTvOn(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SMART HOME</Text>
      <Text style={styles.room}>Living Room</Text>

      {/* Light */}
      <View style={styles.deviceContainer}>
        <Icon name="bulb-outline" size={30} color={isLightOn ? '#F4D03F' : '#D3D3D3'} />
        <Text style={{ marginLeft: 5 }}>Light</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isLightOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLight}
          value={isLightOn}
        />
      </View>

      {/* Fan */}
      <View style={styles.deviceContainer}>
        <Icon name="snow-outline" size={30} color={isFanOn ? 'yellow' : '#D3D3D3'} />
        <Text style={{ marginLeft: 5 }}>Fan</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isFanOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleFan}
          value={isFanOn}
        />
      </View>

        {/* TV*/}
      <View style={styles.deviceContainer}>
        <Icon name="tv-outline" size={30} color={isTvOn ? 'yellow' : '#D3D3D3'} />
        <Text style={{ marginLeft: 5 }}>TV</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isTvOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTv}
          value={isTvOn}
        />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  deviceContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
});

export default SmartHome;
