import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminPage = ({ route, navigation }) => {
  const [productList, setProductList] = useState(route.params?.products || []);
  const [stores, setStores] = useState(route.params?.stores || ['Store A', 'Store B']);
  const [products, setProducts] = useState(route.params?.productNames || ['Product X', 'Product Y']);
  const [categories, setCategories] = useState(route.params?.categories || ['Category A', 'Category B']);

  
  const [openProduct, setOpenProduct] = useState(false);
  const [productName, setProductName] = useState(null);
  const [openStore, setOpenStore] = useState(false);
  const [storeName, setStoreName] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState(null);

  const [storePrice, setStorePrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [leafletImage, setLeafletImage] = useState(null);

  
  const saveProducts = async (productsArray) => {
    try {
      await AsyncStorage.setItem('products', JSON.stringify(productsArray));
    } catch (error) {
      console.error('Error saving products:', error);
    }
  };

  const handleAddProduct = () => {
    if (!productName || !storeName || !storePrice.trim() || !category || !productImage) {
      alert('Please select product, store, price, category, and image.');
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
          uri: uri,
          name: 'leaflet.jpg', 
          type: 'image/jpeg', 
        });
  
        const response = await fetch('http://192.168.1.103:5001/upload-leaflet', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          Alert.alert('Success', 'Leaflet uploaded & emails sent!');
        } else {
          Alert.alert('Error', data.message || 'Failed to upload leaflet.');
        }
      }
    } catch (error) {
      console.error('Error uploading leaflet:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Gallery permission is required to upload images.');
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
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  useEffect(() => {
    if (route.params?.stores) setStores(route.params.stores);
    if (route.params?.products) setProducts(route.params.products);
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
          enableOnAndroid={true}
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
              navigation.navigate('ManageDropdownsPage', { stores, products, categories })
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
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>

          {filteredProducts.map((item, index) => (
            <View key={index} style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View>
                <Text style={styles.productText}>{item.name}</Text>
                <Text style={styles.productText}>{item.store}</Text>
                <Text style={styles.productText}>{item.category}</Text>
                <Text style={styles.productText}>{item.price}€</Text>
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
