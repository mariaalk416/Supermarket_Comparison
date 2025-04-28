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

import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

import back from '../assets/images/backimage.jpg';
import initialize from '../app/initProducts';
import { groupProductsByName } from '../app/groupProducts';

const HomePage = ({ navigation }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownItems, setDropdownItems] = useState([{ label: 'All Categories', value: null }]);
  const [preferences, setPreferences] = useState({ supermarket: [], categories: [] });

  const handleAddToWatchlist = async (product) => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      const storedWatchlist = await AsyncStorage.getItem('watchlist');
      const allProducts = storedProducts ? JSON.parse(storedProducts) : [];
      const currentWatchlist = storedWatchlist ? JSON.parse(storedWatchlist) : [];
  
      // Find all variants 
      const variants = allProducts.filter(p => p.name === product.name);
  
      // Merge current watchlist and variants, avoid duplicates (match by id)
      const mergedWatchlist = [...currentWatchlist];
  
      variants.forEach(variant => {
        const alreadyExists = mergedWatchlist.some(item => item.id === variant.id);
        if (!alreadyExists) {
          mergedWatchlist.push(variant);
        }
      });
  
      // Save updated watchlist locally
      await AsyncStorage.setItem('watchlist', JSON.stringify(mergedWatchlist));
  
      // Get user email
      const email = await AsyncStorage.getItem('loginname');
      if (!email) {
        Alert.alert('Error', 'User email not found. Please log in again.');
        return;
      }
  
      // prepare list of product IDs to send
      const watchlistIds = mergedWatchlist.map(item => item.id);
  
      // Send updated watchlist to server
      await fetch('http://192.168.1.103:5003/save-watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, watchlist: watchlistIds }),
      });
  
      Alert.alert('Success', 'Product(s) added to your watchlist.');
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      Alert.alert('Error', 'Failed to add product to watchlist.');
    }
  };
  
  const updateDropdownItems = useCallback((productsList) => {
    const uniqueCategories = [...new Set(productsList.map(p => p.category))];
    setDropdownItems([
      { label: 'All Categories', value: null },
      ...uniqueCategories.map(cat => ({
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        value: cat,
      })),
    ]);
  }, []);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      await initialize();
      const productsData = await AsyncStorage.getItem('products');
      const prefs = await AsyncStorage.getItem('userPreferences');

      if (productsData) {
        const productsList = JSON.parse(productsData);
        updateDropdownItems(productsList);

        if (prefs) {
          const parsedPrefs = JSON.parse(prefs);
          setPreferences(parsedPrefs);

          let filtered = [...productsList];
          if (parsedPrefs.supermarket.length > 0) {
            filtered = filtered.filter(p => parsedPrefs.supermarket.includes(p.store));
          }
          if (parsedPrefs.categories.length > 0) {
            filtered = filtered.filter(p => parsedPrefs.categories.includes(p.category));
          }

          filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          const grouped = groupProductsByName(filtered, parsedPrefs, null);
          setFilteredProducts(grouped);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  }, [updateDropdownItems]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useFocusEffect(
    useCallback(() => {
      const refreshPrefsAndData = async () => {
        try {
          const prefs = await AsyncStorage.getItem('userPreferences');
          const productData = await AsyncStorage.getItem('products');

          if (prefs && productData) {
            const parsedPrefs = JSON.parse(prefs);
            const parsedProducts = JSON.parse(productData);

            let filtered = [...parsedProducts];

            if (parsedPrefs.supermarket.length > 0) {
              filtered = filtered.filter(p => parsedPrefs.supermarket.includes(p.store));
            }

            if (parsedPrefs.categories.length > 0) {
              filtered = filtered.filter(p => parsedPrefs.categories.includes(p.category));
            }

            updateDropdownItems(filtered);


            if (selectedCategory) {
              filtered = filtered.filter(p => p.category === selectedCategory);
            }

            filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));


            const grouped = groupProductsByName(filtered, parsedPrefs, selectedCategory);
            setFilteredProducts(grouped);
          }
        } catch (e) {
          console.warn('Error refreshing preferences or product data', e);
        }
      };

      refreshPrefsAndData();
    }, [selectedCategory])
  );

  const filterByCategory = (category) => {
    setSelectedCategory(category);
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

  if (isLoading) {
    return (
      <SafeAreaContainer>
        <ActivityIndicator size="large" color="#34c2b3" />
      </SafeAreaContainer>
    );
  }

  return (
    <SafeAreaContainer edges={['left', 'right']}>
      <View>
        <HeaderContainer>
          <PreferencesText>
            Preferred Supermarkets: {preferences.supermarket.join(', ') || 'None selected'}
          </PreferencesText>

          <SearchContainer>
            <SearchInput 
              onPress={() => navigation.navigate('Search')}
              placeholder="Search for products..." 
              placeholderTextColor="#aaa"
            />
            <SearchButton onPress={() => navigation.navigate('Search')}>
              <Icon name="search" size={20} color="#fff" />
            </SearchButton>
          </SearchContainer>

          <HeroBackground source={back} resizeMode="cover">
            <Overlay>
              <HeroTitle>Discover & Save with Supermarket Price Comparisons!</HeroTitle>
            </Overlay>
          </HeroBackground>
        </HeaderContainer>
      </View>

      <View style={{ 
        paddingHorizontal: 20,
        marginBottom: 10,
        zIndex: 1000,
        elevation: 50
      }}>
        <DropDownPicker
          open={dropdownOpen}
          value={selectedCategory}
          items={dropdownItems}
          setOpen={setDropdownOpen}
          setValue={setSelectedCategory}
          onChangeValue={filterByCategory}
          placeholder="Select a category"
          style={dropdownStyles.picker}
          dropDownContainerStyle={dropdownStyles.dropdown}
          listMode="SCROLLVIEW"
        />
      </View>

      <FlatList
        contentContainerStyle={{ 
          paddingBottom: 100,
          paddingHorizontal: 20
        }}
        data={filteredProducts}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('ProductPage', { product: item })}
            style={{ marginBottom: 15 }}
          >
            <ProductCard>
              <ProductImage source={{ uri: item.image }} />
              <ProductDetails>
                <ProductName>{item.name}</ProductName>
                <ProductCategory>{item.category}</ProductCategory>
                <ProductPrice>€{item.minPrice.toFixed(2)}</ProductPrice>
                <ProductStore>Cheapest: {item.store}</ProductStore>
              </ProductDetails>
              <WatchlistButton onPress={() => handleAddToWatchlist(item)}>
                <AddButtonText>Watch</AddButtonText>
              </WatchlistButton>
            </ProductCard>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <EmptyContainer>
            <EmptyText>No products found matching your preferences.</EmptyText>
          </EmptyContainer>
        }
      />
    </SafeAreaContainer>
  );
};

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #e0f7f9;
`;

const HeaderContainer = styled.View`
  padding: 20px;
