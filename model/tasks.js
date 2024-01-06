const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your task title"],
    },
    alarmHour: {
      type: Number,
      required: [true, "Please enter the alarm hour(s)"],
      min: 0,
      max: 23,
    },
    alarmMinute: {
      type: Number,
      required: [true, "Please enter the alarm minute(s)"],
      min: 0,
      max: 59,
    },
    alarmSeconds: {
      type: Number,
      required: [true, "Please enter the alarm minute(s)"],
      min: 0,
      max: 59,
    },
    ampm: {
      type: String,
      required: [true, "Please set AM/PM"],
    },
    futureTime: {
      type: Date,
      default: Date.now,
    },
    futureTimeInNumber: {
      type: Number,
      default: 0,
    },
    futureTimeMonth: {
      type: Number,
      default: 0,
    },
    futureTimeYear: {
      type: Number,
      default: 0,
    },
    previouseFutureTime: {
      // cancel creates a new futuretime, thus we need a data of futuretime at creation or edition of task before canceling, to get acurate repeat time
      type: Date,
      default: Date.now,
    },
    lastTimeUpdated: {
      //lastimeupdated is used to know time when task is created or edited to calculate remainingtime when repeating task
      type: Date,
      default: Date.now,
    },
    lastTimeUpdatedBeforeCanceling: {
      // lastTimeUpdatedBeforeCanceling is used to get when task is edited,created, or repeated because cancel changes the updatedAt value, thus when cancel or repeat is true we show this data as createdAt in frontend
      type: Date,
      default: Date.now,
    },
    remainingTime: {
      type: Number,
      default: 0,
    },
    cancelCount: {
      type: Number,
      default: 0,
    },
    repeatCount: {
      type: Number,
      default: 0,
    },
    editCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cancel: {
      type: Boolean,
      default: false,
    },
    repeat: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
