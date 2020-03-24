const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
  configureWebpack:{
    resolve: {
      alias: {
        // '@': 'src'
        'assets': resolve('src/assets'),
        'common': resolve('src/common'),
        'components': resolve('src/components'),
        'network': resolve('src/network'),
        'views': resolve('src/views'),
      }
    }
  }
}