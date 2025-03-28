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

LogBox.ignoreLogs([
  'Error: Attempted to navigate before mounting the Root Layout component.',
]);

enum AuthState {
  UNKNOWN,
  NOT_AUTHENTICATED,
  AUTHENTICATED,
}

interface Preferences {
  supermarket: string[];
  categories: string[];
}

const Stack = createStackNavigator();

const Index = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.UNKNOWN);
  const [loading, setLoading] = useState(true);
  const [shouldNavigateToWizard, setShouldNavigateToWizard] = useState(false);
  const [stores, setStores] = useState(['Sklavenitis', 'Lidl', 'Alphamega', 'Poplife']);
  const [productNames, setProductNames] = useState([
    'Apple Juice',
    'Orange Juice',
    'Milk',
    'Bread',
    'Cheese',
    'Eggs',
    'Yogurt',
    'Pasta',
    'Tomato Sauce',
    'Chicken',
  ]);
  const [categories, setCategories] = useState(['Pasta', 'Juices', 'Bread', 'Dairy', 'Fruits', 'Vegetables']);
  const [wizardPreferences, setWizardPreferences] = useState<Preferences>({
    supermarket: [], 
    categories: [] 
  });

  // Clear AsyncStorage for testing 
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


  if (loading || authState === AuthState.UNKNOWN) {
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
                  AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
                }}
                stores={stores}
                categories={categories}
              />
            )}
          />
          ) : (
            <>
              <Stack.Screen name="TabsLayout" options={{ headerShown: false }}>
                {(props) => (
                  <TabsLayout 
                    {...props} 
                    preferences={wizardPreferences}
                    setIsAuthenticated={(value: boolean) => {
                      setAuthState(value ? AuthState.AUTHENTICATED : AuthState.NOT_AUTHENTICATED);
                    }}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Home">
                {(props) => <HomePage {...props} preferences={wizardPreferences} />}
              </Stack.Screen>
              <Stack.Screen name="Wishlist" 
                options={{ title: 'Preferences' }}
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
                options={{ title: 'Admin Page' }}
                children={(props) => (
                  <AdminPage
                    {...props}
                    stores={stores}
                    products={productNames}
                    categories={categories}
                  />
                )}
              />
              <Stack.Screen
                name="ManageDropdownsPage"
                options={{ title: 'Manage Dropdowns' }}
                children={(props) => (
                  <ManageDropdownsPage
                    {...props}
                    stores={stores}
                    products={productNames}
                    categories={categories}
                    onDropdownUpdate={(updatedStores, updatedProducts, updatedCategories) => {
                      setStores(updatedStores);
                      setProductNames(updatedProducts);
                      setCategories(updatedCategories);
                    }}
                  />
                )}
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