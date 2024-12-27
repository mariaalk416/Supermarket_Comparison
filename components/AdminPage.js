import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const AdminPage = ({ route }) => {
  const [productName, setProductName] = useState('');
  const [storePrice, setStorePrice] = useState('');
  const [productList, setProductList] = useState(route.params?.products || []);

  const handleAddProduct = () => {
    if (!productName.trim() || !storePrice.trim()) {
      alert('Please enter both product name and store price.');
      return;
    }

    const newProduct = { name: productName, price: storePrice };
    setProductList((prev) => [...prev, newProduct]);
    setProductName('');
    setStorePrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin - Add Products</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Price (e.g., Store A - $10)"
          value={storePrice}
          onChangeText={setStorePrice}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={productList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productText}>{item.name}</Text>
            <Text style={styles.productText}>{item.price}</Text>
          </View>
        )}
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#34c2b3',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  productText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AdminPage;
