const express = require('express');
const app = express();

// 引入user路由
const userRouter = require('./router/user');
// 引入home路由
const homeRouter = require('./router/home');



// 注册user路由
app.use("/user",userRouter);
// 注册home路由
app.use("/home",homeRouter);






















app.listen(3000, () => {
    console.log('Server is running on port 3000' + '\n' + 'http://localhost:3000/');
}
);