import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductPage = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Details</Text>
      <View style={styles.detailBox}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{product.name}</Text>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.label}>Store:</Text>
        <Text style={styles.value}>{product.store}</Text>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>${product.price}</Text>
      </View>
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
    marginBottom: 20,
    color: '#34c2b3',
  },
  detailBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProductPage;