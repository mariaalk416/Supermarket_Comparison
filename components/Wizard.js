import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import PropTypes from 'prop-types';


const OnboardingWizard = ({ wizardCompleted }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    supermarket: '',
    categories: []
  });

  const router = useRouter();

  const supermarkets = [
    'Sklavenitis',
    'Lidl',
    'Alpahmega',
    'Poplife'
  ];
  const categories = [
    'Pasta',
    'Bread',
    'Dairy',
    'Fruits',
    'Vegetables'
  ];

  const selectSupermarket = (market: string) => {
    setPreferences({ ...preferences, supermarket: market });
  };

  const toggleCategory = (category: string) => {
    const updated = preferences.categories.includes(category)
      ? preferences.categories.filter(c => c !== category)
      : [...preferences.categories, category];
    setPreferences({ ...preferences, categories: updated });
  };

  const nextStep = () => setStep(step + 1);
  
  const finishWizard = () => {
    wizardCompleted(preferences);
  };

  return (
    <SafeAreaContainer edges={['left', 'right']}>
      <ScrollContainer contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        {step === 1 && (
          <WizardContainer>
            <Title>Select Your Preferred Supermarket</Title>
            {supermarkets.map((market) => (
              <OptionButton
                key={market}
                onPress={() => selectSupermarket(market)}
                selected={preferences.supermarket === market}
              >
                <OptionText selected={preferences.supermarket === market}>
                  {market}
                </OptionText>
              </OptionButton>
            ))}
            <WizardButton onPress={nextStep}>
              <ButtonText>Next</ButtonText>
            </WizardButton>
          </WizardContainer>
        )}
        {step === 2 && (
          <WizardContainer>
            <Title>Select Categories You’re Interested In</Title>
            {categories.map((cat) => (
              <OptionButton
                key={cat}
                onPress={() => toggleCategory(cat)}
                selected={preferences.categories.includes(cat)}
              >
                <OptionText selected={preferences.categories.includes(cat)}>
                  {cat}
                </OptionText>
              </OptionButton>
            ))}
            <WizardButton onPress={finishWizard}>
              <ButtonText>Finish</ButtonText>
            </WizardButton>
          </WizardContainer>
        )}
      </ScrollContainer>
    </SafeAreaContainer>
  );
};

OnboardingWizard.propTypes = {
    wizardCompleted : PropTypes.func.isRequired 
};

  
export default OnboardingWizard;


const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #e0f7f9;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  padding: 20px;
`;

const WizardContainer = styled(View)`
  width: 100%;
  align-items: center;
`;

const Title = styled(Text)`
  font-size: 28px;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;
`;

const OptionButton = styled(TouchableOpacity)`
  padding: 12px;
  border: 1px solid #34c2b3;
  border-radius: 10px;
  margin: 5px;
  width: 80%;
  align-items: center;
  background-color: ${props => (props.selected ? '#34c2b3' : '#ffffff')};
`;

const OptionText = styled(Text)`
  font-size: 16px;
  color: ${props => (props.selected ? '#ffffff' : '#34c2b3')};
`;

const WizardButton = styled(TouchableOpacity)`
  padding: 12px 20px;
  border-radius: 25px;
  background-color: #34c2b3;
  margin: 10px;
  align-self: center;
`;

const ButtonText = styled(Text)`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;
