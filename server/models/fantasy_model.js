const { pool } = require("./mysqlcon");
// const moment = require("moment");
const moment = require("moment-timezone");

const getPlayerinfo = async () => {
  const result = await pool.query("SELECT person_id, player_last_name, player_first_name, team_id, team_abbreviation, jersey_number, position, to_year FROM player_bio WHERE to_year = 2020");
  return result;
};

const getSelectedplayers = async (players, name) => {
  console.log(name, "dqpqkwpo");
  const userDetail = await pool.query("SELECT * FROM user WHERE name = (?)", name);
  // console.log(userDetail[0][0].user_id);
  const dateToday = moment().tz("Asia/Taipei").format();
  const correctDate = dateToday.slice(0, 10);

  // const dateString =
  // selectedDate.getUTCFullYear() + "-" +
  //   ("0" + (selectedDate.getUTCMonth() + 1)).slice(-2) + "-" +
  //   ("0" + selectedDate.getUTCDate()).slice(-2);
  players.push(correctDate);
  players.unshift(userDetail[0][0].user_id);
  console.log(players);

  const date = await pool.query("SELECT * FROM selected_players WHERE (user_id, selected_date) = (?, ?)", [players[0], correctDate]);

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
    // console.log(arr);

    // const gameId = await pool.query("SELECT game_id FROM player_boxscore");
    // console.log(gameId[0]);
    // console.log(arr.includes(gameId[0][0].game_id));
    // for (let i = 1; i < gameId[0].length; i++) {
    //   if (arr.includes(gameId[0][i].game_id)) {
    //     console.log("box已經匯入過");
    //   } else {
    //     console.log("準備匯入");
    //   }
    // }
    // console.log(todayBoxscore);
    // const result = await pool.query("INSERT INTO player_boxscore (player_id, player_name, team_id, game_id, game_date, matchup, winlose, min, pts, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, plus_minus, season_type) VALUES ?", [todayBoxscore]);
    // console.log("當日box數據都進去啦");
    // console.log(result[0]);

    const dateYesterday = moment().tz("Asia/Taipei").subtract(1, "day").format();
    const correctDate = dateYesterday.slice(0, 10);

    const result2 = await pool.query(`SELECT * FROM player_boxscore LEFT JOIN selected_players ON player_boxscore.player_id = selected_players.player1_id OR player_boxscore.player_id = selected_players.player2_id OR player_boxscore.player_id = selected_players.player3_id OR player_boxscore.player_id = selected_players.player4_id OR player_boxscore.player_id = selected_players.player5_id WHERE game_date = "${correctDate}" AND selected_players.selected_date = "${correctDate}"`);
    const score = [];
    let totalScore = 0;
    for (let i = 0; i < result2[0].length; i++) {
      score.push(result2[0][i].pts + result2[0][i].fg3m * 2 + result2[0][i].reb * 1.2 + result2[0][i].ast * 1.5 + result2[0][i].stl * 3 + result2[0][i].blk * 3 - result2[0][i].tov);
      totalScore = totalScore + score[i];
    };
    // console.log(result2[0], 147);
    const userScore = {};
    for (const playerScore of result2[0]) {
      console.log(playerScore);
      if (playerScore.user_id in userScore) { // 跑第2, 3, 4, 5圈
        userScore[playerScore.user_id] += playerScore.pts + playerScore.fg3m * 2 + playerScore.reb * 1.2 + playerScore.ast * 1.5 + playerScore.stl * 3 + playerScore.blk * 3 - playerScore.tov;
      } else { // 跑第1圈
        userScore[playerScore.user_id] = playerScore.pts + playerScore.fg3m * 2 + playerScore.reb * 1.2 + playerScore.ast * 1.5 + playerScore.stl * 3 + playerScore.blk * 3 - playerScore.tov;
      }
    };
    console.log(userScore, 555);
    let updateScore;
    for (const userId in userScore) {
      updateScore = `UPDATE selected_players SET total_score = ${Math.round(userScore[userId])} WHERE user_id IN (${userId}) AND selected_date = "${correctDate}";`;
      console.log(updateScore, 111);
      await pool.query(updateScore);
    };
    // const result3 = await pool.query(`UPDATE selected_players SET total_score = ${Math.round(totalScore)} WHERE selected_date = "${correctDate}"`);
    // console.log(result3[0]);
    return result2;
  } catch (error) {
    console.log(error);
    await pool.query("ROLLBACK");
    return error;
  }
};

const getTotalscore = async (name) => {
  const userDetail = await pool.query("SELECT * FROM user WHERE name = (?)", name);

  const dateYesterday = moment().tz("Asia/Taipei").subtract(1, "day").format();
  const correctDate = dateYesterday.slice(0, 10);

  const result = await pool.query(`SELECT * FROM player_boxscore LEFT JOIN selected_players ON player_boxscore.player_id = selected_players.player1_id OR player_boxscore.player_id = selected_players.player2_id OR player_boxscore.player_id = selected_players.player3_id OR player_boxscore.player_id = selected_players.player4_id OR player_boxscore.player_id = selected_players.player5_id WHERE user_id = ${userDetail[0][0].user_id} AND game_date = "${correctDate}" AND selected_players.selected_date = "${correctDate}"`);
  const score = [];
  let totalScore = 0;
  // console.log(result[0]);
  for (let i = 0; i < result[0].length; i++) {
    score.push(result[0][i].pts + result[0][i].fg3m * 2 + result[0][i].reb * 1.2 + result[0][i].ast * 1.5 + result[0][i].stl * 3 + result[0][i].blk * 3 - result[0][i].tov);
    totalScore = totalScore + score[i];
  };
  return (totalScore);
};

const createPlayerstats = async (playerStats) => {
  const conn = await pool.getConnection();
  try {
    // await conn.query("INSERT INTO player_stats (player_id, player_name, team_id, pts, fg3m, reb, ast, stl, blk, tov) VALUES ?", [playerStats]);
    // console.log("球員平均數據都進去囉");
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  }
};

const getPlayerstats = async () => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM player_stats");
    // console.log("抓出球員數據囉");
    return result;
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

const getRanking = async (name) => {
  const userDetail = await pool.query("SELECT * FROM user WHERE name = (?)", name);
  const conn = await pool.getConnection();
  try {
    const dateYesterday = moment().tz("Asia/Taipei").subtract(1, "day").format();
    const correctDate = dateYesterday.slice(0, 10);
    // const result = await conn.query(`SELECT user_id, total_score FROM selected_players WHERE user_id = ${userDetail[0][0].user_id} AND selected_date = "${correctDate}";`);
    const result2 = await conn.query(`SELECT user_id, total_score FROM selected_players WHERE selected_date = "${correctDate}" ORDER BY total_score DESC`);

    // console.log(result2[0]);
    let rankArr = [];
    const ranking = result2[0].map(function (value, index) {
      let rank;
      if (rankArr.length === 0) { rankArr = [1]; rank = 1; } else if (result2[0][index].total_score === result2[0][index - 1].total_score) {
        rankArr[index] = rankArr[index - 1];
        rank = rankArr[index - 1];
      } else {
        rankArr[index] = index + 1;
        rank = index + 1;
      }
      return { ...value, rank: rank };
    });
    // console.log(ranking);
    const playerRank = ranking.filter(function (item) {
      return item.user_id === userDetail[0][0].user_id;
    });
    // console.log(playerRank);

    // console.log("抓出當天每個人分數");
    return playerRank;
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

module.exports = {
  getPlayerinfo,
  getSelectedplayers,
  createPlayers,
  getTotalscore,
  createPlayerstats,
  getPlayerstats,
  getRanking
};
