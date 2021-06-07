const { pool } = require("./mysqlcon");

const createPlayerbio = async (playerBio) => {
  const conn = await pool.getConnection();
  try {
    console.log(playerBio);
    // await conn.query("INSERT INTO player_bio (person_id, player_last_name, player_first_name, team_id, team_city, team_name, team_abbreviation, jersey_number, position, height, weight, college, country, pts, reb, ast, from_year, to_year) VALUES ?", [playerBio]);
    // console.log("球員基本資料都進去啦");
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  }
};

const getPlayerbio = async (playerId) => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(`SELECT * FROM player_bio WHERE person_id = ${playerId}`);
    console.log(result);
    return result;
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

const getRecentgames = async (playerId) => {
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

module.exports = {
  createPlayerbio,
  getPlayerbio,
  getRecentgames
};
