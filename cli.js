#!/usr/bin/env node

var txi = require('./index');

var argv = require('yargs')
    .usage('$0 [options] [files ...]')
    .number('total')
    .alias('t', 'total')
    .describe('t', 'Specify menu item total to be found')
    .help('h')
    .alias('h', 'help')
    .argv;

argv._.forEach(function (fp) {
    txi(fp, argv, function (err, data) {
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
