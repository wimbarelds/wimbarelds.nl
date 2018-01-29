//express server
const fs = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const server = express();
server.use(cookieParser());
server.use(express.json());
server.use(compression({ level: 9 }));

//obtain bundle
const serverBundle =  require('./dist/server.bundle.js');

//get renderer from vue server renderer
const renderer = require('vue-server-renderer').createRenderer({
    //set template
    template: fs.readFileSync('./index-server.html', 'utf-8')
});

server.use('/dist', express.static(path.join(__dirname, './dist')));

//start server
server.get('*', (req, res) => {
    let clientLanguage;
    if (!clientLanguage && req.cookies && req.cookies.lng) clientLanguage = req.cookies.lng;
    if (!clientLanguage) {
        const acceptLanguages = req.acceptsLanguages();
        clientLanguage = (acceptLanguages.some((lng) => lng.indexOf('nl') !== -1)) ? 'nl' : 'en';
    }

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
            if (err.code === 404) {
                res.status(404).end('Page not found')
            } else {
                res.status(500).end('Internal Server Error')
            }
        } else {
            res.end(html)
        }
    });        
});

server.post('/set-language', (req, res) => {
    if(!req.body.id) {
        res.status(500).end('No language ID sent');
    }
    
    const content = serverBundle.content[req.body.id];
    if(!content) {
        res.status(500).end('Invalid language ID sent');
    }

    res.end(JSON.stringify(content));
})

server.listen(8080);