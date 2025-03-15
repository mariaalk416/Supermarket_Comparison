import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

const ManageDropdownsPage = ({ route, navigation }) => {
  // Extract initial data and an optional callback from route params
  const {
    stores: initialStores = [],
    products: initialProducts = [],
    categories: initialCategories = [],
    onDropdownUpdate, // optional callback if using a callback approach
  } = route.params;

  const [newStore, setNewStore] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [stores, setStores] = useState(initialStores);
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);

  const handleAddStore = () => {
    if (!newStore.trim()) {
      alert('Please enter a store name.');
      return;
    }
    const updatedStores = [...stores, newStore];
    setStores(updatedStores);
    setNewStore('');
    Keyboard.dismiss();
  };

  const handleAddProduct = () => {
    if (!newProduct.trim()) {
      alert('Please enter a product name.');
      return;
    }
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    setNewProduct('');
    Keyboard.dismiss();
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert('Please enter a category name.');
      return;
    }
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    setNewCategory('');
    Keyboard.dismiss();
  };

  const handleSave = () => {
    // Optionally call the parent's callback to update state
    if (onDropdownUpdate) {
      onDropdownUpdate(stores, products, categories);
    }
    // Redirect back to the Admin page and pass the updated data
    navigation.navigate('Admin', { stores, products, categories });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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

        {/* Add Category */}
        <TextInput
          style={styles.input}
          placeholder="Add Category Name"
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
          <Text style={styles.buttonText}>Add Category</Text>
        </TouchableOpacity>

        {/* List of Stores */}
        <Text style={styles.sectionHeader}>Stores</Text>
        {stores.map((store, index) => (
          <Text key={index} style={styles.listItem}>
            {store}
          </Text>
        ))}

        {/* List of Products */}
        <Text style={styles.sectionHeader}>Products</Text>
        {products.map((product, index) => (
          <Text key={index} style={styles.listItem}>
            {product}
          </Text>
        ))}

        {/* List of Categories */}
        <Text style={styles.sectionHeader}>Categories</Text>
        {categories.map((category, index) => (
          <Text key={index} style={styles.listItem}>
            {category}
          </Text>
        ))}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save and Return</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
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
  saveButton: {
    backgroundColor: '#FFA726', // Contrasting color for Save button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ManageDropdownsPage;
