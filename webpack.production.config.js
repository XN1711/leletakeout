var pkg = require('./package.json')
var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './app/index.jsx'
    // 将 第三方依赖（node_modules中的） 单独打包 这里需要package.json文件dependencies属性有文件
    // vendor: Object.keys(pkg.dependencies)
  },
  output: {
        //所有产出资源路径
        path: path.join(__dirname, 'dist'),
        filename: 'build.js'
  },
    resolve:{ //这里的作用是 假如引入的文件没有后缀名，会自动识别并添加上 比如有'./app/index.jsx'路径文件,那只需引入 import index from './app/' 那它就会自动去引入app下的index.jsx文件
        extensions:['.js','.jsx']
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.less$/,  //将less转换为css格式
                loader: 'style-loader!css-loader!less-loader!postcss-loader'
            },
            {
                test: /\.(jpg|png|svg|ttf|woff|eot|woff2|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096, //限制大小4096字节以内生成文件，否则base6
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {  
                test: require.resolve('react-addons-perf'),  
                loader: require.resolve('expose-loader'),  
                options: 'Perf'   
            }  
        ]
    },

  plugins: [
    // webpack 内置的 banner-plugin  版权
    new webpack.BannerPlugin("Copyright by wangfupeng1988@github.com."),

    // html 模板插件
    new HtmlWebpackPlugin({
        template: __dirname + '/app/index.tmpl.html'
    }),

    // 定义为生产环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID 不知道为什么用不了
    // new webpack.optimize.OccurenceOrderPlugin(),
    
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          //supresses warnings, usually from module minification
          warnings: false
        }
    }),
    
    // 分离CSS和JS文件
    new ExtractTextPlugin('/css/[name].[chunkhash:8].css'), 
    
    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './js/[name].[chunkhash:8].js'
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    }),

    //postcss
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                require('autoprefixer') //调用autoprefixer插件，例如 display: flex
            ]
        }
    })
  ]
}