/**
 * 对房产信息的增删改查
 */

const express = require("express");
const mysql = require("mysql");
const router = express.Router();



//2.建立与 mysql 数据库的联系
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
    console.log("连接数据库成功--home");
  }
});

// 1.查询房产信息
router.get("/list", (req, res) => {
  const sqlStr = "select * from home";
  client.query(sqlStr, (err, results) => {
    if (err) {
      //查询数据失败
      res.send({
        code: 201,
        msg: "查询房产信息失败",
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
// 1.1根据id查询房产信息
router.post("/check", (req, res) => {
    // console.log(req.body);
    const homeId = req.body.homeId;
    const sqlStr = "select * from home where homeId=?";
    client.query(sqlStr, [homeId], (err, results) => {
        if (err) {
            //查询数据失败
            res.send({
                code: 201,
                msg: "查询房产信息失败",
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











// 2.添加房产信息
/**
 * 参数：
 * allArea: 建筑面积
 * actualArea: 套内面积
 * type: 户型
 * address: 房产地址
 * price: 房产价格
 * buyTime: 购买时间
 */
router.post("/add", (req, res) => {
    // console.log(req.body);
  //获取用户提交的数据
  const { allArea, actualArea, type, address, price, buyTime,imgUrl } = req.body;
  // console.log(home);
  //把用户提交的数据保存到数据库中
  const sqlStr =
    "insert into home (allArea, actualArea, type, address, price, buyTime,imgUrl,cellUserId) values (?, ?, ?, ?, ?, ?,?,?)";
  client.query(
    sqlStr,
    [allArea, actualArea, type, address, price, buyTime,imgUrl,cellUserId],
    (err, results) => {
      if (err) {

        //保存数据失败
        res.send({
          code: 201,
          msg: "添加房产信息失败",
        });
        return console.log(err.message);
      }
      //保存数据成功
      res.send({
        code: 200,
        msg: "添加房产信息成功",
      });
    }
  );
});

// 3.删除房产信息
/**
 * 参数：
 * homeId: 发布信息编号
 *
 */
router.delete("/delete", (req, res) => {
  // console.log(req.body);
  const sqlStr = "delete from home where homeId=?";
  client.query(sqlStr, [req.body.homeId], (err, results) => {
    if (err) {
      //删除用户信息失败
      res.send({
        code: 201,
        msg: "删除房产信息失败",
      });
      return console.log(err.message);
    }
    //删除用户信息成功
    // console.log(results)
    res.send({
      code: 200,
      msg: "删除房产信息成功",
    });
  });
});

// 4.修改房产信息
/**
 * 参数：
 * homeId: 发布信息编号
 * allArea: 建筑面积
 * actualArea: 套内面积
 * type: 户型
 * address: 房产地址
 * price: 房产价格
 * buyTime: 购买时间
 * sellUserId: 卖家id
 *
 */
router.post("/update", (req, res) => {
  // console.log(req.body);
  const { homeId, allArea, actualArea, type, address, price, buyTime,sellUserId } =
    req.body;
  const sqlStr =
    "update home set allArea=?, actualArea=?, type=?, address=?, price=?, buyTime=?,sellUserId=? where homeId=?";
  client.query(
    sqlStr,
    [allArea, actualArea, type, address, price, buyTime,sellUserId, homeId],
    (err, results) => {
      if (err) {
        //修改用户信息失败
        res.send({
          code: 201,
          msg: "修改房产信息失败",
        });
        return console.log(err.message);
      }
      //修改用户信息成功
      // console.log(results)
      res.send({
        code: 200,
        msg: "修改房产信息成功",
      });
    }
  );
});

module.exports = router;
