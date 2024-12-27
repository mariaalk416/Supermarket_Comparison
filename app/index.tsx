import React, { useState, useEffect } from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Text, StyleSheet } from 'react-native';
import HomePage from '../components/Homepage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from '../components/LoginPage';
import ComparePage from '@/components/ComparePage';
import LeafletPage from '@/components/LeafletPage';
import WishlistPage from'@/components/WishlistPage';
import TabsLayout from './(tabs)/_layout';
import { View, ActivityIndicator } from 'react-native';
import AppStack from './AppStack';
import AdminPage from '../components/AdminPage';

enum AuthState {
  UNKNOWN,
  NOT_AUTHENTICATED,
  AUTHENTICATED,
}

const Stack = createStackNavigator();

const Index = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.UNKNOWN);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

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

  const HeaderWithLogo = () => {
    return (
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/supermarket-logo.png')} style={styles.logo} />
        <Text style={styles.appName}>ShopSmart</Text>
      </View>
    );
  };
  
  return (
    <Stack.Navigator screenOptions={{
      headerTitle: () => <HeaderWithLogo />, // Custom header
      headerStyle: {
        backgroundColor: '#34c2b3', // Header background color
      },
      headerTitleAlign: 'center', // Center the header content
    }}
  >
      {authState === AuthState.AUTHENTICATED ? (
        <>
            {console.log('Rendering Home Stack')} 
        <Stack.Screen
          name="TabsLayout"
          component={TabsLayout}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Wishlist" component={WishlistPage} options={{ title: 'Wishlist' }} />
        <Stack.Screen name="Leaflets" component={LeafletPage} options={{ title: 'Leaflets' }} />
        <Stack.Screen name="ComparePrices" component={ComparePage} options={{ title: 'Compare Prices' }} />
        <Stack.Screen
              name="Admin"
              component={AdminPage}
              initialParams={{ products, setProducts }}
              options={{ title: 'Admin Page' }}
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

export default Index;
