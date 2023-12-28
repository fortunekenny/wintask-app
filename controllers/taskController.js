const Task = require("../model/tasks");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createTask = async (req, res) => {
  let { title, alarmHour, alarmMinute, ampm } = req.body;

  const currentTime = new Date();

  const timeNow = new Date();
  let year = timeNow.getFullYear();
  let month = timeNow.getMonth() + 1;
  let day = timeNow.getDate();
  alarmHour = Number(alarmHour);
  alarmHour = ampm === "PM" ? alarmHour + 12 : alarmHour;
  alarmHour = alarmHour > 23 ? 0 : alarmHour;
  alarmMinute = Number(alarmMinute);
  const seconds = timeNow.getSeconds();
  let ampmNow = timeNow.getHours() > 12 ? "PM" : "AM";
  let daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const pmamFutureTime2 = () => {
    alarmHour = alarmHour === 12 ? 0 : alarmHour;

    let daysInThisMonth = daysInMonth(month, year);
    day = day + 1;
    day = day >= daysInThisMonth ? 1 : day;
    month = day >= daysInThisMonth ? month + 1 : month;
    month = month > 12 ? 1 : month;
    year = month === 1 ? year + 1 : year;
    return new Date(
      `${year}/${month}/${day}-${alarmHour}:${alarmMinute}:${seconds}`
    );
  };

  let futureTime = new Date(
    `${year}/${month}/${day}-${alarmHour}:${alarmMinute}:${seconds}`
  );

  futureTime =
    ampmNow === "PM" && ampm === "AM" ? pmamFutureTime2() : futureTime;

  const remainingTime = futureTime - currentTime;
  let previouseFutureTime = futureTime;
  let lastTimeUpdated = new Date();
  let lastTimeUpdatedBeforeCanceling = new Date();

  if (ampm === ampmNow && futureTime < currentTime) {
    throw new CustomError.BadRequestError(
      "Alarm time is bellow current time, please reset time"
    );
  }

  const task = await Task.create({
    title,
    alarmHour,
    alarmMinute,
    remainingTime,
    user: req.user.userId,
    futureTime,
    ampm,
    previouseFutureTime,
    lastTimeUpdated,
    lastTimeUpdatedBeforeCanceling,
  });
  res.status(StatusCodes.CREATED).json({ task });
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

const getUserTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ tasks });
};

const getTask = async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    throw new CustomError.NotFoundError(`No task with id: ${taskId}`);
  }

  checkPermissions(req.user, task.user);

  res.status(StatusCodes.OK).json({ task });
};

const repeatTask = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new CustomError.NotFoundError(`No task with id: ${taskId}`);
  }

  checkPermissions(req.user, task.user);

  const currentTime = new Date();

  let repeatCount = task.repeatCount + 1;

  const timeNow = new Date();
  let yearNow = timeNow.getFullYear();
  let monthNow = timeNow.getMonth() + 1;
  let dayNow = timeNow.getDate();
  let hourNow = timeNow.getHours();
  let minuteNow = timeNow.getMinutes();
  let secondNow = timeNow.getSeconds();
  let lastTimeUpdated = new Date(task.lastTimeUpdated);
  let futureTime = new Date(task.previouseFutureTime);

  let remainderTime = futureTime - lastTimeUpdated;

  let daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };
  let daysInThisMonth = daysInMonth(
    futureTime.getMonth(),
    futureTime.getYear()
  );
  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneMonth = daysInThisMonth * oneDay;
  const oneYear = oneDay * 365;

  let repeatYear = Math.floor(remainderTime / oneYear);
  let repeatMonth = Math.floor((remainderTime % oneYear) / oneMonth);
  let repeatDay = Math.floor((remainderTime % oneMonth) / oneDay);
  let repeatHour = Math.floor((remainderTime % oneDay) / oneHour);
  let repeatMinute = Math.floor((remainderTime % oneHour) / oneMinute);
  let repeatSecond = Math.floor((remainderTime % oneMinute) / oneSecond);

  let seconds = secondNow + repeatSecond;
  let alarmMinute = minuteNow + repeatMinute;
  let alarmHour = hourNow + repeatHour;
  let day = dayNow + repeatDay;
  let month = monthNow + repeatMonth;
  let year = yearNow + repeatYear;
  if (seconds > 59) {
    let s = Math.floor(seconds / 59);
    seconds = seconds - 59;
    alarmMinute = alarmMinute + s;
  }
  if (alarmMinute > 59) {
    let m = Math.floor(alarmMinute / 59);
    alarmMinute = alarmMinute - 59;
    alarmHour = alarmHour + m;
  }
  if (alarmHour > 23) {
    let h = Math.floor(alarmHour / 23);
    alarmHour = alarmHour - 23;
    day = day + h;
  }
  if (day > daysInThisMonth) {
    let d = Math.floor(day / daysInThisMonth);
    day = day - daysInThisMonth;
    month = month + d;
  }
  if (month > 12) {
    let mt = Math.floor(month / 12);
    month = month - 12;
    year = year + mt;
  }
  let ampmNow = timeNow.getHours() > 12 ? "PM" : "AM";

  futureTime = new Date(
    `${year}/${month}/${day}-${alarmHour}:${alarmMinute}:${seconds}`
  );

  if (task.ampm === ampmNow && futureTime < currentTime) {
    throw new CustomError.BadRequestError(
      "Alarm time is bellow current time, please reset time"
    );
  }

  task.futureTime = futureTime;
  task.futureTimeInNumber = futureTime.getTime();
  task.remainingTime = remainderTime;
  task.repeatCount = repeatCount;
  task.cancel = false;
  task.repeat = true;
  task.lastTimeUpdatedBeforeCanceling = new Date();
  await task.save();

  res.status(StatusCodes.CREATED).json({ task });
};

