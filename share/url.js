function getAddr_for_url(lat, lng) {
  return new Promise((resolve, reject) => {
    let geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(lat, lng);

    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let addr = result[0].address.address_name;
        resolve(addr);
      } else {
        reject(new Error("Failed to get address"));
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  });
}

function ajax_for_url(key) {
  return new Promise((resolve, reject) => {
    $.ajax({
      async: true,
      type: "get",
      url: "http://127.0.0.1:9000/sharelog/" + key,

      success: function (data) {
        resolve(data);
      },
    });
  });
}

if (window.location.href != "http://127.0.0.1:5500/index.html") {
  let info = window.location.href;
  key = info.replace("http://127.0.0.1:5500/index.html?uuid=", "");

  const temp_fun = async (for_marker) => {
    console.log("forMarker");
    console.log(for_marker);
    for (infos of for_marker) {
      let temp_info = infos.split("&");

      let key = temp_info[0] + "," + temp_info[1];

      getAddr_for_url(temp_info[0], temp_info[1]).then((addr) => {
        // 지도에 마커를 표시합니다
        var imageSrc = "./img/pin_green.png";
        var imageSize = new kakao.maps.Size(23.33, 30);
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        var marker = new kakao.maps.Marker({
          image: markerImage,
        });

        marker.setDraggable(true);
        kakao.maps.event.addListener(marker, "dragstart", function () {
          // 출발 마커의 드래그가 시작될 때 마커 이미지를 변경합니다
          window.key_for_change = marker.getPosition().getLat() + "," + marker.getPosition().getLng()
          console.log(window.key_for_change)
        });

        kakao.maps.event.addListener(marker, "dragend", function () {
          setTimeout(function () {}, 70);
          const temp_count = marker_dict[window.key_for_change]["count"];

          delete marker_dict[window.key_for_change];

          const key = marker.getPosition().getLat() + "," + marker.getPosition().getLng()

          marker_dict[key] = {
            marker: marker,
            count: temp_count,
          };
          let temp_start_pos = document.getElementById(window.key_for_change);
          temp_start_pos.setAttribute("id", key);

          let temp_plus_button = temp_start_pos.querySelector(".plus_button");
          let temp_min_button = temp_start_pos.querySelector(".minus_button");
          let temp_delete_button = temp_start_pos.querySelector(".delete_button");

          temp_plus_button.setAttribute("value", key);
          temp_min_button.setAttribute("value", key);
          temp_delete_button.setAttribute("value", key);
          window.location2 = "";
          getAddr(marker.getPosition().getLat(), marker.getPosition().getLng());

          setTimeout(function () {
            if (window.location2 != "") {
              let loc = temp_start_pos.querySelector(".loc");
              loc.innerHTML = window.location2;
            }
          }, 200);
        });

        var latlng = new kakao.maps.LatLng(temp_info[0], temp_info[1]);
        marker.setPosition(latlng);

        let for_html = "";
        setTimeout(function () {
          if (addr != "") {
            marker_dict[key] = {
              marker: marker,
              count: temp_info[2],
            };
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "start_pos");
            newDiv.setAttribute("id", key);
            for_html += `
                <span class="pos_img"></span>   
                <span class="loc">${addr}</span>
      
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
            set_pos_guide();
            const menu_div = document.getElementById("menu");
            menu_div.scrollTop = menu_div.scrollHeight;
          } else {
            toast_alert("올바른 위치를 클릭해주세요.", 1000);
          }
          window.location2 = "";
        }, 300);
      });
    }
  };
  const url_wait = async () => {
    ajax_for_url(key).then((data) => {
      console.log(data);
      data = data.replace("http://127.0.0.1:5500/index.html?", "");
      let for_marker = data.split("|");
      const start_pos_list = document.getElementById("start_pos_list");
      temp_fun(for_marker);
    });
  };
  url_wait();
  setTimeout(function () {
    const find = document.getElementById("find_btn");
    find.click();
  }, 700);

  history.pushState(null, null, "http://127.0.0.1:5500/index.html");
}
// alert(window.location.href)
