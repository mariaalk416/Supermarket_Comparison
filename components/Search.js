import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TextInput, TouchableOpacity, Text, View, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

// Dummy product data (replace with real data from your backend)
const dummyProducts = [
  { id: '1', name: 'Milk', price: '$2.50', supermarket: 'Supermarket A'},
  { id: '2', name: 'Bread', price: '$1.99', supermarket: 'Supermarket B'},
  { id: '3', name: 'milk', price: '$3.00', supermarket: 'Supermarket C' },
  { id: '4', name: 'Apples', price: '$4.50', supermarket: 'Supermarket A' },
  { id: '5', name: 'Chicken', price: '$8.99', supermarket: 'Supermarket B' },
];

const SearchPage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = dummyProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <SafeAreaContainer edges={['left', 'right', 'bottom']}>
      
        {/* Search Bar */}
        <SearchBar>
          <SearchInput
            placeholder="Search for products..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={handleSearch}
            style={{ width: '90%' }}
          />
          <SearchButton>
            <Icon name="search" size={20} color="#fff" />
          </SearchButton>
        </SearchBar>

        {/* Product List */}
        <ProductList>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard>
                <ProductImage source={item.image} />
                <ProductDetails>
                  <ProductName>{item.name}</ProductName>
                  <ProductSupermarket>{item.supermarket}</ProductSupermarket>
                  <ProductPrice>{item.price}</ProductPrice>
                </ProductDetails>
                <CompareButton onPress={() => navigation.navigate('ComparePrices', { product: item })}>
                  <ButtonText>Compare</ButtonText>
                </CompareButton>
              </ProductCard>
            )}
            ListEmptyComponent={
              <EmptyState>
                <EmptyStateText>No products found.</EmptyStateText>
              </EmptyState>
            }
          />
        </ProductList>
    </SafeAreaContainer>
  );
};

// Styled Components (reused from HomePage with additional styles)
const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #f5f5f5;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  padding: 20px;
`;

const SearchBar = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  background-color: #fff;
  padding: 12px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  color: #333;
  elevation: 3;
`;

const SearchButton = styled(TouchableOpacity)`
  padding: 12px 20px;
  background-color: #34c2b3;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  justify-content: center;
  elevation: 3;
`;

const ProductList = styled(View)`
  flex: 1;
`;

const ProductCard = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
  elevation: 3;
`;

const ProductImage = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 15px;
`;

const ProductDetails = styled(View)`
  flex: 1;
`;

const ProductName = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ProductSupermarket = styled(Text)`
  font-size: 14px;
  color: #666;
`;

const ProductPrice = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #34c2b3;
`;

const CompareButton = styled(TouchableOpacity)`
  padding: 10px 15px;
  border-radius: 25px;
  background-color: #34c2b3;
  elevation: 3;
`;

const ButtonText = styled(Text)`
  font-size: 14px;
  color: #fff;
  font-weight: bold;
`;

const EmptyState = styled(View)`
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const EmptyStateText = styled(Text)`
  font-size: 16px;
  color: #666;
`;

export default SearchPage;