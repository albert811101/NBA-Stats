const axios = require("axios");
const playerinfo = require("../models/fantasy_model");

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

  // const playerStats = result.data.resultSets[0].rowSet.map((item) => [
  //   item[playerStatMap.PLAYER_ID],
  //   item[playerStatMap.PLAYER__NAME],
  //   item[playerStatMap.TEAM_ID],
  //   item[playerStatMap.PTS],
  //   item[playerStatMap.FG3M],
  //   item[playerStatMap.REB],
  //   item[playerStatMap.AST],
  //   item[playerStatMap.STL],
  //   item[playerStatMap.BLK],
  //   item[playerStatMap.TOV]
  // ]);

  const playerstats = {};
  for (const item of result.data.resultSets[0].rowSet) {
    playerstats[item[playerStatMap.PLAYER_ID]] = {
      player_name: item[playerStatMap.PLAYER__NAME],
      team_id: item[playerStatMap.TEAM_ID],
      pts: item[playerStatMap.PTS],
      fg3m: item[playerStatMap.FG3M],
      reb: item[playerStatMap.REB],
      ast: item[playerStatMap.AST],
      stl: item[playerStatMap.STL],
      blk: item[playerStatMap.BLK],
      tov: item[playerStatMap.TOV]
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
  // res.status(200).json(result.data.resultSets[0]);
};

const getSelectedplayers = async (req, res) => {
  console.log(req.body);
  console.log(typeof req.body.players[0]);
  const { players } = req.body;
  console.log(players);
  await playerinfo.getSelectedplayers(players);
  res.status(200).send({ status: "okay" });
};

module.exports = {
  fetchschedule,
  fetchAllplayerstats,
  getSelectedplayers
};
