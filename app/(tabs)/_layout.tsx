import React, { useState, useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import HomePage from '../../components/Homepage';
import LoginPage from '@/components/LoginPage';
import AdminPage from '@/components/AdminPage';
import SettingsPage from '@/components/Settings';
import Cart from '@/components/Cart';
import DropDown from '@/components/DropDown';
import styled from 'styled-components/native';
import Map from '@/components/Map';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingWizard from '@/components/Wizard';
import WishlistPage from '@/components/WishlistPage';


interface Preferences {
  supermarket: string[];
  categories: string[];
}



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface TabsLayoutProps {
  preferences: Preferences;
  setIsAuthenticated: (value: boolean) => void;
}
const TabsLayout: React.FC<TabsLayoutProps> = ({ preferences, setIsAuthenticated }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          paddingBottom: 10,
          height: 65,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'circle';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Settings') iconName = 'cog';
          else if (route.name === 'Admin') iconName = 'shield';
          else if (route.name === 'Cart') iconName = 'shopping-cart';
          else if (route.name === 'Map') iconName = 'map';

          return <Icon name={iconName} type="font-awesome" color={color} size={size} />;
        },
        tabBarActiveTintColor: '#34c2b3',
        tabBarInactiveTintColor: '#6b6b6b',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomePage {...props} preferences={preferences} />}
      </Tab.Screen>
      <Tab.Screen name="Admin" component={AdminPage} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Settings">
        {() => <SettingsPage setIsAuthenticated={setIsAuthenticated} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  let token: string | undefined;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo Push Token:', token);
  return token;
}

const registerPushToken = async (token: string, userIdentifier: string) => {
  try {
    const response = await fetch('http://192.168.1.105:5003/register-push-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userIdentifier }),
    });
    const data = await response.json();
    if (data.success) {
      console.log('Push token registered successfully:', data.message);
    } else {
      console.error('Failed to register push token:', data.error);
    }
  } catch (error) {
    console.error('Error registering push token:', error);
  }
};

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    console.log('Calling registerForPushNotificationsAsync'); // Debugging
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        console.log('Push token received:', token); // Debugging
        registerPushToken(token, 'rperson416@gmail.com'); 
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('User tapped on notification:', response);
    });

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      const loginName = await AsyncStorage.getItem('loginname');
      if (loginName) {
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Main"
            options={{ headerShown: false }}
            children={() => <TabsLayout setIsAuthenticated={setIsAuthenticated} preferences={preferences} />}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            children={(props) => (
              <LoginPage {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          />
        </>
      )}
      <Stack.Screen
        name="Wizard"
        component={OnboardingWizard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomePage}
      />
    </Stack.Navigator>
  );
};

export default TabsLayout;