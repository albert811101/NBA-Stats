const fantasyRanking = require("../models/main_model");

const getRanking = async (req, res) => {
  const result = await fantasyRanking.getRanking();
  const ranking = result.slice(0, 10);
  res.status(200).send(ranking);
};

const getTopPlayers = async (req, res) => {
  const result = await fantasyRanking.getTopPlayers();
  const topPlayers = result.slice(0, 10);
  res.status(200).send(topPlayers);
};

module.exports = {
  getRanking,
  getTopPlayers
};
