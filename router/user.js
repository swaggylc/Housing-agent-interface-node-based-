/**
 * 对用户信息进行操作
 * 
 */

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

//2.建立与 mysql 数据库的联系
const client = mysql.createPool({
    host: '127.0.0.1', //数据库的 ip 地址
    user: 'root', //登陆数据库的账号
    password: 'admin123', //登陆数据库的密码
    database: 'my_db_01' //要操作哪个数据库
})

// 3.检测是否连接成功
client.getConnection(function (err, connection) {
    if (err) {
        console.log('连接失败:' + err.message);
    }
    else {
        console.log('连接数据库成功--user');
    }
})



// 1.查询用户信息
router.get('/list', (req, res) => {
    const sqlStr = 'select * from user'
    client.query(sqlStr, (err, results) => {
        if (err) {
            //查询数据失败
            res.send({
                code: 201,
                msg: '查询用户信息失败'
            })
            return console.log(err.message)
        }
        console.log(results);
        //查询数据成功
        res.send({
            code: 200,
            msg: '查询数据成功',
            data: results
        })
    })
}
);

// 2.添加用户信息
/**
 * 参数：
 * name: 姓名
 * idNum: 身份证号
 * birthday: 出生日期
 * gender: 性别
 * email: 邮箱
 * address: 地址
 * phoneNum: 手机号
 */
router.post('/add', (req, res) => {
    //获取用户提交的数据
    const user = req.body;
    console.log(user);
    //把用户提交的数据保存到数据库
    const sqlStr = 'insert into user (name, idNum,birthday,gender, email, address,phoneNum) values (?, ?, ?, ?,?,?,?)'
    client.query(sqlStr, [user.name, user.idNum, user.birthday, user.gender, user.email, user.address, user.phoneNum], (err, results) => {
        if (err) {
            res.send({
                code: 201,
                msg: '添加用户信息失败'
            })
            //保存数据失败
            return console.log(err.message)
        }
        //保存数据成功
        res.send({
            code: 200,
            msg: '添加用户成功'
        })
    })
}
);

// 3.修改用户信息
/**
 * 参数：
 * userId: 用户id
 * name: 姓名
 * idNum: 身份证号
 * birthday: 出生日期
 * gender: 性别
 * email: 邮箱
 * address: 地址
 * phoneNum: 手机号
 * 
 */
router.post('/update', (req, res) => {
    //获取用户提交的数据
    const user = req.body;
    //修改用户信息
    const sqlStr = 'update user set name=?,idNum=?,birthday=?,gender=?,email=?,address=?,phoneNum=? where userId=?'
    client.query(sqlStr, [user.name, user.idNum, user.birthday, user.gender, user.email, user.address, user.phoneNum, user.userId], (err, results) => {
        if (err) {
            //修改用户信息失败
            res.send({
                code: 201,
                msg: '修改用户信息失败'
            })
            return console.log(err.message)
        }
        //修改用户信息成功
        res.send({
            code: 200,
            msg: '修改用户信息成功'
        })
    })
})

// 4.删除用户信息
/**
 * 参数：
 * userId: 用户id
 * 
 */
router.delete('/delete', (req, res) => {
    // console.log(req.body);
    const sqlStr = 'delete from user where userId=?'
    client.query(sqlStr, [req.body.userId], (err, results) => {
        if (err) {
            //删除用户信息失败
            res.send({
                code: 201,
                msg: '删除用户信息失败'
            })
            return console.log(err.message)
        }
        //删除用户信息成功
        // console.log(results)
        res.send({
            code: 200,
            msg: '删除用户信息成功'
        })
    }
    )
})





// 用户注册（添加用户）
/**
 * 参数：
 * account: 账号
 * password: 密码
 * phoneNumber: 手机号
 * email: 邮箱
 */
router.post('/register', (req, res) => {
    const { account, password, phoneNumber, email } = req.body;
    const sqlStr = 'insert into user_account (account, password,phoneNumber ,email) values (?, ?, ?, ?)'
    client.query(sqlStr, [account, password, phoneNumber, email], (err, results) => {
        if (err) {
            res.send({
                code: 201,
                msg: '注册失败'
            })
            //保存数据失败
            return console.log(err.message)
        }
        //保存数据成功
        res.send({
            code: 200,
            msg: '注册成功'
        })
    }
    )
})


// 用户登陆
/**
 * 参数：
 * account: 账号
 * password: 密码
 */
router.post('/login', (req, res) => {
    const { account, password } = req.body;
    const sqlStr = 'select * from user_account'
    client.query(sqlStr, (err, results) => {
        if (err) {
            res.send({
                code: 201,
                msg: '登陆失败'
            })
            return console.log(err.message)
        }
        const user = results.find(item => item.account === account && item.password === password)
        if (!user) {
            res.send({
                code: 202,
                msg: '账号或密码错误'
            })
            return
        } else {
            res.send({
                code: 200,
                msg: '登陆成功'
            })
        }
    }
    )
})








module.exports = router;
