const fantasyMain = require("../models/main_model");

const getRanking = async (req, res) => {
  const result = await fantasyMain.getRanking();
  res.status(200).send(result);
};

const getTopplayers = async (req, res) => {
  const result = await fantasyMain.getTopplayers();
  const result2 = result.slice(0, 10);
  res.status(200).send(result2);
};

module.exports = {
  getRanking,
  getTopplayers
};
