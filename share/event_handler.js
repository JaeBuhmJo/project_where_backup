// 마커에 마우스를 올리면
// kakao.maps.event.addListener(marker, 'mouseover', function() {
    // console.log("마커 마우스 오버")
    // 마커가 하이라이트 된다
// });

function MarkerClickHandler (){
    console.log("클릭")
    // 마커에 오버레이가 나타나고
    showOverlay()
    // 폴리라인이 강조된다 - 함수명 바꿔서 쓰시면 됩니다
    setPolyLineHighlight()
}
function MarkerMouseOverHandler (){
    console.log("마우스 들어옴")
    // 마커 하이라이트
    setMarkerHighlight()
}
function MarkerMouseOutHandler (){
    console.log("마우스 나감")
    // 마커 하이라이트 해제
    removeMarkerHighlight()
}

function showOverlay(){
    console.log("showOverlay called")
}

function closeOverlay() {
    console.log("closeOverlay called")
}

function setPolyLineHighlight(){
    // 폴리라인을 하이라이트 하는 함수
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
        // 마커의 오버레이가 지워지고
        closeOverlay()
        // 폴리라인이 이전으로 돌아간다 - 함수명 바꿔서 쓰시면 됩니다
        removePolyLineHighlights()
    }
)