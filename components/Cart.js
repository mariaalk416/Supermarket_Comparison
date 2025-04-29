import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [filteredCartItems, setFilteredCartItems] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);

  const loadCart = useCallback(async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
        setFilteredCartItems(parsedCart);
        const uniqueStores = [...new Set(parsedCart.map((item) => item.store))];
        setStores(uniqueStores);
      } else {
        setCartItems([]);
        setFilteredCartItems([]);
        setStores([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load cart items.');
      console.error('Error loading cart:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [loadCart])
  );

  const filterByStore = useCallback(
    (store) => {
      if (store === null) {
        setFilteredCartItems(cartItems);
      } else {
        setFilteredCartItems(cartItems.filter((item) => item.store === store));
      }
      setSelectedStore(store);
    },
    [cartItems]
  );

  const dropdownItems = useMemo(() => {
    return [
      { label: 'All Stores', value: null },
      ...stores.map((store) => ({ label: store, value: store })),
    ];
  }, [stores]);

  const totalPrice = useMemo(() => {
    return filteredCartItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      return sum + price;
    }, 0);
  }, [filteredCartItems]);

  const storeTotals = useMemo(() => {
    const totals = {};
  
    cartItems.forEach(item => {
      const store = item.store;
      const price = parseFloat(item.price) || 0;
      if (!totals[store]) {
        totals[store] = 0;
      }
      totals[store] += price;
    });
  
    return totals;
  }, [cartItems]);

  const cheapestStore = useMemo(() => {
    const entries = Object.entries(storeTotals);
    if (entries.length === 0) return null;
    
    return entries.reduce((min, curr) => (curr[1] < min[1] ? curr : min));
  }, [storeTotals]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cheapestStore && (
        <View style={styles.cheapestContainer}>
          <Text style={styles.cheapestText}>
            Cheapest: {cheapestStore[0]} ({cheapestStore[1].toFixed(2)}€)
          </Text>
        </View>
      )}

      <DropDownPicker
        open={storeDropdownOpen}
        value={selectedStore}
        items={dropdownItems}
        setOpen={setStoreDropdownOpen}
        setValue={setSelectedStore}
        onChangeValue={filterByStore}
        placeholder="Filter by Store"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <FlatList
        data={filteredCartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productStore}>Store: {item.store}</Text>
              <Text style={styles.productPrice}>{item.price}€</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in your cart.</Text>
        }
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {totalPrice.toFixed(2)}€</Text>
      </View>
    </View>
  );
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
  productStore: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#34c2b3',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 10,
    marginTop: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34c2b3',
  },
});

export default CartPage;
