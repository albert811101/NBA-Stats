const axios = require("axios");
const playerinfo = require("../models/fantasy_model");
const moment = require("moment-timezone");

const fetchschedule = async (req, res) => {
  const url =
    "https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_32.json";
  const results = await axios.get(url, {

  });
  res.status(200).json(results.data);
};

const fetchAllplayerstats = async (req, res) => {
  const url =
    "https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2020-21&SeasonSegment=&SeasonType=Playoffs&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=&Weight=";
  const result = await axios.get(url, {
    headers: {
      Referer: "https://www.nba.com/"
    }
  });

  // console.log(result.data.resultSets);

  const playerStatMap = {
    PLAYER_ID: 0,
    PLAYER__NAME: 1,
    TEAM_ID: 2,
    PTS: 29,
    FG3M: 13,
    REB: 21,
    AST: 22,
    TOV: 23,
    STL: 24,
    BLK: 25
  };

  const playerStats = result.data.resultSets[0].rowSet.map((item) => [
    item[playerStatMap.PLAYER_ID],
    item[playerStatMap.PLAYER__NAME],
    item[playerStatMap.TEAM_ID],
    item[playerStatMap.PTS],
    item[playerStatMap.FG3M],
    item[playerStatMap.REB],
    item[playerStatMap.AST],
    item[playerStatMap.STL],
    item[playerStatMap.BLK],
    item[playerStatMap.TOV]
  ]);

  // console.log(playerStats);

  // const playerstats = {};
  // for (const item of result.data.resultSets[0].rowSet) {
  //   playerstats[item[playerStatMap.PLAYER_ID]] = {
  //     player_name: item[playerStatMap.PLAYER__NAME],
  //     team_id: item[playerStatMap.TEAM_ID],
  //     pts: item[playerStatMap.PTS],
  //     fg3m: item[playerStatMap.FG3M],
  //     reb: item[playerStatMap.REB],
  //     ast: item[playerStatMap.AST],
  //     stl: item[playerStatMap.STL],
  //     blk: item[playerStatMap.BLK],
  //     tov: item[playerStatMap.TOV]
  //   };
  // }

  const result2 = await playerinfo.getPlayerstats();
  // console.log(result2[0][0].player_id);
  const playerstats = {};
  for (const item of result2[0]) {
    playerstats[item.player_id] = {
      player_name: item.player_name,
      team_id: item.team_id,
      pts: item.pts,
      fg3m: item.fg3m,
      reb: item.reb,
      ast: item.ast,
      stl: item.stl,
      blk: item.blk,
      tov: item.tov
    };
  }

  const results = await playerinfo.getPlayerinfo();
  const playerData = results[0];
  const detailMap = {};
  playerData.forEach(function (item) {
    item = { ...item, ...playerstats[item.person_id] };
    const positions = item.position.split("-");
    positions.forEach(function (position) {
      if (!detailMap[position]) {
        detailMap[position] = {};
      }
      if (!detailMap[position][item.team_id]) {
        detailMap[position][item.team_id] = [];
      }
      detailMap[position][item.team_id].push(item);
    });
  });

  // console.log(detailMap.F[1610612757][0]);
  // res.send({ status: "okay" });

  res.send({ data: detailMap });
  // res.status(200).json(result.data.resultSets[0]);
};

const fetchPlayerstats = async (req, res) => {
  const result2 = await playerinfo.getPlayerstats();
  // console.log(result2[0][0].player_id);
  const playerstats = {};
  for (const item of result2[0]) {
    playerstats[item.player_id] = {
      player_name: item.player_name,
      team_id: item.team_id,
      pts: item.pts,
      fg3m: item.fg3m,
      reb: item.reb,
      ast: item.ast,
      stl: item.stl,
      blk: item.blk,
      tov: item.tov
    };
  }

  const results = await playerinfo.getPlayerinfo();
  const playerData = results[0];
  const detailMap = {};
  playerData.forEach(function (item) {
    item = { ...item, ...playerstats[item.person_id] };
    const positions = item.position.split("-");
    positions.forEach(function (position) {
      if (!detailMap[position]) {
        detailMap[position] = {};
      }
      if (!detailMap[position][item.team_id]) {
        detailMap[position][item.team_id] = [];
      }
      detailMap[position][item.team_id].push(item);
    });
  });
  res.send({ data: detailMap });
};

