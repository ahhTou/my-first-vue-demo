var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vuedata',
  { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema;

var SchemaAccount = new Schema({
  id: {
    type: String,
    required:true,
  },
  password: {
    type: String,
    required:true,
  },
  email: {
    required:true,
    type: String,
  },
  nickname: {
    type: String,
  },
  token:{
    type: String,
  }
})

module.exports = mongoose.model('accountMsg', SchemaAccount, 'accountMsg')