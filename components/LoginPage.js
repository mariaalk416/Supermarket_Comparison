import React from 'react';
import styled from 'styled-components/native';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import { CommonActions } from '@react-navigation/native';

const LoginPage = ({ navigation, setIsAuthenticated }) => {
  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('loginname', 'userLogged'); // Save login info
      setIsAuthenticated(); // Update authentication state
      navigation.navigate('TabsLayout', { screen: 'Home' });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <SafeAreaContainer>
      <LoginScrollContainer contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        <LoginGradient
          colors={['#8ae1e6', '#34c2b3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 20, marginBottom: 40, padding: 30 }}
        >
          <LoginTitle>Welcome!</LoginTitle>
          <LoginSubTitle>Log in to continue comparing prices and saving big.</LoginSubTitle>
        </LoginGradient>

        <LoginForm>
          <InputField placeholder="Email" placeholderTextColor="#aaa" keyboardType="email-address" />
          <InputField placeholder="Password" placeholderTextColor="#aaa" secureTextEntry={true} />
          <LoginButton onPress={handleLogin}>
            <ButtonText>Login</ButtonText>
          </LoginButton>
        </LoginForm>

        <ForgotPassword>
          <Text>Forgot Password?</Text>
        </ForgotPassword>

        <RegisterLink>
          <RegisterText>Don't have an account? </RegisterText>
          <RegisterButton>
            <RegisterButtonText>Sign Up</RegisterButtonText>
          </RegisterButton>
        </RegisterLink>
      </LoginScrollContainer>
    </SafeAreaContainer>
  );
};

LoginPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

// Styled Components for React Native
const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #e0f7f9;
`;

const LoginScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const LoginGradient = styled(LinearGradient)`
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const LoginTitle = styled(Text)`
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-bottom: 10px;
`;

const LoginSubTitle = styled(Text)`
  font-size: 16px;
  color: #ffffff;
  text-align: center;
`;

const LoginForm = styled(View)`
  margin-top: 30px;
`;

const InputField = styled(TextInput)`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  color: #333333;
  elevation: 2; 
`;

const LoginButton = styled(TouchableOpacity)`
  background-color: #34c2b3;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonText = styled(Text)`
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
`;

const ForgotPassword = styled(TouchableOpacity)`
  align-self: center;
  margin-top: 10px;
`;

const ForgotPasswordText = styled(Text)`
  font-size: 14px;
  color: #34c2b3;
`;

const RegisterLink = styled(View)`
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
`;

const RegisterText = styled(Text)`
  font-size: 16px;
  color: #6b6b6b;
`;

const RegisterButton = styled(TouchableOpacity)`
`;

const RegisterButtonText = styled(Text)`
  font-size: 16px;
  color: #34c2b3;
  font-weight: bold;
`;

export default LoginPage;
