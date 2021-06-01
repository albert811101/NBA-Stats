const { pool } = require("./mysqlcon");

const createPlayerbio = async (playerBio) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("INSERT INTO player_bio (person_id, player_last_name, player_first_name, team_id, team_city, team_name, team_abbreviation, jersey_number, position, height, weight, college, country, pts, reb, ast, from_year, to_year) VALUES ?");
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  }
};

module.exports = {
  createPlayerbio
};
