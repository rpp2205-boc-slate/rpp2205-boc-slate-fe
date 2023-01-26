// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';
//const TerserPlugin = require('terser-webpack-plugin');
//const Dotenv = require('dotenv-webpack');

const stylesHandler = 'style-loader';

const SRC_DIR = path.join(__dirname, './src');
const DSC_DIR = path.join(__dirname, './dist');

const config = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
        path: DSC_DIR,
        filename: 'main.js'
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    // optimization: {
    //     minimizer: [new TerserPlugin({
    //         extractComments: false
    //     })]
    // }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
