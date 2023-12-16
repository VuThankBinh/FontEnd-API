// const sanpham = JSON.parse(localStorage.getItem("sanpham"));
localStorage.setItem("san-pham-id", window.location.href.split('=')[1]);
var maSP = localStorage.getItem("san-pham-id")
var loai = "";
var spct
function loadSPCT() {
    var checkVar = false
    for (var brand in sanpham.GiayBongRo[0]) {
        for (var id = 0; id < sanpham.GiayBongRo[0][brand].length; id++) {
            var productName = sanpham.GiayBongRo[0][brand][id];

            if (productName.id == maSP) {
                console.log(productName);
                checkVar = true;
                spct = productName;
                loai = sanpham.GiayBongRo[0][brand];

            }
        }
        if (checkVar == true) { break; }
    }
}

function load() {
    console.log(spTT)
    console.log(spTT.length)
    for (var i = 0; i < spTT.length; i++) {
        console.log(spTT[i]);
    }
}

function loadLink() {
    var link = document.getElementById('link');
    link.innerHTML += `/ <li> <a>${spct.name} </a></li>`;
}
// const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
function loadGia() {
    var gia = ""
    var sale = ""
    if (spct.giaC - spct.giaM == 0) {
        sale = ""
        gia = `<p class="gia-tien" id="prrice-sp">${format.format(spct.giaM)} ₫</p>`
    }
    else {
        sale = `<div class="sale">-${Math.ceil(100 - (spct.giaM / spct.giaC) * 100)}%</div>`
        gia = `<p class="gia-tien" ><span>${format.format(spct.giaC)} ₫</span>  <p id="prrice-sp">${format.format(spct.giaM)} ₫</p></p>`
    }
    return gia;
}
function load_img() {
    var img = `<img class="silde-div1" id="anhgio" style="display: block;" src="${spct.img[0].img1}" alt="">`;
    var dot = '';
    spct.img.forEach((imgObject, i) => {
        const imgSrc = imgObject[`img${i + 1}`];
        // console.log(imgSrc)
        img += `<img class="silde-div1" style="display: none;" src="${imgSrc}" alt="">`

    });
    return img;
}
var list = document.getElementsByClassName("silde-div1");
var index = 0;

// list[index].style.display = 'block';
function showL() {
    for (x of list) {
        x.style.display = 'none';
    }
    if (index == 0) index = list.length - 1;
    else index = index - 1;
    list[index].style.display = 'block';
}

function showR() {
    for (x of list) {
        x.style.display = 'none';
    }
    if (index == list.length - 1) index = 0;
    else index = index + 1;
    list[index].style.display = 'block';
}
var kthc = "";
function load_size() {
    var sizeHTML = ``;
    for (var i = 0; i < spct.size.length; i++) {
        if (spct.SoLuong[i] != 0) {
            sizeHTML += `<button onclick="chonsize(this)">${spct.size[i]}</button>`;

        }
        else {
            sizeHTML += `<button class="anButton" onclick="chonsize(this)">${spct.size[i]}</button>`;

        }
    }
    return sizeHTML;
}
var sl = 0;
function load_solg(size) {
    console.log(size)
    for (var i = 0; i < spct.size.length; i++) {
        if (spct.size[i] == size) {
            document.getElementById('solg').innerHTML = `Còn ${spct.SoLuong[i]} hàng`
            sl = spct.SoLuong[i];
        }
    }
}
var sz='';
function chonsize(button) {

    if (button.classList.contains("clicked")) {
        // Nếu đã chọn, hủy chọn
        button.classList.remove("clicked");
        sz='';
        console.log(sz)
        document.getElementById('solg').innerHTML = ""
        document.querySelector(".item-sl").style.opacity = 0.5;
        document.querySelector(".but-add").style.opacity = 0.5;
        document.querySelector(".item-sl").style.pointerEvents = 'none'
        document.querySelector(".but-add").style.pointerEvents = 'none';
    } else {
        // Nếu chưa chọn, hủy chọn tất cả các button khác và chọn button mới
        var buttons = document.getElementsByTagName("button");

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("clicked");
        }

        button.classList.add("clicked");
        sz=button.textContent;
        console.log(sz)
        load_solg(button.textContent);
        document.querySelector(".item-sl").style.opacity = 1;
        document.querySelector(".but-add").style.opacity = 1;
        document.querySelector(".item-sl").style.pointerEvents = 'auto';
        document.querySelector(".but-add").style.pointerEvents = 'auto';
        kthc = button.textContent;
    }

}
function tru() {
    var sl = parseInt(document.getElementById("sl").value);
    if (sl > 1) {
        sl -= 1;
        document.getElementById("sl").value = sl;
    }
}
function cong() {
    var sl = parseInt(document.getElementById("sl").value);
    sl += 1;
    document.getElementById("sl").value = sl;

}
function nhap_SoLuong(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        // Xử lý khi người dùng nhấn Enter ở đây
        event.preventDefault();
        var num = document.getElementById('sl').value;
        // if(num)
    }

}
function loadTT() {
    load_img();
    loadimgbtn();
    // console.log(img)
    var ct = document.getElementById("anhCTSP");
    ct.innerHTML += `<div class="silde" style="width: 40%; margin-top: 50px; margin-left: 100px;">
      
    ${load_img()}
    <div class="btn-left" style="color: black; " onclick="showL()">&lt;</div>
    <div class="btn-right" style="color: black;" onclick="showR()">&gt;</div>
    <div class="image-list">
        <button class="image-list_item" id="btchon" onclick="chonbtn(this,'silde-div','silde-list')"></button>
        <button class="image-list_item" id="btchon" onclick="chonbtn(this,'silde-div','silde-list')"></button>
        <button class="image-list_item" id="btchon" onclick="chonbtn(this,'silde-div','silde-list')"></button>
        <button class="image-list_item" id="btchon" onclick="chonbtn(this,'silde-div','silde-list')"></button>
    </div>
    
</div>

<div class="ttsp">
    <h3 id="nname-sp"> ${spct.name}</h3>
    <p >${loadGia()} </p>
    <ul>
        <li>Bảo hành trọn đời sản phẩm</li>
        <li>Giao hàng nhanh</li>
        <li>Tặng box cùng tất dệt kim</li>
        <li>Thông tin sản phẩm bên dưới</li>
    </ul>
    <h5 id="div_bong4">Kích cỡ</h5>
    <div class="chon-size ctsp">
        ${load_size()}
    </div>
    <div><p id="solg"></p></div>
    <div class="item-sl">
        <button onclick="tru()">-</button>
        <input type="text" value="1" id="sl">
        <button onclick="cong()">+</button>
    </div>
    <div class="but-add" style="margin-top: -48px;">
        <button onclick="addToCart()">THÊM VÀO GIỎ HÀNG</button>
        <!-- <a href="BTL.html"><button>MUA NGAY</button></a> -->
    </div>
</div>`
}

