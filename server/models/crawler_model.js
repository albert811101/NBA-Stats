const { db } = require("./mysqlcon");

const createPlayerbio = async (playerBio) => {
  const sql = "INSERT INTO player_bio (person_id, player_last_name, player_first_name, team_id, team_city, team_name, team_abbreviation, jersey_number, position, height, weight, college, country, pts, reb, ast, from_year, to_year) VALUES ?";
  await db.query(sql, [playerBio], (err, result) => {
    if (err) {
      console.log("err");
    } else {
      console.log("insert player bio!");
      return true;
    }
  });
};

module.exports = {
  createPlayerbio
};
