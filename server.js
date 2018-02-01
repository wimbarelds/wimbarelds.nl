//express server
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const server = express();
server.use(cookieParser());
server.use(express.json());
server.use(compression({ level: 9 }));

const renderer = require('./renderer');

// static
server.use('/dist', express.static(path.join(__dirname, './dist')));

//start server
server.get('*', (req, res) => {
    let clientLanguage;
    if (!clientLanguage && req.cookies && req.cookies.lng) clientLanguage = req.cookies.lng;
    if (!clientLanguage) {
        const acceptLanguages = req.acceptsLanguages();
        clientLanguage = (acceptLanguages.some((lng) => lng.indexOf('nl') !== -1)) ? 'nl' : 'en';
    }

    renderer.renderHTML(clientLanguage).then(
        // Resolve
        (html) => res.end(html),
        // Reject
        (code) => {
            if (code === 404) {
                res.status(404).end('Page not found')
            } else {
                res.status(500).end('Internal Server Error')
            }
        }
    );
});

server.post('/set-language', (req, res) => {
    if(!req.body.id) {
        res.status(500).end('No language ID sent');
    }

    renderer.renderJSON(req.body.id).then(
        // Resolve
        (content) => res.end(content),
        // Reject
        (message) => res.status(500).end(message)
    );
})

server.listen(8080);