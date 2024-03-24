const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'martin\njohn\ntom');
});

const { Application, MailSystem } = require('./main');

test('MailSystem_write()', () => {
    const mailSystem = new MailSystem();
    assert.strictEqual(mailSystem.write('martin'), 'Congrats, martin!');
    assert.strictEqual(mailSystem.write(null), 'Congrats, null!');
    assert.strictEqual(mailSystem.write(48763), 'Congrats, 48763!');
});

test('MailSystem_send()', () => {
    const mailSystem = new MailSystem();
    const name = 'martin';
    test.mock.method(Math, 'random', () => 0.6);
    assert.strictEqual(mailSystem.send(name, 'success'), true);
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(mailSystem.send(name, 'fail'), false);
});

test('Application_getNames()', async () => {
    const app = new Application();
    const nameList = ['martin', 'john', 'tom'];
    const names = await app.getNames();
    assert.deepStrictEqual(names, [nameList, []]);
});

test('Application_getRandomPerson()', async () => {
    const app = new Application();
    const names = await app.getNames();
    test.mock.method(Math, 'random', () => 0);
    assert.strictEqual(app.getRandomPerson(), 'martin');
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(app.getRandomPerson(), 'john');
    test.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(app.getRandomPerson(), 'tom');
});

test('Application_selectNextPerson()', async () => {
    const app = new Application();
    const names = await app.getNames();
    app.selected = ['martin'];
    let count = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (count <= names.length) { 
            return names[0][count++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'john');
    assert.deepStrictEqual(app.selected, ['martin', 'john']);
    assert.strictEqual(app.selectNextPerson(), 'tom');
    assert.deepStrictEqual(app.selected, ['martin', 'john', 'tom']);
    assert.strictEqual(app.selectNextPerson(), null);
});

test('Application_notifySelected()', async () => {
    const app = new Application();
    app.people = ['martin', 'john', 'tom'];
    app.selected = ['martin', 'john', 'tom'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);
});
