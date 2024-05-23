function MarkerClickHandler (){
    let key = this.getPosition().getLat() +"," + this.getPosition().getLng()
    // 마커에 오버레이가 나타나고
    closeOverlay()
    showOverlay(key)
    // 폴리라인이 강조된다 - 함수명 바꿔서 쓰시면 됩니다
    setPolyLineHighlight(key)
}
function MarkerMouseOverHandler (){
    let key = this.getPosition().getLat() +"," + this.getPosition().getLng()
    // 마커 하이라이트
    setMarkerHighlight(key)
}
function MarkerMouseOutHandler (){
    let key = this.getPosition().getLat() +"," + this.getPosition().getLng()
    // 마커 하이라이트 해제
    removeMarkerHighlight(key)
}

let overlay = new kakao.maps.CustomOverlay({
    content: null,
    map: modal_map,
    position: null
});

function showOverlay(key){
    let info = marker_dict[key]["info"]
    console.log(info)
    if (info==undefined){
        return
    }

    const json = JSON.stringify(marker_dict[key]["subPath"]);
    console.log("subPath;"+json);

    console.log("showOverlay called")

    let totalTime = getTime(info.totalTime)

    let content = 
    '<div class="wrap">' + 
    '    <div class="info">' + 
    '        <div class="title">' + 
    '            이동 정보 요약' + 
    '        </div>' + 
    '        <div class="   body">' + 
    '            <div class="desc">' + 
    '                <div class="ellipsis">'+info.firstStartStation + ' → '+info.lastEndStation+'</div><br>' + 
    '                <div class="jibun ellipsis">총 요금 : '+info.payment+'원</div>' + 
    '                <div>총 이동시간 : '+totalTime+'</div>' + 
    '            </div>' + 
    '        </div>' + 
    '    </div>' +    
    '</div>';
    overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: modal_map,
        position: marker_dict[key]["marker"].getPosition()
    });

    overlay.setMap(modal_map);
}

function getTime(time){
    if (time<60){
        return time+"분"
    }
    if (time%60>0){
        return parseInt(time/60) +"시간 "+ time%60 + "분"
    }
    return time/60 + "시간"
}

function closeOverlay() {
    overlay.setMap(null);
    removePolyLineHighlights()
}

function setPolyLineHighlight(clicked_man){
    for (const [key, value] of Object.entries(marker_dict)) {
        if (marker_dict[key]["route"]==""){
            console.log("루트가 잡히지 않은 사람은 스킵되었음:setPolyLineHighlight")
            continue
        }
        if (clicked_man != key){
            for(const a of marker_dict[key]["route"][1]){
                a.setOptions({ strokeColor: '#777777' });
            }
            for(const a of marker_dict[key]["route"][3]){
                a.setOptions({  strokeColor: '#777777'});
            }
        }
    }


    for(let idx = 0; idx<=3; idx++){
        if (marker_dict[clicked_man]["route"]==""){
            console.log("루트가 잡히지 않은 사람은 스킵되었음:그냥 포문")
            closeOverlay()
            continue
        }
        for(const a of marker_dict[clicked_man]["route"][idx]){
            a.setMap(null);
            a.setMap(modal_map);
        }
    }
}

function removePolyLineHighlights(){
    for (const [key, value] of Object.entries(marker_dict)) {
        console.log("에러 추정 위치" +marker_dict[key]["route"])
        if (marker_dict[key]["route"]==""){
            console.log("루트가 잡히지 않은 사람은 스킵되었음:removePolyLineHighlights")
            continue
        }
        for(const a of marker_dict[key]["route"][1]){
            a.setOptions({ strokeColor: marker_dict[key]["color"] });
        }
        for(const a of marker_dict[key]["route"][3]){
            a.setOptions({ strokeColor: marker_dict[key]["color"] });
        }
    }
}

function setMarkerHighlight(key){
    // 마커의 하이라이트를 설정하는 함수
    var imageSize = new kakao.maps.Size(28, 36);
    var markerImage = new kakao.maps.MarkerImage("./img/pin_mouseover.png", imageSize);
    marker_dict[key]['marker'].setImage(markerImage);
    console.log("마커 하이라이트 설정")
}

function removeMarkerHighlight(key){
    // 마커의 하이라이트를 제거하는 함수
    var imageSize = new kakao.maps.Size(23.33, 30);
    var markerImage = new kakao.maps.MarkerImage("./img/pin_green.png", imageSize);
    marker_dict[key]['marker'].setImage(markerImage);
    console.log("마커 하이라이트 해제")
}

// 경로, 마커가 아닌 모달맵을 클릭하면
document.getElementById("modal_map").addEventListener("pointerdown", (e) => {
let isDragging = false;

e.target.addEventListener("pointermove", () => {
    isDragging = true;
});

e.target.addEventListener("pointerup", () => {
    if (!isDragging) {
    // 드래그가 발생하지 않았다면 클릭 이벤트 처리
    closeOverlay()
    }
});
});
  