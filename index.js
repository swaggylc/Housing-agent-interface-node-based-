const express = require('express');
const app = express();

// 引入user路由
const userRouter = require('./router/user');
// 注册user路由
app.use(userRouter);






















app.listen(3000, () => {
    console.log('Server is running on port 3000' + '\n' + 'http://localhost:3000/');
}
);