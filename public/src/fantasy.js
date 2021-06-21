if (!localStorage.access_token) {
  alert("請先登入");
  location.href = "/";
}

const showTeams = document.querySelectorAll(".glyphicon-plus-sign");
const teamsLogo = document.querySelectorAll(".teams");
const teamPlayers = document.querySelectorAll(".players");

// eslint-disable-next-line no-unused-vars
function clearAll () {
  const teams1 = document.querySelector("#teams1");
  const teams2 = document.querySelector("#teams2");
  const teams3 = document.querySelector("#teams3");
  const teams4 = document.querySelector("#teams4");
  const teams5 = document.querySelector("#teams5");
  const players1 = document.querySelector("#players1");
  const players2 = document.querySelector("#players2");
  const players3 = document.querySelector("#players3");
  const players4 = document.querySelector("#players4");
  const players5 = document.querySelector("#players5");
  const playerName1 = document.querySelector("#playerName1");
  const playerName2 = document.querySelector("#playerName2");
  const playerName3 = document.querySelector("#playerName3");
  const playerName4 = document.querySelector("#playerName4");
  const playerName5 = document.querySelector("#playerName5");
  const plusButton1 = document.querySelector("#plus-button1");
  const plusButton2 = document.querySelector("#plus-button2");
  const plusButton3 = document.querySelector("#plus-button3");
  const plusButton4 = document.querySelector("#plus-button4");
  const plusButton5 = document.querySelector("#plus-button5");
  teams1.innerHTML = "";
  teams2.innerHTML = "";
  teams3.innerHTML = "";
  teams4.innerHTML = "";
  teams5.innerHTML = "";
  players1.innerHTML = "";
  players2.innerHTML = "";
  players3.innerHTML = "";
  players4.innerHTML = "";
  players5.innerHTML = "";
  playerName1.innerHTML = "";
  playerName2.innerHTML = "";
  playerName3.innerHTML = "";
  playerName4.innerHTML = "";
  playerName5.innerHTML = "";
  plusButton1.classList.remove("glyphicon-minus-sign");
  plusButton1.classList.add("glyphicon-plus-sign");
  plusButton2.classList.remove("glyphicon-minus-sign");
  plusButton2.classList.add("glyphicon-plus-sign");
  plusButton3.classList.remove("glyphicon-minus-sign");
  plusButton3.classList.add("glyphicon-plus-sign");
  plusButton4.classList.remove("glyphicon-minus-sign");
  plusButton4.classList.add("glyphicon-plus-sign");
  plusButton5.classList.remove("glyphicon-minus-sign");
  plusButton5.classList.add("glyphicon-plus-sign");
}

let todayData;

// eslint-disable-next-line no-unused-vars
function showTodayteams (i) {
  const mode = document.querySelector("#mode");
  if (mode.value == 2) {
    if (todayData) {
      if (showTeams[i].classList.contains("glyphicon-plus-sign")) {
        closeOtherbuttons(i);
        showTeams[i].classList.remove("glyphicon-plus-sign");
        showTeams[i].classList.add("glyphicon-minus-sign");
        for (let j = 0; j < todayData.length; j++) {
          const image = document.createElement("img");
          image.setAttribute(
            "src",
        `https://cdn.nba.com/logos/nba/${todayData[j]}/global/D/logo.svg`
          );
          image.setAttribute("class", "teamLogo");
          image.setAttribute("alt", `${i}`);
          teamsLogo[i].appendChild(image);
        }
      } else {
        showTeams[i].classList.remove("glyphicon-minus-sign");
        showTeams[i].classList.add("glyphicon-plus-sign");
        for (let j = 0; j < todayData.length; j++) {
          const image = document.querySelector(".teamLogo");
          teamsLogo[i].removeChild(image);
          teamPlayers[i].innerHTML = "";
        }
      }
    } else {
      // eslint-disable-next-line no-undef
      Swal.fire({
        html: `<div class="mode-alert">明天沒有比賽</div><br>
        <div class="mode-alert2">可以選擇模擬模式來玩唷！</div>`
      });
    }
  }
}

let retrieveData;

