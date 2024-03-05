import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import defaultStyles from "../styles/style.js";
import AppSettings from "../appSettings.js";
import { CustomDropdown } from "../components/components.js";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [difficulties, setDifficulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  useEffect(() => {
    const fetchCategoriesAndDifficulties = async () => {
      try {
        const response = await axios.get(
          `${AppSettings.API_URL}/api_category.php`
        );
        const { trivia_categories } = response.data;
        setCategories(trivia_categories);
        setDifficulties([
          { name: "easy", id: "easy" },
          { name: "medium", id: "medium" },
          { name: "hard", id: "hard" },
        ]);
      } catch (error) {
        console.error("Error fetching categories and difficulties:", error);
      }
    };

    fetchCategoriesAndDifficulties();
  }, []);

  const startQuiz = () => {
    console.log(selectedCategoryId, "selectedCategory");
    navigation.navigate("Quiz", {
      category: selectedCategoryId,
      difficulty: selectedDifficulty,
    });
  };

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
    console.log("clicked");
    setIsOpen2(false);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
    setIsOpen1(false);
  };

  return (
    <View style={[defaultStyles.container, defaultStyles.darkBackground]}>
      <Text style={[defaultStyles.label, defaultStyles.label]}>
        Select Category:
      </Text>
      <CustomDropdown
        items={categories.map((category) => category)}
        selectedValue={selectedCategory}
        onValueChange={(categoryId, categoryName) => {
          setSelectedCategory(categoryName);
          setSelectedCategoryId(categoryId);
        }}
        isOpen={isOpen1}
        toggleDropdown={toggleDropdown1}
        zIndex={isOpen1 ? 100 : 0}
      />
      <Text style={[defaultStyles.label, defaultStyles.label]}>
        Select Difficulty:
      </Text>
      <CustomDropdown
        items={difficulties}
        selectedValue={selectedDifficulty}
        onValueChange={(value) => setSelectedDifficulty(value)}
        isOpen={isOpen2}
        toggleDropdown={toggleDropdown2}
        zIndex={isOpen2 ? 100 : 0}
      />
      <Button
        title="Start Quiz"
        onPress={startQuiz}
        color={defaultStyles.buttonColor.backgroundColor}
      />
    </View>
  );
};

export default HomeScreen;
