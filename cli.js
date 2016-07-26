#!/usr/bin/env node

var txi = require('./index');

process.argv.slice(2).forEach(function (fp) {
    txi(fp, function (err, data) {
        if (err) throw err;

        data.solutions.forEach(function (solution) {
            console.log('$'+data.total);
            solution.forEach(function (items) {
                console.log(items.join(',$'));
            });
            console.log('');
        });
    });
});
