import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../components/Homepage';

const Stack = createStackNavigator();

const HeaderWithLogo = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../assets/images/supermarket-logo.png')} style={styles.logo} />
      <Text style={styles.appName}>ShopSmart</Text>
    </View>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <HeaderWithLogo />, // Custom header
        headerStyle: {
          backgroundColor: '#34c2b3', // Header background color
        },
        headerTitleAlign: 'center', // Center the header content
      }}
    >
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AppStack;
