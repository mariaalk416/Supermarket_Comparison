import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, NavigationIndependentTree  } from '@react-navigation/native';
import { View, StyleSheet, Image, Text,} from 'react-native';
import styled from 'styled-components/native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Index from './index';
import AppStack from './AppStack';

const HeaderWithLogo = () => {
    return (
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/supermarket-logo.png')} style={styles.logo} />
        <Text style={styles.appName}>ShopSmart</Text>
      </View>
    );
  };

const RootLayout = () => {
  return (
    <NavigationIndependentTree>
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <ContentContainer>
          <Stack screenOptions={{
            headerTitle: () => <HeaderWithLogo />, 
            headerStyle: {
              backgroundColor: '#34c2b3',
            },
            headerTitleAlign: 'center',
          }}/>
        </ContentContainer>
      </SafeAreaView>
    </NavigationContainer>
    </NavigationIndependentTree>
  );
};



const ContentContainer = styled.View`
  flex: 1;
  background-color: #f7f7f7;
`;

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

export default RootLayout;