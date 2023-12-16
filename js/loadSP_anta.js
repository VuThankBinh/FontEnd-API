// fetch('./js/SanPham.json')
//   .then(function (res) {
//     return res.json();
//   })
//   .then(function (data) {
//     localStorage.setItem("sanpham", JSON.stringify(data));
//     console.log("saved");
//   })
//   .catch(function (err) {
//     console.log(err);
//   })
// function scrollToTop() {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth'
//   });
// }
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

// const sanpham = JSON.parse(localStorage.getItem("sanpham"));
// const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });



//loadGiayAnTa
function loadGiayAnTa() {
  sanpham.GiayBongRo[0].Giay_AnTa.forEach(sanpham => {
    var sizeHTML = "";
    // sanpham.size.forEach(size => {
    //   sizeHTML += `<button onclick="chonsize(this)">${size}</button>`;
    // });
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
            <div class="quick-view" onclick="showView('${sanpham.id}')"> QUICK VIEW</div>
        </div>
        <h4 class="ten-sanpham" onclick="showCTSP('${sanpham.id}')">${sanpham.name}</h4>
        ${gia}
        
        <div class="chon-size">
            ${sizeHTML}
        </div>
    </div>`
  });
}
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
var Gmin = timGiaMin(sanpham.GiayBongRo[0].Giay_AnTa), Gmax = timGiaMax(sanpham.GiayBongRo[0].Giay_AnTa);




function loc() {
  //   MinMax();
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


      document.getElementById("sanpham").innerHTML +=
        `<div onclick="${sanpham.id}" class="col-3 col-s-6"><br><div class="sanpham" id="${sanpham.id}">
    <div class="img-sanpham">
    <div class="box-img">
                        <div class="sale">-${Math.ceil(100 - (sanpham.giaM / sanpham.giaC) * 100)}%</div>
                            <img src="${sanpham.img[0].img1}" alt="" id="anh${sanpham.id}">
                    </div>
        
        <div class="quick-view" onclick="showView('${sanpham.id}')"> QUICK VIEW</div>
    </div>
    <h4 class="ten-sanpham" onclick="showCTSP('${sanpham.id}')">${sanpham.name}</h4>
    <p class="gia-tien"><span>${format.format(sanpham.giaC)} ₫</span>  ${format.format(sanpham.giaM)} ₫</p>
    <div class="chon-size">
        ${sizeHTML}
    </div>
</div>`
    }
  });
}
function loadSP(min, max) {
  document.getElementById("sxGia").value = "select"
  //   document.getElementById("loaiSP").value="select"
  var divElement = document.getElementById("sanpham");
  divElement.innerHTML = "";
  hienSP_loc(sanpham.GiayBongRo[0].Giay_AnTa, min, max);
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
function showView(sanphamid) {

  console.log(sanphamid)

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
  // console.log(product)

  var sizeHTML = '';
  // console.log(product)
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


    document.getElementById("sanpham").innerHTML +=
      `<div onclick="${obj.id}" class="col-3 col-s-6"><br><div class="sanpham" id="${obj.id}">
    <div class="img-sanpham">
    <div class="box-img">
                        <div class="sale">-${Math.ceil(100 - (obj.giaM / obj.giaC) * 100)}%</div>
                            <img src="${obj.img[0].img1}" alt="" id="anh${obj.id}">
                    </div>
        
        <div class="quick-view" onclick="showView('${obj.id}')"> QUICK VIEW</div>
    </div>
    <h4 class="ten-sanpham"onclick="showCTSP('${obj.id}')">${obj.name}</h4>
    <p class="gia-tien"><span>${format.format(obj.giaC)} ₫</span>  ${format.format(obj.giaM)} ₫</p>
    <div class="chon-size">
        ${sizeHTML}
    </div>
</div>`
  }
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

  });
}

function chonSX(min, max) {
  var cbb = document.getElementById("sxGia")
  var sx = cbb.value;
  console.log(sx);
  if (sx == "Tang") {
    sxloai_tang(sanpham.GiayBongRo[0].Giay_AnTa, min, max)
  }
  if (sx == "Giam") {
    sxloai_giam(sanpham.GiayBongRo[0].Giay_AnTa, min, max)
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
    console.log(productInfo);
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
function showCTSP(id) {
  window.location.href = "ChiTietSP_giay.html?id=" + id;
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
        color: ''
      };

      loginData.cart.push(cartData);
      userData.cart.push(cartData);

      localStorage.setItem("loginData", JSON.stringify(loginData));
      localStorage.setItem(loginData.username, JSON.stringify(userData));
      tinh_tienCart();
      alert("Sản phẩm đã được thêm vào giỏ hàng");
    }

  }
  else {
    alert("Vui lòng đăng nhập trước khi mua hàng");
    window.location.href = "login.html";
  }

}
// const loginData = JSON.parse(localStorage.getItem("loginData"));
function tinh_tienCart() {
  // event.defaultPrevented;
  var sum = 0;
  for (let index = 0; index < loginData.cart.length; index++) {
    // console.log(loginData.cart[index])
    // console.log(loginData.cart[index].name);
    sum += parseFloat(loginData.cart[index].price * loginData.cart[index].quantity)


    // console.log(format.format(sum))
    // document.getElementById('sum-price').textContent = format1.format(sum) + 'đ';
    document.getElementById('price-cart').textContent = format.format(parseInt(sum)) + 'đ';
    // TinhSumTien();
  }
}