import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Preferences: undefined;
  Leaflet: undefined;
  Settings: undefined;
};

const HeaderMenu = () => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Ionicons name="menu" size={24} color="#fff" />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => { navigation.navigate('Preferences'); setOpen(false); }}>
            <Text style={styles.item}>Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Leaflet'); setOpen(false); }}>
            <Text style={styles.item}>Leaflet</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Settings'); setOpen(false); }}>
            <Text style={styles.item}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 8,
    zIndex: 10,
    elevation: 5,
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
});

export default HeaderMenu;
