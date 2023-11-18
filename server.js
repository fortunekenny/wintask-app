require("dotenv").config();
require("express-async-errors");

//Express
const express = require("express");
const app = express();

//rest of packages
const cookieParser = require("cookie-parser");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

//Database
const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//IMPORTING ENDS

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
// app.use(cors({ credentials: true, origin: true }));
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));

// app.get("/api/v1", (req, res) => {
//   console.log(req.signedCookies);
//   res.send("home page");
// });

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`WINTASK-APP server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
