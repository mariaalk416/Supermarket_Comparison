import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ setIsAuthenticated }) => {
    const handleSignOut = async () => {
      try {
        await AsyncStorage.removeItem('loginname'); // Clear user session
        setIsAuthenticated(false); // Update authentication state
        Alert.alert('Signed Out', 'You have been signed out.');
      } catch (error) {
        console.error('Error during sign-out:', error);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.text }>Settings Page</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    },
    text: {
    marginTop: 10,
    fontSize: 16,
    color: '#6b6b6b',
    },
    signOutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#34c2b3',
    borderRadius: 5,
    },
    signOutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    },
});

export default Settings;
