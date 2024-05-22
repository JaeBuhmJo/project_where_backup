function MarkerClickHandler (){
    let key = this.getPosition().getLat() +"," + this.getPosition().getLng()
    console.log("클릭", key)
    console.log(marker_dict[key])
    // 마커에 오버레이가 나타나고
    closeOverlay()
    showOverlay(key)
    // 폴리라인이 강조된다 - 함수명 바꿔서 쓰시면 됩니다
    setPolyLineHighlight(key)
}
function MarkerMouseOverHandler (){
    let key = this.getPosition().getLat() +"," + this.getPosition().getLng()
    console.log("마우스 들어옴", key)
    console.log(marker_dict[key])
    // 마커 하이라이트
    setMarkerHighlight()
}
function MarkerMouseOutHandler (){
    let key = this.getPosition().getLat() +"," + this.getPosition().getLng()
    console.log("마우스 나감", key)
    console.log(marker_dict[key])
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
    console.log("closeOverlay called")
    overlay.setMap(null);
    // 오버레이가 닫힐 떄는 폴리라인도 꺼진다
    removePolyLineHighlights()
}

function setPolyLineHighlight(key){
    console.log(marker_dict[key]);
    for(var idx=0; idx<=3; idx++){
        // console.log("key::"+key);
        // console.log(marker_dict[key]["route"][idx]);
        // console.log("여기다:::"+marker_dict[key]["route"][idx][0][0].Ic[0]);
        
        for(const a of marker_dict[key]["route"][idx]){
            a.setOptions({ strokeColor: '#000000' });
        }
    }
    console.log("setPolyLineHighlight called")
}

function removePolyLineHighlights(){
    // 폴리라인을 이전 상태로 되돌리는 함수
    console.log("removePolyLineHighlights called")
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
document.getElementById("modal_map").addEventListener("click", (e) =>{
    console.log(e.target.tagName)
    if (e.target.tagName == "path" || e.target.tagName == "IMG"){ // 경로나 마커 클릭은 무시한다
        return``
    }
        // 마커의 오버레이가 지워지고, 폴리라인도 따라서 지워진다
        closeOverlay()
    }
)