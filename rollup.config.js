import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript2 from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel'; // 处理es6
import {uglify} from 'rollup-plugin-uglify';
import banner from 'rollup-plugin-banner';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript';

// 获取今年年份和package.json里的version
let year = new Date().getFullYear(),
    version = pkg.version;

// 打包后xxx.js、xxx.min.js...的banner字符串
let bannerText = `xj-web3d v${version}
(c) 2022-${year} jie github地址
Licensed under MIT
Released on: oct 21, 2022`;

let configs = [
    { // umd
        // 入口文件
        input: 'src/index.ts',
        // 输出配置对象
        output: {
            name:'xj-web3d',
            // 输出目录
            file: 'dist/xj-web3d.js',
            format: 'umd'
        },
        plugins: [
            resolve(),
            commonjs({
                include: /node_modules/
            }),
            babel(),
            json(),
            typescript2(),
            typescript(),
            banner(bannerText),
            
        ]
    },
    { // min
        // 入口文件
        input: 'src/index.ts',
        // 输出配置对象
        output: {
            name:'xj-web3d',
            // 输出目录
            file: 'dist/xj-web3d.min.js',
            format: 'umd'
        },
        plugins: [
            resolve(),
            commonjs({
                include: /node_modules/
            }),
            babel(),
            json(),
            typescript2(),
            typescript(),
            banner(bannerText),
            uglify()
        ]
    },
    { // es
        // 入口文件
        input: 'src/index.ts',
        // 输出配置对象
        output: {
            name:'xj-web3d',
            // 输出目录
            file: 'dist/xj-web3d.es.js',
            format: 'es'
        },
        plugins: [
            resolve(),
            commonjs({
                include: /node_modules/
            }),
            babel(),
            json(),
            typescript2(),
            typescript(),
            banner(bannerText),
        ]
    },
    { // cjs
        // 入口文件
        input: 'src/index.ts',
        // 输出配置对象
        output: {
            name:'xj-web3d',
            // 输出目录
            file: 'dist/xj-web3d.cjs.js',
            format: 'cjs'
        },
        plugins: [
            resolve(),
            commonjs({
                include: /node_modules/
            }),
            babel(),
            json(),
            typescript2(),
            typescript(),
            banner(bannerText),
        ]
    }
];

export default configs;