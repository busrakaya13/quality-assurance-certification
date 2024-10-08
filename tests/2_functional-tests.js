const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')
        .type('application/json')
        .send({
          "name": "Cristoforo",
          "surname": "Colombo",
          "dates": [1789 - 1826]
        })

        .end(function (err, res) {
          assert.equal(res.status,200);
          assert.equal(res.type,'application/json');
          assert.equal(res.body.name,'Cristoforo')
          assert.equal(res.body.surname,'Colombo')
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
      .request(server)
      .keepOpen()
      .put('/travellers')
      .type('application/json')
      .send({
        "name": "Giovanni",
        "surname": "da Verrazzano",
        "dates": [1785 - 1835]
      })

      .end(function (err, res) {
        assert.equal(res.status,200);
        assert.equal(res.type,'application/json');
        assert.equal(res.body.name,'Giovanni')
        assert.equal(res.body.surname,'da Verrazzano')
      done();
    });
  });
});

const Browser = require('zombie');
Browser.site= "https://3000-freecodecam-boilerplate-anlmfkvgyz0.ws-us116.gitpod.io"
const browser = new Browser();

suite('Functional Tests with Zombie.js', function (done) {
  suiteSetup(function(done) { // Remember, web interactions are asynchronous !!
    return browser.visit('/', done);  // Browser asynchronous operations take a callback
  });
  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser.fill('surname', 'Colombo').then(() => {
        browser.pressButton('submit', () => {
          browser.assert.success();
          browser.assert.text('span#name', 'Cristoforo');
          browser.assert.text('span#surname', 'Colombo');
          browser.assert.elements('span#dates', 1);
          done();
        });
      });
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser.fill('surname', 'Vespucci').then(() => {
        browser.pressButton('submit', () => {
          browser.assert.success();
          browser.assert.text('span#name', 'Amerigo');
          browser.assert.text('span#surname', 'Vespucci');
          browser.assert.elements('span#dates', 1);
          done();
        });
      });
    });
  });
});
});
