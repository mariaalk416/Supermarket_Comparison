import React, { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingWizard = ({ wizardCompleted, stores, categories }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    supermarket: [],
    categories: [],
  });

  const supermarkets = stores;
  const availableCategories = categories;

  const selectSupermarket = (market) => {
    const updatedSupermarkets = preferences.supermarket.includes(market)
      ? preferences.supermarket.filter(s => s !== market)
      : [...preferences.supermarket, market];
  
    setPreferences({ ...preferences, supermarket: updatedSupermarkets });
  };

  const toggleCategory = (category) => {
    const updated = preferences.categories.includes(category)
      ? preferences.categories.filter(c => c !== category)
      : [...preferences.categories, category];
    setPreferences({ ...preferences, categories: updated });
  };

  const nextStep = () => setStep(step + 1);

  const finishWizard = async () => {
    try {
      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
     
      wizardCompleted(preferences);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <SafeAreaContainer edges={['left', 'right']}>
      <ScrollContainer contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        {step === 1 ? (
          <WizardContainer>
            <Title>Select Your Preferred Supermarket</Title>
            {supermarkets.map((market) => (
              <OptionButton
                key={market}
                onPress={() => selectSupermarket(market)}
                selected={preferences.supermarket.includes(market)}
              >
                <OptionText selected={preferences.supermarket.includes(market)}>
                  {market}
                </OptionText>
              </OptionButton>
            ))}
            <WizardButton onPress={nextStep}>
              <ButtonText>Next</ButtonText>
            </WizardButton>
          </WizardContainer>
        ) : (
          <WizardContainer>
            <Title>Select Categories You’re Interested In</Title>
            {availableCategories.map((cat) => (
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
  wizardCompleted: PropTypes.func.isRequired,
  stores: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
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
