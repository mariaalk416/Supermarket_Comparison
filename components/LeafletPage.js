import React, { useEffect, useState } from "react";
import { View,Text,FlatList, Image, StyleSheet,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LeafletPage = () => {
  const [leaflets, setLeaflets] = useState([]);

  useEffect(() => {
    const fetchLeaflets = async () => {
      try {
        const storedLeaflets =
          JSON.parse(await AsyncStorage.getItem("leaflets")) || [];
        setLeaflets(storedLeaflets);
      } catch (error) {
        console.error("Failed to fetch leaflets:", error);
      }
    };

    fetchLeaflets();
  }, []);

  const renderLeaflet = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Uploaded Leaflets</Text>

      {leaflets.length > 0 ? (
        <FlatList
          data={leaflets}
          renderItem={renderLeaflet}
          keyExtractor={(item, index) => `${item}-${index}`}
        />
      ) : (
        <Text style={styles.noLeafletsText}>No leaflets uploaded yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f9',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  noLeafletsText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});

export default LeafletPage;