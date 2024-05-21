// 폴리라인, 아웃라인(테두리), 대쉬(중간선), 도보라인 배열
let polylines = [];
let outlines = [];
let dashes = [];
let walkingPolyLines = [];

// 지도를 생성합니다
var modal_mapContainer = document.getElementById("modal_map"), // 지도를 표시할 div
    modal_mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 7, // 지도의 확대 레벨
    };
var modal_map = new kakao.maps.Map(modal_mapContainer, modal_mapOption);

// 중점 pin 이미지
var imageSrc = "./img/pin.png";
var imageSize = new kakao.maps.Size(30, 30);
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
var marker_for_middle = new kakao.maps.Marker({
    image: markerImage,
});


// 모달 바깥 클릭하면 모달 해제
window.addEventListener('click', (e) => {
    e.target.className == "modal" ? close_modal() : false
})

function close_modal() {
    document.getElementsByClassName("modal")[0].style.display = "none";

    for (const [key, value] of Object.entries(marker_dict)) {
        value["marker"].setMap(map);
    }
}

const draw_other_end = (e) =>{
    
    let target_subways = document.getElementsByClassName("target_subway")
    for (target_subway of target_subways){
        target_subway.disabled = false
        target_subway.classList.remove("choosed_subway")
    }

    let target = e.target
    if (e.target.tagName == "DIV"){
        target = e.target.parentNode
    }
    target.classList.add('choosed_subway')
    target.disabled = true;
    let tempLat = target.children[0].getAttribute("data-lat")
    let tempLng = target.children[0].getAttribute("data-lng")
    clear_poly_line(); // 초기화

    const new_marker = new kakao.maps.LatLng(tempLat, tempLng);
    marker_for_middle.setPosition(new_marker);
    
    
    cnt = 0;
    for (const [key, value] of Object.entries(marker_dict)) {
        searchPubTransPathAJAX(value["marker"].getPosition().getLng(), value["marker"].getPosition().getLat(), tempLng, tempLat, cnt);
        cnt++;
    }
    cnt = 0;
}
let target_subways = document.getElementsByClassName("target_subway")
target_subways[0].classList.add('choosed_subway')
target_subways[0].disabled = true;
for (target_subway of target_subways){
    target_subway.addEventListener('click',draw_other_end)
}


// 어디서봄 (중점계산 로직)
const cal_middle = () => {
    clear_poly_line(); // 초기화
    
    let tempLng = 0;
    let tempLat = 0;

    let temp_cnt = 0;

    for (const [key, value] of Object.entries(marker_dict)) {
        tempLng += value["marker"].getPosition().getLng() * (value["count"] * 1);
        tempLat += value["marker"].getPosition().getLat() * (value["count"] * 1);
        temp_cnt += value["count"] * 1;
    }

    if (temp_cnt > 0) {
        tempLat = tempLat / temp_cnt;
        tempLng = tempLng / temp_cnt;

    
        let data = get_subway_info(tempLat, tempLng);
        console.log(data);
 
        tempLat = data.latitude
        tempLng = data.longitude

        const new_marker = new kakao.maps.LatLng(tempLat, tempLng);
        
        marker_for_middle.setPosition(new_marker);
        modal_map.setCenter(new_marker); // 모달 맵에 중점 설정
        marker_for_middle.setMap(modal_map); //*modal_map으로 임시 변경*

        cnt = 0;
        for (const [key, value] of Object.entries(marker_dict)) {
            searchPubTransPathAJAX(value["marker"].getPosition().getLng(), value["marker"].getPosition().getLat(), tempLng, tempLat, cnt);
            cnt++;
        }
        cnt = 0;
        
        document.getElementsByClassName("modal")[0].style.display = "block";
        modal_map.relayout();
        modal_map.setCenter(new_marker);

        for (const [key, value] of Object.entries(marker_dict)) {
            value["marker"].setMap(modal_map);
        }


        
    } else {
        toast_alert("하나 이상의 출발지가 추가되어야 \n도착지를 설정 할 수 있습니다.", 1000);
    }
    
};

let find_btn = document.getElementById("find_btn");
find_btn.addEventListener("click", cal_middle);


const clear_poly_line = () => {
    for (const pp of polylines) {
        pp.setMap(null);
    }
    for (const oo of outlines) {
        oo.setMap(null);
    }
    for (const dd of dashes) {
        dd.setMap(null);
    }
    for (const ww of walkingPolyLines) {
        ww.setMap(null);
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
        async:false,
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
        async:false,
        type: "get",
        url: "http://127.0.0.1:9000/subway/3?latitude=" + latitude + "&longitude=" + longitude,

        success: function (data) {
            const subway_info = document.getElementById("subway_info");
            let target_subways = document.getElementsByClassName("target_subway")

            for (let i = 0; i <3; i++){
                console.log("================================")
                console.log(data[i].stationName)
                target_subways[i].innerHTML = `<div data-lat=${data[i].latitude} data-lng=${data[i].longitude}>${data[i].stationName}</div>`
            }

            subway_info.innerHTML = data[0];
            d = data[0]
        },
    });
    return d
}

