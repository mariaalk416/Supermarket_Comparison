import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const WishlistPage = ({ preferences, setPreferences, navigation }) => {

  const [localPreferences, setLocalPreferences] = useState(preferences || { supermarket: '', categories: [] });

  // Lists of options (could also be imported from a common file)
  const supermarkets = ['Sklavenitis', 'Lidl', 'Alpahmega', 'Poplife'];
  const categories = ['Pasta', 'Bread', 'Dairy', 'Fruits', 'Vegetables'];

  const selectSupermarket = (market) => {
    setLocalPreferences({ ...localPreferences, supermarket: market });
  };

  const toggleCategory = (category) => {
    const updated = localPreferences.categories.includes(category)
      ? localPreferences.categories.filter(c => c !== category)
      : [...localPreferences.categories, category];
    setLocalPreferences({ ...localPreferences, categories: updated });
  };

  const savePreferences = () => {
    setPreferences(localPreferences);
    // Optionally navigate back or show a confirmation
    navigation.goBack();
  };

  // Update local state if preferences prop changes
  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>Update Your Preferences</Text>
      <Text style={{ fontSize: 18, marginVertical: 5 }}>Select Preferred Supermarket:</Text>
      {supermarkets.map((market) => (
        <TouchableOpacity key={market} onPress={() => selectSupermarket(market)} style={{ marginVertical: 5 }}>
          <Text style={{
            padding: 10,
            backgroundColor: localPreferences.supermarket === market ? 'blue' : 'gray',
            color: 'white'
          }}>
            {market}
          </Text>
        </TouchableOpacity>
      ))}
      <Text style={{ fontSize: 18, marginVertical: 5 }}>Select Categories:</Text>
      {categories.map((cat) => (
        <TouchableOpacity key={cat} onPress={() => toggleCategory(cat)} style={{ marginVertical: 5 }}>
          <Text style={{
            padding: 10,
            backgroundColor: localPreferences.categories.includes(cat) ? 'blue' : 'gray',
            color: 'white'
          }}>
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={savePreferences} style={{ marginTop: 20, padding: 10, backgroundColor: 'green' }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Save Preferences</Text>
      </TouchableOpacity>
    </View>
  );
};

WishlistPage.propTypes = {
  preferences: PropTypes.shape({
    supermarket: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string)
  }),
  setPreferences: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

export default WishlistPage;
