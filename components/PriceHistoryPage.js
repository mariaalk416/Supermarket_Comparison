/*
 * For the chart in this page I used parts of the code from this github link:
 * https://github.com/JesperLekland/react-native-svg-charts-examples
 * 
 */


import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { G, Line } from 'react-native-svg';

const PriceHistoryPage = ({ route }) => {
  const { product } = route.params;
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPriceHistory();
  }, []);

  const fetchPriceHistory = async () => {
    try {
      const response = await fetch(`http://192.168.1.105:5003/get-price-history?productName=${encodeURIComponent(product.name)}`);
      const data = await response.json();
      if (data.success) {
        const formatted = Object.entries(data.history).map(([store, changes]) => ({
          store,
          changes,
        }));
        console.log('Fetched price history:', formatted);  
        setHistoryData(formatted);
      } else {
        Alert.alert('Error', 'Failed to fetch price history.');
      }
    } catch (error) {
      console.error('Error fetching price history:', error);
      Alert.alert('Error', 'Failed to fetch price history.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyBlock}>
      <Text style={styles.storeName}>{item.store}</Text>
      {item.changes.map((change, index) => (
        <View key={index} style={styles.changeRow}>
          <Text>{new Date(change.date).toLocaleDateString()}</Text>
          <Text style={styles.priceText}>€{parseFloat(change.price).toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#34c2b3" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Price History for {product.name}</Text>
      <FlatList
        data={historyData}
        keyExtractor={(item, index) => item.store + index}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No price history available.</Text>}
      />
      {historyData.length > 0 && (
        <View style={{ height: 250, flexDirection: 'column', marginTop: 20 }}>
            <Text style={styles.chartTitle}>Price Trend</Text>
            {historyData.map((storeItem, idx) => (
            <View key={idx} style={{ marginBottom: 20 }}>
                <Text style={styles.storeChartTitle}>{storeItem.store}</Text>
                <View style={{ flexDirection: 'row', height: 200 }}>
                <YAxis
                    data={storeItem.changes.map(c => parseFloat(c.price))}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                    fontSize: 10,
                    fill: 'grey',
                    }}
                    numberOfTicks={5}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 10 }}
                    data={storeItem.changes.map(c => parseFloat(c.price))}
                    svg={{ stroke: '#34c2b3', strokeWidth: 2 }}
                    contentInset={{ top: 20, bottom: 20 }}
                    curve={shape.curveLinear}
                >
                    <Grid />
                </LineChart>
                </View>
            </View>
            ))}
        </View>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#34c2b3',
  },
  historyBlock: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  changeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  priceText: {
    color: '#34c2b3',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#777',
    fontSize: 16,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#34c2b3',
  },
  storeChartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    color: '#333',
  },
});

export default PriceHistoryPage;
