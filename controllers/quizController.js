const Quiz = require("../models/quizModel");
const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createQuiz = catchAsync(async (req, res, next) => {
  const { title, creator, questions } = req.body;
  const quiz = await Quiz.create({ title, creator, questions });
  res.status(201).json({
    status: "success",
    data: {
      quiz,
    },
  });
});

exports.getQuizById = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.quizId);

  if (!quiz) {
    return next(new AppError("No quiz found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      quiz,
    },
  });
});

exports.submitQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.quizId);

  if (!quiz) {
    return next(new AppError("Quiz not found", 404));
  }

  const { answers } = req.body;
  let score = 0;
  answers.map((obj) => {
    const question = quiz.questions.find(
      (ques) => ques._id.toString() === obj.questionId
    );

    if (!question) {
      return next(new AppError("Not valid question!", 404));
    }

    const option = question.options.find(
      (opt) => opt._id.toString() === obj.selectedOptions
    );

    if (!option) {
      return next(new AppError("Not valid option!", 404));
    }

    option.isCorrect === true ? score++ : "";
  });

  const participant = await User.findById(req.user.toString());
  participant.quiz = req.params.quizId;
  participant.score = score;
  participant.save();
  res.status(200).json({
    status: "success",
    data: {
      score,
    },
  });
});

exports.getAllParticipantsById = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz) {
    return next(new AppError("Quiz not found", 404));
  }

  const participants = await User.find({ quiz: quiz._id.toString() });

  if (participants.length === 0) {
    return next(new AppError("No participants with this quiz found!"));
  }

  res.status(200).json({
    status: "success",
    length: participants.length,
    data: {
      participants,
    },
  });
});
