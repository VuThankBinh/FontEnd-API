
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
var sz = '';
function chonsize(button) {

    if (button.classList.contains("clicked")) {
        // Nếu đã chọn, hủy chọn
        button.classList.remove("clicked");
        sz = '';
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
        sz = button.textContent;
        load_solg(product, button.textContent);
        document.querySelector(".item-sl").style.opacity = 1;
        document.querySelector(".but-add").style.opacity = 1;
        document.querySelector(".item-sl").style.pointerEvents = 'auto';
        document.querySelector(".but-add").style.pointerEvents = 'auto';
    }

}



const products = [];
function pushArr(elt) {
    products.push(elt);
}
//load giày nike

//tìm giá min, max
function timGiaMin(obj) {

    var minValue = Number.POSITIVE_INFINITY; // Giá trị ban đầu của giá trị nhỏ nhất
    obj.forEach(ob => {
        if (ob.giaM < minValue)
            minValue = ob.giaM
    });

    return minValue;

}
function timGiaMax(obj) {

    var maxValue = Number.NEGATIVE_INFINITY; // Giá trị ban đầu của giá trị lớn nhất

    obj.forEach(ob => {
        if (ob.giaM > maxValue)
            maxValue = ob.giaM
    });

    return maxValue;

}
var Gmin = 0, Gmax = 0;
//tìm min max
function MinMax() {
    var ArrMin = [];
    var ArrMax = [];
    ArrMin.push(timGiaMin(sanpham.GiayBongRo[0].Giay_Nike))
    ArrMin.push(timGiaMin(sanpham.GiayBongRo[0].Giay_Adidas))
    ArrMin.push(timGiaMin(sanpham.GiayBongRo[0].Giay_NBA))
    ArrMin.push(timGiaMin(sanpham.GiayBongRo[0].Giay_AnTa))
    ArrMin.push(timGiaMin(sanpham.GiayBongRo[0].Giay_Peak))
    ArrMin.push(timGiaMin(sanpham.GiayBongRo[0].Giay_Tre_Em))

    ArrMax.push(timGiaMax(sanpham.GiayBongRo[0].Giay_Nike))
    ArrMax.push(timGiaMax(sanpham.GiayBongRo[0].Giay_Adidas))
    ArrMax.push(timGiaMax(sanpham.GiayBongRo[0].Giay_NBA))
    ArrMax.push(timGiaMax(sanpham.GiayBongRo[0].Giay_AnTa))
    ArrMax.push(timGiaMax(sanpham.GiayBongRo[0].Giay_Peak))
    ArrMax.push(timGiaMax(sanpham.GiayBongRo[0].Giay_Tre_Em))

    Gmin = Math.min.apply(null, ArrMin);
    // Tìm giá trị lớn nhất trong ArrMax
    Gmax = Math.max.apply(null, ArrMax);
}



function loc() {
    MinMax();
    $("#slider-range").slider({
        range: true,
        min: Gmin,
        max: Gmax,
        values: [Gmin, Gmax],
        slide: function (event, ui) {
            $("#amount").val(format.format(ui.values[0]) + " ₫" + " - " + format.format(ui.values[1]) + " ₫");
        }
    });
    $("#amount").val($("#slider-range").slider("values", 0) + " ₫" + " - " + $("#slider-range").slider("values", 1) + " ₫");

};

