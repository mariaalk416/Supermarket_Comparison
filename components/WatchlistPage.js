import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const WatchlistPage = ({ navigation }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      const stored = await AsyncStorage.getItem('watchlist');
      const parsed = stored ? JSON.parse(stored) : [];
      setWatchlist(parsed);
    } catch (error) {
      console.error('Error loading watchlist:', error);
    }
  };

  const removeFromWatchlist = async (productId) => {
    try {
      const updated = watchlist.filter(item => item.id !== productId);
      setWatchlist(updated);
      await AsyncStorage.setItem('watchlist', JSON.stringify(updated));
  
      const email = await AsyncStorage.getItem('loginname');
      if (email) {
        await fetch('http://192.168.1.103:5003/save-watchlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            watchlist: updated.map(item => item.id),
          }),
        });
      }
  
      Alert.alert('Removed', 'Product removed from watchlist.');
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      Alert.alert('Error', 'Failed to remove product from watchlist.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.productText}>{item.name}</Text>
        <Text style={styles.productText}>Store: {item.store}</Text>
        <Text style={styles.productText}>Price: {item.price}€</Text>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeFromWatchlist(item.id)}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }}>Your watchlist is empty.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e0f7f9',
    padding: 20,
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
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  productText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: '#FF5252',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WatchlistPage;