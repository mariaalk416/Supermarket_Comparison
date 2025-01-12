import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

const ManageDropdownsPage = ({ route, navigation }) => {
  const [newStore, setNewStore] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [stores, setStores] = useState(route.params?.stores || []);
  const [products, setProducts] = useState(route.params?.products || []);

  const handleAddStore = () => {
    if (!newStore.trim()) {
      alert('Please enter a store name.');
      return;
    }
    setStores((prev) => [...prev, newStore]);
    setNewStore('');
  };

  const handleAddProduct = () => {
    if (!newProduct.trim()) {
      alert('Please enter a product name.');
      return;
    }
    setProducts((prev) => [...prev, newProduct]);
    setNewProduct('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Dropdown Values</Text>

      {/* Add Store */}
      <TextInput
        style={styles.input}
        placeholder="Add Store Name"
        value={newStore}
        onChangeText={setNewStore}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddStore}>
        <Text style={styles.buttonText}>Add Store</Text>
      </TouchableOpacity>

      {/* Add Product */}
      <TextInput
        style={styles.input}
        placeholder="Add Product Name"
        value={newProduct}
        onChangeText={setNewProduct}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>

      {/* List of Stores */}
      <Text style={styles.sectionHeader}>Stores</Text>
      <FlatList
        data={stores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
      />

      {/* List of Products */}
      <Text style={styles.sectionHeader}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
      />
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
    marginVertical: 20,
    color: '#34c2b3',
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#34c2b3',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#555',
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  },
});

export default ManageDropdownsPage;
