const { pool } = require("./mysqlcon");
const moment = require("moment-timezone");

const getPlayerInfo = async () => {
  const result = await pool.query("SELECT player_id, player_last_name, player_first_name, team_id, team_abbreviation, jersey_number, position, to_year FROM player_bio WHERE to_year = 2020");
  return result;
};

const getSelectedPlayers = async (players, name) => {
  const userDetail = await pool.query("SELECT * FROM user WHERE name = (?)", name);
  const dateToday = moment().tz("Asia/Taipei").format();
  const correctDate = dateToday.slice(0, 10);

  players.push(correctDate);
  players.unshift(userDetail[0][0].user_id);

  const date = await pool.query("SELECT * FROM selected_players WHERE (user_id, selected_date) = (?, ?)", [players[0], correctDate]);

  if (date[0].length !== 0) {
    return { error: "You have chosen players today" };
  } else {
    const result = await pool.query("INSERT INTO selected_players (user_id, player1_id, player2_id, player3_id, player4_id, player5_id, selected_date) VALUES (?, ?, ?, ?, ?, ?, ?)", players);
    return result;
  }
};

const getHistoryPlayers = async (selectedDate, players) => {
  const result = await pool.query("SELECT * FROM player_boxscore WHERE game_date = ? AND player_id in (?)", [selectedDate, players]);
  const score = [];
  let totalScore = 0;
  for (let i = 0; i < result[0].length; i++) {
    score.push(result[0][i].pts + result[0][i].fg3m * 2 + result[0][i].reb * 1.2 + result[0][i].ast * 1.5 + result[0][i].stl * 3 + result[0][i].blk * 3 - result[0][i].tov);
    totalScore = totalScore + score[i];
  };
  return Math.round(totalScore);
};

const createPlayers = async (todayBoxscore) => {
  try {
    if (todayBoxscore) {
      await pool.query("INSERT INTO player_boxscore (player_id, player_name, team_id, game_id, game_date, matchup, winlose, min, pts, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, plus_minus, season_type) VALUES ?", [todayBoxscore]);
      console.log("當日box數據都進去啦");

      const dateYesterday = moment().tz("Asia/Taipei").subtract(1, "day").format();
      const correctDate = dateYesterday.slice(0, 10);

      const result2 = await pool.query(`SELECT * FROM player_boxscore LEFT JOIN selected_players ON player_boxscore.player_id = selected_players.player1_id OR player_boxscore.player_id = selected_players.player2_id OR player_boxscore.player_id = selected_players.player3_id OR player_boxscore.player_id = selected_players.player4_id OR player_boxscore.player_id = selected_players.player5_id WHERE game_date = "${correctDate}" AND selected_players.selected_date = "${correctDate}"`);
      const score = [];
      let totalScore = 0;
      for (let i = 0; i < result2[0].length; i++) {
        score.push(result2[0][i].pts + result2[0][i].fg3m * 2 + result2[0][i].reb * 1.2 + result2[0][i].ast * 1.5 + result2[0][i].stl * 3 + result2[0][i].blk * 3 - result2[0][i].tov);
        totalScore = totalScore + score[i];
      };
      const userScore = {};
      for (const playerScore of result2[0]) {
        if (playerScore.user_id in userScore) {
          userScore[playerScore.user_id] += playerScore.pts + playerScore.fg3m * 2 + playerScore.reb * 1.2 + playerScore.ast * 1.5 + playerScore.stl * 3 + playerScore.blk * 3 - playerScore.tov;
        } else {
          userScore[playerScore.user_id] = playerScore.pts + playerScore.fg3m * 2 + playerScore.reb * 1.2 + playerScore.ast * 1.5 + playerScore.stl * 3 + playerScore.blk * 3 - playerScore.tov;
        }
      };
      let updateScore;
      for (const userId in userScore) {
        updateScore = `UPDATE selected_players SET total_score = ${Math.round(userScore[userId])} WHERE user_id IN (${userId}) AND selected_date = "${correctDate}";`;
        await pool.query(updateScore);
      };
      return result2;
    } else {
      console.log("There is no game today!");
    }
  } catch (error) {
    console.log(error);
    await pool.query("ROLLBACK");
    return error;
  }
};

