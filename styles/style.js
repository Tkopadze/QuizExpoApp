const defaultStyles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#203331",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#cddc39",
  },
  picker: {
    width: "100%",
    marginBottom: 20,
    color: "rgb(158 245 200)",
  },
  lightText: {
    color: "rgb(158 245 200)", // Yellow text color
  },
  darkText: {
    color: "#00433C", // Darker text color for categories
  },
  buttonColor: {
    backgroundColor: "#00c2b7", // Button color
  },
  header: {
    backgroundColor: "#4D7C8A", // Lighter green header background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // White text color
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff", // White text color
  },
  optionsContainer: {
    marginBottom: 20,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 18,
    color: "#F5F18E", // Light yellow text color
  },
  optionsContainer: {
    marginBottom: 20,
    width: "100%",
    flexDirection: "column", // Make buttons stack vertically
    alignItems: "stretch", // Stretch buttons to fill the width
  },
  button: {
    marginBottom: 10, // Add margin between each button
  },
};

export default defaultStyles;
