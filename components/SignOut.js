/*import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Clear user session
      await AsyncStorage.removeItem('loginname');
      Alert.alert('Success', 'You have been signed out.');
      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Error during sign-out:', error);
      Alert.alert('Error', 'Something went wrong while signing out.');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#34c2b3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignOut;*/