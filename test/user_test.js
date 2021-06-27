/* eslint-disable no-undef */
require("dotenv").config();
const { assert, requester } = require("./set_up");
const { users } = require("./fake_data");

// eslint-disable-next-line no-undef
describe("user", function () {
  it("sign up", async () => {
    const user = {
      name: "Albert",
      password: "password"
    };

    const res = await requester
      .post("/api/1.0/user/signup")
      .send(user);

    const data = res.body;
    const userExpect = {
      access_expired: data.data.access_expired,
      access_token: data.data.access_token,
      login_at: data.data.login_at,
      user: {
        id: data.data.user.id,
        name: data.data.user.name
      }
    };
    assert.deepEqual(data.data, userExpect);
    assert.isString(data.data.access_token);
  });

  it("sign up without name or password", async () => {
    const user1 = {
      name: "Albert",
      password: null
    };
    const res1 = await requester
      .post("/api/1.0/user/signup")
      .send(user1);

    assert.equal(res1.statusCode, 400);

    const user2 = {
      name: null,
      password: "password"
    };
    const res2 = await requester
      .post("/api/1.0/user/signup")
      .send(user2);

    assert.equal(res2.statusCode, 400);
  });

  it("sign in with correct password", async () => {
    const user1 = users[0];
    const user = {
      name: user1.name,
      password: user1.password
    };

    const res = await requester
      .post("/api/1.0/user/signin")
      .send(user);

    const data = res.body.data;
    const userExpect = {
      access_expired: data.access_expired,
      access_token: data.access_token,
      login_at: data.login_at,
      user: {
        name: data.user.name
      }
    };

    assert.deepEqual(data, userExpect);
    assert.isString(data.access_token);
  });

  it("sign in with wrong password", async () => {
    const user1 = users[0];
    const user = {
      name: user1.name,
      password: "wrong password"
    };

    const res = await requester
      .post("/api/1.0/user/signin")
      .send(user);

    assert.equal(res.status, 403);
    assert.equal(res.body.error, "Password is wrong");
  });
});
