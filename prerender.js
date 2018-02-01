const fs = require('fs');
const path = require('path');
const renderer = require('./renderer');
const dir = './ssr';

// Make sure the directory exists
if(!fs.existsSync(dir)) fs.mkdirSync(dir);

renderer.renderLanguages.forEach((lng) => {
    let htmlPromise = renderer.renderHTML(lng);
    let jsonPromise = renderer.renderJSON(lng);

    Promise.all([ htmlPromise, jsonPromise ]).then(([html, json]) => {
        fs.writeFileSync(path.join(dir, lng + '.html'), html);
        fs.writeFileSync(path.join(dir, lng + '.json'), json);
    });
});
