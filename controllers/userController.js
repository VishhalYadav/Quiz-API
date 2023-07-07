const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllParticipants = catchAsync(async (req, res, next) => {
  const participants = await User.find({ role: "participant" });

  if (participants.length === 0) {
    return next(new AppError("No participants found", 404));
  }

  res.status(200).json({
    status: "success",
    length: participants.length,
    data: {
      participants,
    },
  });
});
