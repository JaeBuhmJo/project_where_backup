document.getElementById("share_btn").addEventListener("click", (e) => {
  // 여기에서 url 단축 요청해서 shortenUrl 생성
  let url = "http://127.0.0.1:5500/index.html?";
  // marker_dict를 url의 get방식으로 포함
  for (const [key, value] of Object.entries(marker_dict)) {
    url += key.split(",")[0] + "&" + key.split(",")[1] + "&" + value["count"] + "|";
    // url += "lng=" + key.split(",")[0];
    // url += "&lat=" + key.split(",")[1];
    // url += "&count=" + value["count"] + "&";
  }
  url = url.substring(0, url.length - 1);

  saveShareLog(url);


  // db에 공유 로그 기록하기
});

// marker_dict를 포함한 url을 클립보드에 복사시키기
function setUrltoClipboard(shortenedUrl) {
  navigator.clipboard
    .writeText(shortenedUrl)
    .then(() => {
      console.log("클립보드에 공유링크가 복사되었습니다");
    })
    .catch((err) => {
      console.log("클립보드 복사 실패" + err);
    });
}

function saveShareLog(url) {
  // 현재 1순위 지하철역의 정보를 가져오기
  let shareLog = {};
  shareLog["stationId"] = document.querySelector(".target_subway div").dataset.id;
  shareLog["stationName"] = document.getElementsByClassName("target_subway")[0].innerText;
  shareLog["url"] = url
  $.ajax({
    type: "post",
    url: "http://127.0.0.1:9000/sharelog",
    data: shareLog,

    success: function (response) {
      if (response === "false") {
        console.log("로그 기록 실패");
      } else {
        console.log("로그 기록 성공");
        console.log("uuid" + response)
        let shortenedUrl ="http://127.0.0.1:5500/index.html?uuid="+ response;
        console.log("단축url : "+shortenedUrl)
        setUrltoClipboard(shortenedUrl);
      }
    },
  });
}
