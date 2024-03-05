import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import he from "he";
import defaultStyles from "../styles/style.js";
import appSettings from "../appSettings.js";
import { OptionsBtn } from "../components/components.js";

const QuizScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { category, difficulty } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `${appSettings.API_URL}/api.php?amount=10&category=${category}&difficulty=${difficulty}`
      );
      const decodedQuestions = response.data.results.map((question) => ({
        ...question,
        question: he.decode(question.question),
        incorrect_answers: question.incorrect_answers.map((answer) =>
          he.decode(answer)
        ),
        correct_answer: he.decode(question.correct_answer),
      }));
      setQuestions(decodedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    const isCorrect =
      selectedAnswer === questions[currentQuestionIndex].correct_answer;
    let newScore = score;

    if (currentQuestionIndex === 0) {
      if (isCorrect) {
        newScore = 1;
      }
    } else {
      if (isCorrect) {
        newScore = score + 1;
      }
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate("Result", { score: newScore });
    }
    setScore(newScore);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <View style={[defaultStyles.container, defaultStyles.darkBackground]}>
        <Text style={defaultStyles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  return (
    <View style={[defaultStyles.container, defaultStyles.darkBackground]}>
      <View style={defaultStyles.header}>
        <Text style={[defaultStyles.headerText, defaultStyles.lightText]}>
          Question {currentQuestionIndex + 1}/{questions.length}
        </Text>
      </View>
      <Text style={[defaultStyles.questionText, defaultStyles.lightText]}>
        {currentQuestion.question}
      </Text>
      <View style={styles.flatListContainer}>
        {currentQuestion.type === "multiple" && (
          <FlatList
            data={currentQuestion.incorrect_answers.concat(
              currentQuestion.correct_answer
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <OptionsBtn title={item} onPress={() => handleAnswer(item)} />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        )}

        {currentQuestion.type === "boolean" && (
          <FlatList
            data={["True", "False"]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <OptionsBtn title={item} onPress={() => handleAnswer(item)} />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        )}
      </View>
      {currentQuestion.type === "image" && (
        <Image
          source={{ uri: currentQuestion.image_url }}
          style={defaultStyles.image}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    marginTop: 10,
  },
});

export default QuizScreen;
