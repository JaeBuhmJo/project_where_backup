document.getElementById("share_btn").addEventListener("click", (e) => {
  setUrltoClipboard(marker_dict);
  // db에 공유 로그 기록하기
  saveShareLog();
});

// marker_dict를 포함한 url을 클립보드에 복사시키기
function setUrltoClipboard(marker_dict) {
  let url = "http://127.0.0.1:5500/index.html?";
  // marker_dict를 url의 get방식으로 포함
  for (const [key, value] of Object.entries(marker_dict)) {
    url += key.split(",")[0] + "&" + key.split(",")[1] + "&" + value["count"] + "|";
    // url += "lng=" + key.split(",")[0];
    // url += "&lat=" + key.split(",")[1];
    // url += "&count=" + value["count"] + "&";
  }
  url = url.substring(0, url.length - 1);

  navigator.clipboard
    .writeText(url)
    .then(() => {
      console.log("클립보드에 공유링크가 복사되었습니다");
    })
    .catch((err) => {
      console.log("클립보드 복사 실패");
    });
}

function saveShareLog() {
  // 현재 1순위 지하철역의 정보를 가져오기
  let shareLog = {};
  shareLog["stationId"] = document.querySelector(".target_subway div").dataset.id;
  shareLog["stationName"] = document.getElementsByClassName("target_subway")[0].innerText;
  $.ajax({
    type: "post",
    url: "http://127.0.0.1:9000/sharelog",
    data: shareLog,

    success: function (response) {
      if (response === "로그 기록 성공") {
        console.log("로그 기록 성공");
      } else {
        console.log("로그 기록 실패");
      }
    },
  });
}
