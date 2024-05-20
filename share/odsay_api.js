// ODsay API 키 (계정: donms@naver.com)
var apiKey = "QBPNyD9aI+YA6aQYFBsZ0YNzCNLm2Mq33ZC8hQJLCJc";

// ODSay API를 사용하여 대중교통 경로를 검색하는 함수
async function searchPubTransPathAJAX(sx, sy, ex, ey) {
  var xhr = new XMLHttpRequest();
  var url =
    "https://api.odsay.com/v1/api/searchPubTransPathT?SX=" + sx + "&SY=" + sy + "&EX=" + ex + "&EY=" + ey + "&apiKey=" + encodeURIComponent(apiKey);
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (JSON.parse(xhr.responseText).error == null){
        //카카오맵 폴리라인 호출
        callMapObjApiAJAX(JSON.parse(xhr.responseText)["result"]["path"][0].info.mapObj);
      }else{
        console.log("error")
      }

      
    }
  };
}

// 경로 검색
// searchPubTransPathAJAX();

// ODSay API를 사용하여 상세 경로 정보를 불러오는 함수
async function callMapObjApiAJAX(mapObj) {
  var xhr = new XMLHttpRequest();
  var url = "https://api.odsay.com/v1/api/loadLane?mapObject=0:0@" + mapObj + "&apiKey=" + encodeURIComponent(apiKey);
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var resultJsonData = JSON.parse(xhr.responseText);
      // 출발지와 도착지에 마커를 표시하고, 경로를 PolyLine으로 그리기
      console.log(2);
      drawKakaoPolyLine(resultJsonData);
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
function drawKakaoPolyLine(data) {
  console.log(data)
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

      // 노선 타입에 따른 색상 설정
      var lineType = data.result.lane[i].type;
      //alert(lineType+"호선 입니다!!!!");
      if (lineType == 1) {
        polyline.setOptions({ strokeColor: "#0052A4" }); //1호선: #0052A4
      } else if (lineType == 2) {
        polyline.setOptions({ strokeColor: "#00A84D" }); //2호선: #00A84D
      } else if (lineType == 3) {
        polyline.setOptions({ strokeColor: "#EF7C1C" }); //3호선: #EF7C1C
      } else if (lineType == 4) {
        polyline.setOptions({ strokeColor: "#00A5DE" }); //4호선: #00A5DE
      } else if (lineType == 5) {
        polyline.setOptions({ strokeColor: "#996CAC" }); //5호선: #996CAC
      } else if (lineType == 6) {
        polyline.setOptions({ strokeColor: "#CD7C2F" }); //6호선: #CD7C2F
      } else if (lineType == 7) {
        polyline.setOptions({ strokeColor: "#747F00" }); //7호선: #747F00
      } else if (lineType == 8) {
        polyline.setOptions({ strokeColor: "#E6186C" }); //8호선: #E6186C
      } else if (lineType == 9) {
        polyline.setOptions({ strokeColor: "#BDB092" }); //9호선: #BDB092
      } else {
        //임시
        polyline.setOptions({ strokeColor: "#ff2c97" }); //기본값: 한국 철도 노선색 #cccccc
      }

      outline.setMap(modal_map);
      polyline.setMap(modal_map);
      dash.setMap(modal_map);

      outlines.push(outline);
      polylines.push(polyline);
      dashes.push(dash);
    }
  }
}