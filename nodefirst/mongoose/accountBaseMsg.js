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
  profilePhoto: {
    type: String,
    default:'http://127.0.0.1:3000/public/img/defaultProfilePhoto.jpg'
  }

})

module.exports = mongoose.model('accountBaseMsg', SchemaAccount, 'accountBaseMsg')