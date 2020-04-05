var express = require('express');
var router = express.Router();

var getPlateMsg = require('./mongoose/WelcomePlateMsg');
var getAccountMsg = require('./mongoose/accountMsg');
var getAccountBaseMsg = require('./mongoose/accountBaseMsg');
var getUserHatchDate = require('./mongoose/userhatchMsg')
var Token = require('./token/token')
//得到公共内容
router.get('/welcomePlateMsg', function (req, res) {
  getPlateMsg.find(function (err, result) {
    if (err) {
      return res.status(500).send('Server Err')
    }
    res.send(result)
  })
})
router.get('/common/getUserHatchData', function (req, res) {
  getUserHatchDate.find(function (err, result) {
    if (err) res.status(500).send('Server Err')
    else res.send(result)
  })
})
//登录注册业务
router.post('/accountCheckUsername', function (req, res) {
  getAccountMsg.find({ id: req.body.username.trim() }, function (err, result) {
    if (err) {
      return res.status(500).send('Server Err')
    }
    else {
      if (result != '' && result != null) {
        res.send('0')
      } else {
        res.send('1')
      }
    }
  })
})
router.post('/accountCheckEmail', function (req, res) {
  getAccountMsg.find({ email: req.body.email.trim() }, function (err, result) {
    if (err) {
      return res.status(500).send('Server Err')
    }
    else {
      if (result != '' && result != null) {
        res.send('0')
      } else {
        res.send('1')
      }
    }
  })
})
router.post('/registerAccount', function (req, res) {
  let id = req.body.account.id.trim();
  let email = req.body.account.email.trim();
  let password = req.body.account.password.trim();
  let nickname = id;
  var newAccount = new getAccountMsg({
    id,
    email,
    password,
    nickname
  })
  var newAccountBaseData = new getAccountBaseMsg({
    id,
    nickname,
  })
  newAccount.save()
    .then(() => {
      newAccountBaseData.save()
    })
    .then(() => {
      res.send('1')
    })
})
router.post('/loginAccount', function (req, res) {
  const id = req.body.account.userID.trim();
  const password = req.body.account.password.trim();
  const errData = { code: '0', message: '登录失败' }
  Promise.all
    ([
      new Promise((reslove, reject) => {
        getAccountMsg.findOne({ email: id, password: password }, function (err, result) {
          if (err) return res.status(500).send('Server Err')
          else reslove(result)
        })
      }),
      new Promise((reslove, reject) => {
        getAccountMsg.findOne({ id: id, password: password }, function (err, result) {
          if (err) return res.status(500).send('Server Err')
          else reslove(result)
        })
      })
    ])
    .then(result => {
      let userMsg = null
      for (let a in result) {
        if (result[a] !== null && result[a] !== '') userMsg = result[a]
      }
      if (userMsg === null) res.send(errData)
      else {
        const tokenData = {
          id: userMsg.id,
          password: userMsg.password,
        }
        const token = Token.createdToken(tokenData, 'ahhtou')
        Token.userTokenUpdata(tokenData, { token: token })
        const data = {
          code: '1',
          message: '登录成功',
          token,
          id: '',
          nickname: '',
        }
        data.nickname = userMsg.nickname
        data.id = userMsg.id
        res.send(data)
      }
    })
})

//通过token得到信息
router.post('/getAccountBaseMsg', function (req, res) {
  const checkToken = Token.checkToken(req, 'ahhtou')
  //正确返回id，错误返回err
  if (checkToken !== 'err') {
    getAccountBaseMsg.findOne({ id: checkToken }, function (err, result) {
      if (err) {
        return res.status(500).send('Server Err')
      } else {
        res.send(result)
      }
    })
  }
  else res.send('err')
})
module.exports = router;