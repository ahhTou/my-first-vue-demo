const jwt = require('jsonwebtoken')
var getAccountMsg = require('../model/accountMsg')
module.exports = {
  checkToken(req, secret) {
    let result = 'err'
    try {
      jwt.verify(req.headers.token, secret, (error, decoded) => {
        if (error) result = 'err'
        else result = decoded.name.id
      })
    } catch (error) {
      return result
    }
    return result
  },
  createdToken(data, secret) {
    const token = jwt.sign(
      {
        name: data //需要放到token的参数
      },
      secret, //随便一点内容，加密的密文，私钥对应着公钥
      {
        expiresIn: 60 * 60 //60分钟到期时间
      }
    )
    return token
  },
  userTokenUpdata(search, updata) {
    getAccountMsg.updateOne(
      { id: search.id, password: search.password },
      { token: updata.token },
      function(err, result) {
        // if (err) console.log('更新失败')
        // else console.log('更新成功')
      }
    )
  }
}
