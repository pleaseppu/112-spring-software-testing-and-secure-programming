const test = require('node:test');
const assert = require('assert');
const sinon = require('sinon');

const { Application, MailSystem } = require('./main');

test('notifySelected method should notify all selected people', async () => {
    // Create a stub for MailSystem
    const mailSystemStub = sinon.createStubInstance(MailSystem);
    mailSystemStub.write.returns('Test context');

    const app = new Application();
    app.mailSystem = mailSystemStub;

    // Set up test data
    app.people = ['Jason', 'Wayne'];
    app.selected = ['Jason'];

    // Spy on mailSystem.send method
    const sendSpy = sinon.spy(app.mailSystem, 'send');

    // Call the method under test
    app.notifySelected();

    // Verify that mailSystem.write was called for each selected person
    assert(mailSystemStub.write.calledTwice);

    // Verify that mailSystem.send was called for each selected person
    assert(sendSpy.calledTwice);

    // Verify the arguments passed to mailSystem.send
    assert.strictEqual(sendSpy.firstCall.args[0], 'Jason');
    assert.strictEqual(sendSpy.firstCall.args[1], 'Test context');
    assert.strictEqual(sendSpy.secondCall.args[0], 'Wayne');
    assert.strictEqual(sendSpy.secondCall.args[1], 'Test context');
});

test('selectNextPerson method should select next person randomly', () => {
    const app = new Application();

    // Set up test data
    app.people = ['Jason', 'Wayne', 'Jack'];

    // Spy on Math.random to control its output
    const mathRandomStub = sinon.stub(Math, 'random');
    mathRandomStub.onCall(0).returns(0.1); // Force selection of first person
    mathRandomStub.onCall(1).returns(0.9); // Force selection of third person

    // Call the method under test
    assert.strictEqual(app.selectNextPerson(), 'Jason');
    assert.strictEqual(app.selectNextPerson(), 'Jack');
    assert.strictEqual(app.selectNextPerson(), null);

    // Restore Math.random
    mathRandomStub.restore();
});

test('getNames method should read names from file and return array of names', async () => {
    const expectedNames = ['Jason', 'Wayne', 'Jack'];

    // Stub fs.readFile to return test data
    const readFileStub = sinon.stub(fs, 'readFile').resolves(expectedNames.join('\n'));

    const app = new Application();

    // Call the method under test
    const [people, selected] = await app.getNames();

    // Verify that fs.readFile was called with the correct arguments
    assert.strictEqual(readFileStub.calledOnce, true);
    assert.strictEqual(readFileStub.firstCall.args[0], 'name_list.txt');
    assert.strictEqual(readFileStub.firstCall.args[1], 'utf8');

    // Verify the returned values
    assert.deepStrictEqual(people, expectedNames);
    assert.deepStrictEqual(selected, []);

    // Restore fs.readFile
    readFileStub.restore();
});

test('getRandomPerson method should return a random person from the list', () => {
    const app = new Application();
    app.people = ['Jason', 'Wayne', 'Jack'];

    // Spy on Math.random to control its output
    const mathRandomStub = sinon.stub(Math, 'random').returns(0.5); // Force selection of second person

    // Call the method under test
    const randomPerson = app.getRandomPerson();

    // Verify that a random person is returned
    assert.strictEqual(randomPerson, 'Wayne');

    // Restore Math.random
    mathRandomStub.restore();
});

test('selectNextPerson method should return null if all people are selected', () => {
    const app = new Application();
    app.people = ['Jason'];
    app.selected = ['Jason'];

    // Call the method under test
    const nextPerson = app.selectNextPerson();

    // Verify that null is returned when all people are selected
    assert.strictEqual(nextPerson, null);
});

test('selectNextPerson method should select different person each time until all people are selected', () => {
    const app = new Application();
    app.people = ['Jason', 'Wayne', 'Jack'];

    // Call the method under test three times
    const selectedPeople = [];
    for (let i = 0; i < 3; i++) {
        const nextPerson = app.selectNextPerson();
        selectedPeople.push(nextPerson);
    }

    // Verify that each person is selected only once
    assert.deepStrictEqual(selectedPeople.sort(), ['Wayne', 'Jack', 'Jason'].sort());
});
