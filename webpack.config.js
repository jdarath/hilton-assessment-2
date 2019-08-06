'use strict';
const path = require('path');
module.exports = {
    entry: path.join(__dirname, '/src/jsx/init.js'),
    output: {
        filename: 'bundle.[name].js',
        path: path.join(__dirname, '/dist/')
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jp(e*)g|png|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: 'assets/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(otf|woff|woff2|eot|ttf|)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', 'json']
    },
    watch: true,
    watchOptions: {
        ignored: ['node_modules']
    },
    devServer: {
        contentBase: './dist'
    }
}