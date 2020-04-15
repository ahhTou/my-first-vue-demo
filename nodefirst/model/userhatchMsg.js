var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vuedata',
  { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema;

var SchemaAccount = new Schema({
  id: {
    type: String,
    required:true,
  },
  url:{
    required:true,
    type: String,
  },
  logoFont:{
    required:true,
    type: String,
  },
  name:{
    required:true,
    type: String,
  }

})

module.exports = mongoose.model('userHatchMsg', SchemaAccount, 'userHatchMsg')