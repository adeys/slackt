const {terser} = require('rollup-plugin-terser');
const {nodeResolve} =  require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const buble = require('@rollup/plugin-buble');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const replace = require('@rollup/plugin-replace');
const alias = require('@rollup/plugin-alias');

let buildDir = './public/build';

module.exports = ['index'].map(name => ({
    input: `./src/client/${name}.js`,
    output: [
        {
            file: `${buildDir}/bundle.js`,
            format: 'iife'
        },
        {
            file: `${buildDir}/bundle.min.js`,
            format: 'iife',
            plugins: [
                terser({
                    compress: true,
                    mangle: true,
                    output: {
                        comments: false,
                    }
                })
            ]
        },
    ],
    plugins: [
        nodeResolve(),
        postcss({
            use: ['sass'],
            plugins: [autoprefixer],
            minimize: true,
            extract: true
        }),
        buble({
            jsx: 'h',
            objectAssign: 'Object.assign',
            transforms: {
                asyncAwait: false,
                dangerousForOf: true
            },
        }),
        replace( {
            'process.env.NODE_ENV': JSON.stringify( 'development' )
        }),
        alias({
            entries: {
                'react': 'preact/compat',
                'react-dom': 'preact/compat'
            }
        }),
        commonjs()
    ]
}));