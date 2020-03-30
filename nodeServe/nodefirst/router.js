var express = require('express');

var router = express.Router();

var getPlateMsg = require('./mongoose/WelcomePlateMsg');
var getAccountMsg = require('./mongoose/accountMsg');

router.get('/welcomePlateMsg', function(req, res){
  getPlateMsg.find(function (err, result){
    if(err) {
      return res.status(500).send('Server Err')
    }
    res.send(result)
  })
})

router.post('/accountCheckUsername', function(req, res){
  getAccountMsg.find( {id:req.body.username.trim() },function (err, result){
    if(err) {
      return res.status(500).send('Server Err')
    }
    else{
      if(result!='' && result!=null){
        res.send('0')
      }else{
        res.send('1')
      }
    }
  })
})
router.post('/accountCheckEmail', function(req, res){
  getAccountMsg.find( {email:req.body.email.trim() },function (err, result){
    if(err) {
      return res.status(500).send('Server Err')
    }
    else{
      if(result!='' && result!=null){
        res.send('0')
      }else{
        res.send('1')
      }
    }
  })
})
router.post('/registerAccount', function(req, res){
  let id = req.body.account.id.trim();
  let email = req.body.account.email.trim();
  let password = req.body.account.password.trim();
  var newAccount = new getAccountMsg({
    id,
    email,
    password
  })
  newAccount.save().then(()=>{
    res.send('1')
  })
})


module.exports = router;