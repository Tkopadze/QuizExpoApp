import React, { useState, useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import he from "he";
import defaultStyles from "../styles/style.js";
import appSettings from "../appSettings.js";
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
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate("Result", { score });
    }
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
      {currentQuestion.type === "multiple" && (
        <View style={defaultStyles.optionsContainer}>
          {currentQuestion.incorrect_answers.map((option, index) => (
            <Button
              key={index}
              title={option}
              onPress={() => handleAnswer(option)}
              color={defaultStyles.buttonColor.backgroundColor}
              style={defaultStyles.button}
            />
          ))}
          <Button
            title={currentQuestion.correct_answer}
            onPress={() => handleAnswer(currentQuestion.correct_answer)}
            color={defaultStyles.buttonColor.backgroundColor}
            style={defaultStyles.button}
          />
        </View>
      )}

      {currentQuestion.type === "boolean" && (
        <View style={defaultStyles.optionsContainer}>
          <Button
            title="True"
            onPress={() => handleAnswer("True")}
            color={defaultStyles.buttonColor.backgroundColor}
          />
          <Button
            title="False"
            onPress={() => handleAnswer("False")}
            color={defaultStyles.buttonColor.backgroundColor}
          />
        </View>
      )}
      {currentQuestion.type === "image" && (
        <Image
          source={{ uri: currentQuestion.image_url }}
          style={defaultStyles.image}
        />
      )}
    </View>
  );
};

export default QuizScreen;
