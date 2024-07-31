import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons';

const SearchBarComponent = () => {
  const [search, setSearch] = useState("");
  const [placeholder, setPlaceholder] = useState("Type Here...");

  const placeholders = [
    "Search for doctors",
    "Search for clinics and hospitals",
    "Search for medicines and tests",
    "Search for symptoms/specialists",
    "Start typing to search...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder((prev) => {
        const currentIndex = placeholders.indexOf(prev);
        const nextIndex = (currentIndex + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 3000); // Change placeholder every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder={placeholder}
        onChangeText={updateSearch}
        value={search}
        lightTheme
        round
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        searchIcon={
            <MaterialIcons name="search" size={24} color="black" />// Custom search icon
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor:"transparent",
    borderColor:"transparent",
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 15,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    height:40
  },
  input: {
    fontSize: 15,
    color: '#333',
  }
});

export default SearchBarComponent;