// eslint-disable-next-line no-unused-vars
function appendData (i) {
  const mode = document.querySelector("#mode");
  if (mode.value == 1) { // 模擬
    if (retrieveData !== undefined) {
      if (showTeams[i].classList.contains("glyphicon-plus-sign")) {
        closeOtherbuttons(i);
        showTeams[i].classList.remove("glyphicon-plus-sign");
        showTeams[i].classList.add("glyphicon-minus-sign");
        for (let j = 0; j < retrieveData.length; j++) {
          const image = document.createElement("img");
          image.setAttribute(
            "src",
                    `https://cdn.nba.com/logos/nba/${retrieveData[j]}/global/D/logo.svg`
          );
          image.setAttribute("class", "teamLogo");
          image.setAttribute("alt", `${i}`);
          teamsLogo[i].appendChild(image);
        }
      } else {
        showTeams[i].classList.remove("glyphicon-minus-sign");
        showTeams[i].classList.add("glyphicon-plus-sign");
        for (let j = 0; j < retrieveData.length; j++) {
          const image = document.querySelector(".teamLogo");
          teamsLogo[i].removeChild(image);
          teamPlayers[i].innerHTML = "";
        }
      }
    } else {
      // eslint-disable-next-line no-undef
      Swal.fire(
        "請先選擇日期！"
      );
    }
  }
}

// eslint-disable-next-line no-unused-vars
function mode () {
  const mode = document.querySelector("#mode");
  const date = document.querySelector("#date");
  const submit = document.querySelector(".submit");
  const reset = document.querySelector(".reset");
  const getScore = document.querySelector(".get-score");
  date.value = "";
  if (mode.value == 0) {
    if (selectedPlayers !== undefined) {
      selectedPlayers.clear();
    }
  } else if (mode.value == 1) {
    date.style.display = "flex";
    getScore.style.display = "inline-block";
    submit.style.display = "none";
    reset.style.display = "none";
    if (selectedPlayers !== undefined) {
      console.log(selectedPlayers);
      selectedPlayers.clear();
      console.log(selectedPlayers);
    }
  // eslint-disable-next-line eqeqeq
  } else if (mode.value == 2) { // official mode
    if (selectedPlayers !== undefined) {
      selectedPlayers.clear();
    }
    const date = document.querySelector("#date");
    date.style.display = "none";
    getScore.style.display = "none";
    submit.style.display = "inline-block";
    reset.style.display = "inline-block";
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const today = new Date().toLocaleDateString();
        const newToday = today.split("/");
        const todayDate = [newToday[1], newToday[2], newToday[0]].join("/");
        const datas = JSON.parse(xhr.responseText).leagueSchedule.gameDates;
        const fantasyDate = datas.filter(function (data) {
          return data.gameDate.includes(todayDate);
        });
        if (fantasyDate.length === 0) {
          // eslint-disable-next-line no-undef
          Swal.fire({
            html: `<div class="mode-alert">明天沒有比賽</div><br>
            <div class="mode-alert2">可以選擇模擬模式來玩唷！</div>`
          });
        } else {
          const teamsId = [];
          for (let i = 0; i < fantasyDate[0].games.length; i++) {
            teamsId.push(fantasyDate[0].games[i].homeTeam.teamId);
            teamsId.push(fantasyDate[0].games[i].awayTeam.teamId);
          }
          todayData = teamsId;
        }
      }
    };
    xhr.open("get", "api/1.0/fantasy/schedule");
    xhr.send();
  } else {
    date.style.display = "none";
    const showTeams = document.querySelectorAll(".glyphicon-plus-sign");
    for (let i = 0; i < showTeams.length; i++) {
      showTeams[i].addEventListener("click", function () {
        // eslint-disable-next-line no-undef
        Swal.fire(
          "請先選擇遊戲模式！"
        );
      });
    }
  }
}

// eslint-disable-next-line no-unused-vars
function checkmode () {
  const mode = document.querySelector("#mode");
  if (mode.value == 0) {
    // eslint-disable-next-line no-undef
    Swal.fire(
      "請先選擇右上角的遊戲模式！"
    );
  }
}

// eslint-disable-next-line no-unused-vars
async function handler (e) {
  const selectedDate = e.target.value.replace(/-/g, "");
  console.log(selectedDate);
  const response = await fetch("/api/1.0/fantasy/history_schedule", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
    }),
    body: JSON.stringify({ date: selectedDate })
  });
  const json = await response.json();
  if (json.data.error) {
    // eslint-disable-next-line no-undef
    Swal.fire(
      "今天沒有比賽唷！"
    );
  } else {
    retrieveData = json.data;
    if (selectedPlayers !== undefined) {
      selectedPlayers.clear();
    }
  }
};

