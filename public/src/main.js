if (!localStorage.access_token) {
  alert("請先登入");
  location.href = "/";
}

fetch("/api/1.0/fantasy/rank", {
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
    const table = document.querySelector("#ranking");

    for (let i = 0; i < data.length; i++) {
      const tr = document.createElement("tr");
      table.appendChild(tr);
      const td1 = document.createElement("td");
      td1.className = "rank";
      const td2 = document.createElement("td");
      td2.className = "name";
      const td3 = document.createElement("td");
      td3.className = "score";
      tr.appendChild(td1);
      td1.innerHTML = data[i].rank;
      tr.appendChild(td2);
      td2.innerHTML = data[i].name;
      tr.appendChild(td3);
      td3.innerHTML = data[i].total_score;
    }
  });

fetch("/api/1.0/fantasy/top_players", {
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
    const table = document.querySelector("#players-list");
    for (let i = 0; i < data.length; i++) {
      const tr = document.createElement("tr");
      table.appendChild(tr);
      const td1 = document.createElement("img");
      td1.className = "photo";
      const td2 = document.createElement("td");
      td2.className = "player";
      const td3 = document.createElement("td");
      td3.className = "pick";
      tr.appendChild(td1);
      td1.src = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${data[i][0].split("_")[2]}/2020/260x190/${data[i][0].split("_")[3]}.png`;
      tr.appendChild(td2);
      td2.innerHTML = data[i][0].split("_")[0] + " " + data[i][0].split("_")[1];
      tr.appendChild(td3);
      td3.innerHTML = data[i][1];
    }
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
