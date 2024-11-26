import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from '../../components/LoginPage'; // Ensure the path is correct
import TabsLayout from './_layout'; // Ensure the path is correct
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Default to null (unknown state)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const loginName = await AsyncStorage.getItem('loginname');
        setIsAuthenticated(!!loginName); // Set true if loginname exists, false otherwise
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsAuthenticated(false); // Fail-safe: assume not logged in
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    checkUserAuthentication();
  }, []);

  // Show loading spinner while authentication status is checked
  if (loading || isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          // If authenticated, navigate to Home
          <Stack.Screen
            name="Home"
            component={TabsLayout}
            options={{ headerShown: false }}
          />
        ) : (
          // If not authenticated, navigate to Login
          <Stack.Screen
            name="LogIn"
            children={(props) => (
              <LoginPage {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