function closeOtherbuttons (index) {
  for (let i = 0; i <= 4; i++) {
    if (i === index) {
      continue;
    };
    const teamsLogo = document.querySelectorAll(".teams");
    teamsLogo[i].innerHTML = "";
    const showTeams = document.querySelectorAll(".glyphicon-minus-sign"); // 5
    for (const showTeam of showTeams) {
      showTeam.classList.remove("glyphicon-minus-sign");
      showTeam.classList.add("glyphicon-plus-sign");
    }
    const teamPlayers = document.querySelectorAll(".players");
    teamPlayers[i].innerHTML = "";
  }
};

let selectedPlayers;

fetch("/api/1.0/fantasy/playerstats", {
  method: "GET"
})
  .then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("error");
    }
  })
  .then((data) => {
    const teamPlayers = document.querySelectorAll(".players");
    const playerSet = new Set();

    document.addEventListener("click", function (event) {
      const targetElement = event.target;
      const playerName = document.querySelectorAll(".playerName");
      const playerId = event.path[1].childNodes[1].dataset.player;
      if (targetElement.classList.contains("reset")) {
        playerSet.clear();
        for (let i = 0; i < playerName.length; i++) {
          playerName[i].innerHTML = "";
          playerName[i].setAttribute("alt", "null");
        }
      }

      if (targetElement.classList.contains("name")) {
        if (playerName[parseInt(targetElement.getAttribute("alt"))].getAttribute("alt") !== "null") {
          playerSet.delete(playerName[parseInt(targetElement.getAttribute("alt"))].getAttribute("alt"));
        }
        if (!playerSet.has(playerId)) {
          closeOtherbuttons();
          playerName[parseInt(targetElement.getAttribute("alt"))].innerHTML = event.path[1].childNodes[1].innerText;
          playerName[parseInt(targetElement.getAttribute("alt"))].setAttribute("alt", `${playerId}`);
          playerName[parseInt(targetElement.getAttribute("alt"))].style.display = "inline-block";
          // console.log(playerSet);
          playerSet.add(playerId);
        } else {
          // eslint-disable-next-line no-undef
          Swal.fire(
            "此球員已被選取！"
          );
        }
      }
      selectedPlayers = playerSet;

      if (targetElement.classList.contains("submit")) {
        console.log(playerSet.size);
        if (playerSet.size < 5) {
          // eslint-disable-next-line no-undef
          Swal.fire(
            "請確認您是否選了5位球員。"
          );
        }
      }

      if (targetElement.classList.contains("teamLogo")) {
        teamPlayers[parseInt(targetElement.alt)].innerHTML = "";
        // console.log(targetElement.src.slice(30, 40));
        for (let i = 0; i < data.data.G[targetElement.src.slice(30, 40)].length; i++) {
          if (parseInt(targetElement.alt) === 0 || parseInt(targetElement.alt) === 1) {
            if (data.data.G[targetElement.src.slice(30, 40)][i].player_name) {
              teamPlayers[parseInt(targetElement.alt)].innerHTML += `<div class="container players">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      <th>PTS</th>
                      <th>3PM</th>
                      <th>REB</th>
                      <th>AST</th>
                      <th>STL</th>
                      <th>BLK</th>
                      <th>TOV</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="selected-player">
                      <td class="name" data-player="${data.data.G[targetElement.src.slice(30, 40)][i].player_id}" alt="${parseInt(targetElement.alt)}" style="cursor: pointer">${data.data.G[targetElement.src.slice(30, 40)][i].player_first_name} ${data.data.G[targetElement.src.slice(30, 40)][i].player_last_name}</td>
                      <td>${data.data.G[targetElement.src.slice(30, 40)][i].pts}</td>
                      <td>${data.data.G[targetElement.src.slice(30, 40)][i].fg3m}</td>
                      <td>${data.data.G[targetElement.src.slice(30, 40)][i].reb}</td>
                      <td>${data.data.G[targetElement.src.slice(30, 40)][i].ast}</td>
                      <td>${data.data.G[targetElement.src.slice(30, 40)][i].stl}</td>
                      <td>${data.data.G[targetElement.src.slice(30, 40)][i].blk}</td>
                      <td>${data.data.G[targetElement.src.slice(30, 40)][i].tov}</td>
                    </tr>
                  </tbody>
                </table>
              </div>`;
            }
          }
        }

        for (let i = 0; i < data.data.F[targetElement.src.slice(30, 40)].length; i++) {
          if (parseInt(targetElement.alt) === 2 || parseInt(targetElement.alt) === 3) {
            if (data.data.F[targetElement.src.slice(30, 40)][i].player_name) {
              teamPlayers[parseInt(targetElement.alt)].innerHTML += `<div class="container players">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>PTS</th>
                  <th>3PM</th>
                  <th>REB</th>
                  <th>AST</th>
                  <th>STL</th>
                  <th>BLK</th>
                  <th>TOV</th>
                </tr>
              </thead>
              <tbody>
                <tr class="selected-player">
                  <td class="name" data-player="${data.data.F[targetElement.src.slice(30, 40)][i].player_id}" alt="${parseInt(targetElement.alt)}" style="cursor: pointer">${data.data.F[targetElement.src.slice(30, 40)][i].player_first_name} ${data.data.F[targetElement.src.slice(30, 40)][i].player_last_name}</td>
                  <td>${data.data.F[targetElement.src.slice(30, 40)][i].pts}</td>
                  <td>${data.data.F[targetElement.src.slice(30, 40)][i].fg3m}</td>
                  <td>${data.data.F[targetElement.src.slice(30, 40)][i].reb}</td>
                  <td>${data.data.F[targetElement.src.slice(30, 40)][i].ast}</td>
                  <td>${data.data.F[targetElement.src.slice(30, 40)][i].stl}</td>
                  <td>${data.data.F[targetElement.src.slice(30, 40)][i].blk}</td>
                  <td>${data.data.F[targetElement.src.slice(30, 40)][i].tov}</td>
                </tr>
              </tbody>
            </table>
          </div>`;
            }
          }
        }

        for (let i = 0; i < data.data.C[targetElement.src.slice(30, 40)].length; i++) {
          if (parseInt(targetElement.alt) === 4) {
            if (data.data.C[targetElement.src.slice(30, 40)][i].player_name) {
              teamPlayers[parseInt(targetElement.alt)].innerHTML += `<div class="container players">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>PTS</th>
                  <th>3PM</th>
                  <th>REB</th>
                  <th>AST</th>
                  <th>STL</th>
                  <th>BLK</th>
                  <th>TOV</th>
                </tr>
              </thead>
              <tbody>
                <tr class="selected-player">
                  <td class="name" data-player="${data.data.C[targetElement.src.slice(30, 40)][i].player_id}" alt="${parseInt(targetElement.alt)}" style="cursor: pointer">${data.data.C[targetElement.src.slice(30, 40)][i].player_first_name} ${data.data.C[targetElement.src.slice(30, 40)][i].player_last_name}</td>
                  <td>${data.data.C[targetElement.src.slice(30, 40)][i].pts}</td>
                  <td>${data.data.C[targetElement.src.slice(30, 40)][i].fg3m}</td>
                  <td>${data.data.C[targetElement.src.slice(30, 40)][i].reb}</td>
                  <td>${data.data.C[targetElement.src.slice(30, 40)][i].ast}</td>
                  <td>${data.data.C[targetElement.src.slice(30, 40)][i].stl}</td>
                  <td>${data.data.C[targetElement.src.slice(30, 40)][i].blk}</td>
                  <td>${data.data.C[targetElement.src.slice(30, 40)][i].tov}</td>
                </tr>
              </tbody>
            </table>
          </div>`;
            }
          }
        }
      }
    });
  });

