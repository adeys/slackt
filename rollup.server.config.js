const commonjs = require('@rollup/plugin-commonjs');
const buble = require('@rollup/plugin-buble');
const replace = require('@rollup/plugin-replace');
const alias = require('@rollup/plugin-alias');

let buildDir = './dist';

module.exports = ['server'].map(name => ({
    input: `./src/client/${name}.js`,
    output: {
        file: `${buildDir}/${name}.build.js`,
        format: 'cjs',
        exports: 'default'
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