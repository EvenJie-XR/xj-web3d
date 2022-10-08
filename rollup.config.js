import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel'; // 处理es6
import {uglify} from 'rollup-plugin-uglify';
import banner from 'rollup-plugin-banner';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import merge from 'webpack-merge';

// 获取今年年份和package.json里的version
let year = new Date().getFullYear(),
    version = pkg.version;

// 打包后xxx.js、xxx.min.js...的banner字符串
let bannerText = `xj-web3d v${version}
(c) 2022-${year} jie github地址
Licensed under MIT
Released on: oct 21, 2022`;

let config = {
    // 入口文件
    input: 'src/index.ts',
    // 输出配置对象
    output: {
        name:'xj-web3d',
        // 输出目录
        file: 'dist/xj-web3d.umd.js',
        format: 'umd'
    },
    plugins: [
        resolve(),
        commonjs({
            include: /node_modules/
        }),
        babel(),
        json(),
        typescript(),
        banner(bannerText),
    ]
};

let [min, es, cjs] = [merge({}, config), merge({}, config), merge({}, config)];

min.output.file = 'dist/xj-web3d.umd.min.js';
min.output.format = 'umd';
min.plugins.unshift(uglify());

es.output.file = 'dist/xj-web3d.es.js';
es.output.format = 'es';

cjs.output.file = 'dist/xj-web3d.cjs.js';
cjs.output.format = 'cjs';

export default [config, min, es, cjs];