const member = document.querySelector(".member1");

member.addEventListener("click", function () {
  // eslint-disable-next-line no-undef
  Swal.fire("確定要登出嗎？");
  const confirm = document.querySelector(".swal2-actions");
  confirm.addEventListener("click", function () {
    window.localStorage.clear();
    location.href = "/"; // 照理來說要跳到fantasy首頁
  });
});

const rules = document.querySelector("#rules");

rules.addEventListener("click", function () {
  // eslint-disable-next-line no-undef
  Swal.fire({
    html: `<div class="swal-mode">正式模式：</div><br>
    <div>1. 台灣時間早上 00:00~23:59 選擇隔天出賽的5位球員，進行每一天的積分統計。</div>
    <div>2. 當日積分於台灣時間每天下午更新，Ranking 頁面會有排行榜可查看你的總積分排名。</div><br>
    <div class="swal-mode">模擬模式：</div><br>
    <div>可以選擇今年賽季的任一有賽程的日期，挑選自己喜歡的球員5位，會有當天球員數據的加權分數。</div><br>
    <div class="swal-mode">積分計算方式：</div><br>
    <div>1. 依照NBA球員每場球賽的比賽數據而有不同的加權。</div>
    <div>得分*1、三分進球數*2、籃板*1.2、助攻*1.5、抄截*3、阻攻*3、失誤*-1</div><br> 
    <div class="example">【舉例】</div>
    <div class="example">快艇球員 Kawhi Leonard 本日得到 30分、2三分、10籃板 、5助攻 、3抄截、0阻攻、5失誤</div>
    <div class="example">依照加權計算出的積分為 30+4+12+7.5+9+0-5= 57.5 分</div>`,
    customClass: "swal-wide",
    focusConfirm: false
  });
});

