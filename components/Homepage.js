import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, TextInput, TouchableOpacity, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

// Importing local images
import RealTimePriceIcon from '../assets/images/pic1.jpg';
import PersonalizedIcon from '../assets/images/pic2.png';
import CompareIcon from '../assets/images/pic3.jpg';

const HomePage = () => {
  return (
    <SafeAreaContainer edges={['left', 'right', 'bottom']}>
      <ScrollContainer contentContainerStyle={{ flexGrow: 1, paddingBottom: 115 }}>
        <HeroGradient
          colors={['#8ae1e6', '#34c2b3']} // Updated gradient colors
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 20, marginBottom: 20, padding: 20 }}
        >
          <HeroContent>
            <Title>Discover & Save with Supermarket Price Comparisons!</Title>
            <SubTitle>
              Your ultimate tool to find the best deals, personalize your shopping, and maximize your savings.
            </SubTitle>
            <SearchBar>
              <SearchInput placeholder="Search for products..." placeholderTextColor="#aaa" />
              <SearchButton>
                <Icon name="search" size={20} color="#fff" />
              </SearchButton>
            </SearchBar>
          </HeroContent>
        </HeroGradient>
        <FeaturesSection>
          <AnimatedFeatureCard animation="fadeInUp" delay={300}>
            <CardGradient colors={['#e0f7f9', '#ffffff']}>
              <CardIcon source={RealTimePriceIcon} />
              <FeatureContent>
                <FeatureTitle>Real-Time Price Alerts</FeatureTitle>
                <FeatureDescription>
                  Get notified whenever your favorite products go on sale. Stay ahead of the price changes!
                </FeatureDescription>
                <CardButton>
                  <ButtonText>See Alerts</ButtonText>
                </CardButton>
              </FeatureContent>
            </CardGradient>
          </AnimatedFeatureCard>
          <AnimatedFeatureCard animation="fadeInUp" delay={600}>
            <CardGradient colors={['#e0f7f9', '#ffffff']}>
              <CardIcon source={PersonalizedIcon} />
              <FeatureContent>
                <FeatureTitle>Personalized Experience</FeatureTitle>
                <FeatureDescription>
                  Receive tailored recommendations based on your shopping habits and preferences.
                </FeatureDescription>
                <CardButton>
                  <ButtonText>Learn More</ButtonText>
                </CardButton>
              </FeatureContent>
            </CardGradient>
          </AnimatedFeatureCard>
          <AnimatedFeatureCard animation="fadeInUp" delay={900}>
            <CardGradient colors={['#e0f7f9', '#ffffff']}>
              <CardIcon source={CompareIcon} />
              <FeatureContent>
                <FeatureTitle>Compare Across Stores</FeatureTitle>
                <FeatureDescription>
                  Find the best prices across all major supermarkets, ensuring you always get the best deal.
                </FeatureDescription>
                <CardButton>
                  <ButtonText>Compare Prices</ButtonText>
                </CardButton>
              </FeatureContent>
            </CardGradient>
          </AnimatedFeatureCard>
        </FeaturesSection>
      </ScrollContainer>
    </SafeAreaContainer>
  );
};

// Styled Components for React Native
const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #e0f7f9; 
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  padding: 20px;
`;

const HeroGradient = styled(LinearGradient)`
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
`;

const HeroContent = styled(View)`
  align-items: center;
`;

const Title = styled(Text)`
  font-size: 28px;
  font-weight: bold;
  color: #333333; 
  text-align: center;
  margin-bottom: 10px;
`;

const SubTitle = styled(Text)`
  font-size: 18px;
  color: #6b6b6b; 
  text-align: center;
  margin-bottom: 20px;
`;

const SearchBar = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  background-color: #ffffff; 
  padding: 10px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  color: #333;
  elevation: 3;
`;

const SearchButton = styled(TouchableOpacity)`
  padding: 10px;
  background-color: #34c2b3; 
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  justify-content: center;
  elevation: 3; 
`;

const FeaturesSection = styled(View)`
  margin-top: 30px;
`;

const AnimatedFeatureCard = Animatable.createAnimatableComponent(styled(View)`
  margin-bottom: 20px;
`);

const CardGradient = styled(LinearGradient)`
  padding: 20px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  position: relative;
  overflow: hidden;
  elevation: 5; 
`;

const CardIcon = styled(Image)`
  width: 60px;
  height: 60px;
  margin-right: 15px;
`;

const FeatureContent = styled(View)`
  flex: 1;
`;

const FeatureTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #34c2b3; 
`;

const FeatureDescription = styled(Text)`
  font-size: 14px;
  color: #6b6b6b; 
  margin-bottom: 10px;
`;

const CardButton = styled(TouchableOpacity)`
  padding: 10px 15px;
  border-radius: 25px;
  border: 1px solid #34c2b3; 
  align-self: flex-start;
`;

const ButtonText = styled(Text)`
  font-size: 14px;
  color: #34c2b3; 
  font-weight: bold;
`;

export default HomePage;