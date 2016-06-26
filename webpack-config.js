var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var ENV = process.env.NODE_ENV || 'development';

var config = {
    context: __dirname + '/app',
    entry: ['./js/main.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'app.js' 
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new HtmlWebpackPlugin({
            title: 'Timeboxed',
            template: 'index.html',
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    module: {
        loaders: [
            { test: /\.js/, loader: 'babel-loader', exclude: /node_modules\//, query: {presets: ['es2015', 'react']} },
            { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
};

if (ENV === 'production') {
    config = merge(config, {
        output: {
            path: __dirname + '/dist',
            filename: 'app.min.js'
        },
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env':{
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({minimize: true, compress: {warnings: true}}),
            new CompressionPlugin()
        ]
    });
}

module.exports = config;
