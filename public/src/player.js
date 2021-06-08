/* eslint-disable no-undef */
const params = window.location.search;
const signIn = document.querySelector(".signin");
const signUp = document.querySelector(".signup");
const member = document.querySelector(".member");

if (localStorage.access_token) {
  signIn.style.display = "none";
  signUp.style.display = "none";
  member.style.display = "inline-block";
}

fetch(`/api/1.0/player/playerbio${params}`, {
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
    console.log(data[0]);
    const teamCity = document.querySelector(".header-teamcity");
    const teamName = document.querySelector(".header-teamname");
    const jerseyNumber = document.querySelector(".header-jersey_number");
    const position = document.querySelector(".header-position");
    const fisrtname = document.querySelector(".header-fisrtname");
    const lastname = document.querySelector(".header-lastname");
    const pts = document.querySelector(".pts");
    const reb = document.querySelector(".reb");
    const ast = document.querySelector(".ast");
    const profile = document.querySelector(".header-avatar");
    const teamLogo = document.querySelector(".header-avatar1");
    const height = document.querySelector(".height");
    const weight = document.querySelector(".weight");
    const country = document.querySelector(".country");
    const lastAttended = document.querySelector(".last_attended");
    const experience = document.querySelector(".experience");

    teamCity.innerHTML = data[0].team_city;
    teamName.innerHTML = data[0].team_name;
    jerseyNumber.innerHTML = data[0].jersey_number;
    position.innerHTML = data[0].position;
    fisrtname.innerHTML = data[0].player_first_name;
    lastname.innerHTML = data[0].player_last_name;
    pts.innerHTML = data[0].pts;
    reb.innerHTML = data[0].reb;
    ast.innerHTML = data[0].ast;
    profile.src = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${data[0].team_id}/2020/260x190/${data[0].person_id}.png`;
    teamLogo.src = `https://cdn.nba.com/logos/nba/${data[0].team_id}/global/D/logo.svg`;
    height.innerHTML = data[0].height;
    weight.innerHTML = data[0].weight;
    country.innerHTML = data[0].country;
    lastAttended.innerHTML = data[0].college;
    experience.innerHTML = data[0].to_year - data[0].from_year + 1;
  });

fetch(`/api/1.0/player/recent_games${params}`, {
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
    console.log(data[0]);

    const statGamedate = document.querySelectorAll(".stat-gamedate");
    const statMatchup = document.querySelectorAll(".stat-matchup");
    const statWinlose = document.querySelectorAll(".stat-winlose");
    const statMin = document.querySelectorAll(".stat-min");
    const statPts = document.querySelectorAll(".stat-pts");
    const statFgm = document.querySelectorAll(".stat-fgm");
    const statFga = document.querySelectorAll(".stat-fga");
    const statFg = document.querySelectorAll(".stat-fg");
    const stat3pm = document.querySelectorAll(".stat-3pm");
    const stat3pa = document.querySelectorAll(".stat-3pa");
    const stat3p = document.querySelectorAll(".stat-3p");
    const statFtm = document.querySelectorAll(".stat-ftm");
    const statFta = document.querySelectorAll(".stat-fta");
    const statFt = document.querySelectorAll(".stat-ft");
    const statOreb = document.querySelectorAll(".stat-oreb");
    const statDreb = document.querySelectorAll(".stat-dreb");
    const statReb = document.querySelectorAll(".stat-reb");
    const statAst = document.querySelectorAll(".stat-ast");
    const statStl = document.querySelectorAll(".stat-stl");
    const statBlk = document.querySelectorAll(".stat-blk");
    const statTov = document.querySelectorAll(".stat-tov");
    const statPf = document.querySelectorAll(".stat-pf");
    const statPlusminus = document.querySelectorAll(".stat-plusminus");

    for (let i = 0; i < data[0].length; i++) {
      statGamedate[i].innerHTML += data[0][i].game_date;
      statMatchup[i].innerHTML += data[0][i].matchup;
      statWinlose[i].innerHTML += data[0][i].winlose;
      statMin[i].innerHTML += data[0][i].min;
      statPts[i].innerHTML += data[0][i].pts;
      statFgm[i].innerHTML += data[0][i].fgm;
      statFga[i].innerHTML += data[0][i].fga;
      statFg[i].innerHTML += data[0][i].fg_pct;
      stat3pm[i].innerHTML += data[0][i].fg3m;
      stat3pa[i].innerHTML += data[0][i].fg3a;
      stat3p[i].innerHTML += data[0][i].fg3_pct;
      statFtm[i].innerHTML += data[0][i].ftm;
      statFta[i].innerHTML += data[0][i].fta;
      statFt[i].innerHTML += data[0][i].ft_pct;
      statOreb[i].innerHTML += data[0][i].oreb;
      statDreb[i].innerHTML += data[0][i].dreb;
      statReb[i].innerHTML += data[0][i].reb;
      statAst[i].innerHTML += data[0][i].ast;
      statStl[i].innerHTML += data[0][i].stl;
      statBlk[i].innerHTML += data[0][i].blk;
      statTov[i].innerHTML += data[0][i].tov;
      statPf[i].innerHTML += data[0][i].pf;
      statPlusminus[i].innerHTML += data[0][i].plus_minus;
    }
  });

