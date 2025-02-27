const request = require("supertest");
const { expect } = require("chai");
const app = require("../app"); // Import your Express app

describe("Express App API Tests", function () {
  it("should return 'Hello World' at the root endpoint", function (done) {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal("Hello World");
        done();
      });
  });

  it("should fetch all contracts at /kontrat/kontra", function (done) {
    request(app)
      .get("/kontrat/kontra")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("<html"); // Assuming it renders a view
        done();
      });
  });

  it("should return 404 for an unknown route", function (done) {
    request(app)
      .get("/unknown-route")
      .expect(404, done);
  });
});
