import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import { useRouter } from 'expo-router';
import EmailSubscriptionPopup from '@/components/EmailSubscriptionPopup';
import OnboardingWizard from '@/components/Wizard';
import AppNavigator from '@/app/(tabs)/_layout';

const LoginPage = ({  navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const checkSubscriptionStatus = async () => {
    const status = await AsyncStorage.getItem("emailSubscription");
    if (status === null) {
      setShowPopup(true);
    }
  };

  const handleSubscriptionChoice = async (choice) => {
    try {
      await AsyncStorage.setItem("emailSubscription", JSON.stringify(choice));
      setShowPopup(false); 
    } catch (error) {
      console.error("Error saving subscription choice:", error);
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : {};

      if (users[email] && users[email] === password) {
        Alert.alert('Success', 'Login successful!');
        await AsyncStorage.setItem('loginname', email);
        setIsAuthenticated();
        checkSubscriptionStatus(); 
        router.push('/Wizard');
      } else {
        Alert.alert('Error', 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleCreateAccount = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters with uppercase, lowercase, number, and symbol.');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : {};

      if (users[email]) {
        Alert.alert('Error', 'Email already registered. Please log in.');
      } else {
        users[email] = password;
        await AsyncStorage.setItem('users', JSON.stringify(users));
        Alert.alert('Success', 'Account created! You can now log in.');
        setIsCreatingAccount(false);
        checkSubscriptionStatus(); 
      }
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (isCreatingAccount) {
      handleCreateAccount();
    } else {
      handleLogin();
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
          <LoginTitle>{isCreatingAccount ? 'Create Account' : 'Welcome!'}</LoginTitle>
          <LoginSubTitle>
            {isCreatingAccount ? 'Sign up to start saving and comparing prices.' : 'Log in to continue comparing prices!'}
          </LoginSubTitle>
        </LoginGradient>

        <LoginForm>
          <InputField
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <LoginButton onPress={handleSubmit}>
            <ButtonText>{isCreatingAccount ? 'Sign Up' : 'Login'}</ButtonText>
          </LoginButton>
        </LoginForm>

        <ForgotPassword>
          <Text>Forgot Password?</Text>
        </ForgotPassword>

        <ToggleAccountType>
          <Text>{isCreatingAccount ? 'Already have an account? ' : "Don't have an account? "}</Text>
          <TouchableOpacity onPress={() => setIsCreatingAccount(!isCreatingAccount)}>
            <ToggleAccountTypeText>{isCreatingAccount ? 'Log In' : 'Sign Up'}</ToggleAccountTypeText>
          </TouchableOpacity>
        </ToggleAccountType>
      </LoginScrollContainer>

      {showPopup && <EmailSubscriptionPopup visible={showPopup} onClose={handleSubscriptionChoice} />}
    </SafeAreaContainer>
  );
};

LoginPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

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

const ToggleAccountType = styled(View)`
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
`;

const ToggleAccountTypeText = styled(Text)`
  font-size: 16px;
  color: #34c2b3;
  font-weight: bold;
`;

const ForgotPassword = styled(TouchableOpacity)`
  align-self: center;
  margin-top: 10px;
`;

export default LoginPage;
