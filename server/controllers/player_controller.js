const axios = require("axios");
// const cheerio = require("cheerio");
const player = require("../models/player_model");

const fetchPlayerstats = async (req, res) => {
  console.log("Making API Request...");
  // request the data from the JSON API
  const url =
    "https://stats.nba.com/stats/playerdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=201939&PlusMinus=N&Rank=N&Season=2020-21&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=yoy&VsConference=&VsDivision=";
  const results = await axios.get(url, {
    headers: {
      Referer: "https://www.nba.com/"
    }
  });
  res.status(200).json(results.data);
  // console.log(
  //   "Got results =",
  //   results.data.resultSets[0].headers,
  //   results.data.resultSets[0].rowSet[0]
  // );
};

const fetchPlayerbio = async (req, res) => {
  console.log("Making API Request...");
  // request the data from the JSON API
  // const url = "https://stats.nba.com/stats/playerdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=201939&PlusMinus=N&Rank=N&Season=2020-21&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=yoy&VsConference=&VsDivision=";
  // const url = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612744/2020/260x190/201939.png";
  const url =
    "https://stats.nba.com/stats/playerindex?College=&Country=&DraftPick=&DraftRound=&DraftYear=&Height=&Historical=1&LeagueID=00&Season=2020-21&SeasonType=Regular Season&TeamID=0&Weight=";
  const result = await axios.get(url, {
    headers: {
      Referer: "https://www.nba.com/"
    }
  });
  console.log(
    "Got result =",
    result.data.resultSets[0].headers,
    result.data.resultSets[0].rowSet[4001]
  );
  // console.log(results.data.resultSets[0].headers[0]);
  // console.log(results.data.resultSets);
  const playerStatMap = {
    PERSON_ID: 0,
    PLAYER_LAST_NAME: 1,
    PLAYER_FIRST_NAME: 2,
    TEAM_ID: 4,
    TEAM_CITY: 7,
    TEAM_NAME: 8,
    TEAM_ABBREVIATION: 9,
    JERSEY_NUMBER: 10,
    POSITION: 11,
    HEIGHT: 12,
    WEIGHT: 13,
    COLLEGE: 14,
    COUNTRY: 15,
    PTS: 20,
    REB: 21,
    AST: 22,
    FROM_YEAR: 24,
    TO_YEAR: 25
  };
  const playerBio = result.data.resultSets[0].rowSet.map((item) => [
    item[playerStatMap.PERSON_ID],
    item[playerStatMap.PLAYER_LAST_NAME],
    item[playerStatMap.PLAYER_FIRST_NAME],
    item[playerStatMap.TEAM_ID],
    item[playerStatMap.TEAM_CITY],
    item[playerStatMap.TEAM_NAME],
    item[playerStatMap.TEAM_ABBREVIATION],
    item[playerStatMap.JERSEY_NUMBER],
    item[playerStatMap.POSITION],
    item[playerStatMap.HEIGHT],
    item[playerStatMap.WEIGHT],
    item[playerStatMap.COLLEGE],
    item[playerStatMap.COUNTRY],
    item[playerStatMap.PTS],
    item[playerStatMap.REB],
    item[playerStatMap.AST],
    item[playerStatMap.FROM_YEAR],
    item[playerStatMap.TO_YEAR]
  ]);
  // console.log("okay");
  // res.send("okay");
  return playerBio;
};

const createPlayerbio = async (req, res) => {
  const result = await fetchPlayerbio();
  await player.createPlayerbio(result);
  res.send(result);
};

const getPlayerbio = async (req, res) => {
  const playerId = req.query.playerid;
  const result = await player.getPlayerbio(playerId); // 傳出去的資料
  res.send(result[0]);
};

const getRecentgames = async (req, res) => {
  const playerId = req.query.playerid;
  const result = await player.getRecentgames(playerId); // 傳出去的資料
  res.send(result);
};

const getPlayername = async (req, res) => {
  const result = await player.getPlayername(req.body.name); // 傳出去的資料
  res.send(result[0]);
};

const fetchStatsleader = async (req, res) => {
  // console.log("Making API Request...");
  // request the data from the JSON API
  const url = "https://stats.nba.com/js/data/widgets/home_season.json";
  const statsleader = await axios.get(url, {
    headers: {
      Referer: "https://www.nba.com/"
    }
  });
  // console.log(statsleader.data.items[0].items[0].playerstats[0]);
  res.send(JSON.stringify(statsleader.data));
};

module.exports = {
  fetchPlayerstats,
  fetchPlayerbio,
  createPlayerbio,
  getPlayerbio,
  getRecentgames,
  getPlayername,
  fetchStatsleader
};
