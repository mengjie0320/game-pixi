
// 读取项目批量打包
// const glob = require('glob')
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const entryMap = {};
const htmlList = [];

const dirPath = path.resolve(__dirname, '../src/pages')
// console.log('dirPath', dirPath);
const readDir = fs.readdirSync(dirPath);
// console.log('readDir', readDir);
readDir.forEach((item) => {
    entryMap[item] = `./src/pages/${item}/index.ts`;
    htmlList.push(
        new HtmlWebpackPlugin({
            filename: `${item}.html`,
            template: `./src/pages/${item}/index.html`,
            chunks: [item],
            // minify: false
        })
    )
})
// console.log('entryMap, htmlList', entryMap, htmlList);
module.exports = {
    entryMap,
    htmlList
}
