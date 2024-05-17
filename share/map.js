// 마커를 담을 배열입니다
let marker_dict = {};
let polylines = [];
const addr = ""

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 7 // 지도의 확대 레벨
    };  

var modal_mapContainer = document.getElementById('modal_map'), // 지도를 표시할 div 
modal_mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};  

// 지도를 생성합니다    
var modal_map = new kakao.maps.Map(modal_mapContainer, modal_mapOption); 
var map = new kakao.maps.Map(mapContainer, mapOption); 


var geocoder = new kakao.maps.services.Geocoder();
let find_place = (Lng,Lat)=>{

    alert(geocoder.coord2RegionCode(Lng,Lat));         
}

var imageSrc = './img/pin.png'
var imageSize = new kakao.maps.Size(30 , 30)
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
var marker_for_middle = new kakao.maps.Marker({
        image: markerImage
    });

// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
function addFun(e){
    let temp_count = 0;

    for (const [key, value] of Object.entries(marker_dict)) {
        temp_count += value["count"]*1;
    }

    if (temp_count >=16){
        alert("최대 16명 까지 추가 할 수 있습니다.")
        return
    }
    marker_dict[e.target.value]['count'] +=1;
    e.target.parentElement.querySelector(".count").innerHTML = (e.target.parentElement.querySelector(".count").innerHTML)*1+1;
}

function minFun(e){
    if(e.target.parentElement.querySelector(".count").innerHTML*1 > 1){
        marker_dict[e.target.value]['count'] -=1;
        e.target.parentElement.querySelector(".count").innerHTML = (e.target.parentElement.querySelector(".count").innerHTML)*1-1;
    }
}

function delFun(e){
    const key_for_del = e.target.value;
    e.target.parentElement.remove();
    marker_dict[key_for_del]["marker"].setMap(null);
    
    delete marker_dict[key_for_del]

}

kakao.maps.event.addListener(map, 'click', function(mouseEvent) { 
    let temp_count = 0;

    for (const [key, value] of Object.entries(marker_dict)) {
        temp_count += value["count"]*1;
    }

    if (temp_count >=16){
        alert("최대 16명 까지 추가 할 수 있습니다.")
        return
    }

    var marker = new kakao.maps.Marker({}); 
// 지도에 마커를 표시합니다
    
    // 클릭한 위도, 경도 정보를 가져옵니다 
    var latlng = mouseEvent.latLng; 
    
    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);

    const key = latlng.getLat() + "," + latlng.getLng();
    if (key in marker_dict){return }

    marker_dict[key] = {
        "marker" : marker,
        "count" : 1
    };


    const start_pos_list = document.getElementById("start_pos_list");
    getAddr(latlng.getLat(), latlng.getLng());
    let for_html = ""
    setTimeout(function(){
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class','start_pos')
        for_html += `
        <span>${window.location2}</span>
        <button type="button" class="plus_button" value ="${key}">+</button>
        <button type="button" class="minus_button" value ="${key}">-</button>
        <button type="button" class="delete_button" value ="${key}">Delete</button>
        <span class = "count">${marker_dict[key]["count"]}</span>
        ` 

        newDiv.innerHTML += for_html;
        newDiv.querySelector(".plus_button").addEventListener("click",addFun);
        newDiv.querySelector(".minus_button").addEventListener("click",minFun);
        newDiv.querySelector(".delete_button").addEventListener("click",delFun);
        start_pos_list.appendChild(newDiv);
        
    },80);
    
    marker.setMap(map);
});

let location2 = "";
function getAddr(lat,lng){
    
    let geocoder = new kakao.maps.services.Geocoder();

    let coord = new kakao.maps.LatLng(lat, lng);
    let callback = function(result, status) {

        if (status === kakao.maps.services.Status.OK) {
            window.location2 = result[0].address.address_name; 
        }
    }
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    return window.location2;
    
    
}

const cal_middle = () =>{
    clear_poly_line();

    let tempLng = 0
    let tempLat = 0

    let temp_cnt = 0;

    for (const [key, value] of Object.entries(marker_dict)) {
        tempLng += value["marker"].getPosition().getLng()*(value["count"]*1);
        tempLat += value["marker"].getPosition().getLat()*(value["count"]*1);
        temp_cnt += value["count"]*1
      }

    
    if(temp_cnt>0){
        tempLat = tempLat / temp_cnt
        tempLng = tempLng / temp_cnt


        const new_marker = new kakao.maps.LatLng(tempLat,tempLng)

        marker_for_middle.setPosition(new_marker);

        marker_for_middle.setMap(map);

        getAddr(tempLat,tempLng);
        
        for (const [key, value] of Object.entries(marker_dict)) {   
            searchPubTransPathAJAX(value["marker"].getPosition().getLng(),value["marker"].getPosition().getLat(),tempLng,tempLat)
          }

        document.getElementsByClassName("modal")[0].style.display="block";
        get_tarnsport_info(tempLat,tempLng)
        
    }else{
        alert("하나 이상의 출발지가 추가되어야 도착지를 설정 할 수 있습니다.")
    }
}   

let button = document.getElementById("find_btn")
button.addEventListener("click",cal_middle)

const clear_fun = () =>{

    for (const [key, value] of Object.entries(marker_dict)) {
        value["marker"].setMap(null);
      }
    
    clear_poly_line();   
    clear_start_pos_list();
    marker_for_middle.setMap(null);
    marker_dict = {};
}

const clear_start_pos_list = () =>{
    const start_pos_list = document.getElementById("start_pos_list");
    start_pos_list.innerHTML = "";
}

const clear_poly_line = () =>{
    for (const pp of polylines) {
        pp.setMap(null);
      }
    
    polylines = [];

}

