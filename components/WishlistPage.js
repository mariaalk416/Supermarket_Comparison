import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistPage = ({ preferences, setPreferences, navigation }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences || { supermarket: [], categories: [] });
  const defaultStores = ['Sklavenitis', 'Lidl', 'Alphamega', 'Poplife'];
  const defaultCategories = ['Pasta', 'Juices',  'Bread', 'Dairy', 'Fruits', 'Vegetables'];

  const [supermarkets, setSupermarkets] = useState(defaultStores);
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const stored = await AsyncStorage.getItem('dropdowns');
        if (stored) {
          const { stores, categories } = JSON.parse(stored);
          setSupermarkets(stores || defaultStores);
          setCategories(categories || defaultCategories);
        }
      } catch (e) {
        console.warn('Failed to load dropdowns, using defaults.');
      }
    };
    loadDropdowns();
  }, []);

  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  const selectSupermarket = (market) => {
    const updatedSupermarkets = localPreferences.supermarket.includes(market)
      ? localPreferences.supermarket.filter(s => s !== market)
      : [...localPreferences.supermarket, market];

    setLocalPreferences({ ...localPreferences, supermarket: updatedSupermarkets });
  };

  const toggleCategory = (category) => {
    const updated = localPreferences.categories.includes(category)
      ? localPreferences.categories.filter(c => c !== category)
      : [...localPreferences.categories, category];

    setLocalPreferences({ ...localPreferences, categories: updated });
  };

  const savePreferences = () => {
    setPreferences(localPreferences);
    navigation.goBack();
  };

  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Update Your Preferences</Text>

        <Text style={styles.subHeader}>Select Preferred Supermarkets:</Text>
        {supermarkets.map((market) => (
          <TouchableOpacity 
            key={market} 
            onPress={() => selectSupermarket(market)} 
            style={[styles.optionButton, localPreferences.supermarket.includes(market) && styles.selected]}
          >
            <Text style={[styles.optionText, localPreferences.supermarket.includes(market) && styles.selectedText]}>
              {market}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.subHeader}>Select Categories:</Text>
        {categories.map((cat) => (
          <TouchableOpacity 
            key={cat} 
            onPress={() => toggleCategory(cat)} 
            style={[styles.optionButton, localPreferences.categories.includes(cat) && styles.selected]}
          >
            <Text style={[styles.optionText, localPreferences.categories.includes(cat) && styles.selectedText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={savePreferences} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

WishlistPage.propTypes = {
  preferences: PropTypes.shape({
    supermarket: PropTypes.arrayOf(PropTypes.string),
    categories: PropTypes.arrayOf(PropTypes.string),
  }),
  setPreferences: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default WishlistPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f9',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#34c2b3',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  optionButton: {
    width: '100%',
    padding: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#34c2b3',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginBottom: 10,
  },
  selected: {
    backgroundColor: '#34c2b3',
  },
  optionText: {
    fontSize: 16,
    color: '#34c2b3',
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#ffffff',
  },
  saveButton: {
    backgroundColor: '#34c2b3',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
