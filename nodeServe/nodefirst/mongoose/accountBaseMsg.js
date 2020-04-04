var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vuedata',
  { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema;

var SchemaAccount = new Schema({
  id: {
    type: String,
    required:true,
  },
  nickname: {
    type: String,
  },
})

module.exports = mongoose.model('accountBaseMsg', SchemaAccount, 'accountBaseMsg')