function hienSP_loc(obj, min, max) {
    obj.forEach(sanpham => {
        var sizeHTML = "";
        if (sanpham.giaM >= min && sanpham.giaM <= max) {
            for (var i = 0; i < sanpham.size.length; i++) {
                if (sanpham.SoLuong[i] != 0) {
                    sizeHTML += `<button onclick="chonsize(this)">${sanpham.size[i]}</button>`;

                }
                else {
                    sizeHTML += `<button class="anButton" onclick="chonsize(this)">${sanpham.size[i]}</button>`;

                }
            }

            var gia = ""
            var sale = ""
            if (sanpham.giaC - sanpham.giaM == 0) {
                sale = ""
                gia = `<p class="gia-tien">${format.format(sanpham.giaM)} ₫</p>`
            }
            else {
                sale = `<div class="sale">-${Math.ceil(100 - (sanpham.giaM / sanpham.giaC) * 100)}%</div>`
                gia = `<p class="gia-tien"><span>${format.format(sanpham.giaC)} ₫</span>  ${format.format(sanpham.giaM)} ₫</p>`
            }
            document.getElementById("sanpham").innerHTML +=
                `<div  class="col-3 col-s-6"><br><div class="sanpham " id="${sanpham.id}">
            <div class="img-sanpham">
            <div class="box-img">
                ${sale}
                <img src="${sanpham.img[0].img1}" alt="" id="${sanpham.id}">
            </div>
                <div class="quick-view" onclick="showViewGiay('${sanpham.id}')"> QUICK VIEW</div>
            </div>
            <h4 class="ten-sanpham" onclick="showCTSP('${sanpham.id}')">${sanpham.name}</h4>
            ${gia}
            
            <div class="chon-size">
                ${sizeHTML}
            </div>
        </div>`
        }
    });
}
function loadSP(min, max) {
    document.getElementById("sxGia").value = "select"
    document.getElementById("loaiSP").value = "select"
    var divElement = document.getElementById("sanpham");
    divElement.innerHTML = "";
    // hienSP_loc(sanpham.GiayBongRo[0].Giay_Nike, min, max);
    // hienSP_loc(sanpham.GiayBongRo[0].Giay_Adidas, min, max);
    // hienSP_loc(sanpham.GiayBongRo[0].Giay_NBA, min, max);
    // hienSP_loc(sanpham.GiayBongRo[0].Giay_Peak, min, max);
    // hienSP_loc(sanpham.GiayBongRo[0].Giay_AnTa, min, max);
    // hienSP_loc(sanpham.GiayBongRo[0].Giay_Tre_Em, min, max);
    showProducts(0);
}



// đóng form
function closeForm() {
    var divLogin = document.getElementById("div-quick");
    divLogin.style.display = "none";
}
//mở form
function show() {
    var divLogin = document.getElementById("div-quick");
    divLogin.style.display = "block";
}

function showL() {
    slideIndexBody1 = slideIndexBody1 - 2;
    setTimeout(showSlideBody2(), -2500);
}
function showR() {
    setTimeout(showSlideBody2(), 0);
}
// let slideIndexBody2 = 0;
function showSlideBody2() {
    let i;
    let slides = document.getElementsByClassName("silde-div1");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slideIndexBody2 == slides.length) {
        slideIndexBody2 = 0;
    }
    else if (slideIndexBody2 < 0) {
        slideIndexBody2 = slides.length - 1;
    }
    slides[slideIndexBody2].style.display = "block";
    dots[slideIndexBody2].className += " active";
    slideIndexBody2++;
    // setTimeout(showSlideBody1, 2500);
}
function showSlideBody2TimeOut() {
    let i;
    let slides = document.getElementsByClassName("silde-div1");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slideIndexBody2 == slides.length) {
        slideIndexBody2 = 0;
    }
    else if (slideIndexBody2 < 0) {
        slideIndexBody2 = slides.length - 1;
    }
    slides[slideIndexBody2].style.display = "block";
    dots[slideIndexBody2].className += " active";
    slideIndexBody2++;
    setTimeout(showSlideBody2TimeOut, 2500);
}

// let slideIndexBody1 = 0;
function showSlideBody1() {
    let i;
    let slides = document.getElementsByClassName("silde-div");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slideIndexBody1 == slides.length) {
        slideIndexBody1 = 0;
    }
    else if (slideIndexBody1 < 0) {
        slideIndexBody1 = slides.length - 1;
    }
    slides[slideIndexBody1].style.display = "block";
    dots[slideIndexBody1].className += " active";
    slideIndexBody1++;
    // setTimeout(showSlideBody1, 2500);
}
function showSlideBody1TimeOut() {
    let i;
    let slides = document.getElementsByClassName("silde-div");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slideIndexBody1 == slides.length) {
        slideIndexBody1 = 0;
    }
    else if (slideIndexBody1 < 0) {
        slideIndexBody1 = slides.length - 1;
    }
    slides[slideIndexBody1].style.display = "block";
    dots[slideIndexBody1].className += " active";
    slideIndexBody1++;
    setTimeout(showSlideBody1TimeOut, 2500);
}

