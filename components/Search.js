import React, { useState, useEffect } from 'react';
import { FlatList, TextInput, TouchableOpacity, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { groupProductsByName } from '../app/groupProducts';

const SearchPage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsStr = await AsyncStorage.getItem('products');
        const products = productsStr ? JSON.parse(productsStr) : [];
        setAllProducts(products);
        const allStores = [...new Set(products.map(p => p.store))];
        const allCategories = [...new Set(products.map(p => p.category))];
        const grouped = groupProductsByName(products, {
          supermarket: allStores,
          categories: allCategories
        }, null);
        setGroupedProducts(grouped);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      (product.supermarket && product.supermarket.toLowerCase().includes(lowerCaseQuery)) ||
      (product.store && product.store.toLowerCase().includes(lowerCaseQuery))
    );
    const allStores = [...new Set(allProducts.map(p => p.store))];
    const allCategories = [...new Set(allProducts.map(p => p.category))];
    const grouped = groupProductsByName(filtered, {
      supermarket: allStores,
      categories: allCategories
    }, null);
    setGroupedProducts(grouped);
  };

  return (
    <SafeAreaContainer edges={['left', 'right', 'bottom']}>
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

      <ProductList>
        <FlatList
          data={groupedProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ProductPage', { product: item })}>
              <ProductCard>
                <ProductImage source={{ uri: item.image }} />
                <ProductDetails>
                  <ProductName>{item.name}</ProductName>
                  <ProductSupermarket>{item.store}</ProductSupermarket>
                  <ProductPrice>€{item.minPrice}</ProductPrice>
                </ProductDetails>
              </ProductCard>
            </TouchableOpacity>
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

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #f5f5f5;
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
