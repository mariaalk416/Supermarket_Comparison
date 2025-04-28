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
import { useFocusEffect } from '@react-navigation/native';
import initialize from '../app/initProducts';

//images
import milk from '../assets/images/milk.jpg'
import orangeJuice from '../assets/images/orange-juice.jpg'
import appleJuice from '../assets/images/apple-juice.jpg'
import bread from '../assets/images/bread.jpg'
import yogurt from '../assets/images/yogurt.jpg'
import delactyog from '../assets/images/delactYogurt.jpg'
import halloumi from '../assets/images/halloumi.png'
import delactMilk from '../assets/images/delactMilk.jpg'
import butter from '../assets/images/butter.jpg'
import edam from '../assets/images/edam.jpg'
import gouda from '../assets/images/gouda.jpg'

const AdminPage = ({ route, navigation, stores: externalStores, products: externalProducts, categories: externalCategories }) => {

  const initialStores = route.params?.stores || externalStores || ['Sklavenitis', 'Lidl', 'Alphamega', 'Poplife'];
  const initialProducts = route.params?.productNames || externalProducts || ['Apple Juice',
  'Orange Juice',
  'Whole Milk',
  'Delact Milk',
  'Bread',
  'Edam Cheese',
  'Gouda Cheese',
  'Halloumi',
  'Eggs',
  'Greek Yogurt',
  'Greek Delact Yogurt',
  'Pasta',
  'Butter',
  'Tomato Sauce',
  'Chicken',];
  const initialCategories = route.params?.categories || externalCategories || ['Pasta', 'Juices','Bread', 'Dairy', 'Fruits', 'Vegetables'];

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

  const [editingProductId, setEditingProductId] = useState(null);
  const [editingPrice, setEditingPrice] = useState('');

  const generateUniqueId = (name, store) => `${name}-${store}-${Date.now()}`;

  const fetchWithTimeout = async (url, options, timeout = 10000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
  
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
  
    return response;
  };

  const handleDropdownUpdate = (updatedStores, updatedProducts, updatedCategories) => {
    setStores(updatedStores);
    setProducts(updatedProducts);
    setCategories(updatedCategories);
  };
  
  useEffect(() => {
    const initializeProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      if (!storedProducts) {
        // Save default products if none exist
        await AsyncStorage.setItem('products', JSON.stringify(defaultProducts));
        setProductList(defaultProducts);
      } else {
        setProductList(JSON.parse(storedProducts));
      }
    };
    initializeProducts();
  }, []);
  
  const handlePriceReduction = async (productId, newPrice) => {
    try {
      const response = await fetchWithTimeout('http://192.168.1.103:5003/admin/price-reduction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, newPrice }),
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert('Price reduced and notifications sent.');
      } else {
        Alert.alert('Failed to reduce price:', data.error);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
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
      
        const response = await fetch('http://192.168.1.103:5003/upload-leaflet', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      
        const data = await response.json();
        if (response.ok) {
          Alert.alert('Success', 'Leaflet uploaded & emails sent!');
      
          const existing = JSON.parse(await AsyncStorage.getItem('leaflets')) || [];
          const updated = [uri, ...existing]; 
          await AsyncStorage.setItem('leaflets', JSON.stringify(updated));
        } else {
          Alert.alert('Error', data.message || 'Failed to upload leaflet.');
        }
      }      
    } catch (error) {
      console.error('Error uploading leaflet:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        await initialize(); // <- you’re calling it at the right place
        const storedProducts = await AsyncStorage.getItem('products');
        const loadedProducts = storedProducts ? JSON.parse(storedProducts) : [];
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
      image: productImage,
    };

    // avoid duplicates
    if (productList.some((item) => item.id === newProduct.id)) {
      Alert.alert('Error', 'This product already exists.');
      return;
    }

    const updatedProducts = [...productList, newProduct];
    setProductList(updatedProducts);
    AsyncStorage.setItem('products', JSON.stringify(updatedProducts));

    if (!products.includes(productName)) {
      setProducts([...products, productName]);
    }

    setProductName(null);
    setStoreName(null);
    setCategory(null);
    setStorePrice('');
    setProductImage(null);
    Keyboard.dismiss();
  };

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.updatedDropdowns) {
        const { stores, productNames, categories } = route.params.updatedDropdowns;
        setStores(stores);
        setProducts(productNames);
        setCategories(categories);
  
        navigation.setParams({ updatedDropdowns: null });
      }
    }, [route.params])
  );

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
  
        if (!result.canceled && result.assets?.length > 0) {
          const uri = result.assets[0].uri;
    
          if (uri) {
            console.log('Selected Image URI:', uri);
            setProductImage(uri);
            Alert.alert('Success', 'Image uploaded successfully!');
          } else {
            Alert.alert('Error', 'Image URI is missing.');
          }
        }
      }
      } catch (error) {
        console.error('Error picking image:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      } finally {
        setUploading(false);
      }
    };


  const handleEditPrice = (productId, currentPrice) => {
    setEditingProductId(productId);
    setEditingPrice(currentPrice);
  };

  const handleSavePrice = async (productId) => {
    const product = productList.find((item) => item.id === productId);
    const originalPrice = parseFloat(product?.price || '0');
    const newPrice = parseFloat(editingPrice || '0');
  
    if (isNaN(newPrice) || newPrice <= 0) {
      Alert.alert('Error', 'Please enter a valid price.');
      return;
    }
  
    const updatedProducts = productList.map((item) =>
      item.id === productId ? { ...item, price: newPrice.toFixed(2) } : item
    );
  
    setProductList(updatedProducts);
    saveProducts(updatedProducts);
    setEditingProductId(null);
    setEditingPrice('');
  
    if (newPrice < originalPrice) {
      await handlePriceReduction(productId, newPrice);
    } else if (newPrice > originalPrice) {
      await checkWatchlistAndNotify(productId, newPrice);
    }
  };
  
  const checkWatchlistAndNotify = async (productId, newPrice) => {
    try {
      const storedWatchlist = await AsyncStorage.getItem('watchlist');
      const watchlist = storedWatchlist ? JSON.parse(storedWatchlist) : [];
      const product = productList.find((item) => item.id === productId);
  
      if (!product) return;
  
      const isInWatchlist = watchlist.some((item) => item.name === product.name);
  
      if (isInWatchlist) {
        await sendPriceIncreaseNotification(productId, newPrice, product.name, product.store);
      }
    } catch (error) {
      console.error('Error checking watchlist:', error);
    }
  };
  
  const sendPriceIncreaseNotification = async (productId, newPrice, productName, storeName) => {
    try {
      const response = await fetchWithTimeout('http://192.168.1.103:5003/admin/price-increase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, newPrice, productName, storeName }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Price increase notification sent to watchlist users.');
      } else {
        console.warn('Failed to send price increase notification:', data.error);
      }
    } catch (error) {
      console.error('Error sending price increase notification:', error);
    }
  };

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
                onDropdownUpdate: handleDropdownUpdate,
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
                    <TouchableOpacity style={styles.editButton} onPress={() => {handleSavePrice(item.id);}}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.productText}>Price: {item.price}€</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => {handleEditPrice(item.id, item.price);}}>
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
