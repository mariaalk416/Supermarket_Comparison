import React, { useState, useEffect } from "react";
import { View, Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WishlistPage = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemNote, setItemNote] = useState("");

  // Load wishlist from AsyncStorage on component mount
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const storedWishlist = JSON.parse(await AsyncStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
      } catch (error) {
        console.error("Error loading wishlist:", error);
      }
    };

    loadWishlist();
  }, []);

  // Save wishlist to AsyncStorage whenever it changes
  const saveWishlist = async (newWishlist) => {
    try {
      await AsyncStorage.setItem("wishlist", JSON.stringify(newWishlist));
      setWishlist(newWishlist);
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  };

  // Add item to wishlist
  const handleAddItem = () => {
    if (!itemName.trim()) {
      Alert.alert("Error", "Item name cannot be empty.");
      return;
    }

    const newItem = {
      id: Date.now().toString(), // Unique ID
      name: itemName.trim(),
      note: itemNote.trim(),
    };

    const updatedWishlist = [...wishlist, newItem];
    saveWishlist(updatedWishlist);

    setItemName("");
    setItemNote("");
  };

  // Remove item from wishlist
  const handleRemoveItem = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    saveWishlist(updatedWishlist);
  };

  // Render each wishlist item
  const renderWishlistItem = ({ item }) => (
    <View style={styles.wishlistItem}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.note ? <Text style={styles.itemNote}>{item.note}</Text> : null}
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8ae1e6", "#34c2b3"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Text style={styles.header}>My Wishlist</Text>
      </LinearGradient>

      {/* Input for adding items */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Optional Note"
          value={itemNote}
          onChangeText={setItemNote}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>Add to Wishlist</Text>
        </TouchableOpacity>
      </View>

      {/* Wishlist items */}
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={renderWishlistItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your wishlist is empty.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7f9",
    padding: 20,
  },
  headerGradient: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    elevation: 3,
  },
  addButton: {
    backgroundColor: "#34c2b3",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  wishlistItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemNote: {
    fontSize: 14,
    color: "#666",
  },
  removeButton: {
    backgroundColor: "#ff6b6b",
    padding: 10,
    borderRadius: 25,
    elevation: 3,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});

export default WishlistPage;
