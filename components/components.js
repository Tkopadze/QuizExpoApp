import React, { useState } from "react";
import { View, Button, ScrollView } from "react-native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const OptionsBtn = ({ title, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const CustomDropdown = ({
  items,
  selectedValue,
  onValueChange,
  display,
  isOpen,
  toggleDropdown,
  zIndex,
}) => {
  return (
    <View style={[styles.dropdownContainer, { zIndex }]}>
      <Button title={selectedValue} onPress={toggleDropdown} />
      {isOpen && (
        <ScrollView style={styles.dropdownList}>
          {items.map((item) => (
            <Button
              key={item.id}
              title={item.name}
              onPress={() => {
                onValueChange(item.id, item.name);
                toggleDropdown();
              }}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "relative",
    width: "100%",
    zIndex: 100,
    marginBottom: 20,
    backgroundColor: "#4D7C8A",
    color: "#fff",
  },
  dropdownList: {
    maxHeight: 400,
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#4D7C8A",
    color: "#fff",
    borderRadius: 5,
    elevation: 5,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00c2b7",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    elevation: 3,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
});
