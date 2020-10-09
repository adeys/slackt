const commonjs = require('@rollup/plugin-commonjs');
const buble = require('@rollup/plugin-buble');
const replace = require('@rollup/plugin-replace');
const alias = require('@rollup/plugin-alias');

let buildDir = './dist';

module.exports = ['index'].map(name => ({
    input: `./src/server/${name}.js`,
    output: {
        file: `${buildDir}/server.js`,
        format: 'cjs',
        exports: 'auto'
    },
    plugins: [
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