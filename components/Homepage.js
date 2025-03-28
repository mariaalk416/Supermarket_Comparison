// import React from 'react';
// import styled from 'styled-components/native';
// import { ScrollView, TextInput, TouchableOpacity, Text, View, Image, ImageBackground } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as Animatable from 'react-native-animatable';


// import RealTimePriceIcon from '../assets/images/pic1.jpg';
// import PersonalizedIcon from '../assets/images/pic2.png';
// import CompareIcon from '../assets/images/pic3.jpg';
// import back from '../assets/images/backimage.jpg';

// const HomePage = ({ navigation, route}) => {
//   //const { preferences } = route.params;
//   return (
//     <SafeAreaContainer edges={['left', 'right']}>
//       <ScrollContainer contentContainerStyle={{ flexGrow: 1, paddingBottom: 115 }}>
//         <ImageBackground
//           source={back}
//           resizeMode="cover"
//           style={{ width: '100%', borderRadius: 20, overflow: 'hidden' }}
//         >
//           <Overlay
//           >
//             <HeroContent>
//               <Title>Discover & Save with Supermarket Price Comparisons!</Title>
//               <SubTitle>
                
//               </SubTitle>
//               <TouchableOpacity onPress={() => navigation.navigate('Search')}
//                 activeOpacity={1}
//                 style={{ width: '100%' }}>
//                 <SearchBar>
//                   <SearchInput onPress={() => navigation.navigate('Search')}
//                 activeOpacity={0.8} placeholder="Search for products..." placeholderTextColor="#aaa"/>
//                   <SearchButton>
//                     <Icon name="search" size={20} color="#fff" />
//                   </SearchButton>
//                 </SearchBar>
//               </TouchableOpacity>
//             </HeroContent>
//           </Overlay>
//         </ImageBackground>
//         <FeaturesSection>
//           <AnimatedFeatureCard animation="fadeInUp" delay={300}>
//             <CardGradient colors={['#e0f7f9', '#ffffff']}>
//               <CardIcon source={RealTimePriceIcon} />
//               <FeatureContent>
//                 <FeatureTitle>Compare Prices</FeatureTitle>
//                 <FeatureDescription>
//                   Find the best prices to save money!
//                 </FeatureDescription>
//                 <CardButton style={{ 
//                   shadowColor: '#000', 
//                   shadowOffset: { width: 0, height: 2 }, 
//                   shadowOpacity: 0.25, 
//                   shadowRadius: 3.84 
//                   }} onPress={() => navigation.navigate('ComparePrices')}>
//                   <ButtonText>Compare!</ButtonText>
//                 </CardButton>
//               </FeatureContent>
//             </CardGradient>
//           </AnimatedFeatureCard>
//           <AnimatedFeatureCard animation="fadeInUp" delay={600}>
//             <CardGradient colors={['#e0f7f9', '#ffffff']}>
//               <CardIcon source={PersonalizedIcon} />
//               <FeatureContent>
//                 <FeatureTitle>Preferences</FeatureTitle>
//                 <FeatureDescription>
//                   Save your preferences.
//                 </FeatureDescription>
//                 <CardButton style={{ 
//                   shadowColor: '#000', 
//                   shadowOffset: { width: 0, height: 2 }, 
//                   shadowOpacity: 0.25, 
//                   shadowRadius: 3.84 
//                   }} onPress={() => navigation.navigate('Wishlist')}>
//                   <ButtonText>View Preferences</ButtonText>
//                 </CardButton>
//               </FeatureContent>
//             </CardGradient>
//           </AnimatedFeatureCard>
//           <AnimatedFeatureCard animation="fadeInUp" delay={900}>
//             <CardGradient colors={['#e0f7f9', '#ffffff']}>
//               <CardIcon source={CompareIcon} />
//               <FeatureContent>
//                 <FeatureTitle>Leaflets</FeatureTitle>
//                 <FeatureDescription>
//                   Browse supermarket leaflets for ongoing deals and discounts.
//                 </FeatureDescription>
//                 <CardButton style={{ 
//                   shadowColor: '#000', 
//                   shadowOffset: { width: 0, height: 2 }, 
//                   shadowOpacity: 0.25, 
//                   shadowRadius: 3.84 
//                   }} onPress={() => navigation.navigate('Leaflets')}>
//                   <ButtonText>View Leaflets</ButtonText>
//                 </CardButton>
//               </FeatureContent>
//             </CardGradient>
//           </AnimatedFeatureCard>
//         </FeaturesSection>
//       </ScrollContainer>
//     </SafeAreaContainer>
//   );
// };

// const SafeAreaContainer = styled(SafeAreaView)`
//   flex: 1;
//   background-color: #e0f7f9; 
// `;

