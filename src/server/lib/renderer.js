const path = require('path');
const fs = require('fs');

const render = require('preact-render-to-string');
const App = require('../../client/App').default;
const { h } = require('preact');

let html = undefined;

module.exports = function renderIndexFile(req, res) {
    if (html === undefined) {
        let html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');

        let markup = render(h(App, null), {pretty: true});
        html = html.replace('{title}', 'Welcome to Slackt');
        html = html.replace('{stylesheets}', ['bundle.min.css'].map(href => `<link rel="stylesheet" href="/assets/${href}"/>`).join('\n'));
        html = html.replace('{scripts}', ['bundle.min.js'].map(href => `<script src="/assets/${href}"></script>`).join('\n'));
        html = html.replace('{html}', markup);
    }

    return res.send(html);
};