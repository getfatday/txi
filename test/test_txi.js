var expect = require('chai').expect;
var txi = require('../index.js');

describe('TableXI', function () {
    it('should find solution in good data file', function (done) {
        txi('./test/fixture/menu-good.txt', function(err, data) {
            expect(data).to.deep.equal({
                total: 8.25,
                items: [
                    [ 'mixed fruit', 2.15 ],
                    [ 'french fries', 2.75 ],
                    [ 'side salad', 3.35 ],
                    [ 'hot wings', 3.55 ],
                    [ 'mozzarella sticks', 4.2 ],
                    [ 'sampler plate', 5.8 ]
                ],
                solutions: [
                    [
                        [ 'mixed fruit', 2.15 ],
                        [ 'french fries', 2.75 ],
                        [ 'side salad', 3.35 ]
                    ]
                ]
            });
            done();
        });
    });
    it('should not find solution in bad data file', function (done) {
        txi('./test/fixture/menu-bad.txt', function(err, data) {
            expect(data).to.deep.equal({
                total: 15.05,
                items: [
                    [ 'mixed fruit', 2.15 ],
                    [ 'french fries', 2.75 ],
                    [ 'side salad', 3.35 ],
                    [ 'hot wings', 3.55 ],
                    [ 'mozzarella sticks', 4.2 ],
                    [ 'sampler plate', 5.8 ]
                ],
                solutions: []
            });
            done();
        });
    });
    it('should override document total', function (done) {
        txi('./test/fixture/menu-bad.txt', { total: 8.25 }, function(err, data) {
            expect(data).to.deep.equal({
                total: 8.25,
                items: [
                    [ 'mixed fruit', 2.15 ],
                    [ 'french fries', 2.75 ],
                    [ 'side salad', 3.35 ],
                    [ 'hot wings', 3.55 ],
                    [ 'mozzarella sticks', 4.2 ],
                    [ 'sampler plate', 5.8 ]
                ],
                solutions: [
                    [
                        [ 'mixed fruit', 2.15 ],
                        [ 'french fries', 2.75 ],
                        [ 'side salad', 3.35 ]
                    ]
                ]
            });
            done();
        });
    });
});
