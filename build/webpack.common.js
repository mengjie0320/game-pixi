const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/main.ts'
    },
    resolve: {
        extensions: ['.ts', '.js', '.scss']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,  // 使用MiniCssExtractPlugin.loader替换style-loader
                    'css-loader',
                    'postcss-loader',  // 位置在css-loader之后
                    'sass-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css', 
        }),  // 置于html插件之后
    ]
}