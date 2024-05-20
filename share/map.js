// 마커를 담을 배열입니다
let marker_dict = {};
const addr = "";


var cnt = 0;

//도보 폴리라인을 위한 출발지 위경도 배열입니다.
var start = [];

// 지도를 생성합니다
var mapContainer = document.getElementById("map"),
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 7, // 지도의 확대 레벨
  };
var map = new kakao.maps.Map(mapContainer, mapOption);

// 주소로 좌표 반환 객체
var geocoder = new kakao.maps.services.Geocoder();


// 출발인원 조정 +
function addFun(e) {
  let temp_count = 0;
  for (const [key, value] of Object.entries(marker_dict)) {
    temp_count += value["count"] * 1;
  }

  if (temp_count >= 16) {
    toast_alert("최대 16명 까지 추가 할 수 있습니다.", 1000);
    return;
  }
  marker_dict[e.target.value]["count"] += 1;
  e.target.parentElement.querySelector(".count").innerHTML = e.target.parentElement.querySelector(".count").innerHTML * 1 + 1;
}

// 출발인원 조정 -
function minFun(e) {
  if (e.target.parentElement.querySelector(".count").innerHTML * 1 > 1) {
    marker_dict[e.target.value]["count"] -= 1;
    e.target.parentElement.querySelector(".count").innerHTML = e.target.parentElement.querySelector(".count").innerHTML * 1 - 1;
  }
}

// 출발인원 삭제
function delFun(e) {
  const key_for_del = e.target.value;
  e.target.parentElement.remove();
  marker_dict[key_for_del]["marker"].setMap(null);
  delete marker_dict[key_for_del];
  set_pos_guide();
}

// 지도 클릭 시 마커 생성
kakao.maps.event.addListener(map, "click", function (mouseEvent) {
  let temp_count = 0;
  for (const [key, value] of Object.entries(marker_dict)) {
    temp_count += value["count"] * 1;
  }
  if (temp_count >= 16) {
    toast_alert("최대 16명 까지 추가 할 수 있습니다.", 1000);
    return;
  }

  // 지도에 마커를 표시합니다
  var marker = new kakao.maps.Marker({});

  // 클릭한 위도, 경도 정보를 가져옵니다
  var latlng = mouseEvent.latLng;

  // 마커 위치를 클릭한 위치로 옮깁니다
  marker.setPosition(latlng);
  // console.log(latlng);
  // 도보 출발지 배열에 마커 위치를 추가합니다.
  start.push([latlng.getLat(),latlng.getLng()]);

  const key = latlng.getLat() + "," + latlng.getLng();
  if (key in marker_dict) {
    return;
  }

 

  // 선택창(start_pos_list) 등록
  const start_pos_list = document.getElementById("start_pos_list");
  getAddr(latlng.getLat(), latlng.getLng());
  let for_html = "";
  setTimeout(function () {
    if (window.location2 != ""){
      marker_dict[key] = {
        marker: marker,
        count: 1,
      };
      let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "start_pos");
    for_html += `
        <span class="pos_img"></span>   
        <span>${window.location2}</span>

        <span class="pnum_btn_group">
        <button type="button" class="plus_button" value ="${key}">+</button>
        <span class = "count">${marker_dict[key]["count"]}</span>
        <button type="button" class="minus_button" value ="${key}">-</button>
        </span>
        
        <button type="button" class="delete_button" value ="${key}"></button>
        `;

    newDiv.innerHTML += for_html;
    newDiv.querySelector(".plus_button").addEventListener("click", addFun);
    newDiv.querySelector(".minus_button").addEventListener("click", minFun);
    newDiv.querySelector(".delete_button").addEventListener("click", delFun);
    start_pos_list.appendChild(newDiv);
    // 지도에 마커 등록
    marker.setMap(map);
    set_pos_guide()
    }else{
      toast_alert("올바른 위치를 클릭해주세요.", 1000);
    }
    
  }, 80);

});

// locatation = 자연어 주소
let location2 = "";
function getAddr(lat, lng) {
  window.location2 = "";
  let geocoder = new kakao.maps.services.Geocoder();

  let coord = new kakao.maps.LatLng(lat, lng);
  let callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      window.location2 = result[0].address.address_name;
    }
  };
  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  return window.location2;
}

// 초기화
const clear_fun = () => {
  for (const [key, value] of Object.entries(marker_dict)) {
    value["marker"].setMap(null);  
  }
  // 선택창 초기화
  clear_start_pos_list();
  marker_for_middle.setMap(null);
  marker_dict = {};
  set_pos_guide()
};

const clear_start_pos_list = () => {
  const start_pos_list = document.getElementById("start_pos_list");
  start_pos_list.innerHTML = "";
};

// 초기화 클릭 이벤트
const clear = document.getElementById("init_btn");
clear.addEventListener("click", clear_fun);


// 출발지 리스트 초기 가이드(지도에서 출발지를 선택해보세요!)
function set_pos_guide(){

  const start_guide = document.getElementById("default_start_guide");
  if(Object.keys(marker_dict).length === 0){
      start_guide.style.display = "block";
  }else{
      start_guide.style.display = "none";
  }
}
