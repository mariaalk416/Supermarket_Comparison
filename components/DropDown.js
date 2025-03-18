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
import PropTypes from 'prop-types';

/**
 * Helper function to return the default array if the incoming array is missing or empty.
 * @param {any[]} incoming 
 * @param {any[]} def 
 * @returns {any[]}
 */
const getInitialArray = (incoming, def) => {
  return incoming && incoming.length > 0 ? incoming : def;
};

const defaultStores = ['Sklavenitis', 'Lidl', 'Alpahmega', 'Poplife'];
const defaultProducts = [
  'Apple Juice',
  'Orange Juice',
  'Milk',
  'Bread',
  'Cheese',
  'Eggs',
  'Yogurt',
  'Pasta',
  'Tomato Sauce',
  'Chicken',
];
const defaultCategories = ['Pasta', 'Bread', 'Dairy', 'Fruits', 'Vegetables'];

/**
 * ManageDropdownsPage lets the user add new values for stores, products, and categories.
 * Default values are provided if none are passed in or if the passed arrays are empty.
 *
 * @param {object} props
 * @param {string[]} props.stores - The initial list of stores.
 * @param {string[]} props.products - The initial list of product names.
 * @param {string[]} props.categories - The initial list of categories.
 * @param {(updatedStores: string[], updatedProducts: string[], updatedCategories: string[]) => void} props.onDropdownUpdate - Callback to update the central state.
 * @param {object} props.route - The navigation route prop.
 * @param {object} props.navigation - The navigation prop.
 */
const ManageDropdownsPage = ({
  route,
  navigation,
  stores: propStores = [],
  products: propProducts = [],
  categories: propCategories = [],
  onDropdownUpdate,
}) => {
  // Note: In your navigator you pass the key "productNames" for products.
  const initialStores = route.params?.stores && route.params.stores.length > 0
    ? route.params.stores
    : getInitialArray(propStores, defaultStores);
  const initialProducts = route.params?.productNames && route.params.productNames.length > 0
    ? route.params.productNames
    : getInitialArray(propProducts, defaultProducts);
  const initialCategories = route.params?.categories && route.params.categories.length > 0
    ? route.params.categories
    : getInitialArray(propCategories, defaultCategories);

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
    if (onDropdownUpdate) {
      onDropdownUpdate(stores, products, categories);
    }
    // Navigate back to the Admin page with updated dropdown data.
    navigation.navigate('Admin', { stores, productNames: products, categories });
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
        {categories.map((cat, index) => (
          <Text key={index} style={styles.listItem}>
            {cat}
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

ManageDropdownsPage.propTypes = {
  stores: PropTypes.arrayOf(PropTypes.string),
  products: PropTypes.arrayOf(PropTypes.string),
  categories: PropTypes.arrayOf(PropTypes.string),
  onDropdownUpdate: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
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
    backgroundColor: '#FFA726',
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
