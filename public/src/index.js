/* eslint-disable no-undef */
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText).items[0].items;
    const name1 = document.querySelectorAll(".playerName1");
    const name2 = document.querySelectorAll(".playerName2");
    const name3 = document.querySelectorAll(".playerName3");
    const name4 = document.querySelectorAll(".playerName4");
    const name5 = document.querySelectorAll(".playerName5");
    const name6 = document.querySelectorAll(".playerName6");

    const team = document.querySelectorAll(".navbar-brand");
    const team2 = document.querySelectorAll(".team2");
    const team3 = document.querySelectorAll(".team3");
    const team4 = document.querySelectorAll(".team4");
    const team5 = document.querySelectorAll(".team5");
    const team6 = document.querySelectorAll(".team6");

    const stat1 = document.querySelectorAll(".stat1");
    const stat2 = document.querySelectorAll(".stat2");
    const stat3 = document.querySelectorAll(".stat3");
    const stat4 = document.querySelectorAll(".stat4");
    const stat5 = document.querySelectorAll(".stat5");
    const stat6 = document.querySelectorAll(".stat6");

    const image1 = document.querySelectorAll(".image1");
    const image2 = document.querySelectorAll(".image2");
    const image3 = document.querySelectorAll(".image3");
    const image4 = document.querySelectorAll(".image4");
    const image5 = document.querySelectorAll(".image5");
    const image6 = document.querySelectorAll(".image6");

    for (let i = 0; i < data[0].playerstats.length; i++) {
      const name = data[0].playerstats[i].PLAYER_NAME;
      const playerid = data[0].playerstats[i].PLAYER_ID;
      name1[i].innerHTML = name;
      name1[i].href = `player.html?playerid=${playerid}`;
      image1[i].src = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerid}.png`;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      const name = data[2].playerstats[i].PLAYER_NAME;
      const playerid = data[2].playerstats[i].PLAYER_ID;
      name2[i].innerHTML = name;
      name2[i].href = `player.html?playerid=${playerid}`;
      image2[i].src = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerid}.png`;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      const name = data[6].playerstats[i].PLAYER_NAME;
      const playerid = data[6].playerstats[i].PLAYER_ID;
      name3[i].innerHTML = name;
      name3[i].href = `player.html?playerid=${playerid}`;
      image3[i].src = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerid}.png`;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      const name = data[1].playerstats[i].PLAYER_NAME;
      const playerid = data[1].playerstats[i].PLAYER_ID;
      name4[i].innerHTML = name;
      name4[i].href = `player.html?playerid=${playerid}`;
      image4[i].src = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerid}.png`;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      const name = data[3].playerstats[i].PLAYER_NAME;
      const playerid = data[3].playerstats[i].PLAYER_ID;
      name5[i].innerHTML = name;
      name5[i].href = `player.html?playerid=${playerid}`;
      image5[i].src = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerid}.png`;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      const name = data[4].playerstats[i].PLAYER_NAME;
      const playerid = data[4].playerstats[i].PLAYER_ID;
      name6[i].innerHTML = name;
      name6[i].href = `player.html?playerid=${playerid}`;
      image6[i].src = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerid}.png`;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      team[i].innerHTML = data[0].playerstats[i].TEAM_ABBREVIATION;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      team2[i].innerHTML = data[2].playerstats[i].TEAM_ABBREVIATION;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      team3[i].innerHTML = data[6].playerstats[i].TEAM_ABBREVIATION;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      team4[i].innerHTML = data[1].playerstats[i].TEAM_ABBREVIATION;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      team5[i].innerHTML = data[3].playerstats[i].TEAM_ABBREVIATION;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      team6[i].innerHTML = data[4].playerstats[i].TEAM_ABBREVIATION;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      stat1[i].innerHTML = data[0].playerstats[i].PTS;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      stat2[i].innerHTML = data[2].playerstats[i].AST;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      stat3[i].innerHTML = data[6].playerstats[i].FG3M;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      stat4[i].innerHTML = data[1].playerstats[i].REB;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      stat5[i].innerHTML = data[3].playerstats[i].BLK;
    }
    for (let i = 0; i < data[0].playerstats.length; i++) {
      stat6[i].innerHTML = data[4].playerstats[i].STL;
    }
  }
};
xhr.open("get", "api/1.0/player/statsleader");
xhr.send();

const signIn = document.querySelector(".signin");
const signUp = document.querySelector(".signup");
const member = document.querySelector(".member");

if (localStorage.access_token) {
  signIn.style.display = "none";
  signUp.style.display = "none";
  member.style.display = "inline-block";
}

signUp.addEventListener("click", function () {
  Swal.fire({
    title: "Sign Up",
    html: `<input type="text" id="signup" class="swal2-input" placeholder="Username" maxlength="12">
    <input type="password" id="password" class="swal2-input" placeholder="Password" maxlength="20">`,
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
          Swal.fire("???????????????????????????".trim());
          return response.json();
        }
      }).then((data) => {
        if (!data.error) {
          window.localStorage.setItem("access_token", data.data.access_token);
          signIn.style.display = "none";
          signUp.style.display = "none";
          member.style.display = "inline-block";
        } else {
          console.log(data);
        }
      });
  });
});

signIn.addEventListener("click", function () {
  Swal.fire({
    title: "Sign In",
    html: `<input type="text" id="signin" class="swal2-input" placeholder="Username" maxlength="12">
    <input type="password" id="password" class="swal2-input" placeholder="Password" maxlength="20">`,
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
          signIn.style.display = "none";
          signUp.style.display = "none";
          member.style.display = "inline-block";
        } else if (data.error === "Password is wrong") {
          Swal.fire("????????????!".trim());
        } else {
          Swal.fire("????????????!".trim());
        }
      });
  });
});

member.addEventListener("click", function () {
  Swal.fire("?????????????????????");
  const confirm = document.querySelector(".swal2-actions");
  confirm.addEventListener("click", function () {
    window.localStorage.clear();
    location.href = "/";
  });
});

const fantasy = document.querySelector("#logo1");
fantasy.addEventListener("click", function () {
  if (window.localStorage.getItem("access_token")) {
    location.href = "/fantasy.html";
  } else {
    Swal.fire("????????????!".trim());
  }
});

const search = document.querySelector("#bar");
const input = document.querySelector(".searchbar");

$(".searchbar").on("keypress", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
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
          location.href = `/player.html?playerid=${data[0].player_id}`;
        }
      });
  }
});

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
        location.href = `/player.html?playerid=${data[0].player_id}`;
      }
    });
});