function loadInfo() {
    document.getElementById('maSP').textContent = spct.id;
    document.getElementById('Size').textContent = "";
    for (var i = 0; i < spct.size.length; i++) {
        if (i < spct.size.length - 1) {
            document.getElementById('Size').textContent += spct.size[i] + ", "
        }
        else {
            document.getElementById('Size').textContent += spct.size[i]
        }
    }
}
function loadImgInfo() {
    var img = ``;
    document.getElementById('Anh').innerHTML = ""
    spct.img.forEach((imgObject, i) => {
        const imgSrc = imgObject[`img${i + 1}`];
        // console.log(imgSrc)
        img += `<img style="width: 30% !important;" src="${imgSrc}" alt="">`

    });
    document.getElementById('Anh').innerHTML += `<h3>Hình ảnh của sản phẩm</h3>` + img;
}
function loadimgbtn() {
    // Get a reference to the elements with the class .image-list__item
    var items = document.querySelectorAll(".image-list_item");

    // Define an array of image URLs corresponding to each item
    var imageUrls = [];
    spct.img.forEach((imgObject, i) => {
        const imgSrc = imgObject[`img${i + 1}`];
        // console.log(imgSrc)
        imageUrls.push(imgSrc);

    });
    for (var i = 0; i < items.length; i++) {
        items[i].style.backgroundImage = "url(" + imageUrls[i] + ")";
        items[i].style.backgroundSize = "cover";
    }

}
function openInfo(event, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    event.currentTarget.className += " active";
}
function showView(sanphamid) {
    var product = "";

    for (var i = 0; i < sanpham.GiayBongRo[0].Giay_Nike.length; i++) {
        if (sanpham.GiayBongRo[0].Giay_Nike[i].id == sanphamid) {
            product = sanpham.GiayBongRo[0].Giay_Nike[i];
            break;
        }
    }
    for (var i = 0; i < sanpham.GiayBongRo[0].Giay_Adidas.length; i++) {
        if (sanpham.GiayBongRo[0].Giay_Adidas[i].id == sanphamid) {
            product = sanpham.GiayBongRo[0].Giay_Adidas[i];
            break;
        }
    }
    for (var i = 0; i < sanpham.GiayBongRo[0].Giay_Tre_Em.length; i++) {
        if (sanpham.GiayBongRo[0].Giay_Tre_Em[i].id == sanphamid) {
            product = sanpham.GiayBongRo[0].Giay_Tre_Em[i];
            break;
        }
    }
    for (var i = 0; i < sanpham.GiayBongRo[0].Giay_NBA.length; i++) {
        if (sanpham.GiayBongRo[0].Giay_NBA[i].id == sanphamid) {
            product = sanpham.GiayBongRo[0].Giay_NBA[i];
            break;
        }
    }

    var sizeHTML = '';
    for (var i = 0; i < product.size.length; i++) {
        if (product.SoLuong[i] != 0) {
            sizeHTML += `<button onclick="chonsize(this)">${product.size[i]}</button>`;

        }
        else {
            sizeHTML += `<button class="anButton" onclick="chonsize(this)">${product.size[i]}</button>`;

        }

    }
    var gia = ``
    if (product.giaC - product.giaM == 0) {
        gia = `<p class="gia-tien">${format.format(product.giaM)} ₫</p>`
    }
    else {
        gia = `<p class="gia-tien"><span>${format.format(product.giaC)} ₫</span>  ${format.format(product.giaM)} ₫</p>`
    }
    var image = `<img class="silde-div1" style="display: block;" src="${product.img[0].img1}" alt="" width="90%">`;
    var dot = '';
    product.img.forEach((imgObject, i) => {
        const imgSrc = imgObject[`img${i + 1}`];
        console.log(imgSrc)
        image += `<img class="silde-div1" style="display: none;" src="${imgSrc}" alt="" width="90%">`
        dot += `<span class="dot" onclick="setIndexSlideBody2(${i})"></span>`

    });
    document.getElementById("div-quick").innerHTML = ``;
    document.getElementById("div-quick").innerHTML = `
    
    <div class="show-quick-view">
    <div class="close-button" onclick="closeForm()">&times;</div>
        <div class="silde1">
            
            ${image}
            
            <div class="btn-left" onclick="showL()">&lt;</div>
            <div class="btn-right" onclick="showR()">&gt;</div>
            <div style="text-align:center">
                ${dot}
               
            </div>
        </div>
        <div style="margin-left: 35px; margin-top: 30px;">
            <h3 style="color: orange;">${product.name}</h3>
            ${gia}
            <h5>Kích cỡ</h5>
            <div class="chon-size ctsp">
                ${sizeHTML}
            </div>
            <div class="item-sl">
                <button onclick="tru()">-</button>
                <input type="text" value="1" id="sl">
                <button onclick="cong()">+</button>
            </div>
            <div class="but-add">
                <button>THÊM VÀO GIỎ HÀNG</button>
                <!-- <a href=""><button>MUA NGAY</button></a> -->
            </div>
        </div>
    </div>`;
    show();
}
function show() {
    var divLogin = document.getElementById("div-quick");
    divLogin.style.display = "block";
}
function closeForm() {
    var divLogin = document.getElementById("div-quick");
    divLogin.style.display = "none";
}
function showCTSP(id) {
    localStorage.setItem("san-pham-id", id);
    window.location.href = "ChiTietSP_giay.html?id=" + id
}
var spTT = [];
function loadSP_tt() {
    for (var sp = 0; sp < loai.length; sp++) {
        if (loai[sp].id != maSP) {
            spTT.push(loai[sp]);
        }
    }
    spTT.forEach(sp => {
        hien_sp_tuongTu(sp);
    });
}
function hien_sp_tuongTu(obj) {
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



// Add to cart
function addToCart() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData != null) {
        var userData = JSON.parse(localStorage.getItem(loginData.username));
        var inCart = false;

        for (let index = 0; index < loginData.cart.length; index++) {
            if (loginData.cart[index].id == maSP && loginData.cart[index].size ==sz) {
                inCart = true;

                loginData.cart[index].quantity += parseInt(document.getElementById('sl').value);

                localStorage.setItem("loginData", JSON.stringify(loginData));
                localStorage.setItem(loginData.username, JSON.stringify(loginData));

                alert("Sản phẩm đã có trong giỏ hàng");
                break;
            }
        }
        if (!inCart) {
            var cartData = {
                id: maSP,
                name: document.getElementById('nname-sp').textContent,
                quantity: parseInt(document.getElementById('sl').value),
                img: document.getElementById('anhgio').getAttribute('src'),
                size: sz,
                price: document.getElementById('prrice-sp').textContent
            };

            loginData.cart.push(cartData);
            userData.cart.push(cartData);

            localStorage.setItem("loginData", JSON.stringify(loginData));
            localStorage.setItem(loginData.username, JSON.stringify(userData));
            alert("Sản phẩm đã được thêm vào giỏ hàng");
        }
        showProductInCart();
    }
    else {
        alert("Vui lòng đăng nhập trước khi mua hàng");
        window.location.href = "login.html";
    }
}
function addSP_seen() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData != null) {
        var userData = JSON.parse(localStorage.getItem(loginData.username));
        var inSeen = false;
        for (let index = 0; index < loginData.SP_daXem.length; index++) {
            if (loginData.SP_daXem[index].ma == maSP) {
                inSeen = true;
                console.log(loginData)
                console.log(userData)
            }
        }
        if (!inSeen) {
            var SeenData = {
                ma:maSP,
                name: document.getElementById("nname-sp").textContent,
                img: document.getElementById('anhgio').getAttribute('src')
            };

            loginData.SP_daXem.push(SeenData);
            userData.SP_daXem.push(SeenData);

            localStorage.setItem("loginData", JSON.stringify(loginData));
            localStorage.setItem(loginData.username, JSON.stringify(userData));
            console.log(loginData.SP_daXem)
            console.log(userData.SP_daXem)
        }
    }
}
// function zoomSlideProduct() { 
//     $('.silde-div1').extm({
//         position: 'right',
//         rightPad: 5,
//         squareOverlay: true,
//         zoomSize: 2000,
//     });
// }