const getTotalScore = async (name) => {
  const userDetail = await pool.query("SELECT * FROM user WHERE name = (?)", name);

  const dateYesterday = moment().tz("Asia/Taipei").subtract(1, "day").format();
  const correctDate = dateYesterday.slice(0, 10);

  const result = await pool.query(`SELECT * FROM player_boxscore LEFT JOIN selected_players ON player_boxscore.player_id = selected_players.player1_id OR player_boxscore.player_id = selected_players.player2_id OR player_boxscore.player_id = selected_players.player3_id OR player_boxscore.player_id = selected_players.player4_id OR player_boxscore.player_id = selected_players.player5_id WHERE user_id = ${userDetail[0][0].user_id} AND game_date = "${correctDate}" AND selected_players.selected_date = "${correctDate}"`);
  const score = [];
  let totalScore = 0;
  for (let i = 0; i < result[0].length; i++) {
    score.push(result[0][i].pts + result[0][i].fg3m * 2 + result[0][i].reb * 1.2 + result[0][i].ast * 1.5 + result[0][i].stl * 3 + result[0][i].blk * 3 - result[0][i].tov);
    totalScore = totalScore + score[i];
  };
  return (totalScore);
};

const createPlayerStats = async (playerStats) => {
  const conn = await pool.getConnection();
  try {
    for (let i = 0; i < playerStats.length; i++) {
      await conn.query(`UPDATE player_stats SET pts = ${playerStats[i][3]}, fg3m = ${playerStats[i][4]}, reb = ${playerStats[i][5]}, ast = ${playerStats[i][6]}, stl = ${playerStats[i][7]}, blk = ${playerStats[i][8]}, tov = ${playerStats[i][9]} WHERE player_id = "${playerStats[i][0]}" AND season_type = "playoff";`);
    }
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  }
};

const getPlayerStats = async () => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM player_stats ");
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
    const result2 = await conn.query(`SELECT user_id, total_score FROM selected_players WHERE selected_date = "${correctDate}" ORDER BY total_score DESC`);
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
    const playerRank = ranking.filter(function (item) {
      return item.user_id === userDetail[0][0].user_id;
    });
    return playerRank;
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

const createSchedule = async (schedule) => {
  const conn = await pool.getConnection();
  try {
    for (let i = 0; i < schedule.length; i++) {
      for (let j = 0; j < schedule[i].games.length; j++) {
        await conn.query(`INSERT INTO schedule (game_id, game_date, hometeam_id, awayteam_id) VALUES (${schedule[i].games[j].gameId}, ${schedule[i].games[j].gameCode.slice(0, 8)}, ${schedule[i].games[j].homeTeam.teamId}, ${schedule[i].games[j].awayTeam.teamId})`);
      }
    }
    return { status: "okay" };
  } catch (error) {
    console.log(error);
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

const getSchedule = async (date) => {
  const selectedDate = await pool.query("SELECT hometeam_id, awayteam_id FROM schedule WHERE game_date = (?)", date);
  const conn = await pool.getConnection();
  try {
    // eslint-disable-next-line eqeqeq
    if (!selectedDate[0].length == 0) {
      const teamsId = [];
      for (let i = 0; i < selectedDate[0].length; i++) {
        teamsId.push(selectedDate[0][i].hometeam_id);
        teamsId.push(selectedDate[0][i].awayteam_id);
      }
      return teamsId;
    } else {
      return { error: "There is no game today!" };
    }
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

const getTodaySchedule = async () => {
  const dateToday = moment().tz("Asia/Taipei").format();
  const correctDate = dateToday.slice(0, 10);
  const todayDate = correctDate.replace(/-/g, "");
  const selectedDate = await pool.query("SELECT hometeam_id, awayteam_id FROM schedule WHERE game_date = (?)", todayDate);
  const conn = await pool.getConnection();
  try {
    // eslint-disable-next-line eqeqeq
    if (!selectedDate[0].length == 0) {
      const teamsId = [];
      for (let i = 0; i < selectedDate[0].length; i++) {
        teamsId.push(selectedDate[0][i].hometeam_id);
        teamsId.push(selectedDate[0][i].awayteam_id);
      }
      return teamsId;
    } else {
      return { error: "There is no game today!" };
    }
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

module.exports = {
  getPlayerInfo,
  getSelectedPlayers,
  getHistoryPlayers,
  createPlayers,
  getTotalScore,
  createPlayerStats,
  getPlayerStats,
  getRanking,
  createSchedule,
  getSchedule,
  getTodaySchedule
};
