'use strict';
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {

    //入口
    entry: {
        main: './app/index.jsx'
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
        new htmlWebpackPlugin({
            template: 'app/index.tmpl.html'
        }),
        // 热加载插件  //更改文件内容,浏览器会自动刷新
        new webpack.HotModuleReplacementPlugin(),

        // 打开浏览器
        new OpenBrowserPlugin({
          url: 'http://localhost:8080'
        }),

        //DEV获取来源是package.json中定义的
        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        // 作用是在app\util\localStore.js文件中用到了__DEV__,来测试当前是开发环境->可以显示错误,还是非开发环境->不能报错
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        }),
        //postcss和devServer
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('autoprefixer') //调用autoprefixer插件，例如 display: flex
                ]
            }
        })
    ],
    devServer: {
        proxy: {
          // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。 
          // 也就是说我们当前项目在8080端口,但是要去获取3000端口的时候,我们只给它一个/api路径,那它只会去访问http://localhost:8080/api,那么代理后我们就能去获取3000端口的
          // koa 代码在 ./mock 目录中，启动命令为 npm run mock
          '/api': {
            target: 'http://localhost:3000',
            secure: false,
          }
        },
            historyApiFallback: true, //不跳转
            inline: true, //实时刷新
            hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
}