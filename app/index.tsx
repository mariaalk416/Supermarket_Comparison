import React, { useState, useEffect } from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import HomePage from '../components/Homepage'; 
import LoginPage from '../components/LoginPage';
import ComparePage from '@/components/ComparePage';
import LeafletPage from '@/components/LeafletPage';
import WishlistPage from '@/components/WishlistPage';
import TabsLayout from './(tabs)/_layout';
import ManageDropdownsPage from '@/components/DropDown';
import ProductPage from "@/components/ProductPage";
import AdminPage from '../components/AdminPage';
import SearchPage from '@/components/Search';
import Cart from '@/components/Cart';
import Map from '@/components/Map';
import OnboardingWizard from '@/components/Wizard';

// Ignore specific logs
LogBox.ignoreLogs([
  'Error: Attempted to navigate before mounting the Root Layout component.',
]);

// Auth state enum
enum AuthState {
  UNKNOWN,
  NOT_AUTHENTICATED,
  AUTHENTICATED,
}

const Stack = createStackNavigator();

const Index = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.UNKNOWN);
  const [loading, setLoading] = useState(true);
  const [shouldNavigateToWizard, setShouldNavigateToWizard] = useState(false);
  const [products, setProducts] = useState([]);
  const [wizardPreferences, setWizardPreferences] = useState({
    supermarket: '',
    categories: []
  });

  // Clear AsyncStorage for testing (optional)
  useEffect(() => {
    const clearStorageForTesting = async () => {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared for testing purposes.');
    };

    clearStorageForTesting();
  }, []);

  // Check user authentication status
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

  // Show loading indicator while checking auth state
  if (loading || authState === AuthState.UNKNOWN) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // Header component with logo
  const HeaderWithLogo = () => {
    return (
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/supermarket-logo.png')} style={styles.logo} />
        <Text style={styles.appName}>ShopSmart</Text>
      </View>
    );
  };

  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: '' }}>
      {authState === AuthState.AUTHENTICATED ? (
        <>
          {shouldNavigateToWizard ? (
            <Stack.Screen
            name="Wizard"
            options={{ headerShown: false }}
            children={(props) => (
              <OnboardingWizard
                {...props}
                wizardCompleted={(preferences) => {
                  console.log('Wizard finished with preferences:', preferences);
                  setWizardPreferences(preferences);
                  setShouldNavigateToWizard(false);
                }}
              />
            )}
          />
          ) : (
            <>
              <Stack.Screen
                name="TabsLayout"
                component={TabsLayout}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={HomePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Wishlist" 
                options={{ title: 'Wishlist' }}
                children={(props) => (
                  <WishlistPage
                    {...props}
                    preferences={wizardPreferences}
                    setPreferences={setWizardPreferences}
                  />
                )}
               />
              <Stack.Screen name="Leaflets" component={LeafletPage} options={{ title: 'Leaflets' }} />
              <Stack.Screen name="ComparePrices" 
               options={{ title: 'Compare Prices' }}
               children={(props) => (
                <ComparePage 
                {...props} 
                preferences={wizardPreferences}
                 />
              )}
           />
              <Stack.Screen name="ProductPage" component={ProductPage} options={{ title: 'Product Page' }} />
              <Stack.Screen name="Cart" component={Cart} options={{ title: 'Cart' }} />
              <Stack.Screen name="Map" component={Map} options={{ title: 'Map' }} />
              <Stack.Screen
                name="Admin"
                component={AdminPage}
                initialParams={{ products, setProducts }}
                options={{ title: 'Admin Page' }}
              />
              <Stack.Screen
                name="ManageDropdownsPage"
                component={ManageDropdownsPage}
                options={{ title: 'Manage Dropdowns' }}
              />
              <Stack.Screen
                name="Search"
                component={SearchPage}
                options={{ title: 'Search' }}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            children={(props) => (
              <LoginPage
                {...props}
                setIsAuthenticated={() => {
                  setAuthState(AuthState.AUTHENTICATED);
                  setShouldNavigateToWizard(true); 
                }}
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