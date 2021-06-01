const { pool } = require("./mysqlcon");

const getPlayerinfo = async () => {
  const result = await pool.query("SELECT person_id, player_last_name, player_first_name, team_id, team_abbreviation, jersey_number, position, to_year FROM player_bio WHERE to_year = 2020");
  return result;
};

const getSelectedplayers = async (players) => {
  console.log(players);
  const result = await pool.query("INSERT INTO selected_players (player1_name, player2_name, player3_name, player4_name, player5_name) VALUES (?, ?, ?, ?, ?)", players);
  console.log("5名球員都進去啦");
  return result;
};

module.exports = {
  getPlayerinfo,
  getSelectedplayers
};
