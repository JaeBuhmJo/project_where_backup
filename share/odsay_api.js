// ODsay API 키
var apiKey = config.ODSAY_API_KEY1;

// 인원 수

var start_x = "";
var start_y = "";


// ODSay API를 사용하여 대중교통 경로를 검색하는 함수
async function searchPubTransPathAJAX(sx, sy, ex, ey, cnt) {
  var xhr = new XMLHttpRequest();
  var url =
    "https://api.odsay.com/v1/api/searchPubTransPathT?SX=" + sx + "&SY=" + sy + "&EX=" + ex + "&EY=" + ey + "&apiKey=" + encodeURIComponent(apiKey);
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (JSON.parse(xhr.responseText).error == null){
        //카카오맵 폴리라인 호출
        if (JSON.parse(xhr.responseText)["result"]["path"][0].info.mapObj == undefined){
          toast_alert("죄송합니다. \n현재 수도권 밖은 서비스 불가입니다.",2000);
        }// 수도권 내 경로 확인
        else{
          // console.log(xhr.responseText); //API 정보 전체
          //console.log("첫번째 정거장: "+JSON.parse(xhr.responseText)["result"]["path"][0].subPath[1].startName); //출발지 첫 정거장
          start_x = JSON.parse(xhr.responseText)["result"]["path"][0].subPath[1].startX; // 첫번째 정거장 경도
          start_y = JSON.parse(xhr.responseText)["result"]["path"][0].subPath[1].startY; // 첫번째 정거장 위도
          //console.log("약속인원 수 : "+Object.keys(marker_dict).length);
          //console.log(JSON.parse(xhr.responseText)["result"]["path"][0].info.mapObj);
          callMapObjApiAJAX(sx,sy,ex,ey,JSON.parse(xhr.responseText)["result"]["path"][0].info.mapObj,cnt); // 수도권 내 경로면 경로 제공
        }
      }else{
        console.log(JSON.parse(xhr.responseText).error)
      }
    }
  };
}

// 경로 검색
// searchPubTransPathAJAX();

// ODSay API를 사용하여 상세 경로 정보를 불러오는 함수
async function callMapObjApiAJAX(sx,sy,ex,ey,mapObj,cnt) {
  var xhr = new XMLHttpRequest();
  var url = "https://api.odsay.com/v1/api/loadLane?mapObject=0:0@" + mapObj + "&apiKey=" + encodeURIComponent(apiKey);
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var resultJsonData = JSON.parse(xhr.responseText);
      // 출발지와 도착지에 마커를 표시하고, 경로를 PolyLine으로 그리기
      
      drawKakaoPolyLine(resultJsonData,cnt);
      
      drawWalkingPolyLine(resultJsonData.result.lane[0].section[0].graphPos[0].y,resultJsonData.result.lane[0].section[0].graphPos[0].x,sy,sx,cnt)
      let b = resultJsonData.result.lane.length
      let a = resultJsonData.result.lane[b-1].section[0].graphPos.length

      // console.log(resultJsonData.result.lane[b-1].section[0].graphPos[a-1])
      drawWalkingPolyLine(resultJsonData.result.lane[b-1].section[0].graphPos[a-1].y,resultJsonData.result.lane[b-1].section[0].graphPos[a-1].x,ey,ex,cnt)
      
      //cnt++;
      // 경로의 경계를 설정하여 지도의 범위를 조정
      if (resultJsonData.result.boundary) {
        var bounds = new kakao.maps.LatLngBounds(
          new kakao.maps.LatLng(resultJsonData.result.boundary.top, resultJsonData.result.boundary.left),
          new kakao.maps.LatLng(resultJsonData.result.boundary.bottom, resultJsonData.result.boundary.right)
        );
        // modal_map.setBounds(bounds);
      }
    }
  };
}