const btnConfirm = document.querySelector(".submit");
btnConfirm.addEventListener("click", function () {
  if (selectedPlayers.size === 5) {
    const getselectedPlayers = async () => {
      console.log(selectedPlayers);
      const playersObj = { players: [] };
      for (const player of selectedPlayers) {
        console.log(player);
        playersObj.players.push(player);
      }
      const response = await fetch("/api/1.0/fantasy/selected_players", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
        }),
        body: JSON.stringify(playersObj)
      });
      const json = await response.json();
      console.log(json);
      if (json.error) {
        // eslint-disable-next-line no-undef
        Swal.fire(
          "你今天已經選過球員囉！"
        );
        const playerName1 = document.querySelector("#playerName1");
        const playerName2 = document.querySelector("#playerName2");
        const playerName3 = document.querySelector("#playerName3");
        const playerName4 = document.querySelector("#playerName4");
        const playerName5 = document.querySelector("#playerName5");
        playerName1.innerHTML = "";
        playerName2.innerHTML = "";
        playerName3.innerHTML = "";
        playerName4.innerHTML = "";
        playerName5.innerHTML = "";
      } else {
        // eslint-disable-next-line no-undef
        Swal.fire(
          "成功"
        );
        const confirm = document.querySelector(".swal2-confirm");
        confirm.addEventListener("click", function () {
          location.href = "/fantasy.html"; // 跳到會員頁
        });
      }
      return json;
    };
    getselectedPlayers();
  } else {
    console.log("err");
  }
});

const getScore = document.querySelector(".get-score");
getScore.addEventListener("click", function () {
  const date = document.querySelector("#date");
  console.log(date.value);
  if (date.value) {
    if (selectedPlayers.size === 5) {
      const getselectedPlayers = async () => {
        const playersObj = { players: [] };
        for (const player of selectedPlayers) {
          playersObj.players.push(player);
        }
        const data = {
          date: date.value,
          players: playersObj
        };
        const response = await fetch("/api/1.0/fantasy/history_players", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
          }),
          body: JSON.stringify(data)
        });
        const json = await response.json();
        console.log(json);
        // eslint-disable-next-line no-undef
        Swal.fire(
        `您的模擬分數是 ${json.data}分！`
        );
        return json;
      };
      getselectedPlayers();
    } else {
    // eslint-disable-next-line no-undef
      Swal.fire(
        "請確認您是否選了5位球員。"
      );
    }
  } else {
    // eslint-disable-next-line no-undef
    Swal.fire(
      "請先選擇日期唷！"
    );
  }
});

// fetch("/api/1.0/fantasy/total_score", {
//   method: "GET",
//   headers: new Headers({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
//   })
// })
//   .then(function (response) {
//     if (response.status === 200) {
//       return response.json();
//     } else {
//       console.log("error");
//     }
//   })
//   .then((data) => {
//     console.log(data);
//     const score = document.querySelector(".score");
//     score.innerHTML = Math.round(data.data);
//   });

fetch("/api/1.0/fantasy/ranking", {
  method: "GET",
  headers: new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
  })
})
  .then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("error");
    }
  })
  .then((data) => {
    const rank = document.querySelector(".rank");
    const score = document.querySelector(".score");
    if (data.length === 0) {
      score.innerHTML = 0;
      rank.innerHTML = 0;
    } else if (data[0].total_score && data[0].rank) {
      score.innerHTML = Math.round(data[0].total_score);
      rank.innerHTML = data[0].rank;
    } else {
      score.innerHTML = 0;
      rank.innerHTML = 0;
    }
  });

fetch("/api/1.0/user/profile", {
  method: "GET",
  headers: new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
  })
})
  .then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("error");
    }
  })
  .then((data) => {
    const username = document.querySelector(".user");
    username.innerHTML = data.data.user;
  });
