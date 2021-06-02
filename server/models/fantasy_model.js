const { pool } = require("./mysqlcon");

const getPlayerinfo = async () => {
  const result = await pool.query("SELECT person_id, player_last_name, player_first_name, team_id, team_abbreviation, jersey_number, position, to_year FROM player_bio WHERE to_year = 2020");
  return result;
};

const getSelectedplayers = async (players) => {
  const selectedDate = new Date();
  const dateString =
    selectedDate.getUTCFullYear() + "-" +
    ("0" + (selectedDate.getUTCMonth() + 1)).slice(-2) + "-" +
    ("0" + selectedDate.getUTCDate()).slice(-2);
  players.push(dateString);
  console.log(players);
  const result = await pool.query("INSERT INTO selected_players (player1_name, player2_name, player3_name, player4_name, player5_name, selected_date) VALUES (?, ?, ?, ?, ?, ?)", players);
  console.log("5名球員跟日期都進去啦");
  return result;
};

module.exports = {
  getPlayerinfo,
  getSelectedplayers
};
