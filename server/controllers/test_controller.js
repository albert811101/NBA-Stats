const axios = require("axios");
// const fetch = require("node-fetch");
// const HttpsProxyAgent = require("https-proxy-agent");

const test = async (req, res) => {
  console.log("Making API Request...");

  const url =
    "https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2020-21&SeasonSegment=&SeasonType=Playoffs&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=&Weight=";
  const result = await axios.get(url, {
    headers: {
      Referer: "https://www.nba.com/"
    }
  });
  res.status(200).json(result.data);
};

// const test = function (req, res) {
//   console.log("Making API Request...");

//   const url = "https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2020-21&SeasonSegment=&SeasonType=Playoffs&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=&Weight=";

//   // const proxyAgent = new HttpsProxyAgent("http://localhost:3000");

//   fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Referer: "https://www.nba.com/"
//     }
//   })
//     .then(function (response) {
//       if (response.status === 200) {
//         return response.json();
//       } else {
//         console.log("error");
//       }
//     })
//     .then((data) => {
//       console.log(data);
//     });
// };

module.exports = {
  test
};
