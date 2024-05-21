function showRanking(subwayRanking) {
    let rank = 0;
    setInterval(() => {
      rank = (rank + 1) % subwayRanking.length;
      $("#show-ranking").html(rank + 1 + ". " + subwayRanking[rank].name);
    }, 3000);
  }
  
  function getRanking() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9000/sharelog/subway",
  
      success: function (data) {
        console.log(data)
        $("#show-ranking").html("1." + data[0].name);
        showRanking(data);
      },
    });
  }
  
  getRanking();