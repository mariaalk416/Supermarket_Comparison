import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, NavigationIndependentTree  } from '@react-navigation/native';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Index from './index';
import AppStack from './AppStack';

const RootLayout = () => {
  return (
    <NavigationIndependentTree>
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <ContentContainer>
          <Stack screenOptions={{
            headerShown: false, 
          }}/>
        </ContentContainer>
      </SafeAreaView>
    </NavigationContainer>
    </NavigationIndependentTree>
  );
};

// Styled Components for Layout
const Header = styled.View`
  background-color: #007bff;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

const ContentContainer = styled.View`
  flex: 1;
  background-color: #f7f7f7;
`;

export default RootLayout;