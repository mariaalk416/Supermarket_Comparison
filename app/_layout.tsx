import { Slot } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationIndependentTree } from '@react-navigation/native';

const RootLayout = () => {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Slot />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default RootLayout;