const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// 引入user路由
const userRouter = require("./router/user");
// 引入home路由
const homeRouter = require("./router/home");
// 引入leave路由
const leaveRouter = require("./router/leave");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // 设置响应头
  // 若设置指定值，则只能设置一个域名
  res.setHeader("Access-Control-Allow-Origin", "*");
  // 设置允许请求的方式
  res.setHeader("Access-Control-Allow-Methods", "*");
  // 设置允许携带的请求头
  res.setHeader("Access-Control-Allow-Headers", "*");
  // 设置响应头
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  // 放行
  next();
});

// 设置跨域
app.use(cors());

// 注册user路由
app.use("/user", userRouter);
// 注册home路由
app.use("/home", homeRouter);
// 注册leave路由
app.use("/leave", leaveRouter);



app.listen(3000, () => {
  console.log(
    "Server is running on port 3000" + "\n" + "http://localhost:3000/"
  );
});
