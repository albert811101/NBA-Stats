const rp = require("request-promise-native");
// const fs = require("fs");

async function fetchPlayerstats () {
  console.log("Making API Request...");
  // request the data from the JSON API
  const results = await rp({
    uri: "https://stats.nba.com/stats/playerdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=2544&PlusMinus=N&Rank=N&Season=2019-20&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=yoy&VsConference=&VsDivision=",
    headers: {
      Connection: "keep-alive",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
      "x-nba-stats-origin": "stats",
      Referer: "https://stats.nba.com/player/2544/"
    },
    json: true
  });
  console.log("Got results =", results.resultSets[0].headers, results.resultSets[0].rowSet[0][0]);
  // save the JSON to disk
//   await fs.promises.writeFile("output.json", JSON.stringify(results, null, 2));
//   console.log("Done!");
}
// start the main script
fetchPlayerstats();

// async function

module.exports = { fetchPlayerstats };
