// const fs = require("fs");
const axios = require("axios");

async function fetchPlayerstats () {
  console.log("Making API Request...");
  // request the data from the JSON API
  const url = "https://stats.nba.com/stats/playerdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=2544&PlusMinus=N&Rank=N&Season=2019-20&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=yoy&VsConference=&VsDivision=";
  const results = await axios.get(url, {
    headers:
    {
      Referer: "https://stats.nba.com/player/2544/"
    }
  });
  console.log("Got results =", results.data.resultSets[0].headers, results.data.resultSets[0].rowSet[0]);

  // save the JSON to disk
//   await fs.promises.writeFile("output.json", JSON.stringify(results, null, 2));
//   console.log("Done!");
}
// start the main script

fetchPlayerstats();

// async function

module.exports = { fetchPlayerstats };
