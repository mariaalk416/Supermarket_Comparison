import React, { useState, useEffect } from 'react';
import { 
  NavigationContainer,
  DrawerActions,
  useNavigation, 
  NavigationIndependentTree
} from '@react-navigation/native';
import { 
  createStackNavigator
} from '@react-navigation/stack';
import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem 
} from '@react-navigation/drawer';
import AntDesign from '@expo/vector-icons/AntDesign';
import { 
  Image, 
  Text, 
  StyleSheet, 
  View, 
  ActivityIndicator,
  TouchableOpacity 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
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
import SettingsPage from '@/components/Settings'; 

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
const Drawer = createDrawerNavigator();

const HeaderWithLogo = () => (
  <View style={styles.headerContainer}>
    <Image source={require('../assets/images/supermarket-logo.png')} style={styles.logo} />
    <Text style={styles.appName}>ShopSmart</Text>
  </View>
);

function CustomHeader() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute',
          right: 350,
          transform: [{ translateY: -10 }], display: navigation.canGoBack() ? 'flex' : 'none' }}
      >
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <View style={styles.menuIcon}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </View>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/supermarket-logo.png')} style={styles.logo} />
        <Text style={styles.appName}>ShopSmart</Text>
      </View>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <DrawerItem
        label="Wishlist"
        onPress={() => props.navigation.navigate('Wishlist')}
        labelStyle={styles.drawerLabel}
      />
      <DrawerItem
        label="Leaflets"
        onPress={() => props.navigation.navigate('Leaflets')}
        labelStyle={styles.drawerLabel}
      />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('Settings')}
        labelStyle={styles.drawerLabel}
      />
    </DrawerContentScrollView>
  );
}
const Index = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    supermarket: [],
    categories: []
  });

  const [authState, setAuthState] = useState<AuthState>(AuthState.UNKNOWN);
  const [loading, setLoading] = useState(true);
  const [shouldNavigateToWizard, setShouldNavigateToWizard] = useState(false);
  const [stores, setStores] = useState(['Sklavenitis', 'Lidl', 'Alphamega', 'Poplife']);
  const [productNames, setProductNames] = useState([
    'Apple Juice',
    'Orange Juice',
    'Whole Milk',
    'Delact Milk',
    'Bread',
    'Edam Cheese',
    'Gouda Cheese',
    'Halloumi',
    'Eggs',
    'Greek Yogurt',
    'Greek Delact Yogurt',
    'Pasta',
    'Butter',
    'Tomato Sauce',
    'Chicken',
  ]);
  const [categories, setCategories] = useState(['Pasta', 'Juices', 'Bread', 'Dairy', 'Fruits', 'Vegetables']);
  const [wizardPreferences, setWizardPreferences] = useState<Preferences>({
    supermarket: [], 
    categories: [] 
  });

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

  useEffect(() => {
    const loadPrefs = async () => {
      try {
        const prefs = await AsyncStorage.getItem('userPreferences');
        if (prefs) {
          setPreferences(JSON.parse(prefs));
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    };
    loadPrefs();
  }, []);

  if (loading || authState === AuthState.UNKNOWN) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <NavigationIndependentTree>
    <NavigationContainer>
      {authState === AuthState.AUTHENTICATED ? (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            header: () => <CustomHeader />,
            drawerPosition: 'right',
            swipeEnabled: true,
          }}
        >
          {/* All your authenticated screens */}
          {shouldNavigateToWizard ? (
            <Drawer.Screen
              name="Wizard">
              {(props) => (
                <OnboardingWizard
                  {...props}
                  wizardCompleted={(prefs: Preferences) => {
                    console.log('Wizard finished with preferences:', prefs);
                    setPreferences(prefs);
                    AsyncStorage.setItem('userPreferences', JSON.stringify(prefs));
                    setShouldNavigateToWizard(false);
                  }}
                  stores={stores}
                  categories={categories}
                />
              )}
            </Drawer.Screen>
          ) : (
            <>
              <Drawer.Screen name="TabsLayout">
                {(props) => (
                  <TabsLayout
                    {...props}
                    preferences={preferences}
                    setIsAuthenticated={(value) => 
                      setAuthState(value ? AuthState.AUTHENTICATED : AuthState.NOT_AUTHENTICATED)
                    }
                  />
                )}
              </Drawer.Screen>
                <Drawer.Screen name="Home">
                  {(props) => <HomePage {...props} preferences={preferences} />}
                </Drawer.Screen>
                <Drawer.Screen 
                  name="Wishlist" 
                  options={{ title: 'Preferences' }}
                >
                  {(props) => (
                    <WishlistPage
                      {...props}
                      preferences={preferences}
                      setPreferences={(newPrefs) => {
                        setPreferences(newPrefs);
                        AsyncStorage.setItem('userPreferences', JSON.stringify(newPrefs));
                      }}
                    />
                  )}
                </Drawer.Screen>
                <Drawer.Screen 
                  name="Leaflets" 
                  component={LeafletPage} 
                  options={{ title: 'Leaflets' }} 
                />
                <Drawer.Screen 
                  name="ComparePrices" 
                  options={{ title: 'Compare Prices' }}
                  children={(props) => (
                    <ComparePage 
                      {...props} 
                      preferences={wizardPreferences}
                    />
                  )}
                />
                <Drawer.Screen 
                  name="ProductPage" 
                  component={ProductPage} 
                  options={{ title: 'Product Page' }} 
                />
                <Drawer.Screen 
                  name="Cart" 
                  component={Cart} 
                  options={{ title: 'Cart' }} 
                />
                <Drawer.Screen 
                  name="Map" 
                  component={Map} 
                  options={{ title: 'Map' }} 
                />
                <Drawer.Screen
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
                <Drawer.Screen
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
                <Drawer.Screen
                  name="Search"
                  component={SearchPage}
                  options={{ title: 'Search' }}
                />
                <Drawer.Screen
                  name="Settings"
                  component={SettingsPage}
                  options={{ title: 'Settings' }}
                />
                
                </>
          )}
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{
              headerTitle: () => <HeaderWithLogo />,
              headerStyle: { backgroundColor: '#34c2b3' },
              headerTitleAlign: 'center'
            }}
          >
            {(props) => (
              <LoginPage
                {...props}
                setIsAuthenticated={() => {
                  setAuthState(AuthState.AUTHENTICATED);
                  setShouldNavigateToWizard(true);
                }}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
    </NavigationIndependentTree>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 6, 
    backgroundColor: '#34c2b3',
    height: 85, 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,  
    height: 24,
    marginRight: 9,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuIcon: {
    width: 25, 
    height: 20,
    justifyContent: 'space-between',
    marginRight: 12,
    position: 'absolute',
    left: 220,
    transform: [{ translateY: -25 }]
  },
  menuLine: {
    right: 3,
    height: 2,
    width: 20,
    backgroundColor: '#fff',
    marginVertical: 2,
  },
});

export default Index;