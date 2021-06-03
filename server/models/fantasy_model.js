const { pool } = require("./mysqlcon");

const getPlayerinfo = async () => {
  const result = await pool.query("SELECT person_id, player_last_name, player_first_name, team_id, team_abbreviation, jersey_number, position, to_year FROM player_bio WHERE to_year = 2020");
  return result;
};

const getSelectedplayers = async (players, name) => {
  console.log(name, "dqpqkwpo");
  const userDetail = await pool.query("SELECT * FROM user WHERE name = (?)", name);
  // console.log(userDetail[0][0].user_id);
  const selectedDate = new Date();
  const dateString =
    selectedDate.getUTCFullYear() + "-" +
    ("0" + (selectedDate.getUTCMonth() + 1)).slice(-2) + "-" +
    ("0" + selectedDate.getUTCDate()).slice(-2);
  players.push(dateString);
  players.unshift(userDetail[0][0].user_id);
  console.log(players);

  const date = await pool.query("SELECT * FROM selected_players WHERE (user_id, selected_date) = (?, ?)", [players[0], dateString]);

  if (date[0].length !== 0) {
    return { error: "You have chosen players today" };
  } else {
    const result = await pool.query("INSERT INTO selected_players (user_id, player1_id, player2_id, player3_id, player4_id, player5_id, selected_date) VALUES (?, ?, ?, ?, ?, ?, ?)", players);
    console.log("5名球員跟日期都進去啦");
    return result;
  }
};

module.exports = {
  getPlayerinfo,
  getSelectedplayers
};
