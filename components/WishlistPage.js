import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WishlistPage = ({ preferences, setPreferences, navigation }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const defaultStores = ['Sklavenitis', 'Lidl', 'Alphamega', 'Poplife'];
  const defaultCategories = ['Pasta', 'Juices', 'Bread', 'Dairy', 'Fruits', 'Vegetables'];

  const [supermarkets, setSupermarkets] = useState(defaultStores);
  const [categories, setCategories] = useState(defaultCategories);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownType, setDropdownType] = useState(null);
  const [dropdownItems, setDropdownItems] = useState([]);

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
    setLocalPreferences({
      supermarket: preferences.supermarket || [],
      categories: preferences.categories || []
    });
  }, [preferences]);

  const selectSupermarket = (market) => {
    const updatedSupermarkets = localPreferences.supermarket.includes(market)
      ? localPreferences.supermarket.filter(s => s !== market)
      : [...localPreferences.supermarket, market];

    setLocalPreferences(prev => ({
      ...prev,
      supermarket: updatedSupermarkets
    }));
  };

  const toggleCategory = (category) => {
    const updated = localPreferences.categories.includes(category)
      ? localPreferences.categories.filter(c => c !== category)
      : [...localPreferences.categories, category];

    setLocalPreferences(prev => ({
      ...prev,
      categories: updated
    }));
  };

  const savePreferences = async () => {
    try {
      await AsyncStorage.setItem('userPreferences', JSON.stringify(localPreferences));
      setPreferences(localPreferences); // Update parent component
      navigation.goBack();
    } catch (error) {
      console.error('Error saving preferences', error);
    }
  };

  const openDropdown = (type) => {
    setDropdownType(type);
    if (type === 'supermarket') {
      const unselected = supermarkets.filter(m => !localPreferences.supermarket.includes(m));
      setDropdownItems(unselected);
    } else {
      const unselected = categories.filter(c => !localPreferences.categories.includes(c));
      setDropdownItems(unselected);
    }
    setDropdownVisible(true);
  };

  const addFromDropdown = (item) => {
    if (dropdownType === 'supermarket') {
      selectSupermarket(item);
    } else {
      toggleCategory(item);
    }
    setDropdownVisible(false);
  };

  const removePreference = (item, type) => {
    if (type === 'supermarket') {
      selectSupermarket(item);
    } else {
      toggleCategory(item);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Update Your Preferences</Text>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.subHeader}>Preferred Supermarkets:</Text>
            <TouchableOpacity onPress={() => openDropdown('supermarket')} style={styles.addButton}>
              <Icon name="add" size={24} color="#34c2b3" />
            </TouchableOpacity>
          </View>
          
          {localPreferences.supermarket.length > 0 ? (
            <View style={styles.selectedContainer}>
              {localPreferences.supermarket.map((market) => (
                <View key={market} style={styles.selectedItem}>
                  <Text style={styles.selectedItemText}>{market}</Text>
                  <TouchableOpacity onPress={() => removePreference(market, 'supermarket')}>
                    <Icon name="close" size={20} color="#ff6b6b" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No supermarkets selected</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.subHeader}>Categories:</Text>
            <TouchableOpacity onPress={() => openDropdown('categories')} style={styles.addButton}>
              <Icon name="add" size={24} color="#34c2b3" />
            </TouchableOpacity>
          </View>
          
          {localPreferences.categories.length > 0 ? (
            <View style={styles.selectedContainer}>
              {localPreferences.categories.map((cat) => (
                <View key={cat} style={styles.selectedItem}>
                  <Text style={styles.selectedItemText}>{cat}</Text>
                  <TouchableOpacity onPress={() => removePreference(cat, 'categories')}>
                    <Icon name="close" size={20} color="#ff6b6b" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No categories selected</Text>
          )}
        </View>

        <TouchableOpacity onPress={savePreferences} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownTitle}>
              Add {dropdownType === 'supermarket' ? 'Supermarket' : 'Category'}
            </Text>
            <ScrollView style={styles.dropdownScroll}>
              {dropdownItems.map((item) => (
                <TouchableOpacity 
                  key={item} 
                  style={styles.dropdownItem}
                  onPress={() => addFromDropdown(item)}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                  <Icon name="add" size={20} color="#34c2b3" />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity 
              style={styles.closeDropdownButton}
              onPress={() => setDropdownVisible(false)}
            >
              <Text style={styles.closeDropdownText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#34c2b3',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 5,
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedItemText: {
    marginRight: 8,
    color: '#333',
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#34c2b3',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Dropdown styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    width: '80%',
    maxHeight: '60%',
    borderRadius: 10,
    padding: 20,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  dropdownScroll: {
    maxHeight: '80%',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  closeDropdownButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#34c2b3',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeDropdownText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WishlistPage;