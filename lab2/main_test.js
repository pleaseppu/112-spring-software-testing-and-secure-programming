const test = require('node:test');
const assert = require('assert');
const sinon = require('sinon');
const { Application, MailSystem } = require('./main');

test('MailSystem write method should return correct context', () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('John');
    assert.strictEqual(context, 'Congrats, John!');
});

test('MailSystem send method should return true when mail is sent successfully', () => {
    const mailSystem = new MailSystem();
    sinon.stub(Math, 'random').returns(0.6); // Stub Math.random() to always return > 0.5
    const success = mailSystem.send('John', 'Congrats, John!');
    assert.strictEqual(success, true);
    sinon.restore();
});

test('MailSystem send method should return false when mail sending fails', () => {
    const mailSystem = new MailSystem();
    sinon.stub(Math, 'random').returns(0.4); // Stub Math.random() to always return <= 0.5
    const success = mailSystem.send('John', 'Congrats, John!');
    assert.strictEqual(success, false);
    sinon.restore();
});

test('Application getRandomPerson method should return a person from the people array', () => {
    const app = new Application();
    app.people = ['John', 'Jane', 'Doe'];
    const person = app.getRandomPerson();
    assert(app.people.includes(person));
});

test('Application selectNextPerson method should handle scenario where all people are selected', () => {
    const app = new Application();
    app.people = ['John', 'Jane', 'Doe'];
    app.selected = ['John', 'Jane', 'Doe'];
    const person = app.selectNextPerson();
    assert.strictEqual(person, null);
});

test('Application notifySelected method should call write and send methods for each selected person', () => {
    const mailSystem = new MailSystem();
    const writeStub = sinon.stub(mailSystem, 'write');
    const sendStub = sinon.stub(mailSystem, 'send');
    
    const app = new Application();
    app.selected = ['John', 'Jane', 'Doe'];
    
    app.notifySelected();

    assert.strictEqual(writeStub.callCount, 3);
    assert.strictEqual(sendStub.callCount, 3);
    
    sinon.restore();
});
