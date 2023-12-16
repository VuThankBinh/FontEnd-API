fetch('./js/SanPham.json')
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        localStorage.setItem("sanpham", JSON.stringify(data));
        console.log("saved");
    })
    .catch(function (err) {
        console.log(err);
    })
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

let loginData = JSON.parse(localStorage.getItem("loginData"));
let sanpham = JSON.parse(localStorage.getItem("sanpham"));
let format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
let slideIndexBody2 = 0;
let slideIndexBody1 = 0;
let productsPerPage = 12;
let currentPage = 0;
let totalPages = 0;
// Show login data
function showLoginData() {
    var btnLogin = document.getElementById("user");
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData != null) {
        btnLogin.innerHTML = "Tài khoản: " + loginData.username;
        btnLogin.style.cursor = "pointer"
    }
    else {
        btnLogin.innerHTML = "Đăng nhập";
    }
}
//Btn login
function btnLoginOnClick() {
    var loginData = JSON.parse(localStorage.getItem("user"));
    if (loginData != null) {
        localStorage.setItem("loginData", null);
        alert("Đăng xuất thành công");
        window.location.reload();
    }
    else {
        window.location.href = 'login.html';
    }
}
function timKiem() {
    event.preventDefault();
    var tk = document.getElementById('timsp').value;
    window.location.href = "TimKiem.html?" + tk
}
function timKiem_et(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        // Xử lý khi người dùng nhấn Enter ở đây
        event.preventDefault();
        timKiem();
    }
}
function giohangpage() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData != null) {
        window.location.href = 'Cart.html'

    }
    else {
        alert("Vui lòng đăng nhập trước khi mua hàng");
        window.location.href = "login.html";
    }
}


function loadsp_seen() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData != null) {
        for (let index = 0; index < loginData.SP_daXem.length; index++) {
            // if (loginData.cart[index].id == spID && loginData.SP_daXem[index].size == sz) {

            // }
            document.getElementById('spSeen').innerHTML += `<div style="display: flex;" onclick="chitet('${loginData.SP_daXem[index].ma}')">
            <img src="${loginData.SP_daXem[index].img}" alt="" style="width: 80px; height: 80px;margin-top: 15px;">
            <p style="margin-top: 30px;width: 150px;color: #1f1f20; margin-left: 10px; word-wrap: break-word;">${loginData.SP_daXem[index].name}</p>
        </div>`;
            if (index == 4) { return; }
        }
    }
}
function loadSP_tt() {
    for (var brand in sanpham.GiayBongRo[0]) {
        for (var id = 0; id < sanpham.GiayBongRo[0][brand].length; id++) {
            var productName = sanpham.GiayBongRo[0][brand][id];
            if (productName && id<5) {
                hienGiay(productName)
            }
        }
    }
    
}
function hienGiay(obj) {
    var sizeHTML = "";
    for (var ii = 0; ii < obj.size.length; ii++) {
        if (obj.SoLuong[ii] != 0) {
            sizeHTML += `<button onclick="chonsize(this)">${obj.size[ii]}</button>`;

        }
        else {
            sizeHTML += `<button class="anButton" onclick="chonsize(this)">${obj.size[ii]}</button>`;

        }
    }


    var gia = ""
    var sale = ""
    if (obj.giaC - obj.giaM == 0) {
        sale = ""
        gia = `<p class="gia-tien">${format.format(obj.giaM)} ₫</p>`
    }
    else {
        sale = `<div class="sale">-${Math.ceil(100 - (obj.giaM / obj.giaC) * 100)}%</div>`
        gia = `<p class="gia-tien"><span>${format.format(obj.giaC)} ₫</span>  ${format.format(obj.giaM)} ₫</p>`
    }
    var htmlSP =
        `<div  class="col-2 col-s-6"><div class="sanpham sptt1" id="${obj.id}">
      <div class="img-sanpham">
      <div class="box-img">
          ${sale}
          <img src="${obj.img[0].img1}" alt="" id="${obj.id}">
      
      <h4 class="ten-sanpham" onclick="showCTSP('${obj.id}')">${obj.name}</h4>
      ${gia}
      
      <div class="chon-size">
          ${sizeHTML}
      </div>
  </div>`
    document.getElementById('panel').innerHTML += htmlSP;
}