`;

const PreferencesText = styled.Text`
  margin-bottom: 10px;
  color: #555;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  background-color: #fff;
  padding: 10px 15px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  color: #333;
`;

const WatchlistButton = styled(TouchableOpacity)`
  background-color: #34c2b3;
  padding: 6px 12px;
  border-radius: 20px;
  margin-top: 8px;
  align-self: flex-start;
`;
const SearchButton = styled(TouchableOpacity)`
  padding: 10px 15px;
  background-color: #34c2b3;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  justify-content: center;
`;

const HeroBackground = styled(ImageBackground)`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const Overlay = styled.View`
  background-color: rgba(210, 201, 201, 0.5);
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const HeroTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #000;
  text-align-vertical: top;
  top: -20px;
`;

const dropdownStyles = {
  picker: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 15,
    borderColor: '#ccc',
    padding: 10,
    zIndex: 3000,
    elevation: 10,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    zIndex: 3000,
    elevation: 20,
  },
};

const ProductCard = styled.View`
  flex-direction: row;
  background-color: #fff;
  margin-horizontal: 20px;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
`;

const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 15px;
`;

const ProductDetails = styled.View`
  flex: 1;
`;

const ProductName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

const ProductCategory = styled.Text`
  font-size: 14px;
  color: #777;
  margin-bottom: 4px;
`;

const ProductPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #34c2b3;
  margin-bottom: 4px;
`;

const ProductStore = styled.Text`
  font-size: 14px;
  color: #999;
`;

const AddButton = styled(TouchableOpacity)`
  background-color: #34c2b3;
  padding: 8px 12px;
  border-radius: 5px;
  align-self: flex-start;
  margin-top: auto;
`;

const AddButtonText = styled(Text)`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;

const EmptyContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

const EmptyText = styled.Text`
  color: #999;
  font-size: 16px;
  text-align: center;
`;

export default HomePage;