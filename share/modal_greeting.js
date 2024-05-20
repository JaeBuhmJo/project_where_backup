function show_modal_greeting() {
  document.getElementsByClassName("modal_greeting")[0].style.display = "inline-block";
}
function close_modal_greeting() {
  document.getElementsByClassName("modal_greeting")[0].style.display = "none";
}

// 로고 클릭하면 모달 띄워주기
document.getElementById("logo").addEventListener("click", (e) => {
  e.preventDefault();
  show_modal_greeting();
});

// 모달 바깥 클릭하면 환영 모달 해제
window.addEventListener("click", (e) => {
  e.target.className == "modal_greeting" ? close_modal_greeting() : false;
});

// 쿠키 확인
const visitedCookie = getCookie("where_visited");
if (!visitedCookie) {
  // 쿠키가 존재하지 않는 경우
  set_visited_cookie();
  show_modal_greeting();
}

//오늘 이 사이트에 들어온 적이 없다면 쿠키 생성
function set_visited_cookie() {
  const cookieName = "where_visited";
  const cookieValue = "1";

  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // 24시간 * 60분 * 60초 * 1000밀리초

  // 쿠키 설정
  document.cookie = `${cookieName}=${cookieValue}; expires=${date.toUTCString()}; path=/`;
}

//쿠키를 확인해 오늘 이 사이트에 방문한 적이 있다면 환영 모달 해제
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
