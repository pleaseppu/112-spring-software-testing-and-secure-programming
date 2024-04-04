const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'Emma\nLiam\nOlivia');
});

const { Application, MailSystem } = require('./main');

test('MailSystem - Write method generates email content', () => {
    const mailSystem = new MailSystem();
    const receiver = 'Ella';
    const context = mailSystem.write(receiver);
    assert.strictEqual(context, 'Congrats, Ella!');
});

test('MailSystem - Successful sending of email to rreceiver', () => {
    const mailSystem = new MailSystem();
    const receiver = 'Ella';
    test.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(mailSystem.send(receiver, 'success'), true);
});

test('MailSystem - Failed to send email to receiver', () => {
    const mailSystem = new MailSystem();
    const receiver = 'Ella';
    test.mock.method(Math, 'random', () => 0.3);
    assert.strictEqual(mailSystem.send(receiver, 'fail'), false);
});

test('Application - Get names from file', async () => {
    const application = new Application([], [], {});
    await application.getNames();
    assert.deepStrictEqual(application.people, ['Emma', 'Liam', 'Olivia']);
});

test('Application - Return a random name', async () => {
    const application = new Application([], [], {});
    await application.getNames();
    const person = application.getRandomPerson();
    assert(['Emma', 'Liam', 'Olivia'].includes(person));
});

test('Application - selects a person', async () => {
    const application = new Application();
    const [names] = await application.getNames();
    application.selected = ['Emma'];
    let count = 0;
    test.mock.method(application, 'getRandomPerson', () => names[count++]);
    assert.strictEqual(application.selectNextPerson(), 'Liam');
    assert.deepStrictEqual(application.selected, ['Emma', 'Liam']);
    assert.strictEqual(application.selectNextPerson(), 'Olivia');
    assert.deepStrictEqual(application.selected, ['Emma', 'Liam', 'Olivia']);
    assert.strictEqual(application.selectNextPerson(), null);
});

test('Application - Successfully notify all selected people', async () => {
    const application = new Application();
    const [names] = await application.getNames();
    application.selected = names.slice();
    application.mailSystem.send = test.mock.fn(application.mailSystem.send);
    application.mailSystem.write = test.mock.fn(application.mailSystem.write);
    application.notifySelected();
    assert.strictEqual(application.mailSystem.send.mock.calls.length, names.length);
    assert.strictEqual(application.mailSystem.write.mock.calls.length, names.length);
});