// const ScrollContainer = styled(ScrollView)`
//   flex: 1;
//   padding: 20px;
// `;

// const HeroGradient = styled(LinearGradient)`
//   border-radius: 20px;
//   margin-bottom: 20px;
//   padding: 20px;
// `;
// const Overlay = styled.View`
//   background-color: rgba(210, 201, 201, 0.5);
//   padding: 40px 20px;
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;

// const HeroContent = styled(View)`
//   align-items: center;
// `;

// const Title = styled(Text)`
//   font-size: 28px;
//   font-weight: bold;
//   color:rgb(0, 0, 0); 
//   text-align: center;
//   margin-bottom: 10px;
// `;

// const SubTitle = styled(Text)`
//   font-size: 18px;
//   color: #6b6b6b; 
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const SearchBar = styled(View)`
//   flex-direction: row;
//   align-items: center;
//   width : 300px;
// `;

// const SearchInput = styled(TextInput)`
//   flex: 1;
//   background-color: #ffffff; 
//   padding: 10px;
//   border-top-left-radius: 25px;
//   border-bottom-left-radius: 25px;
//   color: #333;
//   elevation: 3;
// `;

// const SearchButton = styled(TouchableOpacity)`
//   padding: 10px;
//   background-color: #34c2b3; 
//   border-top-right-radius: 25px;
//   border-bottom-right-radius: 25px;
//   justify-content: center;
//   elevation: 3; 
// `;

// const FeaturesSection = styled(View)`
//   margin-top: 30px;
// `;

// const AnimatedFeatureCard = Animatable.createAnimatableComponent(styled(View)`
//   margin-bottom: 20px;
// `);

// const CardGradient = styled(LinearGradient)`
//   padding: 20px;
//   border-radius: 20px;
//   flex-direction: row;
//   align-items: center;
//   position: relative;
//   overflow: hidden;
//   elevation: 5;
//   border: 1px solid #e0f7f9;
// `;

// const CardIcon = styled(Image)`
//   width: 60px;
//   height: 60px;
//   margin-right: 15px;
//   border-radius: 8px;
// `;

// const FeatureContent = styled(View)`
//   flex: 1;
// `;

// const FeatureTitle = styled(Text)`
//   font-size: 20px;
//   font-weight: bold;
//   margin-bottom: 5px;
//   color: #34c2b3; 
// `;

// const FeatureDescription = styled(Text)`
//   font-size: 14px;
//   color: #6b6b6b; 
//   margin-bottom: 10px;
// `;

// const CardButton = styled(TouchableOpacity)`
//   padding: 10px 15px;
//   border-radius: 25px;
//   background-color: #fff; 
//   border: 1px solid #34c2b3; 
//   align-self: flex-start;
//   elevation: 5; /* For shadow support in Android */
// `;

// const ButtonText = styled(Text)`
//   font-size: 14px;
//   color: #34c2b3; 
//   font-weight: bold;
// `;

