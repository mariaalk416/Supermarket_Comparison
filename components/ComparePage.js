import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ComparePage = () => {
  const [product, setProduct] = useState(''); 
  const [results, setResults] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 

  const mockData = [
    { store: 'Store A', price: '$10' },
    { store: 'Store B', price: '$8' },
    { store: 'Store C', price: '$12' },
  ];

  const handleCompare = () => {
    if (!product.trim()) {
      alert('Please enter a product to compare.');
      return;
    }

    setIsLoading(true);

    // Simulate data fetching
    setTimeout(() => {
      setResults(mockData);
      setIsLoading(false);
    }, 1000); // Replace with actual API call
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Compare Prices</Text>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter product name"
          value={product}
          onChangeText={setProduct}
        />
        <TouchableOpacity style={styles.compareButton} onPress={handleCompare}>
          <Text style={styles.buttonText}>Compare</Text>
        </TouchableOpacity>
      </View>

      {/* Results Section */}
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultText}>{item.store}</Text>
              <Text style={styles.resultText}>{item.price}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No results found.</Text>}
        />
      )}
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  compareButton: {
    backgroundColor: '#34c2b3',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  resultText: {
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