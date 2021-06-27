const users = [
  {
    name: "test1",
    password: "test1password",
    access_expired: (60 * 60), // 1hr by second
    login_at: new Date("2021-06-27"),
    access_token: "test1accesstoken"
  },
  {
    name: "test2",
    password: "test2password",
    access_expired: (60 * 60), // 1hr by second
    login_at: new Date("2021-06-27"),
    access_token: "test2accesstoken"
  }
];

module.exports = {
  users
};