signUp.addEventListener("click", function () {
  Swal.fire({
    title: "Sign Up",
    html: `<input type="text" id="signup" class="swal2-input" placeholder="Username">
      <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: "Sign Up",
    focusConfirm: false,
    preConfirm: () => {
      const signup = Swal.getPopup().querySelector("#signup").value;
      const password = Swal.getPopup().querySelector("#password").value;
      if (!signup || !password) {
        Swal.showValidationMessage("Please enter username and password");
      }
      return { name: signup, password: password };
    }
  }).then((result) => {
    fetch("/api/1.0/user/signup", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(result.value)
    })
      .then(function (response) {
        if (response.status === 200) {
          Swal.fire("Sign Up!".trim());
          return response.json();
        } else if (response.status === 403) {
          Swal.fire("此名稱已有人使用！".trim());
          return response.json();
        }
      }).then((data) => {
        if (!data.error) {
          window.localStorage.setItem("access_token", data.data.access_token);
          const confirm = document.querySelector(".swal2-confirm");
          confirm.addEventListener("click", function () {
            signIn.style.display = "none";
            signUp.style.display = "none";
            member.style.display = "inline-block";
          });
        } else {
          console.log(data);
        }
      });
  });
});

signIn.addEventListener("click", function () {
  Swal.fire({
    title: "Sign In",
    html: `<input type="text" id="signin" class="swal2-input" placeholder="Username">
    <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: "Sign In",
    focusConfirm: false,
    preConfirm: () => {
      const signin = Swal.getPopup().querySelector("#signin").value;
      const password = Swal.getPopup().querySelector("#password").value;
      if (!signin || !password) {
        Swal.showValidationMessage("Please enter username and password");
      }
      return { name: signin, password: password };
    }
  }).then((result) => {
    fetch("/api/1.0/user/signin", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(result.value)
    })
      .then(function (response) {
        if (response.status === 200) {
          Swal.fire("Sign In!".trim());
          return response.json();
        } else if (response.status === 403) {
          return response.json();
        }
      })
      .then((data) => {
        if (!data.error) {
          window.localStorage.setItem("access_token", data.data.access_token);
          const confirm = document.querySelector(".swal2-confirm");
          confirm.addEventListener("click", function () {
            signIn.style.display = "none";
            signUp.style.display = "none";
            member.style.display = "inline-block";
          });
        } else if (data.error === "Password is wrong") {
          Swal.fire("密碼有誤!".trim());
        } else {
          Swal.fire("請先註冊!".trim());
        }
      });
  });
});

member.addEventListener("click", function () {
  Swal.fire("確定要登出嗎？");
  const confirm = document.querySelector(".swal2-actions");
  confirm.addEventListener("click", function () {
    window.localStorage.clear();
    location.href = `/player.html${params}`;
  });
});

const fantasy = document.querySelector("#logo1");
fantasy.addEventListener("click", function () {
  if (window.localStorage.getItem("access_token")) {
    location.href = "/fantasy.html";
  } else {
    Swal.fire("請先登入!".trim());
  }
});

const search = document.querySelector("#bar");
const input = document.querySelector(".searchbar");

search.addEventListener("click", function () {
  fetch("/api/1.0/player/playername", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ name: input.value })
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
      if (data.length === 0) {
        Swal.fire(
          "No Players!",
          "No Players Matched your selected filters"
        );
      } else {
        location.href = `/player.html?playerid=${data[0].person_id}`;
      }
    });
});
