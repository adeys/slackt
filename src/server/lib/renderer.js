const path = require('path');
const fs = require('fs');

const render = require('preact-render-to-string');
const App = require('../../../dist/server.build');
const { h } = require('preact');

let html = undefined;
let isDev = process.env.NODE_ENV !== 'production';

module.exports = function renderIndexFile(req, res) {
    if (html === undefined) {
        html = fs.readFileSync(path.resolve(__dirname, '../../../public/index.html'), 'utf8');

        html = html.replace('{title}', 'Welcome to Slackt');
        html = html.replace('{fonts}', [['woff', 'woff'], ['ttf', 'ttf']].map(
            ([ext, type]) =>
                `<link rel="preload" as="font" href="/assets/fonts/feather.${ext}" type="font/${type}" crossorigin="anonymous">`)
            .join('\n\t')
        );
        html = html.replace('{stylesheets}', ['bundle.min.css'].map(href => `<link rel="stylesheet" href="/assets/${href}"/>`).join('\n'));
        html = html.replace('{scripts}', [`bundle${isDev ? '' : '.min'}.js`].map(href => `<script src="/assets/${href}"></script>`).join('\n'));
    }

    let markup = render(h(App, {url: req.originalUrl}), {pretty: true});
    return res.send(html.replace('{html}', markup));
};