const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
    describe('exp', () => {
        it('should throw an error for non-finite input', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(NaN), Error);
            assert.throws(() => calculator.exp(Infinity), Error);
            assert.throws(() => calculator.exp(-Infinity), Error);
        });

        it('should return the correct result for finite input', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.exp(0), 1);
            assert.strictEqual(calculator.exp(1), Math.exp(1));
            assert.strictEqual(calculator.exp(-1), Math.exp(-1));
        });
    });

    describe('log', () => {
        it('should throw an error for non-finite input', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(NaN), Error);
            assert.throws(() => calculator.log(Infinity), Error);
            assert.throws(() => calculator.log(-Infinity), Error);
        });

        it('should throw an error for input less than or equal to zero', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(-1), Error); // Log of negative number is NaN
            assert.throws(() => calculator.log(0), Error); // Log of zero is -Infinity
        });

        it('should return the correct result for input greater than zero', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.log(1), 0);
            assert.strictEqual(calculator.log(2), Math.log(2));
            assert.strictEqual(calculator.log(10), Math.log(10));
        });

        it('should throw an error for negative infinity input', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(-Infinity), Error);
        });
    });
});