const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  let { title, alarmHour, alarmMinute, ampm } = req.body;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new CustomError.NotFoundError(`No task with id: ${taskId}`);
  }

  checkPermissions(req.user, task.user);

  const currentTime = new Date();

  let editCount = task.editCount + 1;

  const timeNow = new Date();
  let year = timeNow.getFullYear();
  let month = timeNow.getMonth() + 1;
  let day = timeNow.getDate();
  alarmHour = Number(alarmHour);
  alarmHour = ampm === "PM" ? alarmHour + 12 : alarmHour;
  alarmHour = alarmHour > 23 ? 0 : alarmHour;
  alarmMinute = Number(alarmMinute);
  const seconds = timeNow.getSeconds();
  let ampmNow = timeNow.getHours() > 12 ? "PM" : "AM";

  let daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };
  const pmamFutureTime2 = () => {
    alarmHour = alarmHour === 12 ? 0 : alarmHour;
    let daysInThisMonth = daysInMonth(month, year);
    day = day + 1;
    day = day >= daysInThisMonth ? 1 : day;
    month = day === 1 ? month + 1 : month;
    month = month > 12 ? 1 : month;
    year = month === 1 ? year + 1 : year;
    return new Date(
      `${year}/${month}/${day}-${alarmHour}:${alarmMinute}:${seconds}`
    );
  };

  let futureTime = new Date(
    `${year}/${month}/${day}-${alarmHour}:${alarmMinute}:${seconds}`
  );

  futureTime =
    ampmNow === "PM" && ampm === "AM" ? pmamFutureTime2() : futureTime;

  const remainingTime = futureTime - currentTime;

  if (ampm === ampmNow && futureTime < currentTime) {
    throw new CustomError.BadRequestError(
      "Alarm time is bellow current time, please reset time"
    );
  }
  task.title = title;
  task.alarmHour = alarmHour;
  task.alarmMinute = alarmMinute;
  task.ampm = ampm;
  task.futureTime = futureTime;
  task.previouseFutureTime = futureTime;
  task.lastTimeUpdated = new Date();
  task.remainingTime = remainingTime;
  task.lastTimeUpdatedBeforeCanceling = new Date();
  task.editCount = editCount;
  task.cancel = false;
  task.repeat = false;
  await task.save();

  res.status(StatusCodes.OK).json({ task });
};

const cancelTask = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new CustomError.NotFoundError(`No task with id: ${taskId}`);
  }

  checkPermissions(req.user, task.user);

  const currentTime = new Date();

  let cancel = task.cancelCount + 1;

  const timeNow = new Date();
  let year = timeNow.getFullYear();
  let month = timeNow.getMonth() + 1;
  let day = timeNow.getDate();
  let alarmHour = timeNow.getHours();
  let alarmMinute = timeNow.getMinutes();
  let seconds = timeNow.getSeconds();

  futureTime = new Date(
    `${year}/${month}/${day}-${alarmHour}:${alarmMinute}:${seconds}`
  );

  const remainingTime = futureTime - currentTime;

  task.futureTime = futureTime;
  task.remainingTime = remainingTime;
  task.cancel = true;
  task.cancelCount = cancel;
  task.repeat = false;
  await task.save();

  res.status(StatusCodes.CREATED).json({ task });
};

const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    throw new CustomError.NotFoundError(`No task with id: ${taskId}`);
  }

  checkPermissions(req.user, task.user);

  await task.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Task deleted" });
};

module.exports = {
  createTask,
  getAllTasks,
  getUserTasks,
  getTask,
  repeatTask,
  updateTask,
  cancelTask,
  deleteTask,
};
