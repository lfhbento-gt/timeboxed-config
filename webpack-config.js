var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var ENV = process.env.NODE_ENV || 'development';

var config = {
    context: __dirname + '/app',
    entry: ['bootstrap-toggle', 'bootstrap-loader', './js/main.js'],
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
            { test: /\.html/, loader: 'html-loader' },
            { test: /\.js/, loader: 'babel-loader', exclude: /node_modules\//, query: {presets: ['es2015', 'react']} },
            { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
};

if (ENV === 'production') {
    config = merge(config, {
        devtool: 'source-map',
        plugins: [
            new webpack.optimize.UglifyJsPlugin({minimize: true})
        ]
    });
}

module.exports = config;
