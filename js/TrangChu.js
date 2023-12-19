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
            if (productName && id < 5) {
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

// show hàng mới

//show 10 sản phẩm giày
function load10spGiay() {
    var count = 0;
    for (var brand in sanpham.GiayBongRo[0]) {
        for (var id = 0; id < 2; id++) {
            var productName = sanpham.GiayBongRo[0][brand][id];
            if (productName) {
                showspgiay(productName)
                count++;
            }
            if (count == 8) {
                return;
            }
        }
    }
}
function showspgiay(obj) {
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
    document.getElementById('sanpham1').innerHTML +=
        `<div  class="col-3 col-s-6"><br><div class="sanpham " id="${obj.id}">
      <div class="img-sanpham">
      <div class="box-img">
          ${sale}
          <img src="${obj.img[0].img1}" alt="" id="${obj.id}">
      </div>
          <div class="quick-view" onclick="showViewGiay('${obj.id}')"> QUICK VIEW</div>
      </div>
      <h4  class="ten-sanpham" onclick="showCTSP('${obj.id}')">${obj.name}</h4>
      ${gia}
      
      <div class="chon-size">
          ${sizeHTML}
      </div>
  </div>`
}
//show 10 sản phẩm quần áo
function load8spQA() {
    var count = 0;
    for (var brand in sanpham.QuanAo[0]) {
        for (var id = 0; id < sanpham.QuanAo[0][brand].length; id++) {
            var productName = sanpham.QuanAo[0][brand][id];
            if (productName) {
                showQA(productName);
                count++;
            }
            if (count == 8) {
                return;
            }
        }
    }

}
function showQA(obj) {
    var sizeHTML = "";
    for (var i = 0; i < obj.img.length; i++) {
        var soLuongTheoMau = 0;
        obj.img[i].SoLuong.forEach(soluong => {
            soLuongTheoMau += soluong;
        });
        if (soLuongTheoMau != 0) {
            sizeHTML += `<button onclick="chonMau(this,'${obj.id}anh','${obj.img[i].img1.replace(/\\/g, "\\\\")}','${obj.img[0].img1.replace(/\\/g, "\\\\")}')"><img src="${obj.img[i].img1}" alt=""></button>`;

        }
        else {
            sizeHTML += `<button class="anButton" onclick="chonMau(this,'${obj.id}anh','${obj.img[i].img1.replace(/\\/g, "\\\\")}','${obj.img[0].img1.replace(/\\/g, "\\\\")}'')"><img src="${obj.img[i].img1}" alt=""></button>`;
        }
    }
    var gia = ""
    var sale = ""
    sale = ""
    gia = `<p class="gia-tien">${format.format(obj.price)} ₫</p>`
    // if (sanpham.giaC - sanpham.giaM == 0) {
    // }
    // else {
    //   sale = `<div class="sale">-${Math.ceil(100 - (sanpham.giaM / sanpham.giaC) * 100)}%</div>`
    //   gia = `<p class="gia-tien"><span>${format.format(sanpham.giaC)} ₫</span>  ${format.format(sanpham.giaM)} ₫</p>`
    // }
    document.getElementById("sanpham2").innerHTML +=
        `<div  class="col-3 col-s-6"><br><div class="sanpham " id="${obj.id}">
          <div class="img-sanpham">
          <div class="box-img">
              ${sale}
              <img src="${obj.img[0].img1}" alt="" id="${obj.id}anh">
          </div>
              <div class="quick-view" style="width: 13.55%" onclick="showViewQuanAo('${obj.id}')"> QUICK VIEW</div>
          </div>
          <h4 class="ten-sanpham" onclick="showCTSP2('${obj.id}')">${obj.name}</h4>
          ${gia}
          
          <div class="chon-size">
              ${sizeHTML}
          </div>
      </div>`
}
// show 10 bóng
function load8bong() {
    var count = 0;
    for (var id = 0; id < sanpham.Bong.length; id++) {
        var productName = sanpham.Bong[id];
        if (productName) {
            showbongma(productName);
            count++
        }
        if (count == 8) {
            return
        }
    }


}
function showbongma(obj) {
    var sizeHTML = "";
    for (var i = 0; i < obj.img.length; i++) {
        var soLuongTheoMau = 0;
        obj.img[i].SoLuong.forEach(soluong => {
            soLuongTheoMau += soluong;
        });
        if (soLuongTheoMau != 0) {
            sizeHTML += `<button onclick="chonMau(this,'${obj.id}anh','${obj.img[i].img1.replace(/\\/g, "\\\\")}','${obj.img[0].img1.replace(/\\/g, "\\\\")}')"><img src="${obj.img[i].img1}" alt=""></button>`;

        }
        else {
            sizeHTML += `<button class="anButton" onclick="chonMau(this,'${obj.id}anh','${obj.img[i].img1.replace(/\\/g, "\\\\")},'${obj.img[0].img1.replace(/\\/g, "\\\\")}'')"><img src="${obj.img[i].img1}" alt=""></button>`;
        }
    }
    var gia = ""
    var sale = ""
    sale = ""

    if (obj.giaC - obj.giaM == 0) {
        gia = `<p class="gia-tien">${format.format(obj.giaM)} ₫</p>`
    }
    else {
        sale = `<div class="sale">-${Math.ceil(100 - (obj.giaM / obj.giaC) * 100)}%</div>`
        gia = `<p class="gia-tien"><span>${format.format(obj.giaC)} ₫</span>  ${format.format(obj.giaM)} ₫</p>`
    }
    document.getElementById("sanpham3").innerHTML +=
        `<div  class="col-3 col-s-6"><br><div class="sanpham " id="${obj.id}">
          <div class="img-sanpham">
          <div class="box-img">
              ${sale}
              <img src="${obj.img[0].img1}" alt="" id="${obj.id}anh">
          </div>
              <div class="quick-view" style="width: 13.55%" onclick="showViewBong('${obj.id}')"> QUICK VIEW</div>
          </div>
          <h4 class="ten-sanpham" onclick="showCTSP('${obj.id}')">${obj.name}</h4>
          ${gia}
          
          <div class="chon-size">
              ${sizeHTML}
          </div>
      </div>`
}
//show Sản phẩm mới về
function loadspMoiVe() {
    var count = 0;
    for (var loai in sanpham) {
        console.log(loai)
        if (loai !== 'Bong') {

            // console.log(loai)
            // console.log(sanpham[loai][0])
            // sanpham[loai][0].forEach(brand=>{
            //     // var br=sanpham[loai][brand];
            //         console.log(brand)
            // }); 
            for (const brand in sanpham[loai][0]) {
                // var br=sanpham[loai][brand];
                // console.log(sanpham[loai])
                // console.log(br)    
                var products = sanpham[loai][0][brand];
                // console.log(products.length)

                // for (var i = sanpham[loai][0][brand]; i < 1; i++) {
                    var sp = products[products.length-1];

                    console.log(sp.name);
                    // console.log(sp);
                    if (loai == 'GiayBongRo') {
                        load_sp_giay(sp);
                    }
                    if (loai == "QuanAo") {
                        loadQuanAoBo(sp)
                    }
                    if (loai == "PhuKien") {
                        loadPhuKien(sp)
                    }
                    count++;
                    if (count == 4) {
                        return
                    }


                // }
            }
        } else {
            for (var brand in sanpham[loai]) {
                var br = sanpham[loai][brand];
                // console.log(br.name)

                // console.log(br);
                loadBong(br)
                count++
                if (count == 4) {
                    return
                }

                // console.log(br.name)  
            }
        }


    }
}
//show sp giày
function load_sp_giay(obj) {
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
    document.getElementById('sanpham').innerHTML +=
        `<div  class="col-3 col-s-6"><br><div class="sanpham " id="${obj.id}">
      <div class="img-sanpham">
      <div class="box-img">
          ${sale}
          <img src="${obj.img[0].img1}" alt="" id="${obj.id}">
      </div>
          <div class="quick-view" onclick="showViewGiay('${obj.id}')"> QUICK VIEW</div>
      </div>
      <h4  class="ten-sanpham" onclick="showCTSP('${obj.id}')">${obj.name}</h4>
      ${gia}
      
      <div class="chon-size">
          ${sizeHTML}
      </div>
  </div>`
}
//show sp quan áo
function loadQuanAoBo(obj) {
    // console.log(sanpham.QuanAo[0]);
    // for(var brand in sanpham.QuanAo[0]){
    // sanpham.QuanAo[0][brand].forEach(sanpham => {
    var sizeHTML = "";
    for (var i = 0; i < obj.img.length; i++) {
        var soLuongTheoMau = 0;
        obj.img[i].SoLuong.forEach(soluong => {
            soLuongTheoMau += soluong;
        });
        if (soLuongTheoMau != 0) {
            sizeHTML += `<button onclick="chonMau(this,'${obj.id}anh','${obj.img[i].img1.replace(/\\/g, "\\\\")}','${obj.img[0].img1.replace(/\\/g, "\\\\")}')"><img src="${obj.img[i].img1}" alt=""></button>`;

        }
        else {
            sizeHTML += `<button class="anButton" onclick="chonMau(this,'${obj.id}anh','${obj.img[i].img1.replace(/\\/g, "\\\\")}','${obj.img[0].img1.replace(/\\/g, "\\\\")}'')"><img src="${obj.img[i].img1}" alt=""></button>`;
        }
    }
    var gia = ""
    var sale = ""
    sale = ""
    gia = `<p class="gia-tien">${format.format(obj.price)} ₫</p>`
    // if (sanpham.giaC - sanpham.giaM == 0) {
    // }
    // else {
    //   sale = `<div class="sale">-${Math.ceil(100 - (sanpham.giaM / sanpham.giaC) * 100)}%</div>`
    //   gia = `<p class="gia-tien"><span>${format.format(sanpham.giaC)} ₫</span>  ${format.format(sanpham.giaM)} ₫</p>`
    // }
    document.getElementById("sanpham").innerHTML +=
        `<div  class="col-3 col-s-6"><br><div class="sanpham " id="${obj.id}">
            <div class="img-sanpham">
            <div class="box-img">
                ${sale}
                <img src="${obj.img[0].img1}" alt="" id="${obj.id}anh">
            </div>
                <div class="quick-view" style="width: 13.55%" onclick="showViewQuanAo('${obj.id}')"> QUICK VIEW</div>
            </div>
            <h4 class="ten-sanpham" onclick="showCTSP('${obj.id}')">${obj.name}</h4>
            ${gia}
            
            <div class="chon-size">
                ${sizeHTML}
            </div>
        </div>`
    // });
    // }

}
//show sp phụ kiện
function loadPhuKien(obj) {
    // console.log(sanpham.QuanAo[0]);
    // for(var brand in sanpham.QuanAo[0]){
    // sanpham.QuanAo[0][brand].forEach(sanpham => {
    var sizeHTML = "";
    // console.log(obj.img)
    for (var i = 0; i < obj.img.length; i++) {

        if (obj.SoLuong[i] > 0) {
            sizeHTML += `<button onclick="chonColor(this,'${obj.id}anh','${obj.img[i].img1.replace(/\\/g, "\\\\")}','${obj.img[0].img1.replace(/\\/g, "\\\\")}')"><img src="${obj.img[i].img1}" alt=""></button>`;

        }
        else {
            sizeHTML += `<button class="anButton" onclick="chonColor(this,'${obj.id}anh','${obj.img[i].img1.replace(/\\/g, "\\\\")}','${obj.img[0].img1.replace(/\\/g, "\\\\")}')"><img src="${obj.img[i].img1}" alt=""></button>`;
        }
    }
    var gia = ""
    var sale = ""
    sale = ""
    gia = `<p class="gia-tien">${format.format(obj.giaM)} ₫</p>`
    if (obj.giaC - obj.giaM == 0) {
    }
    else {
        sale = `<div class="sale">-${Math.ceil(100 - (obj.giaM / obj.giaC) * 100)}%</div>`
        gia = `<p class="gia-tien"><span>${format.format(obj.giaC)} ₫</span>  ${format.format(obj.giaM)} ₫</p>`
    }
    document.getElementById("sanpham").innerHTML +=
        `<div  class="col-3 col-s-6"><br><div class="sanpham " id="${obj.id}">
            <div class="img-sanpham">
            <div class="box-img">
                ${sale}
                <img src="${obj.img[0].img1}" alt="" id="${obj.id}anh">
            </div>
                <div class="quick-view" style="width: 13.55%" onclick="showViewPhuKien('${obj.id}')"> QUICK VIEW</div>
            </div>
            <h4 class="ten-sanpham" onclick="showCTSP('${obj.id}')">${obj.name}</h4>
            ${gia}
            
            <div class="chon-size">
                ${sizeHTML}
            </div>
        </div>`
    // });
    // }

}
//show sp bóng
function loadBong(obj) {
    console.log(obj.name);
    var sizeHTML = "";
    for (var i = 0; i < obj.img.length; i++) {
        var soLuongTheoMau = 0;
        obj.img[i].SoLuong.forEach(soluong => {
            soLuongTheoMau += soluong;
        });
        if (soLuongTheoMau != 0) {
            sizeHTML += `<button onclick="chonMau(this,'${obj.id}anh','${obj.img[i].img1.replace(/\\/g, "\\\\")}','${obj.img[0].img1.replace(/\\/g, "\\\\")}')"><img src="${obj.img[i].img1}" alt=""></button>`;

        }
        else {
            sizeHTML += `<button class="anButton" onclick="chonMau(this,'${obj.id}anh','${obj.img[i].img1.replace(/\\/g, "\\\\")},'${obj.img[0].img1.replace(/\\/g, "\\\\")}'')"><img src="${obj.img[i].img1}" alt=""></button>`;
        }
    }
    var gia = ""
    var sale = ""
    sale = ""

    if (obj.giaC - obj.giaM == 0) {
        gia = `<p class="gia-tien">${format.format(obj.giaM)} ₫</p>`
    }
    else {
        sale = `<div class="sale">-${Math.ceil(100 - (obj.giaM / obj.giaC) * 100)}%</div>`
        gia = `<p class="gia-tien"><span>${format.format(obj.giaC)} ₫</span>  ${format.format(obj.giaM)} ₫</p>`
    }
    document.getElementById("sanpham").innerHTML +=
        `<div  class="col-3 col-s-6"><br><div class="sanpham " id="${obj.id}">
            <div class="img-sanpham">
            <div class="box-img">
                ${sale}
                <img src="${obj.img[0].img1}" alt="" id="${obj.id}anh">
            </div>
                <div class="quick-view" style="width: 13.55%" onclick="showViewBong('${obj.id}')"> QUICK VIEW</div>
            </div>
            <h4 class="ten-sanpham" onclick="showCTSP('${obj.id}')">${obj.name}</h4>
            ${gia}
            
            <div class="chon-size">
                ${sizeHTML}
            </div>
        </div>`
}