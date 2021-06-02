const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const today = new Date().toLocaleDateString();
    console.log(today);
    const newToday = today.split("/");
    const todayDate = [newToday[1], newToday[2], newToday[0]].join("/");
    console.log(todayDate);
    const datas = JSON.parse(xhr.responseText).leagueSchedule.gameDates;
    console.log(datas);
    const fantasyDate = datas.filter(function (data) {
      return data.gameDate.includes(todayDate);
    });
    console.log(fantasyDate);
    const teamsId = [];
    for (let i = 0; i < fantasyDate[0].games.length; i++) {
      teamsId.push(fantasyDate[0].games[i].homeTeam.teamId);
      teamsId.push(fantasyDate[0].games[i].awayTeam.teamId);
    }
    console.log(teamsId); // 6

    const showTeams = document.querySelectorAll(".glyphicon-plus-sign"); // 5
    const teamsLogo = document.querySelectorAll(".teams"); // 5
    const teamPlayers = document.querySelectorAll(".players"); // 5

    for (let i = 0; i < showTeams.length; i++) {
      showTeams[i].addEventListener("click", function (event) {
        // console.log(event.path);
        if (showTeams[i].classList.contains("glyphicon-plus-sign")) {
          closeOtherbuttons(i);
          showTeams[i].classList.remove("glyphicon-plus-sign");
          showTeams[i].classList.add("glyphicon-minus-sign");

          for (let j = 0; j < teamsId.length; j++) {
            const image = document.createElement("img");
            image.setAttribute(
              "src",
              `https://cdn.nba.com/logos/nba/${teamsId[j]}/global/D/logo.svg`
            );
            image.setAttribute("class", "teamLogo");
            image.setAttribute("alt", `${i}`);
            teamsLogo[i].appendChild(image);
          }
        } else {
          showTeams[i].classList.remove("glyphicon-minus-sign");
          showTeams[i].classList.add("glyphicon-plus-sign");
          for (let j = 0; j < teamsId.length; j++) {
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

fetch("/api/1.0/fantasy/allplayerstats", {
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
      // console.log(targetElement.alt);
      if (targetElement.classList.contains("name")) {
        if (playerName[parseInt(targetElement.getAttribute("alt"))].innerHTML !== "") {
          playerSet.delete(playerName[parseInt(targetElement.getAttribute("alt"))].innerHTML);
        }
        if (!playerSet.has(event.path[1].childNodes[1].innerText)) {
          closeOtherbuttons();
          playerName[parseInt(targetElement.getAttribute("alt"))].innerHTML = event.path[1].childNodes[1].innerText;
          playerName[parseInt(targetElement.getAttribute("alt"))].style.display = "inline-block";
          console.log(playerSet);
          playerSet.add(event.path[1].childNodes[1].innerText);
        } else {
          // eslint-disable-next-line no-undef
          Swal.fire(
            "此球員已被選取！"
          );
        }
      }
      selectedPlayers = playerSet;
      if (targetElement.classList.contains("reset")) {
        playerSet.clear();
        for (let i = 0; i < playerName.length; i++) {
          playerName[i].innerHTML = "";
        }
      }

      if (targetElement.classList.contains("submit")) {
        console.log(playerSet.size);
        if (playerSet.size < 5) {
          // eslint-disable-next-line no-undef
          Swal.fire(
            "請確認您是否選了5位球員。"
          );
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
                      <td class="name" alt="${parseInt(targetElement.alt)}" style="cursor: pointer">${data.data.G[targetElement.src.slice(30, 40)][i].player_first_name} ${data.data.G[targetElement.src.slice(30, 40)][i].player_last_name}</td>
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
                  <td class="name" alt="${parseInt(targetElement.alt)}" style="cursor: pointer">${data.data.F[targetElement.src.slice(30, 40)][i].player_first_name} ${data.data.F[targetElement.src.slice(30, 40)][i].player_last_name}</td>
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
                  <td class="name" alt="${parseInt(targetElement.alt)}" style="cursor: pointer">${data.data.C[targetElement.src.slice(30, 40)][i].player_first_name} ${data.data.C[targetElement.src.slice(30, 40)][i].player_last_name}</td>
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
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(playersObj)
      });
      console.log(response);
      const json = await response.json();
      console.log(json);
      return json;
    };
    getselectedPlayers();
  } else {
    console.log("err");
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
  });
