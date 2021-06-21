const { pool } = require("./mysqlcon");

const createPlayerBio = async (playerBio) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("INSERT INTO player_bio (player_id, player_last_name, player_first_name, team_id, team_city, team_name, team_abbreviation, jersey_number, position, height, weight, college, country, pts, reb, ast, from_year, to_year) VALUES ?", [playerBio]);
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  }
};

const getPlayerBio = async (playerId) => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(`SELECT * FROM player_bio WHERE player_id = ${playerId}`);
    return result;
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

const getRecentGames = async (playerId) => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(`SELECT * FROM player_boxscore WHERE player_id = ${playerId} ORDER BY game_date DESC LIMIT 10;`);
    return result;
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

const getPlayerName = async (name) => {
  const conn = await pool.getConnection();
  try {
    const correctName = name.split(" ");
    const result = await conn.query(`SELECT player_id FROM player_bio WHERE to_year = 2020 AND player_last_name = "${correctName[1]}" AND player_first_name = "${correctName[0]}";`);
    return result;
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

module.exports = {
  createPlayerBio,
  getPlayerBio,
  getRecentGames,
  getPlayerName
};
