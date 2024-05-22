// 폴리라인, 아웃라인(테두리), 대쉬(중간선), 도보라인 배열
let polylines = [];
let outlines = [];
let dashes = [];
let walkingPolyLines = [];

let marker_click_on = false;

// 지도를 생성합니다
var modal_mapContainer = document.getElementById("modal_map"), // 지도를 표시할 div
    modal_mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 7, // 지도의 확대 레벨
    };
var modal_map = new kakao.maps.Map(modal_mapContainer, modal_mapOption);

// 중점 pin 이미지
var imageSrc = "./img/pin_red.png";
var imageSize = new kakao.maps.Size(23.33, 30);
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
var marker_for_middle = new kakao.maps.Marker({
    image: markerImage,
});

// 모달 바깥 클릭하면 모달 해제
window.addEventListener("click", (e) => {
    e.target.className == "modal" ? close_modal() : false;
});

function close_modal() {
    document.getElementsByClassName("modal")[0].style.display = "none";

    for (const [key, value] of Object.entries(marker_dict)) {
        value["marker"].setMap(map);
        value["marker"].setDraggable(true); 
        kakao.maps.event.removeListener(value["marker"], 'click', MarkerClickHandler);
        kakao.maps.event.removeListener(value["marker"], 'mouseover', MarkerMouseOverHandler);
        kakao.maps.event.removeListener(value["marker"], 'mouseout', MarkerMouseOutHandler);
    }
}

// 로딩 관련 함수
function LoadingWithMask(gif) {
    //화면의 높이와 너비를 구합니다.    
    var maskHeight = $(document).height()
    var maskWidth = window.document.body.clientWidth; 
    //화면에 출력할 마스크를 설정해줍니다.    
    var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
    var loadingImg = "";
    loadingImg += "<img src='" + gif + "' id='loadingImg' style='position: absolute; z-index:9001; width:100px; height:100px;'/>";
    //화면에 레이어 추가
    $("body").append(mask);
    $("#mask").css({ width: maskWidth, height: maskHeight, opacity: "0.1" });
    $("#mask").show();

    //로딩중 이미지 표시
    $("body").append(loadingImg);
    $("#loadingImg").css({ margin: "auto", left: "50%", top: "48%", transform: "translate(-50%, -50%)", opacity: "0.95" });
    $("#loadingImg").show();
}

function closeLoadingWithMask() {
    $('#mask, #loadingImg').remove();
}

function call_loading(img_path){
    LoadingWithMask(img_path);
    var loading_time = 500;
    loading_time += Object.keys(marker_dict).length*450;
    setTimeout(closeLoadingWithMask, loading_time);
    console.log(loading_time);
    toast_alert("\n\n\n\n\n경로를 탐색중이에요!", loading_time);
}

const draw_other_end = (e) => {
    // 경로 탐색 로딩창
    call_loading('./img/reload3.gif');

    for (target_subway of target_subways) {
        target_subway.disabled = false;
        target_subway.classList.remove("choosed_subway");
    }

    let target = e.target;
    if (e.target.tagName == "DIV") {
        target = e.target.parentNode;
    }
    target.classList.add("choosed_subway");
    target.disabled = true;
    let tempLat = target.children[0].getAttribute("data-lat");
    let tempLng = target.children[0].getAttribute("data-lng");
    clear_poly_line(); // 초기화

    const new_marker = new kakao.maps.LatLng(tempLat, tempLng);
    marker_for_middle.setPosition(new_marker);
    modal_map.setCenter(new_marker);
    
    let count_for_time = 0;
    cnt = 0;
    for (let [key, value] of Object.entries(marker_dict)) {
        marker_dict[key]["route"] = [];
        count_for_time++;
        setTimeout(function () {
            console.log(key);
            searchPubTransPathAJAX(value["marker"].getPosition().getLng(), value["marker"].getPosition().getLat(), tempLng, tempLat, cnt);
            cnt++;
        }, (count_for_time + 1) * 250);
    }
    cnt = 0;
};
let target_subways = document.getElementsByClassName("target_subway");
for (target_subway of target_subways) {
    target_subway.addEventListener("click", draw_other_end);
}

