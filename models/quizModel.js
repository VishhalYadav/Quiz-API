const mongoose = require("mongoose");

// Define the Quiz schema
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [
    {
      text: { type: String, required: true },
      options: [
        {
          text: { type: String, required: true },
          isCorrect: { type: Boolean, required: true, default: false },
        },
      ],
    },
  ],
});

// Create the Quiz model
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
