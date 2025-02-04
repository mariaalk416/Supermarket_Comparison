import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Keyboard, Image, SafeAreaView, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminPage = ({ route, navigation }) => {
  // Initialize productList with passed route parameters or an empty array.
  const [productList, setProductList] = useState(route.params?.products || []);
  const [stores, setStores] = useState(route.params?.stores || ['Store A', 'Store B']);
  const [products, setProducts] = useState(route.params?.productNames || ['Product X', 'Product Y']);
  const [categories, setCategories] = useState(route.params?.categories || ['Category A', 'Category B']);
  const [uploading, setUploading] = useState(false);

  // Dropdown state for products
  const [openProduct, setOpenProduct] = useState(false);
  const [productName, setProductName] = useState(null);

  // Dropdown state for stores
  const [openStore, setOpenStore] = useState(false);
  const [storeName, setStoreName] = useState(null);

  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState(null);

  const [storePrice, setStorePrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  const [leafletImage, setLeafletImage] = useState(null);
 
  // Save products to AsyncStorage
  const saveProducts = async (products) => {
    try {
      await AsyncStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products:', error);
    }
  };

  const handleAddProduct = () => {
    if (!productName || !storeName || !storePrice.trim() || !category || !productImage) {
      alert('Please select product, store, and price.');
      return;
    }

    const newProduct = {
      name: productName,
      store: storeName,
      price: storePrice,
      category,
      image: productImage,
    };

    const updatedProducts = [...productList, newProduct];
    setProductList(updatedProducts);
    saveProducts(updatedProducts);
    setStorePrice('');
    setProductImage(null);
    Keyboard.dismiss();
  };

  const uploadLeaflet = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Gallery permission is required to upload leaflets."
        );
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          const uri = result.assets[0].uri;

          // Save leaflet image URI to AsyncStorage
          const storedLeaflets = JSON.parse(await AsyncStorage.getItem("leaflets")) || [];
          const updatedLeaflets = [...storedLeaflets, uri];

          await AsyncStorage.setItem("leaflets", JSON.stringify(updatedLeaflets));
          setLeafletImage(uri);

          Alert.alert("Success", "Leaflet uploaded successfully!");
        }
      }
    } catch (error) {
      console.error("Error uploading leaflet:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };


  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Gallery permission is required to upload images."
        );
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          const uri = result.assets[0].uri; // Extract image URI
          setProductImage(uri);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  useEffect(() => {
    if (route.params?.stores) setStores(route.params.stores);
    if (route.params?.products) setProducts(route.params.products);
    if (route.params?.categories) setCategories(route.params.categories);
  }, [route.params]);


  // Filter out empty products (you can adjust the conditions as needed)
  const filteredProducts = productList.filter(
    item => item.name && item.store && item.price
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
      
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
            onPress={() => navigation.navigate('ManageDropdownsPage', { stores, products, categories })}
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
          />

          {/* Category Dropdown */}
          <DropDownPicker
            open={openCategory}
            value={category}
            items={categories.map((cat) => ({ label: cat, value: cat }))}
            setOpen={setOpenCategory}
            setValue={setCategory}
            placeholder="Select Category"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />

          {/* Price Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter Price"
            value={storePrice}
            onChangeText={setStorePrice}
            keyboardType="numeric"
          />

          {/* Image Picker */}
          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Upload Product Image</Text>
          </TouchableOpacity>
          {productImage && <Image source={{ uri: productImage }} style={styles.previewImage} />}


          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>

          
          <View style={{ flex: 1 }}>
            <FlatList
              data={productList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.productItem}>
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                  <View>
                    <Text style={styles.productText}>{item.name}</Text>
                    <Text style={styles.productText}>{item.store}</Text>
                    <Text style={styles.productText}>{item.category}</Text>
                    <Text style={styles.productText}>{item.price}€</Text>
                  </View>
                </View>
              )}
            />
          </View>
          

          {/* Leaflet Upload */}
          <TouchableOpacity style={styles.addButton} onPress={uploadLeaflet}>
            <Text style={styles.buttonText}>Upload Leaflet</Text>
          </TouchableOpacity>
          {leafletImage && <Image source={{ uri: leafletImage }} style={styles.previewImage} />}


        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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

  scrollContainer: {
    flex: 1,
    padding: 20,
  },

  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },

  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  
});


export default AdminPage;
