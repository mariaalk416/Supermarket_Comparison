import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const ComparePage = ({ preferences }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('products');
      const parsed = stored ? JSON.parse(stored) : [];
      const valid = parsed.filter(p => p.name && p.store && p.price && p.id);

      setProducts(valid);
      setCategories([...new Set(valid.map(p => p.category))]);

      filterProducts(valid, preferences.supermarket, preferences.categories);
    } catch {
      Alert.alert('Error', 'Failed to load products.');
    }
  }, [preferences]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filterProducts = (productList, selectedSupermarkets, selectedCategories) => {
    const filtered = productList.filter(
      (p) =>
        selectedSupermarkets.includes(p.store) && 
        (selectedCategories.length === 0 || selectedCategories.includes(p.category))
    );
    setFilteredProducts(filtered);
  };


  const filterByCategory = useCallback(
    (cat) => {
      setSelectedCategory(cat);
      const updatedList = products.filter(
        (p) =>
          preferences.supermarket.includes(p.store) &&
          (cat ? p.category === cat : true) &&
          (preferences.categories.length === 0 || preferences.categories.includes(p.category))
      );
      setFilteredProducts(updatedList);
    },
    [products, preferences]
  );

  const dropdownItems = useMemo(
    () => [{ label: 'All Categories', value: null }, ...categories.map(c => ({ label: c, value: c }))],
    [categories]
  );

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
    <View style={styles.container}>
      <Text style={styles.header}>Compare Prices</Text>
      <Text>Preferred Supermarkets: {preferences.supermarket.join(', ')}</Text>
      <Text>Categories: {preferences.categories.join(', ')}</Text>

      <DropDownPicker
        open={categoryDropdownOpen}
        value={selectedCategory}
        items={dropdownItems}
        setOpen={setCategoryDropdownOpen}
        setValue={setSelectedCategory}
        onChangeValue={filterByCategory}
        placeholder="Filter by Category"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productCategory}>{item.category}</Text>
              <Text style={styles.productPrice}>€{item.price}</Text>
              <Text style={styles.productStore}>Store: {item.store}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No products available.</Text>}
      />
    </View>
  );
};

ComparePage.propTypes = {
  preferences: PropTypes.shape({
    supermarket: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#34c2b3',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  dropdownContainer: {
    borderWidth: 0,
    borderRadius: 8,
    elevation: 2,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productCategory: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#34c2b3',
    fontWeight: 'bold',
  },
  productStore: {
    fontSize: 14,
    color: '#999',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#34c2b3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ComparePage;
