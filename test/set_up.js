const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { NODE_ENV } = process.env;
const { truncateFakeData, createFakeData } = require("./fake_data_generator");

chai.use(chaiHttp);

const assert = chai.assert;
const requester = chai.request(app).keepOpen();

// eslint-disable-next-line no-undef
before(async () => {
  if (NODE_ENV !== "test") {
    throw new Error("Not in test env");
  }
  await truncateFakeData();
  await createFakeData();
});

module.exports = {
  assert,
  requester
};
