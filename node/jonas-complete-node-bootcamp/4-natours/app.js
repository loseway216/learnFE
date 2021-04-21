const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// MIDDLEWARES, 顺序有影响

// logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// body parser
app.use(express.json());
// 定义静态文件根路径
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTER
// 处理路由的中间件，mounting routers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
