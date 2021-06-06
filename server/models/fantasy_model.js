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

const createPlayers = async (todayBoxscore) => { // 這裡的playerBox是要接收的資料
  try {
    const arr = [];
    for (let i = 0; i < todayBoxscore.length; i++) {
      arr.push(todayBoxscore[i][3]);
    };
    console.log(arr);

    const gameId = await pool.query("SELECT game_id FROM player_boxscore");
    // console.log(gameId[0]);
    console.log(arr.includes(gameId[0][0].game_id));
    for (let i = 1; i < gameId[0].length; i++) {
      if (arr.includes(gameId[0][i].game_id)) {
        console.log("box已經匯入過");
      } else {
        console.log("準備匯入");
      }
    }
    // console.log(todayBoxscore,player_id)
    // if (todayBoxscore.id)
    // const result = await pool.query("INSERT INTO player_boxscore (player_id, player_name, team_id, game_id, game_date, matchup, winlose, min, pts, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, plus_minus, season_type) VALUES ?", [todayBoxscore]);
    // console.log("當日box數據都進去啦");
    // return result;
  } catch (error) {
    console.log(error);
    await pool.query("ROLLBACK");
    return error;
  }
};

const getTotalscore = async (name) => {
  const userDetail = await pool.query("SELECT * FROM user WHERE name = (?)", name);

  const selectedDate = new Date();
  const yesterday = new Date();
  yesterday.setDate(selectedDate.getDate() - 1);
  const dateString =
    yesterday.getUTCFullYear() + "-" +
    ("0" + (yesterday.getUTCMonth() + 1)).slice(-2) + "-" +
    ("0" + yesterday.getUTCDate()).slice(-2);
  // console.log(dateString);

  const result = await pool.query(`SELECT * FROM player_boxscore LEFT JOIN selected_players ON player_boxscore.player_id = selected_players.player1_id OR player_boxscore.player_id = selected_players.player2_id OR player_boxscore.player_id = selected_players.player3_id OR player_boxscore.player_id = selected_players.player4_id OR player_boxscore.player_id = selected_players.player5_id WHERE user_id = ${userDetail[0][0].user_id} AND game_date = "${dateString}"`);
  console.log(dateString);
  const score = [];
  let totalScore = 0;
  for (let i = 0; i < result[0].length; i++) {
    score.push(result[0][i].pts + result[0][i].fg3m * 2 + result[0][i].reb * 1.2 + result[0][i].ast * 1.5 + result[0][i].stl * 3 + result[0][i].blk * 3 - result[0][i].tov);
    totalScore = totalScore + score[i];
  };
  const result2 = await pool.query(`UPDATE selected_players SET total_score = ${Math.round(totalScore)} WHERE user_id = ${userDetail[0][0].user_id} AND selected_date = "${dateString}"`);
  console.log(result2, 789);
  console.log(score);
  console.log(totalScore);
  return (totalScore);
};

module.exports = {
  getPlayerinfo,
  getSelectedplayers,
  createPlayers,
  getTotalscore
};
