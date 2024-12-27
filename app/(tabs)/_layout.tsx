import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../../components/Homepage'; 
import LoginPage from '@/components/LoginPage';
import ComparePage from '@/components/ComparePage';
import LeafletPage from '@/components/LeafletPage';
import WishlistPage from'@/components/WishlistPage';
import { Icon } from 'react-native-elements';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

// Placeholder Component for another tab
const SettingsPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Page</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'circle'; // Default icon

          // Determine the icon name based on the route name
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }else if (route.name === 'Login') {
            iconName = 'sign-in'; // Icon for the Login tab
          }

          return <Icon name={iconName} type="font-awesome" color={color} size={size} />;
        },
        tabBarActiveTintColor: '#34c2b3', // Color when tab is active
        tabBarInactiveTintColor: '#6b6b6b', // Color when tab is inactive
        headerShown: false, // Hide the header for all tabs to keep it clean
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
      <Tab.Screen
        name="Login"
        options={{ tabBarLabel: 'Login' }}
        children={(props) => (
          <LoginPage
            {...props}
            setIsAuthenticated={() => console.log('Login Triggered')}
          />
        )}
      />
    </Tab.Navigator>
  );
};

export default TabsLayout;
