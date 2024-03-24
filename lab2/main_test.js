const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
4111
// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary
const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

describe('MailSystem', () => {
    describe('write', () => {
        it('should return the correct mail context', () => {
            const mailSystem = new MailSystem();
            const context = mailSystem.write('John');
            expect(context).to.equal('Congrats, John!');
        });
    });

    describe('send', () => {
        it('should return true or false indicating success or failure', () => {
            const mailSystem = new MailSystem();
            // 使用 Sinon Stub 來模擬成功的情況
            sinon.stub(Math, 'random').returns(0.6);
            let success = mailSystem.send('John', 'Congrats, John!');
            expect(success).to.be.true;

            // 使用 Sinon Stub 來模擬失敗的情況
            sinon.restore(); // 首先還原 Math.random 函數的原始實現
            sinon.stub(Math, 'random').returns(0.3); // 設置 Math.random 始終返回失敗的情況
            success = mailSystem.send('Jane', 'Congrats, Jane!');
            expect(success).to.be.false;

            sinon.restore(); // 還原 Math.random 函數的原始實現
        });
    });
});

describe('Application', () => {
    describe('getNames', () => {
        it('should return an array of people and an empty array for selected', async () => {
            const app = new Application();
            const [people, selected] = await app.getNames();
            expect(people).to.be.an('array');
            expect(selected).to.be.an('array');
            expect(selected).to.be.empty;
        });
    });

    describe('getRandomPerson', () => {
        it('should return a person from the people array', () => {
            const app = new Application();
            app.people = ['John', 'Jane', 'Doe']; // 假設有這些人
            const person = app.getRandomPerson();
            expect(app.people).to.include(person);
        });
    });

    describe('selectNextPerson', () => {
        it('should select a person who has not been selected before', () => {
            const app = new Application();
            app.people = ['John', 'Jane', 'Doe']; // 假設有這些人
            app.selected = ['John']; // 假設 John 已經被選擇
            const selectedBefore = app.selected.length;
            app.selectNextPerson();
            expect(app.selected.length).to.equal(selectedBefore + 1);
        });

        it('should return null when all people are selected', () => {
            const app = new Application();
            app.people = ['John', 'Jane', 'Doe']; // 假設有這些人
            app.selected = ['John', 'Jane', 'Doe']; // 假設所有人都已經被選擇
            const person = app.selectNextPerson(); // 嘗試選擇下一個人
            expect(person).to.be.null; // 應該返回 null，因為所有人都已經被選擇
        });
    });

    describe('notifySelected', () => {
        it('should write and send mail to each selected person', () => {
            const app = new Application();
            const mailSystem = new MailSystem();
            const writeSpy = sinon.spy(mailSystem, 'write');
            const sendSpy = sinon.spy(mailSystem, 'send');
            app.selected = ['John', 'Jane', 'Doe']; // 假設這些人已經被選擇
            app.notifySelected();
            expect(writeSpy).to.have.callCount(3);
            expect(sendSpy).to.have.callCount(3);
        });
    });
});
