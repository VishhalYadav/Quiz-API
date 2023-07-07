const express = require("express");
const quizController = require("./../controllers/quizController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router.post(
  "/create-quiz",
  authController.restrictTo("admin"),
  quizController.createQuiz
);
router.get("/:quizId", quizController.getQuizById);
router.get(
  "/:quizId/participants",
  authController.restrictTo("admin"),
  quizController.getAllParticipantsById
);
router.post("/:quizId/submit", quizController.submitQuiz);

module.exports = router;
