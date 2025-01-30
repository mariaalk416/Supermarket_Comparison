import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet, Alert, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AdminPage = ({ route, navigation }) => {
  const [productList, setProductList] = useState(route.params?.products || []);
  const [stores, setStores] = useState(route.params?.stores || ['store A', 'store B']);
  const [products, setProducts] = useState(route.params?.productNames || ['product X', 'product Y']);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try{
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, gallery permission is required to upload images."
        );
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        

        if (!result.canceled) {
          const uri = result.assets[0].uri; // Extract the image URI

          // Save the image URI to AsyncStorage
          const storedLeaflets =
            JSON.parse(await AsyncStorage.getItem("leaflets")) || [];
          const newLeaflets = [...storedLeaflets, uri];

          await AsyncStorage.setItem("leaflets", JSON.stringify(newLeaflets));

          Alert.alert("Success", "Image uploaded successfully!");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Dropdown state for products
  const [openProduct, setOpenProduct] = useState(false);
  const [productName, setProductName] = useState(null);

  // Dropdown state for stores
  const [openStore, setOpenStore] = useState(false);
  const [storeName, setStoreName] = useState(null);

  const [storePrice, setStorePrice] = useState('');

  const handleAddProduct = () => {
    if (!productName || !storeName || !storePrice.trim()) {
      alert('Please select product, store, and price.');
      return;
    }

    const newProduct = { name: productName, store: storeName, price: storePrice };
    setProductList((prev) => [...prev, newProduct]);
    setStorePrice('');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8ae1e6', '#34c2b3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Text style={styles.header}>Admin - Add Products</Text>
      </LinearGradient>

      {/* Manage Dropdowns Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManageDropdownsPage', { stores, products })}
      >
        <Text style={styles.buttonText}>Manage Dropdowns</Text>
      </TouchableOpacity>

      {/* Product Dropdown */}
      <DropDownPicker
        open={openProduct}
        value={productName}
        items={products.map((product) => ({ label: product, value: product }))}
        setOpen={setOpenProduct}
        setValue={setProductName}
        placeholder="Select Product"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* Store Dropdown */}
      <DropDownPicker
        open={openStore}
        value={storeName}
        items={stores.map((store) => ({ label: store, value: store }))}
        setOpen={setOpenStore}
        setValue={setStoreName}
        placeholder="Select Store"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={1000} // Ensure dropdowns don’t overlap each other
        zIndexInverse={500}
      />

      {/* Price Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Price"
        value={storePrice}
        onChangeText={setStorePrice}
        keyboardType="numeric"
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

      <TouchableOpacity
        style={styles.button}
        onPress={pickImage}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>
          {uploading ? "Uploading..." : "Upload Image"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f9',
    padding: 20,
  },
  headerGradient: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#34c2b3',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5, // Shadow for Android
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 10,
    elevation: 3, // For shadow effect
  },
  dropdownContainer: {
    borderWidth: 0,
    borderRadius: 15,
    elevation: 3,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#34c2b3',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
  },
  productText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AdminPage;
