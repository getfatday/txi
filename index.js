var fs = require('fs');
var path = require('path');

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

function pow(value) {
    return 1 << value;
}

function flags(value, length) {
    return ((new Array(length + 1)).join('0') + (value >>> 0).toString(2)).slice(-length).split('').map(function (i) {
        return parseInt(i);
    });
}

function sum(flags) {
    return function(result, v, i) {
        return result + ((flags[i] || 0) ? v : 0);
    };
};

function solution(seed, values) {
    return values.reduce(sum(flags(seed, values.length)), 0);
};

function itemized(values) {
    return function (seed) {
        var flag = flags(seed, values.length);
        return values.filter(function (v, i) {
            return flag[i];
        });
    };
};

function main(fp, cb) {
    readData(fp, function(err, data) {
        if (err) return cb(err);

        var total = data.total;
        var values = data.items.map(function (v) { return v[1] });
        var length = pow(data.items.length);
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
