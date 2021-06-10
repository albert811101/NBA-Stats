const { pool } = require("./mysqlcon");
const moment = require("moment-timezone");

const getRanking = async () => {
  const conn = await pool.getConnection();
  try {
    const dateYesterday = moment().tz("Asia/Taipei").subtract(1, "day").format();
    const correctDate = dateYesterday.slice(0, 10);
    const result = await conn.query(`SELECT selected_players.user_id, total_score, user.name FROM selected_players LEFT JOIN user ON selected_players.user_id = user.user_id WHERE selected_date = "${correctDate}" ORDER BY total_score DESC`);
    // console.log(result2[0]);
    // console.log(result2[0]);
    let rankArr = [];
    const ranking = result[0].map(function (value, index) {
      let rank;
      if (rankArr.length === 0) { rankArr = [1]; rank = 1; } else if (result[0][index].total_score === result[0][index - 1].total_score) {
        rankArr[index] = rankArr[index - 1];
        rank = rankArr[index - 1];
      } else {
        rankArr[index] = index + 1;
        rank = index + 1;
      }
      return { ...value, rank: rank };
    });
    return ranking;
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

const getTopplayers = async () => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT player_bio.player_first_name, player_bio.player_last_name, player_bio.team_id, player1_id AS player_id , COUNT(player1_id) AS COUNT FROM nbastats.selected_players JOIN nbastats.player_bio ON nbastats.player_bio.person_id = nbastats.selected_players.player1_id GROUP BY player1_id;");
    const result1 = await conn.query("SELECT player_bio.player_first_name, player_bio.player_last_name, player_bio.team_id, player2_id AS player_id , COUNT(player2_id) AS COUNT FROM nbastats.selected_players JOIN nbastats.player_bio ON nbastats.player_bio.person_id = nbastats.selected_players.player2_id GROUP BY player2_id;");
    const result2 = await conn.query("SELECT player_bio.player_first_name, player_bio.player_last_name, player_bio.team_id, player3_id AS player_id , COUNT(player3_id) AS COUNT FROM nbastats.selected_players JOIN nbastats.player_bio ON nbastats.player_bio.person_id = nbastats.selected_players.player3_id GROUP BY player3_id;");
    const result3 = await conn.query("SELECT player_bio.player_first_name, player_bio.player_last_name, player_bio.team_id, player4_id AS player_id , COUNT(player4_id) AS COUNT FROM nbastats.selected_players JOIN nbastats.player_bio ON nbastats.player_bio.person_id = nbastats.selected_players.player4_id GROUP BY player4_id;");
    const result4 = await conn.query("SELECT player_bio.player_first_name, player_bio.player_last_name, player_bio.team_id, player5_id AS player_id , COUNT(player5_id) AS COUNT FROM nbastats.selected_players JOIN nbastats.player_bio ON nbastats.player_bio.person_id = nbastats.selected_players.player5_id GROUP BY player5_id;");

    const arr = result[0].concat(result1[0]);
    const arr2 = arr.concat(result2[0]);
    const arr3 = arr2.concat(result3[0]);
    const arr4 = arr3.concat(result4[0]);

    // console.log(arr4);

    // const topPLayers = [];
    // for (let i = 0; i < arr4.length; i++) {
    //   if (arr4[i].player_id) {
    //     arr4[]
    //   }
    // }

    // console.log(topPLayers);

    const topPlayers = {};
    // const playerKey = ["player1_id", "player2_id", "player3_id", "player4_id", "player5_id"];
    for (const topPlayer of arr4) {
      const fullkey = `${topPlayer.player_first_name}_${topPlayer.player_last_name}_${topPlayer.team_id}_${topPlayer.player_id}`;
      // if (!(fullkey in topPlayer)) {
      //   continue;
      // }
      if (fullkey in topPlayers) {
        topPlayers[fullkey] += topPlayer.COUNT;
      } else {
        topPlayers[fullkey] = topPlayer.COUNT;
      }
    }
    // console.log(topPlayers);

    const sortable = [];
    for (const topPlayer in topPlayers) {
      sortable.push([topPlayer, topPlayers[topPlayer]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    return sortable;
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

module.exports = {
  getRanking,
  getTopplayers
};
