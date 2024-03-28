const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// Helper function to generate test cases for exponential function
function generateTestCaseExp(param, expectedResult, error = null) {
    return { param, expectedResult, error };
}

// Helper function to generate test cases for logarithmic function
function generateTestCaseLog(param, expectedResult, error = null) {
    return { param, expectedResult, error };
}

// Main test suite
describe('Calculator Exponential and Logarithmic Functions', () => {
    const calculator = new Calculator();

    it('should calculate exponential values correctly', () => {
        const testCases = [
            generateTestCaseExp(1, Math.exp(1)),
            generateTestCaseExp(2, Math.exp(2)),
            generateTestCaseExp(Number.MAX_VALUE, Error, 'overflow'),
            generateTestCaseExp(null, Error, 'unsupported operand type'),
            generateTestCaseExp('ABC', Error, 'unsupported operand type')
        ];

        for (const { param, expectedResult, error } of testCases) {
            const assertion = expectedResult === Error ?
                () => assert.throws(() => calculator.exp(param), { name: 'Error', message: error }) :
                () => assert.strictEqual(calculator.exp(param), expectedResult);

            assertion();
        }
    });

    it('should calculate logarithmic values correctly', () => {
        const testCases = [
            generateTestCaseLog(1, 0),
            generateTestCaseLog(0, Error, 'math domain error (1)'),
            generateTestCaseLog(-2, Error, 'math domain error (2)'),
            generateTestCaseLog(null, Error, 'unsupported operand type'),
            generateTestCaseLog('ABC', Error, 'unsupported operand type')
        ];

        for (const { param, expectedResult, error } of testCases) {
            const assertion = expectedResult === Error ?
                () => assert.throws(() => calculator.log(param), { name: 'Error', message: error }) :
                () => assert.strictEqual(calculator.log(param), expectedResult);

            assertion();
        }
    });
});