function setIndexSlideBody1(index) {
    slideIndexBody1 = index;
    setTimeout(showSlideBody1(), 0);
}
function setIndexSlideBody2(index) {
    slideIndexBody2 = index;
    setTimeout(showSlideBody2(), 0);
}




var product = "";

function load_solg(obj, size) {
    console.log(size)
    for (var i = 0; i < obj.size.length; i++) {
        if (obj.size[i] == size) {
            document.getElementById('solg').innerHTML = `Còn ${obj.SoLuong[i]} hàng`

        }
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
var gia = 0;
function showViewGiay(sanphamid) {

    // console.log(sanphamid)

    // sanpham.GiayBongRo[0].Giay_Nike.forEach( sp =>{
    //   if(sp.id==sanphamid){
    //     product=sp;

    //   }
    // });
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
    for (var i = 0; i < sanpham.GiayBongRo[0].Giay_NBA.length; i++) {
        if (sanpham.GiayBongRo[0].Giay_NBA[i].id == sanphamid) {
            product = sanpham.GiayBongRo[0].Giay_NBA[i];
            break;
        }
    }
    for (var i = 0; i < sanpham.GiayBongRo[0].Giay_Peak.length; i++) {
        if (sanpham.GiayBongRo[0].Giay_Peak[i].id == sanphamid) {
            product = sanpham.GiayBongRo[0].Giay_Peak[i];
            break;
        }
    }
    for (var i = 0; i < sanpham.GiayBongRo[0].Giay_Tre_Em.length; i++) {
        if (sanpham.GiayBongRo[0].Giay_Tre_Em[i].id == sanphamid) {
            product = sanpham.GiayBongRo[0].Giay_Tre_Em[i];
            break;
        }
    }
    for (var i = 0; i < sanpham.GiayBongRo[0].Giay_AnTa.length; i++) {
        if (sanpham.GiayBongRo[0].Giay_AnTa[i].id == sanphamid) {
            product = sanpham.GiayBongRo[0].Giay_AnTa[i];
            break;
        }
    }
    //   console.log(product)

    var sizeHTML = '';
    for (var i = 0; i < product.size.length; i++) {
        if (product.SoLuong[i] != 0) {
            sizeHTML += `<button onclick="chonsize(this)">${product.size[i]}</button>`;

        }
        else {
            sizeHTML += `<button class="anButton" onclick="chonsize(this)">${product.size[i]}</button>`;

        }
    }
    var img = ` <img class="silde-div1" style="display: block;" id="anhgio" src="${product.img[0].img1}" alt="" width="90%">`;
    product.img.forEach((image, i) => {
        const key = `img${i + 1}`;
        if (image[key] && i > 0) {
            console.log(image[key]);
            img += `<img class="silde-div1" style="display: none;"  src="${image[key]}" alt="" width="90%">`
        }
    });

    document.getElementById("div-quick").innerHTML = ``;
    document.getElementById("div-quick").innerHTML = `
          
          <div class="show-quick-view">
          <div class="close-button" onclick="closeForm()">&times;</div>
              <div class="silde1">
                  ${img}
                  
                  <div class="btn-left" onclick="showL()">&lt;</div>
                  <div class="btn-right" onclick="showR()">&gt;</div>
                  <div style="text-align:center">
                      <span class="dot" onclick="setIndexSlideBody2(0)"></span>
                      <span class="dot" onclick="setIndexSlideBody2(1)"></span>
                      <span class="dot" onclick="setIndexSlideBody2(2)"></span>
                      <span class="dot" onclick="setIndexSlideBody2(3)"></span>
                      <span class="dot" onclick="setIndexSlideBody2(4)"></span>
                     
                  </div>
              </div>
              <div style="margin-left: 35px; margin-top: 30px;">
                  <h3 style="color: orange;" id="nname">${product.name}</h3>
                  <p class="gia-tien"><span>${format.format(product.giaC)} ₫</span>  ${format.format(product.giaM)} ₫</p>
                  <h5>Kích cỡ</h5>
                  <div class="chon-size ctsp">
                      ${sizeHTML}
                  </div>
                  <div><p id="solg"></p></div>
                  <div class="item-sl">
                      <button onclick="tru()">-</button>
                      <input type="text" value="1" id="sl">
                      <button onclick="cong()">+</button>
                  </div>
                  <div class="but-add">
                      <button onclick="addToCart('${sanphamid}')">THÊM VÀO GIỎ HÀNG</button>
                      
                  </div>
              </div>
          </div>`;
    gia = product.giaM;
    show();
}



function hienSp(obj, min, max) {
    var sizeHTML = "";
    if (obj.giaM >= min && obj.giaM <= max) {
        for (var i = 0; i < obj.size.length; i++) {
            if (obj.SoLuong[i] != 0) {
                sizeHTML += `<button onclick="chonsize(this)">${obj.size[i]}</button>`;

            }
            else {
                sizeHTML += `<button class="anButton" onclick="chonsize(this)">${obj.size[i]}</button>`;

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
      <h4 class="ten-sanpham" onclick="showCTSP('${obj.id}')">${obj.name}</h4>
      ${gia}
      
      <div class="chon-size">
          ${sizeHTML}
      </div>
  </div>`
    }
}




// Search products from local storage
function searchProduct(name) {
    name = name.toLowerCase();
    const products = JSON.parse(localStorage.getItem("sanpham"));
    document.getElementById("products").innerHTML = "";
    // document.getElementById("showMoreProduct").style.display = "none";
    var haveProduct = false;
    for (const property in products.phanloai) {
        for (var i = 0; i < products.phanloai[property].length; i++) {
            var productName = products.phanloai[property][i].name.toLowerCase();
            if (productName.includes(name)) {
                haveProduct = true;
                loadInnerProduct(products.phanloai[property][i]);
            }
        }
    }
    if (!haveProduct) {
        document.getElementById("products").innerHTML
            = `<p style="font-size: 32px; font-weight: bold; color: #333; width: 100%; text-align: center; margin:200px 0;">Không có sản phẩm nào có tên "${name}" </p>
          <p style="font-size: 26px; color: #333; width: 100%; text-align: center; margin-bottom: 20px;">Xem các sản phẩm khác</p>`;
        loaded = 0; loadAllProduct();
        // document.getElementById('showMoreProduct').style.display = 'block';
    }
}

function hienSp1(obj) {
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
var allProducts = [];
function intsertGiay() {
    allProducts.splice(0, allProducts.length);
    for (var brand in sanpham.GiayBongRo[0]) {
        for (var id = 0; id < sanpham.GiayBongRo[0][brand].length; id++) {
            var productName = sanpham.GiayBongRo[0][brand][id];
            if (productName) {
                allProducts.push(productName);
            }
        }
    }
}

// const productsPerPage = 12; // Số sản phẩm trên mỗi trang
// let currentPage = 0;
// var totalPages = 0;
function showProducts(page) {
    intsertGiay();
    var min = $('#slider-range').slider('values', 0);
    var max = $('#slider-range').slider('values', 1)
    // console.log(allProducts)
    // console.log(allProducts.slice(5 * 12))
    var sanPhamDiv = document.getElementById("sanpham");
    sanPhamDiv.innerHTML = ``;
    var filteredProducts = allProducts.filter(function (product) {
        return product.giaM >= min && product.giaM <= max;
    });
    if (filteredProducts.length == 0) {
        document.getElementById("sanpham").innerHTML += `<h3>Không có sản phẩm</h3>`;
        document.getElementById("sanpham").style.display = "flex";
        document.getElementById("sanpham").style.justifyContent = "center";
    }
    if (sx == "Tang") {
        filteredProducts.sort(function (a, b) {
            return a.giaM - b.giaM;
        });
    }
    if (sx == "Giam") {
        filteredProducts.sort(function (a, b) {
            return b.giaM - a.giaM;
        });
    }

    const start = page * productsPerPage;
    const end = start + productsPerPage;
    totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    // console.log(totalPages)
    // console.log(allProducts.length-(totalPages-1)*productsPerPage)
    // console.log(allProducts.slice(totalPages,allProducts.length-(totalPages-1)*productsPerPage))
    const productsToDisplay = filteredProducts.slice(start, end);
    var pe = document.getElementById('pe');
    var tol = document.getElementById('total');
    pe.placeholder = currentPage + 1;
    tol.innerHTML = totalPages;
    productsToDisplay.forEach(product => {
        hienSp1(product)
    });


}
function backPage() {

    if (currentPage > 0) {
        currentPage--;
        document.getElementById('pe').value = "";
        showProducts(currentPage);
    }
    if (current2 > 0) {
        current2--;
        document.getElementById('pe').value = "";
        if (loai == "Giay_NBA") {
            show1Loai(sanpham.GiayBongRo[0].Giay_NBA, current2);
        }
        if (loai == "Giay_Peak") {
            show1Loai(sanpham.GiayBongRo[0].Giay_Peak, current2);
        }

    }
}
function nextPage() {

    // const totalPages = Math.ceil(allProducts.length / productsPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        document.getElementById('pe').value = "";
        showProducts(currentPage);
    }
    // const total2 = Math.ceil(Product.length / sl);
    if (current2 < total2 - 1) {
        current2++;

        document.getElementById('pe').value = "";
        console.log(total2)
        document.getElementById('total').textContent = total2;
        if (loai == "Giay_NBA") {
            show1Loai(sanpham.GiayBongRo[0].Giay_NBA, current2);
        }
        if (loai == "Giay_Peak") {
            show1Loai(sanpham.GiayBongRo[0].Giay_Peak, current2);
        }
    }
}

var Product = [];
function insertSP(obj) {
    Product.splice(0, Product.length)
    for (var id = 0; id < obj.length; id++) {
        var productName = obj[id];
        if (productName) {
            Product.push(productName);
        }
    }
}
const sl = 12; // Số sản phẩm trên mỗi trang
let current2 = 0;
var total2 = 0
function show1Loai(obj, page) {
    insertSP(obj);
    // console.log(Product)
    var min = $('#slider-range').slider('values', 0);
    var max = $('#slider-range').slider('values', 1)
    total2 = Math.ceil(Product.length / sl);
    var sanPhamDiv = document.getElementById("sanpham");
    sanPhamDiv.innerHTML = ``;
    var filteredProducts = Product.filter(function (product) {
        return product.giaM >= min && product.giaM <= max;
    });
    if (filteredProducts.length == 0) {
        document.getElementById("sanpham").innerHTML += `<h3>Không có sản phẩm</h3>`;
        document.getElementById("sanpham").style.display = "flex";
        document.getElementById("sanpham").style.justifyContent = "center";
    }
    if (sx == "Tang") {
        filteredProducts.sort(function (a, b) {
            return a.giaM - b.giaM;
        });
    }
    if (sx == "Giam") {
        filteredProducts.sort(function (a, b) {
            return b.giaM - a.giaM;
        });
    }
    const start = page * sl;
    const end = start + sl;
    console.log(start);
    console.log(end);
    const productsToDisplay = filteredProducts.slice(start, end);
    console.log(productsToDisplay)
    var pe = document.getElementById('pe');
    var tol = document.getElementById('total');
    pe.placeholder = current2 + 1;
    tol.innerHTML = total2;
    productsToDisplay.forEach(product => {
        hienSp1(product)
    });
}

function nhap_trang(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        // Xử lý khi người dùng nhấn Enter ở đây
        event.preventDefault();
        var num = document.getElementById('pe').value;
        currentPage = num - 1;
        showProducts(currentPage)
    }

}
function SapXepTang_all(page, min, max) {
    intsertGiay();
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    // Sắp xếp mảng sản phẩm theo giá tăng dần


    // Lọc sản phẩm trong khoảng giá min và max
    var filteredProducts = allProducts.filter(function (product) {
        return product.giaM >= min && product.giaM <= max;
    });

    var sanPhamDiv = document.getElementById("sanpham");
    sanPhamDiv.innerHTML = ``;
    const start = page * productsPerPage;
    const end = start + productsPerPage;
    const productsToDisplay = filteredProducts.slice(start, end);
    var pe = document.getElementById('pe');
    var tol = document.getElementById('total');
    pe.placeholder = currentPage + 1;
    tol.innerHTML = totalPages;
    productsToDisplay.forEach(product => {
        hienSp(product, min, max);
    });
}

var loai = "select";
function SapXepTang1(min, max) {
    var allProducts = [];

    for (var brand in sanpham.GiayBongRo[0]) {
        for (var id = 0; id < sanpham.GiayBongRo[0][brand].length; id++) {
            var productName = sanpham.GiayBongRo[0][brand][id];
            if (productName) {
                allProducts.push(productName);
            }
        }
    }

    // Sắp xếp mảng sản phẩm theo giá tăng dần
    allProducts.sort(function (a, b) {
        return a.giaM - b.giaM;
    });

    // Lọc sản phẩm trong khoảng giá min và max
    var filteredProducts = allProducts.filter(function (product) {
        return product.giaM >= min && product.giaM <= max;
    });

    var sanPhamDiv = document.getElementById("sanpham");
    sanPhamDiv.innerHTML = ``;
    // Hiển thị sản phẩm đã lọc
    filteredProducts.forEach(function (product, index) {
        var productInfo = `Sản phẩm ${index + 1}: ${product.name}, giáM = ${product.giaM}`;
        console.log(productInfo);
        hienSp(product, min, max);
        // if (product.id.includes("Nike")) {
        //   hienSp(product, min, max);
        // }
        // if (product.id.includes("AD")) {
        //   hienSp(product, min, max);
        // }
        // if (product.id.includes("NBA")) {
        //   hienSp(product, min, max);
        // }
        // if (product.id.includes("P")) {
        //   hienSp(product, min, max);
        // }
        // if (product.id.includes("AT")) {
        //   hienSp(product, min, max);
        // }
        // if (product.id.includes("TE")) {
        //   hienSp(product, min, max);
        // }
    });
}
function SapXepTang(min, max) {

    if (loai == "all" || loai == "select") { showProducts(0) }
    if (loai == "Giay_Nike") { sxloai_tang(sanpham.GiayBongRo[0].Giay_Nike, min, max) }
    if (loai == "Giay_Adidas") { sxloai_tang(sanpham.GiayBongRo[0].Giay_Adidas, min, max) }
    if (loai == "Giay_NBA") { sxloai_tang(sanpham.GiayBongRo[0].Giay_NBA, min, max) }
    if (loai == "Giay_Peak") { sxloai_tang(sanpham.GiayBongRo[0].Giay_Peak, min, max) }
    if (loai == "Giay_tre_Em") { sxloai_tang(sanpham.GiayBongRo[0].Giay_Tre_Em, min, max) }

}

function SapXepGiam1(min, max) {
    // Tạo một mảng để lưu trữ tất cả các sản phẩm
    var allProducts = [];

    for (var brand in sanpham.GiayBongRo[0]) {
        for (var id = 0; id < sanpham.GiayBongRo[0][brand].length; id++) {
            var productName = sanpham.GiayBongRo[0][brand][id];
            if (productName) {
                allProducts.push(productName);
            }
        }
    }

    // Sắp xếp mảng sản phẩm theo giá giảm dần
    allProducts.sort(function (a, b) {
        return b.giaM - a.giaM;
    });

    // Lọc sản phẩm trong khoảng giá min và max
    var filteredProducts = allProducts.filter(function (product) {
        return product.giaM >= min && product.giaM <= max;
    });

    var sanPhamDiv = document.getElementById("sanpham");
    sanPhamDiv.innerHTML = ``
    // Hiển thị sản phẩm đã lọc
    filteredProducts.forEach(function (product, index) {
        var productInfo = `Sản phẩm ${index + 1}: ${product.name}, giáM = ${product.giaM}`;
        // console.log(productInfo);
        hienSp(product, min, max);
        // if (product.id.includes("Nike")) {
        //   hienSp(product,min,max)
        // }
        // if (product.id.includes("AD")) {
        //   hienSp(product,min,max)
        // }
        // if (product.id.includes("NBA")) {
        //   hienSp(product,min,max)
        // }
        // if (product.id.includes("P")) {
        //   hienSp(product,min,max)
        // }
        // if (product.id.includes("AT")) {
        //   hienSp(product,min,max)
        // }
        // if (product.id.includes("TE")) {
        //   hienSp(product,min,max)     
        // }

    });
}
function SapXepGiam(min, max) {
    if (loai == "all" || loai == "select") { currentPage = 0; showProducts(0) }
    if (loai == "Giay_Nike") { sxloai_giam(sanpham.GiayBongRo[0].Giay_Nike, min, max) }
    if (loai == "Giay_Adidas") { sxloai_giam(sanpham.GiayBongRo[0].Giay_Adidas, min, max) }
    if (loai == "Giay_NBA") { sxloai_giam(sanpham.GiayBongRo[0].Giay_NBA, min, max) }
    if (loai == "Giay_Peak") { sxloai_giam(sanpham.GiayBongRo[0].Giay_Peak, min, max) }
    if (loai == "Giay_tre_Em") { sxloai_giam(sanpham.GiayBongRo[0].Giay_Tre_Em, min, max) }

}
var sx = "";
function chonSX(min, max) {
    var cbb = document.getElementById("sxGia")
    sx = cbb.value;
    console.log(sx);
    if (sx == "Tang") {
        SapXepTang(min, max)
    }
    if (sx == "Giam") {
        SapXepGiam(min, max)
    }
}
function sxloai_tang(obj, min, max) {
    var allProducts = [];

    for (var id = 0; id < obj.length; id++) {
        var productName = obj[id];
        if (productName) {
            allProducts.push(productName);
        }
    }

    // Sắp xếp mảng sản phẩm theo giá tăng dần
    allProducts.sort(function (a, b) {
        return a.giaM - b.giaM;
    });

    // Lọc sản phẩm trong khoảng giá min và max
    var filteredProducts = allProducts.filter(function (product) {
        return product.giaM >= min && product.giaM <= max;
    });

    var sanPhamDiv = document.getElementById("sanpham");
    sanPhamDiv.innerHTML = ``;
    // Hiển thị sản phẩm đã lọc
    filteredProducts.forEach(function (product, index) {
        var productInfo = `Sản phẩm ${index + 1}: ${product.name}, giáM = ${product.giaM}`;
        hienSp(product, min, max);

    });
}
function sxloai_giam(obj, min, max) {
    var allProducts = [];

    for (var id = 0; id < obj.length; id++) {
        var productName = obj[id];
        if (productName) {
            allProducts.push(productName);
        }
    }

    // Sắp xếp mảng sản phẩm theo giá giảm dần
    allProducts.sort(function (a, b) {
        return b.giaM - a.giaM;
    });

    // Lọc sản phẩm trong khoảng giá min và max
    var filteredProducts = allProducts.filter(function (product) {
        return product.giaM >= min && product.giaM <= max;
    });

    var sanPhamDiv = document.getElementById("sanpham");
    sanPhamDiv.innerHTML = ``
    // Hiển thị sản phẩm đã lọc
    filteredProducts.forEach(function (product, index) {
        var productInfo = `Sản phẩm ${index + 1}: ${product.name}, giáM = ${product.giaM}`;
        hienSp(product, min, max);
    });
}
function chonLoai(min, max) {
    var combo = document.getElementById("loaiSP");
    var selectedValue = combo.value;
    loai = selectedValue;
    document.getElementById("sxGia").value = "select"
    var divElement = document.getElementById("sanpham");
    divElement.innerHTML = "";
    console.log(selectedValue)
    if (selectedValue == "all") {
        document.getElementById('page-info').style.display = "block";
        document.getElementById('backbt').style.display = "block";
        document.getElementById('nextbt').style.display = "block";
        Product.splice(0, Product.length)
        current2 = 0
        showProducts(0);
    }
    if (selectedValue == "Giay_Nike") {
        document.getElementById('page-info').style.display = "none";
        document.getElementById('backbt').style.display = "none";
        document.getElementById('nextbt').style.display = "none";
        hienSP_loc(sanpham.GiayBongRo[0].Giay_Nike, min, max);
    }
    if (selectedValue == "Giay_Adidas") {
        hienSP_loc(sanpham.GiayBongRo[0].Giay_Adidas, min, max);
        document.getElementById('page-info').style.display = "none";
        document.getElementById('backbt').style.display = "none";
        document.getElementById('nextbt').style.display = "none";
    }
    if (selectedValue == "Giay_NBA") {
        // hienSP_loc(sanpham.GiayBongRo[0].Giay_NBA, min, max);
        document.getElementById('page-info').style.display = "block";
        document.getElementById('backbt').style.display = "block";
        document.getElementById('nextbt').style.display = "block";
        show1Loai(sanpham.GiayBongRo[0].Giay_NBA, 0)
        currentPage = 0;
        allProducts.splice(0, allProducts.length);
        // document.getElementById('page').style.display="block"
    }
    if (selectedValue == "Giay_Peak") {
        document.getElementById('page-info').style.display = "block";
        document.getElementById('backbt').style.display = "block";
        document.getElementById('nextbt').style.display = "block";
        current2 = 0

        show1Loai(sanpham.GiayBongRo[0].Giay_Peak, 0)

    }
    if (selectedValue == "Giay_AnTa") {
        hienSP_loc(sanpham.GiayBongRo[0].Giay_AnTa, min, max);
        document.getElementById('page-info').style.display = "none";
        document.getElementById('backbt').style.display = "none";
        document.getElementById('nextbt').style.display = "none";
    }
    if (selectedValue == "Giay_Tre_Em") {
        hienSP_loc(sanpham.GiayBongRo[0].Giay_Tre_Em, min, max);
        document.getElementById('page-info').style.display = "none";
        document.getElementById('backbt').style.display = "none";
        document.getElementById('nextbt').style.display = "none";
    }
}
function KiemTra(input) {
    var value = input.value;

    // Loại bỏ tất cả các ký tự không phải số
    value = value.replace(/[^0-9]/g, '');

    // Giới hạn độ dài của giá trị là 1 ký tự số
    if (value.length > 1) {
        value = value.substring(0, 1);
    }

    // Cập nhật giá trị của thẻ input
    input.value = value;
}
function showCTSP(id) {
    window.location.href = "ChiTietSP_giay.html?id=" + id;
}
function tinh_tienCart() {
    var count=0;
    // event.defaultPrevented;
    
    var sum=0;
    for (let index = 0; index < loginData.cart.length; index++) {
        console.log(loginData.cart[index])
        console.log(loginData.cart[index].name);
        sum += parseFloat(loginData.cart[index].price * loginData.cart[index].quantity)
        count += loginData.cart[index].quantity;

        console.log(format.format(sum))
        // document.getElementById('sum-price').textContent = format1.format(sum) + 'đ';
        document.getElementById('price-cart').textContent = format.format(parseInt(sum)) + 'đ';
        // TinhSumTien();
        document.getElementById('countSP').textContent=count;
    }
}
function addToCart(spID) {
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData != null) {
        var userData = JSON.parse(localStorage.getItem(loginData.username));
        var inCart = false;

        for (let index = 0; index < loginData.cart.length; index++) {
            if (loginData.cart[index].id == spID && loginData.cart[index].size == sz) {
                inCart = true;

                loginData.cart[index].quantity += parseInt(document.getElementById('sl').value);

                localStorage.setItem("loginData", JSON.stringify(loginData));
                localStorage.setItem(loginData.username, JSON.stringify(loginData));

                alert("Sản phẩm đã có trong giỏ hàng");
                tinh_tienCart();
                location.reload();
                break;
            }
        }
        if (!inCart) {
            var cartData = {
                id: spID,
                name: document.getElementById('nname').textContent,
                quantity: parseInt(document.getElementById('sl').value),
                img: document.getElementById('anhgio').getAttribute('src'),
                size: sz,
                price: gia,
                color:''
            };

            loginData.cart.push(cartData);
            userData.cart.push(cartData);

            localStorage.setItem("loginData", JSON.stringify(loginData));
            localStorage.setItem(loginData.username, JSON.stringify(userData));
            
            alert("Sản phẩm đã được thêm vào giỏ hàng");
            tinh_tienCart();
            location.reload();
        }
        
    }
    else {
        alert("Vui lòng đăng nhập trước khi mua hàng");
        window.location.href = "login.html";
    }
    
}

