import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ComparePage = ({ route }) => {
  const [products] = useState(route.params?.products || []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Compare Prices</Text>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productText}>{item.name}</Text>
            <Text style={styles.productText}>{item.price}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No products available.</Text>}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#34c2b3',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  productText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default ComparePage;
