var fs = require('fs');
var path = require('path');
var through = require('through2');

function readData(fp, cb) {
    fs.readFile(path.resolve(process.cwd(), fp), function (err, data) {
        if (err) return cb(err);
        var lines = data.toString().trim().replace(/\$/g,'').split('\n');
        var total = parseFloat(lines.shift());
        cb(null, {
            total: total,
            items: lines.map(function (line) {
                return line.split(',').map(function (part, i) {
                    return i === 0 ? part : parseFloat(part);
                });
            })
        });
    });
}

function flag(seed, value) {
    return seed & (1 << value);
}

function sum(seed) {
    return function(result, v, i) {
        return result + (flag(seed, i) ? v : 0);
    };
};

function solution(seed, values) {
    return values.reduce(sum(seed), 0);
};

function itemized(values) {
    return function (seed) {
        return values.filter(function (v, i) {
            return flag(seed, i);
        });
    };
};

function main(fp, cb) {
    readData(fp, function(err, data) {
        if (err) return cb(err);

        var total = data.total;
        var values = data.items.map(function (v) { return v[1] });
        var length = 1 << data.items.length;
        var count = 0;
        var solutions = [];

        while (count < length) {
            if (solution(count, values) === total) solutions.push(count);
            count++;
        }

        return cb(null, {
            total: data.total,
            items: data.items,
            solutions: solutions.map(itemized(data.items))
        });
    });
}

module.exports = main;