// 어디서봄 (중점계산 로직)
const cal_middle = () => {
    // 경로 탐색 로딩창
    
    call_loading("./img/reload3.gif");

    clear_poly_line(); // 초기화

    for (target_subway of target_subways) {
        target_subway.disabled = false;
        target_subway.classList.remove("choosed_subway");
    }

    target_subways[0].classList.add("choosed_subway");
    target_subways[0].disabled = true;

    let tempLng = 0;
    let tempLat = 0;

    let temp_cnt = 0;

    for (const [key, value] of Object.entries(marker_dict)) {
        marker_dict[key]["route"] = [];
        value["marker"].setDraggable(false); 
        tempLng += value["marker"].getPosition().getLng() * (value["count"] * 1);
        tempLat += value["marker"].getPosition().getLat() * (value["count"] * 1);
        temp_cnt += value["count"] * 1;
    }

    if (temp_cnt > 0) {
        tempLat = tempLat / temp_cnt;
        tempLng = tempLng / temp_cnt;

        let data = get_subway_info(tempLat, tempLng);
        console.log(data);

        tempLat = data.latitude;
        tempLng = data.longitude;

        const new_marker = new kakao.maps.LatLng(tempLat, tempLng);

        marker_for_middle.setPosition(new_marker);
        modal_map.setCenter(new_marker); // 모달 맵에 중점 설정
        marker_for_middle.setMap(modal_map); //*modal_map으로 임시 변경*

        cnt = 0;
        let count_for_time = 0;
        for (let [key, value] of Object.entries(marker_dict)) {
            count_for_time++;
            setTimeout(function () {
                const pos = key.split(',');
                searchPubTransPathAJAX(pos[1], pos[0], tempLng, tempLat, cnt);
                cnt++;
            }, (count_for_time + 1) * 250);
        }
        cnt = 0;

        document.getElementsByClassName("modal")[0].style.display = "block";
        modal_map.relayout();
        modal_map.setCenter(new_marker);

        for (const [key, value] of Object.entries(marker_dict)) {
            value["marker"].setMap(modal_map);
            kakao.maps.event.addListener(value["marker"], 'click', MarkerClickHandler);
            kakao.maps.event.addListener(value["marker"], 'mouseover', MarkerMouseOverHandler);
            kakao.maps.event.addListener(value["marker"], 'mouseout', MarkerMouseOutHandler);
        }
    } else {
        toast_alert("하나 이상의 출발지가 추가되어야 \n도착지를 설정 할 수 있습니다.", 2000);
    }
};

let find_btn = document.getElementById("find_btn");
find_btn.addEventListener("click", cal_middle);

const clear_poly_line = () => {
    for (const pps of polylines) {
        for(const pp of pps){
            pp.setMap(null);
        }
    }
    for (const oos of outlines) {
        for(const oo of oos){
            oo.setMap(null);
        }
    }
    for (const dds of dashes) {
        for(const dd of dds){
            dd.setMap(null);
        }
    }
    for (const wws of walkingPolyLines) {
        for(const ww of wws){
            ww.setMap(null);
        }
    }

    polylines = [];
    outlines = [];
    dashes = [];
    walkingPolyLines = [];
    cnt = 0;
};

function get_tarnsport_info(tempLat, tempLng) {
    // get_bus_info(tempLat, tempLng);
    get_subway_info(tempLat, tempLng);
}

function get_bus_info(latitude, longitude) {
    $.ajax({
        async: false,
        type: "get",
        url: "http://127.0.0.1:9000/bus?latitude=" + latitude + "&longitude=" + longitude,

        success: function (data) {
            const bus_info = document.getElementById("bus_info");
            bus_info.innerHTML = data;
        },
    });
}

function get_subway_info(latitude, longitude) {
    // console.log(latitude)
    // console.log(longitude)
    let d;
    $.ajax({
        async: false,
        type: "get",
        url: "http://127.0.0.1:9000/subway/3?latitude=" + latitude + "&longitude=" + longitude,

        success: function (data) {
            console.log(data);
            const subway_info = document.getElementById("subway_info");
            let target_subways = document.getElementsByClassName("target_subway");

            for (let i = 0; i < 3; i++) {
                console.log("================================");
                console.log(data[i].stationName);
                target_subways[
                    i
                ].innerHTML = `<div class=target_station data-lat=${data[i].latitude} data-lng=${data[i].longitude} data-id=${data[i].stationId}>${data[i].stationName}</div>`;
            }

            subway_info.innerHTML = data[0];
            d = data[0];
        },
    });
    return d;
}
