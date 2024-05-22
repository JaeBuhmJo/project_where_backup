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
    setMarkerHighlight()
}
function MarkerMouseOutHandler (){
    let key = this.getPosition().getLat() +"," + this.getPosition().getLng()
    // 마커 하이라이트 해제
    removeMarkerHighlight()
}

let overlay = new kakao.maps.CustomOverlay({
    content: null,
    map: modal_map,
    position: null
});

function showOverlay(key){
    let info = marker_dict[key]["info"]
    console.log(info)
    console.log("showOverlay called")

    let totalTime = getTime(info.totalTime)

    let content = 
    '<div class="wrap">' + 
    '    <div class="info">' + 
    '        <div class="title">' + 
    '            이동 정보 요약' + 
    '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
    '        </div>' + 
    '        <div class="body">' + 
    '            <div class="desc">' + 
    '                <div class="ellipsis">'+info.firstStartStation + ' -> '+info.lastEndStation+'</div>' + 
    '                <div class="jibun ellipsis">총 요금 : '+info.payment+'원</div>' + 
    '                <div>총 이동시간 '+totalTime+'</div>' + 
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
        if (clicked_man != key){
            for(const a of marker_dict[key]["route"][1]){
                a.setOptions({ strokeColor: '#777777' });
            }
            for(const a of marker_dict[key]["route"][3]){
                a.setOptions({  strokeColor: '#777777'});
            }
        }
    }
}

function removePolyLineHighlights(){
    for (const [key, value] of Object.entries(marker_dict)) {
        for(const a of marker_dict[key]["route"][1]){
            a.setOptions({ strokeColor: marker_dict[key]["color"] });
        }
        for(const a of marker_dict[key]["route"][3]){
            a.setOptions({ strokeColor: marker_dict[key]["color"] });
        }
    }
}

function setMarkerHighlight(){
    // 마커의 하이라이트를 설정하는 함수
    console.log("마커 하이라이트 설정")
}

function removeMarkerHighlight(){
    // 마커의 하이라이트를 제거하는 함수
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
  