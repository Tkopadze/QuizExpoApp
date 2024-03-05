// screens/ResultScreen.js

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import defaultStyles from "../styles/style.js";

const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { score } = route.params;

  const restartQuiz = () => {
    navigation.popToTop(); // Reset navigation stack
  };

  return (
    <View style={[defaultStyles.container, defaultStyles.backgroundColor]}>
      <Text style={[defaultStyles.label, defaultStyles.backgroundColor]}>
        Your Score: {score}
      </Text>
      <Button
        title="Restart Quiz"
        onPress={restartQuiz}
        color={defaultStyles.buttonColor.backgroundColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ResultScreen;
