/**
 * 对留言的操作
 *
 */
const express = require("express");
const mysql = require("mysql");
const router = express.Router();

// 2.连接数据库
const client = mysql.createPool({
  host: "127.0.0.1", //数据库的 ip 地址
  user: "root", //登陆数据库的账号
  password: "admin123", //登陆数据库的密码
  database: "my_db_01", //要操作哪个数据库
});

// 3.检测是否连接成功
client.getConnection(function (err, connection) {
  if (err) {
    console.log("连接失败:" + err.message);
  } else {
    console.log("连接数据库成功--leaveMsg");
  }
});

// 1.查询留言信息
router.get("/list", (req, res) => {
    const sqlStr = "select * from leave_msg";
    client.query(sqlStr, (err, results) => {
        if (err) {
            //查询数据失败
            res.send({
                code: 201,
                msg: "查询留言信息失败",
            });
            return console.log(err.message);
        }
        // console.log(results);
        //查询数据成功
        res.send({
            code: 200,
            msg: "查询数据成功",
            data: results,
        });
    });
});

// 2.添加留言信息
router.post("/add", (req, res) => {
    // console.log(req.body);
    const content = req.body.content;
    const sqlStr ='insert into leave_msg (content) values(?)';
    client.query(sqlStr, [content], (err, results) => {
        if (err) {
            //添加数据失败
            res.send({
                code: 201,
                msg: "添加留言信息失败",
            });
            return console.log(err.message);
        }
        // console.log(results);
        //添加数据成功
        res.send({
            code: 200,
            msg: "添加留言信息成功",
            data: results,
        });
    });
});

// 3.删除留言信息
router.post("/delete", (req, res) => {
    // console.log(req.body);
    const msgId = req.body.msgId;
    const sqlStr = "delete from leave_msg where msgId=?";
    client.query(sqlStr, [msgId], (err, results) => { 
        if (err) {
            //删除数据失败
            res.send({
                code: 201,
                msg: "删除留言信息失败",
            });
            return console.log(err.message);
        }
        // console.log(results);
        //删除数据成功
        res.send({
            code: 200,
            msg: "删除数据成功",
            data: results,
        });
    });
});







































module.exports = router;
