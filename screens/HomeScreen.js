import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import defaultStyles from "../styles/style.js";
import AppSettings from "../appSettings.js";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [difficulties, setDifficulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  useEffect(() => {
    const fetchCategoriesAndDifficulties = async () => {
      try {
        const response = await axios.get(
          `${AppSettings.API_URL}/api_category.php`
        );
        const { trivia_categories } = response.data;
        setCategories(trivia_categories);
        setDifficulties(["easy", "medium", "hard"]);
      } catch (error) {
        console.error("Error fetching categories and difficulties:", error);
      }
    };

    fetchCategoriesAndDifficulties();
  }, []);

  const startQuiz = () => {
    navigation.navigate("Quiz", {
      category: selectedCategory,
      difficulty: selectedDifficulty,
    });
  };

  return (
    <View style={[defaultStyles.container, defaultStyles.darkBackground]}>
      <Text style={[defaultStyles.label, defaultStyles.label]}>
        Select Category:
      </Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={[defaultStyles.picker, defaultStyles.darkText]}
      >
        {categories.map((category) => (
          <Picker.Item
            key={category.id}
            label={category.name}
            value={category.id}
          />
        ))}
      </Picker>
      <Text style={[defaultStyles.label, defaultStyles.label]}>
        Select Difficulty:
      </Text>
      <Picker
        selectedValue={selectedDifficulty}
        onValueChange={(itemValue) => setSelectedDifficulty(itemValue)}
        style={[defaultStyles.picker, defaultStyles.darkText]}
      >
        {difficulties.map((difficulty) => (
          <Picker.Item key={difficulty} label={difficulty} value={difficulty} />
        ))}
      </Picker>
      <Button
        title="Start Quiz"
        onPress={startQuiz}
        color={defaultStyles.buttonColor.backgroundColor}
      />
    </View>
  );
};

export default HomeScreen;