const fetchBoxscore = async (req, res) => {
  // where to download the HTML from
  const url = "https://stats.nba.com/stats/leaguegamelog?Counter=1000&DateFrom=&DateTo=&Direction=DESC&LeagueID=00&PlayerOrTeam=P&Season=2020-21&SeasonType=Playoffs&Sorter=DATE";
  const boxscore = await axios.get(url, {
    headers: {
      Referer: "https://www.nba.com/"
    }
  });

  const playerBoxscoreMap = {
    PLAYER_ID: 1,
    PLAYER__NAME: 2,
    TEAM_ID: 3,
    GAME_ID: 6,
    GAME_DATE: 7,
    MATCHUP: 8,
    WL: 9,
    MIN: 10,
    FGM: 11,
    FGA: 12,
    FG_PCT: 13,
    FG3M: 14,
    FG3A: 15,
    FG3_PCT: 16,
    FTM: 17,
    FTA: 18,
    FT_PCT: 19,
    OREB: 20,
    DREB: 21,
    REB: 22,
    AST: 23,
    STL: 24,
    BLK: 25,
    TOV: 26,
    PF: 27,
    PTS: 28,
    PLUS_MINUS: 29
  };

  const playerBox = boxscore.data.resultSets[0].rowSet.map((item) => [
    item[playerBoxscoreMap.PLAYER_ID],
    item[playerBoxscoreMap.PLAYER__NAME],
    item[playerBoxscoreMap.TEAM_ID],
    item[playerBoxscoreMap.GAME_ID],
    item[playerBoxscoreMap.GAME_DATE],
    item[playerBoxscoreMap.MATCHUP],
    item[playerBoxscoreMap.WL],
    item[playerBoxscoreMap.MIN],
    item[playerBoxscoreMap.PTS],
    item[playerBoxscoreMap.FGM],
    item[playerBoxscoreMap.FGA],
    item[playerBoxscoreMap.FG_PCT],
    item[playerBoxscoreMap.FG3M],
    item[playerBoxscoreMap.FG3A],
    item[playerBoxscoreMap.FG3_PCT],
    item[playerBoxscoreMap.FTM],
    item[playerBoxscoreMap.FTA],
    item[playerBoxscoreMap.FT_PCT],
    item[playerBoxscoreMap.OREB],
    item[playerBoxscoreMap.DREB],
    item[playerBoxscoreMap.REB],
    item[playerBoxscoreMap.AST],
    item[playerBoxscoreMap.STL],
    item[playerBoxscoreMap.BLK],
    item[playerBoxscoreMap.TOV],
    item[playerBoxscoreMap.PF],
    item[playerBoxscoreMap.PLUS_MINUS],
    "playoff"
  ]);
  // console.log(playerBox);

  const dateYesterday = moment().tz("Asia/Taipei").subtract(1, "day").format();
  const correctDate = dateYesterday.slice(0, 10);

  const todayBoxscore = playerBox.filter(function (boxscore) {
    return boxscore[4].includes(correctDate);
  });
  console.log(correctDate, "test");

  // const playerBox = {};
  // for (const item of boxscore.data.resultSets[0].rowSet) {
  //   const key = JSON.stringify(item[playerBoxscoreMap.PLAYER_ID]) + "-" + item[playerBoxscoreMap.GAME_DATE];
  //   playerBox[key] = {
  //     player_name: item[playerBoxscoreMap.PLAYER__NAME],
  //     player_id: item[playerBoxscoreMap.PLAYER_ID],
  //     team_id: item[playerBoxscoreMap.TEAM_ID],
  //     game_id: item[playerBoxscoreMap.GAME_ID],
  //     game_date: item[playerBoxscoreMap.GAME_DATE],
  //     pts: item[playerBoxscoreMap.PTS],
  //     fg3m: item[playerBoxscoreMap.FG3M],
  //     reb: item[playerBoxscoreMap.REB],
  //     ast: item[playerBoxscoreMap.AST],
  //     stl: item[playerBoxscoreMap.STL],
  //     blk: item[playerBoxscoreMap.BLK],
  //     tov: item[playerBoxscoreMap.TOV]
  //   };
  // }

  await playerinfo.createPlayers(todayBoxscore); // 這裡的playerBox是要傳出去的資料
  // console.log(playerBox);
  // res.send(JSON.stringify(playerBox));
  res.send(todayBoxscore);
};

const getTotalscore = async (req, res) => {
  const result = await playerinfo.getTotalscore(req.user.name);
  res.status(200).send({ data: result });
};

const getRanking = async (req, res) => {
  const result = await playerinfo.getRanking(req.user.name);
  console.log(result[0]);
  res.status(200).send(result[0]);
};

const getSelectedplayers = async (req, res) => {
  const { players } = req.body;
  const result = await playerinfo.getSelectedplayers(players, req.user.name);
  if (result.error) {
    res.send({ error: result.error });
    return;
  }
  res.status(200).send({ status: "okay" });
};

const getUserProfile = async (req, res) => {
  res.status(200).send({
    data: {
      user: req.user.name
    }
  });
};

module.exports = {
  fetchschedule,
  fetchAllplayerstats,
  fetchBoxscore,
  getTotalscore,
  getRanking,
  getSelectedplayers,
  getUserProfile,
  fetchPlayerstats
};
