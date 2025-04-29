import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductPage = ({ route, navigation }) => {
  const { product } = route.params;

  const handleAddToCart = async (variant) => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const cart = storedCart ? JSON.parse(storedCart) : [];
      const newItem = {
        name: product.name,
        category: product.category,
        store: variant.store,
        price: variant.price,
        image: variant.image,
      };
      cart.push(newItem);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      Alert.alert('Added', 'Item added to cart');
    } catch (error) {
      Alert.alert('Error', 'Failed to add to cart');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.detailsColumn}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.category}>Category: {product.category}</Text>
          <TouchableOpacity 
          style={styles.historyButton} 
          onPress={() => navigation.navigate('PriceHistoryPage', { product })}
        >
          <Text style={styles.historyButtonText}>Price History</Text>
        </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.variantsTitle}>Available at:</Text>

      <FlatList
        data={product.variants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.variantRow}>
            <View style={styles.variantInfo}>
              <Text style={styles.store}>{item.store}</Text>
              <Text style={styles.price}>€{item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
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
  headerRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  historyButton: {
    backgroundColor: '#34c2b3',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  historyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  detailsColumn: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 16,
    color: '#777',
  },
  variantsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#34c2b3',
  },
  variantRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  variantInfo: {
    flexDirection: 'column',
  },
  store: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#34c2b3',
  },
  addButton: {
    backgroundColor: '#34c2b3',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductPage;