// export default HomePage;

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components/native';
import {
  Text, 
  TextInput,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

import back from '../assets/images/backimage.jpg';

const HomePage = ({ navigation, route }) => {
  // State initialization
  const [preferences, setPreferences] = useState({
    supermarket: [],
    categories: []
  });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownItems, setDropdownItems] = useState([
    { label: 'All Categories', value: null }
  ]);

  useEffect(() => {
    const updatedItems = [
      { label: 'Show All Products', value: null },
      ...preferences.categories.map(cat => ({
        label: cat,
        value: cat.trim().toLowerCase()
      }))
    ];
    setDropdownItems(updatedItems);
  }, [preferences.categories]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Load preferences
        const storedPrefs = await AsyncStorage.getItem('userPreferences');
        const prefs = storedPrefs ? JSON.parse(storedPrefs) : { supermarket: [], categories: [] };
        
        // 2. Load products
        const productsData = await AsyncStorage.getItem('products');
        const productsList = productsData ? JSON.parse(productsData) : [];
        
        // Update state
        setPreferences(prefs);
        setProducts(
          productsList
            .filter(p => p.name && p.store && p.price && p.id && p.category)
            .map(p => ({
              ...p,
              category: p.category.trim().toLowerCase()
            }))
        );
        
        // 3. Setup dropdown items
        const items = [
          { label: 'All Categories', value: null },
          ...prefs.categories.map(cat => ({ label: cat, value: cat }))
        ];
        setDropdownItems(items);
        
      } catch (error) {
        console.error('Error loading data:', error);
        Alert.alert('Error', 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [route.params]);

  const filterByCategory = (cat) => {
    console.log('Selected category:', cat);
    setSelectedCategory(cat);
  
    if (!cat) {
      const all = products.filter(p =>
        preferences.supermarket.includes(p.store)
      );
      console.log('All filtered:', all);
      setFilteredProducts(all);
      return;
    }
  
    const filtered = products.filter(p =>
      preferences.supermarket.includes(p.store) &&
      p.category === cat
    );
    console.log('Filtered by category:', filtered);
    setFilteredProducts(filtered);
  };


  const addToCart = async (product) => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const cart = storedCart ? JSON.parse(storedCart) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      Alert.alert('Added', 'Product added to cart');
    } catch {
      Alert.alert('Error', 'Failed to add product to cart');
    }
  };

  return (
    <SafeAreaContainer edges={['left', 'right']}> 
      <FlatList ListHeaderComponent={
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
      <Text>Preferred Supermarkets: {preferences.supermarket.join(', ')}</Text>
            <Text>Categories: {preferences.categories.join(', ')}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}
        activeOpacity={1}
        style={{ width: '100%', marginBottom: 20 }}>
        <SearchBar>
          <SearchInput 
            onPress={() => navigation.navigate('Search')}
            activeOpacity={0.8} 
            placeholder="Search for products..." 
            placeholderTextColor="#aaa"
          />
          <SearchButton>
            <Icon name="search" size={20} color="#fff" />
          </SearchButton>
        </SearchBar>
      </TouchableOpacity>
      
      
      <HeroBackground source={back} resizeMode="cover">
      <Overlay>
        <HeroContent>
          <HeroTitle>Discover & Save with Supermarket Price Comparisons!</HeroTitle>
        </HeroContent>
      </Overlay>
    </HeroBackground>
          
    <DropDownWrapper>
      <DropDownPicker
        open={dropdownOpen}
        value={selectedCategory}
        items={dropdownItems}
        setOpen={setDropdownOpen}
        setValue={setSelectedCategory}
        onChangeValue={filterByCategory}
        placeholder="Select a category"
        style={{
          backgroundColor: '#fff',
          borderRadius: 25,
          paddingHorizontal: 10,
          borderColor: '#ccc',
          elevation: 5,
        }}
        dropDownContainerStyle={{
          backgroundColor: '#fff',
          borderRadius: 10,
          borderColor: '#ccc',
          elevation: 5,
        }}
        zIndex={1000}
        zIndexInverse={3000}
      />
    </DropDownWrapper>
    </View>
    }

      data={filteredProducts}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={{ paddingHorizontal: 20 }}>
        <ProductCard>
          <ProductImage source={{ uri: item.image }} />
          <ProductDetails>
            <ProductName>{item.name}</ProductName>
            <ProductCategory>{item.category}</ProductCategory>
            <ProductPrice>€{item.price}</ProductPrice>
            <ProductStore>Store: {item.store}</ProductStore>
          </ProductDetails>
          <AddButton onPress={() => addToCart(item)}>
            <AddButtonText>Add</AddButtonText>
          </AddButton>
        </ProductCard>
      </View>
    )}
    ListEmptyComponent={
      <EmptyText>No products found matching your preferences.</EmptyText>
    }
    contentContainerStyle={{ paddingBottom: 100 }}
  />
</SafeAreaContainer>
  );
};

export default HomePage;


const Container = styled.View`
  flex: 1;
  background-color: #f4fefd;
  padding: 20px;
`;

const HeroBackground = styled(ImageBackground)`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #e0f7f9; 
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  padding: 20px;
`;

const Overlay = styled.View`
  background-color: rgba(210, 201, 201, 0.5);
  padding: 40px 20px;
  justify-content: center;
  align-items: center;
`;

const HeroContent = styled.View`
  align-items: center;
`;

const DropDownWrapper = styled.View`
  margin-top: 20px;
  z-index: 1000;
  elevation: 10;
`;

const HeroTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  text-align: center;
  margin-bottom: 15px;
`;


const ProductCard = styled.View`
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  elevation: 3;
  margin-bottom: 15px;
  align-items: center;
`;

const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 10px;
`;

const ProductDetails = styled.View`
  flex: 1;
`;

const ProductName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ProductCategory = styled.Text`
  font-size: 14px;
  color: #777;
`;

const ProductPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #34c2b3;
`;

const ProductStore = styled.Text`
  font-size: 14px;
  color: #999;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #34c2b3;
  padding: 8px 12px;
  border-radius: 5px;
`;

const AddButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;

const EmptyText = styled.Text`
  text-align: center;
  color: #999;
  margin-top: 20px;
`;

const SearchBar = styled(View)`
  flex-direction: row;
  align-items: center;
  width : 300px;
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
