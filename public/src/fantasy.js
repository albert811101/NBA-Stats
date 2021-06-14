if (!localStorage.access_token) {
  alert("請先登入");
  location.href = "/";
}

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

  // if (targetElement.classList.contains("reset")) {
  //   playerSet.clear();
  //   console.log(playerSet, 123456);
  //   for (let i = 0; i < playerName.length; i++) {
  //     playerName[i].innerHTML = "";
  //     playerName[i].setAttribute("alt", "null");
  //   }
  // }
}

const showTeams = document.querySelectorAll(".glyphicon-plus-sign");
const teamsLogo = document.querySelectorAll(".teams");
const teamPlayers = document.querySelectorAll(".players");

let todayData;

function showTodayteams (i) {
  const mode = document.querySelector("#mode");
  if (mode.value == 2) {
    showTeams[i].addEventListener("click", function () {
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
    });
  }
}

let retrieveData;

function appendData (i) {
  const mode = document.querySelector("#mode");
  if (mode.value == 1) {
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
  // for (let i = 0; i < showTeams.length; i++) {
  //   showTeams[i].addEventListener("click", function () {
  //     if (showTeams[i].classList.contains("glyphicon-minus-sign")) {
  //       console.log("change plus button");
  //       showTeams[i].classList.remove("glyphicon-minus-sign");
  //       showTeams[i].classList.add("glyphicon-plus-sign");
  //     }
  //   });
  // };
  // eslint-disable-next-line eqeqeq
  if (mode.value == 1) {
    date.style.display = "flex";
    getScore.style.display = "inline-block";
    submit.style.display = "none";
    reset.style.display = "none";
    // for (let i = 0; i <= 4; i++) {
    //   const teamsLogo = document.querySelectorAll(".teams");
    //   teamsLogo[i].innerHTML = "";
    //   const showTeams = document.querySelectorAll(".glyphicon-minus-sign"); // 5
    //   for (const showTeam of showTeams) {
    //     showTeam.classList.remove("glyphicon-minus-sign");
    //     showTeam.classList.add("glyphicon-plus-sign");
    //   }
    //   const teamPlayers = document.querySelectorAll(".players");
    //   teamPlayers[i].innerHTML = "";
    // }

  // eslint-disable-next-line eqeqeq
  } else if (mode.value == 2) {
    const date = document.querySelector("#date");
    console.log(date.value);
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
        const teamsId = [];
        for (let i = 0; i < fantasyDate[0].games.length; i++) {
          teamsId.push(fantasyDate[0].games[i].homeTeam.teamId);
          teamsId.push(fantasyDate[0].games[i].awayTeam.teamId);
        }
        todayData = teamsId;

        const showTeams = document.querySelectorAll(".glyphicon-plus-sign"); // 5
        const teamsLogo = document.querySelectorAll(".teams"); // 5
        const teamPlayers = document.querySelectorAll(".players"); // 5

        for (let i = 0; i < showTeams.length; i++) {
          showTeams[i].addEventListener("click", function () {
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
          });
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
  // eslint-disable-next-line eqeqeq
  // if (mode.value == 0) {
  //   // eslint-disable-next-line no-undef
  //   Swal.fire(
  //     "請先選擇右上角的遊戲模式！"
  //   );
  // }
}

function initSelect (json) {
  const showTeams = document.querySelectorAll(".glyphicon-plus-sign");
  const teamsLogo = document.querySelectorAll(".teams");
  const teamPlayers = document.querySelectorAll(".players");
  for (let i = 0; i < showTeams.length; i++) {
    if (showTeams[i].classList.contains("glyphicon-plus-sign")) {
      // closeOtherbuttons(i);
      // showTeams[i].classList.remove("glyphicon-plus-sign");
      // showTeams[i].classList.add("glyphicon-minus-sign");
    } else {
      showTeams[i].classList.remove("glyphicon-minus-sign");
      showTeams[i].classList.add("glyphicon-plus-sign");
      for (let j = 0; j < json.data.length; j++) {
        const image = document.querySelector(".teamLogo");
        teamsLogo[i].removeChild(image);
        teamPlayers[i].innerHTML = "";
      }
    }
  }
};

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
    // initSelect(json);

    // const plusButton1 = document.querySelector("#plus-button1");
    // const plusButton2 = document.querySelector("#plus-button2");
    // const plusButton3 = document.querySelector("#plus-button3");
    // const plusButton4 = document.querySelector("#plus-button4");
    // const plusButton5 = document.querySelector("#plus-button5");
    // plusButton1.addEventListener("click", appendData(0), false);
    // plusButton2.addEventListener("click", appendData(1), false);
    // plusButton3.addEventListener("click", appendData(2), false);
    // plusButton4.addEventListener("click", appendData(3), false);
    // plusButton5.addEventListener("click", appendData(4), false);
    // const showTeams = document.querySelectorAll(".glyphicon-plus-sign");
    // const teamsLogo = document.querySelectorAll(".teams");
    // const teamPlayers = document.querySelectorAll(".players");
    // function appendData (i) {
    //   console.log("dkoqwkdpqwkqwpd");
    //   console.log(showTeams[i].classList[1]);
    //   console.log(showTeams[i].classList.contains("glyphicon-plus-sign"));
    //   console.log(teamsLogo);
    //   if (showTeams[i].classList.contains("glyphicon-plus-sign")) {
    //     console.log(123);
    //     console.log(showTeams[i].classList, "www");
    //     closeOtherbuttons(i);
    //     showTeams[i].classList.remove("glyphicon-plus-sign");
    //     showTeams[i].classList.add("glyphicon-minus-sign");
    //     console.log(showTeams[i].classList, "ddwqq");
    //     for (let j = 0; j < retrieveData.length; j++) {
    //       const image = document.createElement("img");
    //       image.setAttribute(
    //         "src",
    //               `https://cdn.nba.com/logos/nba/${retrieveData[j]}/global/D/logo.svg`
    //       );
    //       image.setAttribute("class", "teamLogo");
    //       image.setAttribute("alt", `${i}`);
    //       teamsLogo[i].appendChild(image);
    //     }
    //   } else {
    //     console.log(showTeams[i].classList, "lplp");
    //     showTeams[i].classList.remove("glyphicon-minus-sign");
    //     showTeams[i].classList.add("glyphicon-plus-sign");
    //     for (let j = 0; j < retrieveData.length; j++) {
    //       const image = document.querySelector(".teamLogo");
    //       teamsLogo[i].removeChild(image);
    //       teamPlayers[i].innerHTML = "";
    //     }
    //   }
    // }
    // for (let i = 0; i < showTeams.length; i++) {
    //   showTeams[i].addEventListener("click", function () {
    //     console.log("dkoqwkdpqwkqwpd");
    //     console.log(showTeams[i].classList[1]);
    //     console.log(showTeams[i].classList.contains("glyphicon-plus-sign"));
    //     console.log(teamsLogo);
    //     if (showTeams[i].classList.contains("glyphicon-plus-sign")) {
    //       console.log(123);
    //       console.log(showTeams[i].classList, "www");
    //       closeOtherbuttons(i);
    //       showTeams[i].classList.remove("glyphicon-plus-sign");
    //       showTeams[i].classList.add("glyphicon-minus-sign");
    //       console.log(showTeams[i].classList, "ddwqq");
    //       for (let j = 0; j < json.data.length; j++) {
    //         const image = document.createElement("img");
    //         image.setAttribute(
    //           "src",
    //           `https://cdn.nba.com/logos/nba/${json.data[j]}/global/D/logo.svg`
    //         );
    //         image.setAttribute("class", "teamLogo");
    //         image.setAttribute("alt", `${i}`);
    //         teamsLogo[i].appendChild(image);
    //       }
    //     } else {
    //       console.log(showTeams[i].classList, "lplp");
    //       showTeams[i].classList.remove("glyphicon-minus-sign");
    //       showTeams[i].classList.add("glyphicon-plus-sign");
    //       for (let j = 0; j < json.data.length; j++) {
    //         const image = document.querySelector(".teamLogo");
    //         teamsLogo[i].removeChild(image);
    //         teamPlayers[i].innerHTML = "";
    //       }
    //     }
    //   });
    // }
  }
};

function closeOtherbuttons (index) {
  console.log("closeOtherbuttons");
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
    console.log(data);
    const teamPlayers = document.querySelectorAll(".players");
    const playerSet = new Set();

    document.addEventListener("click", function (event) {
      const targetElement = event.target;
      const playerName = document.querySelectorAll(".playerName");
      const playerId = event.path[1].childNodes[1].dataset.player;
      if (targetElement.classList.contains("reset") || targetElement.classList.contains("reset-mode")) {
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
                      <td class="name" data-player="${data.data.G[targetElement.src.slice(30, 40)][i].person_id}" alt="${parseInt(targetElement.alt)}" style="cursor: pointer">${data.data.G[targetElement.src.slice(30, 40)][i].player_first_name} ${data.data.G[targetElement.src.slice(30, 40)][i].player_last_name}</td>
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
                  <td class="name" data-player="${data.data.F[targetElement.src.slice(30, 40)][i].person_id}" alt="${parseInt(targetElement.alt)}" style="cursor: pointer">${data.data.F[targetElement.src.slice(30, 40)][i].player_first_name} ${data.data.F[targetElement.src.slice(30, 40)][i].player_last_name}</td>
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
                  <td class="name" data-player="${data.data.C[targetElement.src.slice(30, 40)][i].person_id}" alt="${parseInt(targetElement.alt)}" style="cursor: pointer">${data.data.C[targetElement.src.slice(30, 40)][i].player_first_name} ${data.data.C[targetElement.src.slice(30, 40)][i].player_last_name}</td>
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

fetch("/api/1.0/fantasy/total_score", {
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
    console.log(data);
    const score = document.querySelector(".score");
    score.innerHTML = Math.round(data.data);
  });

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
    console.log(data);
    const rank = document.querySelector(".rank");
    if (data.rank) {
      rank.innerHTML = data[0].rank;
    } else {
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
    console.log(data);
    const username = document.querySelector(".user");
    username.innerHTML = data.data.user;
  });
