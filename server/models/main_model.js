const { pool } = require("./mysqlcon");

const getRanking = async () => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT selected_players.user_id, total_score, user.name FROM selected_players LEFT JOIN user ON selected_players.user_id = user.user_id ORDER BY total_score DESC");

    const map = result[0].reduce((prev, next) => {
      if (next.name in prev) {
        prev[next.name].total_score += next.total_score;
      } else {
        prev[next.name] = next;
      }
      return prev;
    }, {});

    const newArr = Object.keys(map).map(name => map[name]);
    const sortArr = newArr.sort(function (a, b) { return b.total_score - a.total_score; });

    let rankArr = [];
    const ranking = sortArr.map(function (value, index) {
      let rank;
      if (rankArr.length === 0) { rankArr = [1]; rank = 1; } else if (sortArr[index].total_score === sortArr[index - 1].total_score) {
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

const getTopPlayers = async () => {
  const conn = await pool.getConnection();
  try {
    const countPlayer1Id = await conn.query("SELECT player_bio.player_first_name, player_bio.player_last_name, player_bio.team_id, player1_id AS player_id , COUNT(player1_id) AS COUNT FROM nbastats.selected_players JOIN nbastats.player_bio ON nbastats.player_bio.player_id = nbastats.selected_players.player1_id GROUP BY player1_id;");
    const countPlayer2Id = await conn.query("SELECT player_bio.player_first_name, player_bio.player_last_name, player_bio.team_id, player2_id AS player_id , COUNT(player2_id) AS COUNT FROM nbastats.selected_players JOIN nbastats.player_bio ON nbastats.player_bio.player_id = nbastats.selected_players.player2_id GROUP BY player2_id;");
    const countPlayer3Id = await conn.query("SELECT player_bio.player_first_name, player_bio.player_last_name, player_bio.team_id, player3_id AS player_id , COUNT(player3_id) AS COUNT FROM nbastats.selected_players JOIN nbastats.player_bio ON nbastats.player_bio.player_id = nbastats.selected_players.player3_id GROUP BY player3_id;");
    const countPlayer4Id = await conn.query("SELECT player_bio.player_first_name, player_bio.player_last_name, player_bio.team_id, player4_id AS player_id , COUNT(player4_id) AS COUNT FROM nbastats.selected_players JOIN nbastats.player_bio ON nbastats.player_bio.player_id = nbastats.selected_players.player4_id GROUP BY player4_id;");
    const countPlayer5Id = await conn.query("SELECT player_bio.player_first_name, player_bio.player_last_name, player_bio.team_id, player5_id AS player_id , COUNT(player5_id) AS COUNT FROM nbastats.selected_players JOIN nbastats.player_bio ON nbastats.player_bio.player_id = nbastats.selected_players.player5_id GROUP BY player5_id;");

    const mergeArr1 = countPlayer1Id[0].concat(countPlayer2Id[0]);
    const mergeArr2 = mergeArr1.concat(countPlayer3Id[0]);
    const mergeArr3 = mergeArr2.concat(countPlayer4Id[0]);
    const mergeArr4 = mergeArr3.concat(countPlayer5Id[0]);

    const topPlayers = {};
    for (const topPlayer of mergeArr4) {
      const fullkey = `${topPlayer.player_first_name}_${topPlayer.player_last_name}_${topPlayer.team_id}_${topPlayer.player_id}`;
      if (fullkey in topPlayers) {
        topPlayers[fullkey] += topPlayer.COUNT;
      } else {
        topPlayers[fullkey] = topPlayer.COUNT;
      }
    }

    const sortPlayers = [];
    for (const topPlayer in topPlayers) {
      sortPlayers.push([topPlayer, topPlayers[topPlayer]]);
    }

    sortPlayers.sort(function (a, b) {
      return b[1] - a[1];
    });

    return sortPlayers;
  } catch (error) {
    await conn.query("ROLLBACK");
    return error;
  } finally {
    await conn.release();
  }
};

module.exports = {
  getRanking,
  getTopPlayers
};
