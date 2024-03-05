import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import defaultStyles from "../styles/style.js";

const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { score } = route.params;

  const restartQuiz = () => {
    navigation.popToTop();
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

export default ResultScreen;
