import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../../components/Homepage';
import LoginPage from '@/components/LoginPage';
import AdminPage from '@/components/AdminPage';
import SettingsPage from '@/components/Settings';
import Cart from '@/components/Cart'
import DropDown from '@/components/DropDown';
import Map from '@/components/Map';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = ({ setIsAuthenticated }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = 'circle';

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Settings') {
          iconName = 'cog';
        } else if (route.name === 'Admin') {
          iconName = 'shield';
        } else if (route.name === 'Cart') {
          iconName = 'shopping-cart';
        }else if (route.name === 'Map'){
          iconName = 'map'
        }
        

        return <Icon name={iconName} type="font-awesome" color={color} size={size} />;
      },
      tabBarActiveTintColor: '#34c2b3',
      tabBarInactiveTintColor: '#6b6b6b',
      headerShown: false,
    })}
  >
    <Tab.Screen name = "Home" component={HomePage}/>
    <Tab.Screen name = "Admin" component={AdminPage}/>

    <Tab.Screen name = "Cart" component={Cart}/>
    <Tab.Screen name = "Map" component={Map}/>
    <Tab.Screen
      name = "Settings"
      children={() => <SettingsPage setIsAuthenticated={setIsAuthenticated} />}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {

    const handleLogin = async () => {
      try {
        await AsyncStorage.setItem('loginname', 'userSession'); 
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
  
    const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem('loginname');
        setIsAuthenticated(false);
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };
    
    const checkAuthentication = async () => {
      const loginName = await AsyncStorage.getItem('loginname');
      if (loginName) {
        setIsAuthenticated(true); 
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Stack.Navigator >
      {isAuthenticated ? (
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          children={() => <Tabs setIsAuthenticated={setIsAuthenticated} />}
        />
      ) : (
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          children={(props) => (
            <LoginPage {...props} setIsAuthenticated={setIsAuthenticated} />
          )}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;