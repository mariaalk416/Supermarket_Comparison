import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

//images
import milk from '../assets/images/milk.jpg'
import orangeJuice from '../assets/images/orange-juice.jpg'
import appleJuice from '../assets/images/apple-juice.jpg'
import Bread from '../assets/images/bread.jpg'

const AdminPage = ({ route, navigation, stores: externalStores, products: externalProducts, categories: externalCategories }) => {
  // Load initial values from route.params, external props, or default demo arrays
  const initialStores = route.params?.stores || externalStores || ['Sklavenitis', 'Lidl', 'Alpahmega', 'Poplife'];
  const initialProducts = route.params?.productNames || externalProducts || [];
  const initialCategories = route.params?.categories || externalCategories || ['Pasta', 'Bread', 'Dairy', 'Fruits', 'Vegetables'];

  const [productList, setProductList] = useState([]);
  const [stores, setStores] = useState(initialStores);
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);

  const [openProduct, setOpenProduct] = useState(false);
  const [productName, setProductName] = useState(null);
  const [openStore, setOpenStore] = useState(false);
  const [storeName, setStoreName] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState(null);

  const [storePrice, setStorePrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [leafletImage, setLeafletImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // For editing a product's price
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingPrice, setEditingPrice] = useState('');

  // Helper: Generate unique id using timestamp and name
  const generateUniqueId = (name, store) => `${name}-${store}-${Date.now()}`;

  // Load products from AsyncStorage on mount.
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem('products');
        let loadedProducts = storedProducts ? JSON.parse(storedProducts) : [];
        // If no products exist, initialize with some demo products.
        if (loadedProducts.length === 0) {
          loadedProducts = [
            {
              id: generateUniqueId('Apple Juice', 'Lidl'),
              name: 'Apple Juice',
              store: 'Lidl',
              price: '2.99',
              category: 'Juices',
              image: appleJuice,
            },
            {
              id: generateUniqueId('Orange Juice', 'Lidl'),
              name: 'Orange Juice',
              store: 'Lidl',
              price: '3.49',
              category: 'Juices',
              image: orangeJuice,
            },
            {
              id: generateUniqueId('Milk', 'Sklavenitis'),
              name: 'Milk',
              store: 'Sklavenitis',
              price: '1.99',
              category: 'Dairy',
              image: milk,
            },
            {
              id: generateUniqueId('Bread', 'Alpahmega'),
              name: 'Bread',
              store: 'Alpahmega',
              price: '1.49',
              category: 'Bread',
              productImage: Bread,
            },
          ];
          await AsyncStorage.setItem('products', JSON.stringify(loadedProducts));
        }
        setProductList(loadedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  const saveProducts = async (productsArray) => {
    try {
      await AsyncStorage.setItem('products', JSON.stringify(productsArray));
    } catch (error) {
      console.error('Error saving products:', error);
    }
  };

  const handleReducePrice = (productId) => {
    const updatedProducts = productList.map((item) => {
      if (item.id === productId) {
        if (parseFloat(editingPrice) < parseFloat(item.price)) {
          // Trigger push notification 
          sendPriceReductionNotification(item, editingPrice);
        }
        return { ...item, price: editingPrice };
      }
      return item;
    });
    setProductList(updatedProducts);
    saveProducts(updatedProducts);
    setEditingProductId(null);
    setEditingPrice('');
  };

  const handleAddProduct = () => {
    if (!productName || !storeName || !storePrice.trim() || !category || !productImage) {
      Alert.alert('Validation Error', 'Please select product, store, price, category, and image.');
      return;
    }

    const newProduct = {
      id: generateUniqueId(productName, storeName),
      name: productName,
      store: storeName,
      price: storePrice,
      category,
      productImage: productImage,
    };

    // Check if product with the same id already exists to avoid duplicate keys
    if (productList.some((item) => item.id === newProduct.id)) {
      Alert.alert('Error', 'This product already exists.');
      return;
    }

    const updatedProducts = [...productList, newProduct];
    setProductList(updatedProducts);
    saveProducts(updatedProducts);

    // Optionally update the dropdown values if new product is added
    if (!products.includes(productName)) {
      setProducts([...products, productName]);
    }

    // Reset form fields
    setProductName(null);
    setStoreName(null);
    setCategory(null);
    setStorePrice('');
    setProductImage(null);
    Keyboard.dismiss();
  };

  // Update productImage state after picking an image
  const pickImage = async () => {
    try {
      setUploading(true);
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Sorry, gallery permission is required to upload images.'
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
          setProductImage(uri);
          Alert.alert('Success', 'Image uploaded successfully!');
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const sendPriceReductionNotification = (product, newPrice) => {
    const message = {
      notification: {
        title: 'Price Reduced!',
        body: `${product.name} is now ${newPrice}€ at ${product.store}.`,
      },
      // Send to multiple tokens
      tokens: subscribedDeviceTokens,
    };
  
    admin.messaging().sendMulticast(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  const uploadLeaflet = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Gallery permission is required to upload leaflets.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setLeafletImage(uri);

        const formData = new FormData();
        formData.append('leaflet', {
          uri,
          name: 'leaflet.jpg',
          type: 'image/jpeg',
        });

        const response = await fetch('http://192.168.1.104:5002/upload-leaflet', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const data = await response.json();
        if (response.ok) {
          Alert.alert('Success', 'Leaflet uploaded & emails sent!');
          const storedLeaflets = JSON.parse(await AsyncStorage.getItem("leaflets")) || [];
          const newLeaflets = [...storedLeaflets, uri];
          await AsyncStorage.setItem("leaflets", JSON.stringify(newLeaflets));
        } else {
          Alert.alert('Error', data.message || 'Failed to upload leaflet.');
        }
      }
    } catch (error) {
      console.error('Error uploading leaflet:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  // Allow price edit functionality
  const handleEditPrice = (productId, currentPrice) => {
    setEditingProductId(productId);
    setEditingPrice(currentPrice);
  };

  const handleSavePrice = (productId) => {
    const updatedProducts = productList.map((item) => {
      if (item.id === productId) {
        return { ...item, price: editingPrice };
      }
      return item;
    });
    setProductList(updatedProducts);
    saveProducts(updatedProducts);
    setEditingProductId(null);
    setEditingPrice('');
  };

  // Load any updated dropdown values from route.params if they change
  useEffect(() => {
    if (route.params?.stores) setStores(route.params.stores);
    if (route.params?.products) setProducts(route.params.productNames);
    if (route.params?.categories) setCategories(route.params.categories);
  }, [route.params]);

  const filteredProducts = productList.filter(
    (item) => item.name && item.store && item.price
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={20}
        >
          <LinearGradient
            colors={['#8ae1e6', '#34c2b3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <Text style={styles.header}>Admin - Add Products</Text>
          </LinearGradient>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('ManageDropdownsPage', {
                stores,
                products,
                categories,
                onDropdownUpdate: (updatedStores, updatedProducts, updatedCategories) => {
                  setStores(updatedStores);
                  setProducts(updatedProducts);
                  setCategories(updatedCategories);
                },
              })
            }
          >
            <Text style={styles.buttonText}>Manage Dropdowns</Text>
          </TouchableOpacity>

          <DropDownPicker
            open={openProduct}
            value={productName}
            items={products.map((prod) => ({ label: prod, value: prod }))}
            setOpen={setOpenProduct}
            setValue={setProductName}
            placeholder="Select Product"
            style={styles.dropdown}
            dropDownContainerStyle={{ ...styles.dropdownContainer, zIndex: 3000 }}
            zIndex={3000}
            listMode="SCROLLVIEW"
          />

          <DropDownPicker
            open={openStore}
            value={storeName}
            items={stores.map((store) => ({ label: store, value: store }))}
            setOpen={setOpenStore}
            setValue={setStoreName}
            placeholder="Select Store"
            style={styles.dropdown}
            dropDownContainerStyle={{ ...styles.dropdownContainer, zIndex: 2000 }}
            zIndex={2000}
            listMode="SCROLLVIEW"
          />

          <DropDownPicker
            open={openCategory}
            value={category}
            items={categories.map((cat) => ({ label: cat, value: cat }))}
            setOpen={setOpenCategory}
            setValue={setCategory}
            placeholder="Select Category"
            style={styles.dropdown}
            dropDownContainerStyle={{ ...styles.dropdownContainer, zIndex: 1000 }}
            zIndex={1000}
            listMode="SCROLLVIEW"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Price"
            value={storePrice}
            onChangeText={setStorePrice}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Upload Product Image</Text>
          </TouchableOpacity>
          {productImage && <Image source={{ uri: productImage }} style={styles.previewImage} />}

          <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>

          {filteredProducts.map((item) => (
            <View key={item.id} style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.productText}>{item.name}</Text>
                <Text style={styles.productText}>{item.store}</Text>
                <Text style={styles.productText}>{item.category}</Text>
                {editingProductId === item.id ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      value={editingPrice}
                      onChangeText={setEditingPrice}
                      keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.editButton} onPress={() => handleSavePrice(item.id)}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.productText}>Price: {item.price}€</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEditPrice(item.id, item.price)}>
                      <Text style={styles.buttonText}>Edit Price</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={uploadLeaflet}>
            <Text style={styles.buttonText}>Upload Leaflet</Text>
          </TouchableOpacity>
          {leafletImage && <Image source={{ uri: leafletImage }} style={styles.previewImage} />}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    elevation: 5,
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
    elevation: 3,
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
    marginBottom: 5,
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
  editButton: {
    backgroundColor: '#34c2b3',
    padding: 5,
    borderRadius: 15,
    marginLeft: 10,
    elevation: 3,
  },
});

export default AdminPage;
