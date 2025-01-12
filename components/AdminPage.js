import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AdminPage = ({ route }) => {
  const [productName, setProductName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storePrice, setStorePrice] = useState('');
  const [productList, setProductList] = useState(route.params?.products || []);
  const [stores, setStores] = useState(route.params?.stores || ['Store A', 'Store B']);
  const [products, setProducts] = useState(route.params?.productNames || ['Product X', 'Product Y']);

  const handleAddProduct = () => {
    if (!productName.trim() || !storeName.trim() || !storePrice.trim()) {
      alert('Please select product, store, and price.');
      return;
    }

    const newProduct = { name: productName, store: storeName, price: storePrice };
    setProductList((prev) => [...prev, newProduct]);
    setStorePrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin - Add Products</Text>
      <TouchableOpacity 
          style={styles.manageButton}
          onPress={() => navigation.navigate('ManageDropdownsPage', { stores, products })}
        >
        <Text style={styles.buttonText}>Manage Dropdowns</Text>
        </TouchableOpacity>
      <View style={styles.inputContainer}>
        {/* Navigation Button */}
        
        {/* Product Dropdown */}
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={productName}
            style={styles.picker}
            onValueChange={(itemValue) => setProductName(itemValue)}
          >
            <Picker.Item label="Select Product" value="" />
            {products.map((product, index) => (
              <Picker.Item key={index} label={product} value={product} />
            ))}
          </Picker>
        </View>

        {/* Store Dropdown */}
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={storeName}
            style={styles.picker}
            onValueChange={(itemValue) => setStoreName(itemValue)}
          >
            <Picker.Item label="Select Store" value="" />
            {stores.map((store, index) => (
              <Picker.Item key={index} label={store} value={store} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Price Input */}
      <TextInput
        style={styles.input}
        placeholder="Price (e.g., $10)"
        value={storePrice}
        onChangeText={setStorePrice}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      {/* Product List */}
      <FlatList
        data={productList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productText}>{item.name}</Text>
            <Text style={styles.productText}>{item.store}</Text>
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
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    color: '#333',
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
    marginTop: 10,
    marginBottom:10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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
  manageButton: {
    backgroundColor: '#34c2b3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom:10,
  },
});

export default AdminPage;
