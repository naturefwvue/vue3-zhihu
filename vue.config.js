// vue.config.js
// const path = require('path')
// const resolve = (dir) => path.join(__dirname, dir)
// const src = 'src_zhihu'
module.exports = {
  // 选项...
  productionSourceMap: false
  // chainWebpack: config => {
  //  config.resolve.alias // 添加别名
  //    .set('@', resolve(src))
  //    .set('@assets', resolve(`${src}/assets`))
  //    .set('@components', resolve(`${src}/components`))
  //    .set('@views', resolve(`${src}/views`))
  //    .set('@store', resolve(`${src}/store`))
  // }
}
