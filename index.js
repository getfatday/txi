var fs = require('fs');
var path = require('path');

// Parse data file
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

// Test if value bit is set in the seed
function flag(seed, value) {
    return seed & (1 << value);
}

// Sum of items for a given seed
function sum(seed) {
    return function(result, v, i) {
        return result + (flag(seed, i) ? v : 0);
    };
};

// Returns list of values used for a seed
function itemized(values) {
    return function (seed) {
        return values.filter(function (v, i) {
            return flag(seed, i);
        });
    };
};

function main(fp, options, cb) {
    if (!cb) {
        cb = options;
        options = {};
    }
    // Read file path
    readData(fp, function(err, data) {
        if (err) return cb(err);

        var total = options.total || data.total;
        var values = data.items.map(function (v) { return v[1] });
        var length = 1 << data.items.length;
        var count = 0;
        var solutions = [];
        // Loop through all possible sums and check if solution matches total
        while (count < length) {
            if (values.reduce(sum(count), 0) === total) solutions.push(count);
            count++;
        }

        return cb(null, {
            total: total,
            items: data.items,
            solutions: solutions.map(itemized(data.items))
        });
    });
}

module.exports = main;