const clear = document.getElementById("init_btn");
clear.addEventListener("click",clear_fun)


// ODsay API 키 (계정: donms@naver.com)
var apiKey = "PAImzpmogolDr+rikgukMDjV7ifP/FBapmXxnZw+n2o";

// ODSay API를 사용하여 대중교통 경로를 검색하는 함수
async function searchPubTransPathAJAX(sx,sy,ex,ey) {
    var xhr = new XMLHttpRequest();
    var url = "https://api.odsay.com/v1/api/searchPubTransPathT?SX="+sx+"&SY="+sy+"&EX="+ex+"&EY="+ey+"&apiKey="+encodeURIComponent(apiKey);
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));
        console.log(xhr.responseText);
        console.log(url); 

        // // Test 코드
        // alert(xhr.responseText);
        // alert(url);

        //카카오맵 폴리라인 호출
        callMapObjApiAJAX((JSON.parse(xhr.responseText))["result"]["path"][0].info.mapObj);
        }
    }
    
}

// 경로 검색
searchPubTransPathAJAX();

var cnt = 1;

// ODSay API를 사용하여 상세 경로 정보를 불러오는 함수
async function callMapObjApiAJAX(mapObj) {
    var xhr = new XMLHttpRequest();
    var url = "https://api.odsay.com/v1/api/loadLane?mapObject=0:0@"+mapObj+"&apiKey="+encodeURIComponent(apiKey);
    xhr.open("GET", url, true);
    xhr.send();
    // alert(mapObj);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resultJsonData = JSON.parse(xhr.responseText);
            // 출발지와 도착지에 마커를 표시하고, 경로를 PolyLine으로 그리기
            
            
            alert(cnt+"번째 경로를 불러옵니다...");
            cnt++;

            // drawKakaoMarker(sx,sy);
            // drawKakaoMarker(ex,ey);
            drawKakaoPolyLine(resultJsonData);
            // 경로의 경계를 설정하여 지도의 범위를 조정
            if(resultJsonData.result.boundary){
                var bounds = new kakao.maps.LatLngBounds(
                    new kakao.maps.LatLng(resultJsonData.result.boundary.top, resultJsonData.result.boundary.left),
                    new kakao.maps.LatLng(resultJsonData.result.boundary.bottom, resultJsonData.result.boundary.right)
                );
                map.setBounds(bounds);
            }
        }
    }
}

// 카카오맵 마커 그리는 함수
function drawKakaoMarker(x,y){
    var markerPosition  = new kakao.maps.LatLng(y, x);
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);
}

 // 카카오맵 폴리라인 그리는 함수
function drawKakaoPolyLine(data){
    var lineArray;
    for(var i = 0 ; i < data.result.lane.length; i++){
        for(var j=0 ; j <data.result.lane[i].section.length; j++){
            lineArray = null;
            lineArray = new Array();
            for(var k=0 ; k < data.result.lane[i].section[j].graphPos.length; k++){
                lineArray.push(new kakao.maps.LatLng(data.result.lane[i].section[j].graphPos[k].y, data.result.lane[i].section[j].graphPos[k].x));
            }
            // PolyLine 객체를 생성하여 경로를 그리기
            var polyline = new kakao.maps.Polyline({
                path: lineArray,
                strokeWeight: 10 // 폴리라인 굵기
            });
            
            // 노선 타입에 따른 색상 설정
            var lineType = data.result.lane[i].type;
            //alert(lineType+"호선 입니다!!!!");
            if(lineType == 1){
                polyline.setOptions({strokeColor: '#0052A4'}); //1호선: #0052A4
            
            } else if(lineType == 2){
                polyline.setOptions({strokeColor: '#00A84D'}); //2호선: #00A84D
            
            } else if(lineType == 3){
                polyline.setOptions({strokeColor: '#EF7C1C'}); //3호선: #EF7C1C
                
            } else if(lineType == 4){
                polyline.setOptions({strokeColor: '#00A5DE'}); //4호선: #00A5DE
            
            } else if(lineType == 5){
                polyline.setOptions({strokeColor: '#996CAC'}); //5호선: #996CAC
            
            } else if(lineType == 6){
                polyline.setOptions({strokeColor: '#CD7C2F'}); //6호선: #CD7C2F
            
            } else if(lineType == 7){
                polyline.setOptions({strokeColor: '#747F00'}); //7호선: #747F00
            
            } else if(lineType == 8){
                polyline.setOptions({strokeColor: '#E6186C'}); //8호선: #E6186C
            
            } else if(lineType == 9){
                polyline.setOptions({strokeColor: '#BDB092'}); //9호선: #BDB092
            
            } else{ //임시
                polyline.setOptions({strokeColor: '#ff2c97'}); //기본값: 한국 철도 노선색 #cccccc
            }
            polyline.setMap(map);
            polylines.push(polyline);
        }
    }
}


function get_tarnsport_info(tempLat,tempLng){
    get_bus_info(tempLat,tempLng)
    get_subway_info(tempLat,tempLng)
}

function get_bus_info(latitude,longitude){
    $.ajax({
        type:'get',
        url:'/bus?latitude='+latitude+'&longitude='+longitude,
        
        success:function(data){
            const bus_info = document.getElementById('bus_info');
            bus_info.innerHTML = data;
        }
    })
    
}

function get_subway_info(latitude,longitude){

    $.ajax({
        type:'get',
        url:'/subway?latitude='+latitude+'&longitude='+longitude,
        
        success:function(data){
            const subway_info = document.getElementById('subway_info');
            subway_info.innerHTML = data;
        }
    })
}