// 카카오맵 폴리라인 그리는 함수
function drawKakaoPolyLine(data,cnt) {
  // console.log(data)
  var lineArray;
  for (var i = 0; i < data.result.lane.length; i++) {
    for (var j = 0; j < data.result.lane[i].section.length; j++) {
      lineArray = null;
      lineArray = new Array();
      for (var k = 0; k < data.result.lane[i].section[j].graphPos.length; k++) {
        lineArray.push(new kakao.maps.LatLng(data.result.lane[i].section[j].graphPos[k].y, data.result.lane[i].section[j].graphPos[k].x));
      }
      // PolyLine 객체를 생성하여 경로를 그리기
      var polyline = new kakao.maps.Polyline({
        path: lineArray,
        strokeWeight: 10, // 폴리라인 굵기
        strokeOpacity: 1,
        strokeStyle: 'solid', // 선의 스타일
      });

      // PolyLine 객체를 생성하여 테두리 그리기
      let outline = new kakao.maps.Polyline({
        path: lineArray,
        strokeWeight: 13, // 선의 두께
        strokeColor: '#ffffff', // 선의 색깔
        strokeOpacity: 1, // 선의 불투명도
        strokeStyle: 'solid', // 선의 스타일
    });

      let dash = new kakao.maps.Polyline({
        path: lineArray,
        strokeWeight: 3, // 선의 두께
        strokeColor: '#ffffff', // 선의 색깔
        strokeOpacity: 1, // 선의 불투명도
        strokeStyle: 'dash', // 선의 스타일
    });

      // // 노선 타입에 따른 색상 설정
      // var lineType = data.result.lane[i].type;
      // //alert(lineType+"호선 입니다!!!!");
      // if (lineType == 1) {
      //   polyline.setOptions({ strokeColor: "#0052A4" }); //1호선: #0052A4
      // } else if (lineType == 2) {
      //   polyline.setOptions({ strokeColor: "#00A84D" }); //2호선: #00A84D
      // } else if (lineType == 3) {
      //   polyline.setOptions({ strokeColor: "#EF7C1C" }); //3호선: #EF7C1C
      // } else if (lineType == 4) {
      //   polyline.setOptions({ strokeColor: "#00A5DE" }); //4호선: #00A5DE
      // } else if (lineType == 5) {
      //   polyline.setOptions({ strokeColor: "#996CAC" }); //5호선: #996CAC
      // } else if (lineType == 6) {
      //   polyline.setOptions({ strokeColor: "#CD7C2F" }); //6호선: #CD7C2F
      // } else if (lineType == 7) {
      //   polyline.setOptions({ strokeColor: "#747F00" }); //7호선: #747F00
      // } else if (lineType == 8) {
      //   polyline.setOptions({ strokeColor: "#E6186C" }); //8호선: #E6186C
      // } else if (lineType == 9) {
      //   polyline.setOptions({ strokeColor: "#BDB092" }); //9호선: #BDB092
      // } else {
      //   //임시
      //   polyline.setOptions({ strokeColor: "#ff2c97" }); //기본값: 한국 철도 노선색 #cccccc
      // }

      // 인원 수 별 노선 색상 설정
      polyline.setOptions({ strokeColor: palette[cnt] });

      outline.setMap(modal_map);
      polyline.setMap(modal_map);
      dash.setMap(modal_map);

      animateOpacity(outline, polyline, dash);

      outlines.push(outline);
      polylines.push(polyline);
      dashes.push(dash);
    }
  }
}

function animateOpacity(outline, polyline, dash) {
  for (var op = 0; op <= 0.7; op += 0.01) {
    (function(op) {
      setTimeout(function() {
        outline.setOptions({ strokeOpacity: op });
        polyline.setOptions({ strokeOpacity: op });
        dash.setOptions({ strokeOpacity: op });
      }, op * 500); // 각 반복마다 100ms의 지연 시간 추가
    })(op);
  }
}

// 사용 예시




// 도보 폴리라인 그리기
function drawWalkingPolyLine(a,b,c,d,cnt) {
  var walkingLinePath = [
    new kakao.maps.LatLng(a,b),
    new kakao.maps.LatLng(c,d)
  ];
  
  var walkingPolyLine = new kakao.maps.Polyline({
    path: walkingLinePath, 
    strokeWeight: 9,
    strokeColor: palette[cnt],
    strokeOpacity: 0.8, 
    strokeStyle: 'dashed'
  });

  walkingPolyLine.setMap(modal_map);
  walkingPolyLines.push(walkingPolyLine);
}

// 인원별 색상
palette = ["#FFD700","#1E90FF","#00A84D","#F97600",
          "#FE718D","#8652A1","#000080","#F40404",
          "#0090D2","#FF00FF","#F5A200","#008000",
          "#98FB98","#808000","#77C4A3","#DC143C",
]
