const fs = require('fs');

//obtain bundle
const serverBundle =  require('./dist/server.bundle.js');

//get renderer from vue server renderer
const renderer = require('vue-server-renderer').createRenderer({
    //set template
    template: fs.readFileSync('./index-server.html', 'utf-8')
});

function renderHTML(clientLanguage) {
    return new Promise((resolve, reject) => {
        const app = serverBundle.createServerApp({ lng: clientLanguage });
        const context = {
            title: 'wimbarelds.nl',
            language: clientLanguage,
            meta: `
                <meta description="Wim Barelds' personal professional website">
            `
        };

        renderer.renderToString(app, context, function (err, html) {
            if (err) {
                reject(err.code);
            } else {
                resolve(html);
            }
        });        
    });
}

function renderJSON(clientLanguage) {
    return new Promise((resolve, reject) => {
        const content = serverBundle.content[clientLanguage];
        if (content) resolve(JSON.stringify(content));
        else reject('Invalid language ID sent');
    });
}

var renderLanguages = Object.keys(serverBundle.content);

module.exports = { renderHTML, renderJSON, renderLanguages };