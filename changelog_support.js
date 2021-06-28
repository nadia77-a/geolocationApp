var fs = require('fs'),
changelog = './changelog.md';

fs.readFile(changelog, function(err, data) {
    if(err) throw err;
    data = data.toString().replace('<!-- auto-changelog-above -->', '');
    data = '<!-- auto-changelog-above -->\n' + data;
    fs.writeFile(changelog, data, function(err) {
        err;
    });
});