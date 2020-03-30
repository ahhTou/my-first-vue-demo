var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vuedata',
  { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema;

var SchemaIt = new Schema({
  title: {
    type: String,
  },
  img: {
    type: String,
  },
  bgUrl: {
    type: String,
  },
  size: {
    type: Number,
  },
  index:{
    type: Number,
  },
})

module.exports = mongoose.model('Welcomes',SchemaIt,'Welcomes')