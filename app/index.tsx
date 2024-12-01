import React, { useState, useEffect } from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from '../components/LoginPage';
import TabsLayout from './(tabs)/_layout';
import { View, ActivityIndicator } from 'react-native';

enum AuthState {
  UNKNOWN,
  NOT_AUTHENTICATED,
  AUTHENTICATED,
}

const Stack = createStackNavigator();

const Index = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.UNKNOWN);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clearStorageForTesting = async () => {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared for testing purposes.');
    };
  
    clearStorageForTesting();
  }, []);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const loginName = await AsyncStorage.getItem('loginname');
        if (loginName) {
          setAuthState(AuthState.AUTHENTICATED);
        } else {
          setAuthState(AuthState.NOT_AUTHENTICATED);
        }
      } catch (error) {
        setAuthState(AuthState.NOT_AUTHENTICATED);
      } finally {
        setLoading(false);
      }
    };

    checkUserAuthentication();
  }, []);

  console.log('Current authState:', authState);

  if (loading || authState === AuthState.UNKNOWN) {
    console.log('Loading authentication status...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {authState === AuthState.AUTHENTICATED ? (
        <>
            {console.log('Rendering Home Stack')} 
        <Stack.Screen
          name="TabsLayout"
          component={TabsLayout}
          options={{ headerShown: false }}
        />
        </>
      ) : (
        <>
            {console.log('Rendering Login Stack')}
        <Stack.Screen
          name="Login"
          children={(props) => (
            <LoginPage
              {...props}
              setIsAuthenticated={() => setAuthState(AuthState.AUTHENTICATED)}
            />
          )}
          options={{ headerShown: false }}
        />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Index;
