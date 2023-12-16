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

// const sanpham = JSON.parse(localStorage.getItem("sanpham"));
// const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });

function timGiaMin(obj) {
  console.log(obj)

  var minValue = Number.POSITIVE_INFINITY; // Giá trị ban đầu của giá trị nhỏ nhất
  obj.forEach(ob => {
    if (ob.giaM < minValue)
      minValue = ob.giaM
  });

  return minValue;

}
function timGiaMax(obj) {
  console.log(obj)
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

  // ArrMin.push(timGiaMin(sanpham.Bong[0]))

  // ArrMax.push(timGiaMax(sanpham.PhuKien[0].Tat))

  Gmin = timGiaMin(sanpham.Bong)
  // Tìm giá trị lớn nhất trong ArrMax
  Gmax = timGiaMax(sanpham.Bong)
  // console.log(ArrMax)
  // console.log(ArrMin)
}

// console.log(sanpham.Bong[0])
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
var allProducts = [];
var loais = ''
function intsertGiay() {
  allProducts.splice(0, allProducts.length);
  for (var id = 0; id < sanpham.Bong.length; id++) {
    var productName = sanpham.Bong[id];
    if (productName) {
      allProducts.push(productName);
    }
  }

}
function backPage() {

  if (currentPage2 > 0) {
    currentPage2--;
    document.getElementById('pe').value = "";
    showProducts(currentPage2);
  }

}
function nextPage() {

  // const totalPages2 = Math.ceil(allProducts.length / productsPerPage2);
  if (currentPage2 < totalPages2 - 1) {
    currentPage2++;
    document.getElementById('pe').value = "";
    showProducts(currentPage2);
  }

}
function nhap_trang(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    // Xử lý khi người dùng nhấn Enter ở đây
    event.preventDefault();
    var num = document.getElementById('pe').value;
    currentPage2 = num - 1;
    showProducts(currentPage2)
  }

}
var productsPerPage2 = 8; // Số sản phẩm trên mỗi trang
var currentPage2 = 0;
var totalPages2 = 0;
var sx = '';
function showProducts(page) {
  intsertGiay();
  console.log(sx)
  // console.log(allProducts)
  var min = $('#slider-range').slider('values', 0);
  var max = $('#slider-range').slider('values', 1)
  // console.log(allProducts)
  // console.log(allProducts.slice(5 * 12))
  var sanPhamDiv = document.getElementById("sanpham");
  sanPhamDiv.innerHTML = ``;
  var filteredProducts = allProducts.filter(function (product) {
    return product.giaM >= min && product.giaM <= max;
  });
  if (allProducts.length == 0) {
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
  // console.log(filteredProducts)
  const start = page * productsPerPage2;
  const end = start + productsPerPage2;
  totalPages2 = Math.ceil(allProducts.length / productsPerPage2);
  // console.log(totalPages2)
  // console.log(allProducts.length-(totalPages2-1)*productsPerPage2)
  // console.log(allProducts.slice(totalPages2,allProducts.length-(totalPages2-1)*productsPerPage2))
  const productsToDisplay = filteredProducts.slice(start, end);
  var pe = document.getElementById('pe');
  var tol = document.getElementById('total');
  pe.placeholder = currentPage2 + 1;
  tol.innerHTML = totalPages2;
  productsToDisplay.forEach(product => {
    loadBong(product)

  });


}
var colorIDD='';
function showImgQuickView(sanphamid,imgSrc,color,id,button) {
  imgSrc2 = imgSrc;
  var slides = document.getElementsByClassName("silde-div123");
  for (let index = 0; index < slides.length; index++) {
    if (slides[index].style.display == "block") {
      slides[index].src = imgSrc;
    }
  }
  // color2=color;
  var product = "";
  for (var spB = 0; spB < sanpham.Bong.length; spB++) {
    if (sanpham.Bong[spB].id == sanphamid) {
      product = sanpham.Bong[spB];
      break;
    }
  }
  console.log(product);
  for (var i = 0; i < product.img.length; i++) {
    
    console.log(product.img[i].SoLuong);

    if (product.img[i].SoLuong[0] <= 0) {
      document.getElementById("szb5").pointerEvents='none'
      document.getElementById("szb5").style.color="#999"
      // document.getElementById("szb5").style.border="1px soild #999"
    }
    
    else {
      document.getElementById("szb5").pointerEvents='auto'
    }
    if (product.img[i].SoLuong[1] <= 0) {
      document.getElementById("szb6").pointerEvents='none'
      document.getElementById("szb6").style.color="#999"
    }
    else {
      document.getElementById("szb6").pointerEvents='auto'
    }
    if (product.img[i].SoLuong[2] <= 0) {
      document.getElementById("szb7").pointerEvents='none'
      document.getElementById("szb7").style.color="#999"
    }
    else {
      document.getElementById("szb7").pointerEvents='auto'
    }
    colorIDD=color;
    idMau=id;
    console.log(colorIDD)
    
  }
  if (button.classList.contains("clicked")) {
    // Nếu đã chọn, hủy chọn
    // button.style.boder="1px soild black"
    buttons[i].classList.remove("clicked");
    document.getElementById('mmau').textContent=""

    // document.getElementById('size-option').style.pointerEvents='none'
  } else {
    // Nếu chưa chọn, hủy chọn tất cả các button khác và chọn button mới
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("clicked");
      // button.style.boder="1px soild black"
      document.getElementById('mmau').textContent=""

    }
    button.classList.add("clicked");
    // button.style.boder="1px soild green"
    document.getElementById('mmau').textContent=" "+color
  }
}
function loadSP() {
  showProducts(0);
}

function chonSX() {
  var cbb = document.getElementById("sxGia")
  sx = cbb.value;
  console.log(sx);
  showProducts(0);
}
var sz=0;
function chonsize(button,size) {

  if (button.classList.contains("clicked")) {
    // Nếu đã chọn, hủy chọn
    button.classList.remove("clicked");
    document.getElementById('solg').innerHTML = ""
    document.querySelector(".item-sl").style.opacity = 0.5;
    document.querySelector(".but-add").style.opacity = 0.5;
    document.querySelector(".item-sl").style.pointerEvents = 'none'
    document.querySelector(".but-add").style.pointerEvents = 'none';
    // document.getElementById('size-option').style.pointerEvents='none'
  } else {
    // Nếu chưa chọn, hủy chọn tất cả các button khác và chọn button mới
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("clicked");
    }

    button.classList.add("clicked");
    // load_solg(product,button.textContent);
    document.querySelector(".item-sl").style.opacity = 1;
    document.querySelector(".but-add").style.opacity = 1;
    document.querySelector(".item-sl").style.pointerEvents = 'auto';
    document.querySelector(".but-add").style.pointerEvents = 'auto';
    sz=size
    // document.getElementById('size-option').style.pointerEvents='auto';
  }

}
var imgSrc2=''
function chonMau(button, imgID, imgSrc, anhCu) {
  var imgData = document.getElementById(imgID);
  // var anhCu=imgData.getAttribute('src')
  // console.log(imgID)
  // console.log(anhCu)
  // console.log(imgSrc)
 
  if (button.classList.contains("clicked")) {
    //nếu đã chọn, hủy chọn
    button.classList.remove("clicked");
    // alert(anhCu);
    imgData.src = anhCu;
  }
  else {
    //nếu chưa chọn, hủy chọn tất cả các button khác và chọn button mới
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("clicked");
    }
    button.classList.add("clicked");
    imgData.src = imgSrc;
  }
}
function loadBong(obj) {
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
function chonLoai() {
  var cbb = document.getElementById("loaiSP")
  loais = cbb.value;
  console.log(loais);
  showProducts(0);
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
  let slides = document.getElementsByClassName("silde-div123");
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
  let slides = document.getElementsByClassName("silde-div123");
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
function showViewBong(sanphamid) {
  var product = "";
  for (var spB = 0; spB < sanpham.Bong.length; spB++) {
    if (sanpham.Bong[spB].id == sanphamid) {
      product = sanpham.Bong[spB];
      break;
    }
  }
  console.log(product)
  var sizeHTML = '';
  var hinhAnh = '';
  var mau = '';
  for (var i = 0; i < product.img.length; i++) {
    var currentColor = product.img[i].color;
    // console.log("Color:", currentColor);
    mau = currentColor;
    // Loop through the image properties (img1, img2, etc.)
    for (var key in product.img[i]) {
      if (key.startsWith("img")) {
        var currentImage = product.img[i][key];
        // console.log("Image:", currentImage);
        if (i == 0) {
          hinhAnh +=
            `<img class="silde-div123" style="display: block;" src="${currentImage}" alt="" width="90%">`
        }
        else {
          hinhAnh +=
            `<img class="silde-div123" style="display: none;" src="${currentImage}" alt="" width="90%">`
        }
      }

    }
    if (product.img[i].SoLuong.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;}, 0) > 0) {
      sizeHTML += `<button onclick="showImgQuickView('${product.id}','${product.img[i].img1.replace(/\\/g, "\\\\")}','${product.img[i].color}','${i}',this);"style="background-image: url(${product.img[i].img1.replace(/\\/g, "\\\\")}); background-size: cover;"></button>`
    }
    else {
      sizeHTML += `<button class="anButton" onclick="" "style="background-image: url(${product.img[i].img1.replace(/\\/g, "\\\\")}); background-size: cover;"></button>`

    }
    // console.log("-------------------");
    
  }
  // console.log(sizeHTML)
  // console.log(hinhAnh);
  // for (var i = 0; i < product.img.length; i++) {
  //   // color2 = product.img[i].color;
  //   console.log(product.img)
  //   for (let index = 0; index < product.img[i].SoLuong.length; index++) {
  //     if (product.img.SoLuong[index] != 0) {

  //       if (product.img[i].img2 != null) {
  //         sizeHTML += `<button onclick="chonsize(this);showImgQuickView('${product.img[i].img2.replace(/\\/g, "\\\\")}','${product.img[i].color}'); loadSizeQuanAo('${sanphamid}', ${index - 1});" style="background-image: url(${product.img[i].img2.replace(/\\/g, "\\\\")}); background-size: cover;";></button>`;

  //       }
  //       else {
  //         sizeHTML += `<button onclick="chonsize(this);showImgQuickView('${product.img[i].img1.replace(/\\/g, "\\\\")}','${product.img[i].color}'); loadSizeQuanAo('${sanphamid}', ${index - 1});" style="background-image: url(${product.img[i].img1.replace(/\\/g, "\\\\")}); background-size: cover;";></button>`;

  //       }
  //       break;
  //     }
  //     if (index == product.img[i].SoLuong - 1) {
  //       sizeHTML += `<button class="anButton" onclick="chonsize(this)" style="background-image: url(${product.img[i].img1.replace(/\\/g, "\\\\")}); background-size: cover;"></button>`;
  //     }
  //   }
  //   if (i == 0) {
  //     hinhAnh +=
  //       `<img class="silde-div123" style="display: block;" src="${product.img[i].img1}" alt="" width="90%">`
  //   }
  //   else {
  //     hinhAnh +=
  //       `<img class="silde-div123" style="display: none;" src="${product.img[i].img1}" alt="" width="90%">`
  //   }
  // }
  var gia = ""
  // var sale = ""

  if (product.giaC - product.giaM == 0) {
    gia = `<p class="gia-tien">${format.format(product.giaM)} ₫</p>`
  }
  else {
    // sale = `<div class="sale">-${Math.ceil(100 - (product.giaM / obj.giaC) * 100)}%</div>`
    gia = `<p class="gia-tien"><span>${format.format(product.giaC)} ₫</span>  ${format.format(product.giaM)} ₫</p>`
  }
   prc = product.giaM;
   document.getElementById("div-quick").innerHTML = ``;
   document.getElementById("div-quick").innerHTML = `

    <div class="show-quick-view">
    <div class="close-button" onclick="closeForm()">&times;</div>
        <div class="silde1">
            ${hinhAnh}

            <div class="btn-left" onclick="showL()">&lt;</div>
            <div class="btn-right" onclick="showR()">&gt;</div>
            <div style="text-align:center">
                <span class="dot" onclick="setIndexSlideBody2(0)"></span>
                <span class="dot" onclick="setIndexSlideBody2(1)"></span>
                <span class="dot" onclick="setIndexSlideBody2(2)"></span>
                

            </div>
        </div>
        <div style="margin-left: 35px; margin-top: 30px;">
            <h3 style="color: orange;" id="nname">${product.name}</h3>
            ${gia}
            <h5>Màu sắc:<span id ="mmau"></span></h5>
            <div class="chon-size ctsp">
                ${sizeHTML}
            </div>
            <div class ="szbong">
              <button id="szb5" style="background-size: cover;" onclick="chonsize(this,5); load_solg('${product.id}',5)">Bóng số 5</button>
              <button id="szb6" style="background-size: cover;"  onclick="chonsize(this,6); load_solg('${product.id}',6)">Bóng số 6</button>
              <button id="szb7" style="background-size: cover;"  onclick="chonsize(this,7); load_solg('${product.id}',7)">Bóng số 7</button>
            </div>
            
                        
            
            <div><p id="solg"></p></div>
            <div class="item-sl">
                <button onclick="tru()">-</button>
                <input type="text" value="1" id="sl" onkeypress="nhap_sl(event)" onblur="OnBlur1()">
                <button onclick="cong()">+</button>
            </div>
            <div class="but-add">
                <button onclick="addToCart('${product.id}')">THÊM VÀO GIỎ HÀNG</button>

            </div>
        </div>
    </div>`;
  show();
}
var idMau='';
var idsp='';
var sll=0;
function load_solg(sanphamid,size2){
  // idMau=colorIDD;
  idsp=sanphamid;
  console.log(idMau)
  // var size2= document.getElementById('size-option').value
  // console.log(size2);
  var product;
    for (var i = 0; i < sanpham.Bong.length; i++) {
      if (sanpham.Bong[i].id == sanphamid) {
        product = sanpham.Bong[i];
        break;
      }
    
  }
 
  console.log(product)
  document.getElementById('solg').innerHTML = '';
  for (let j = 0; j < product.img[idMau].size.length; j++) {

    if(product.img[idMau].size[j]==size2){
          document.getElementById('solg').innerHTML = `Còn ${product.img[idMau].SoLuong[j]} hàng`
          sll=product.img[idMau].SoLuong[j];
          console.log(sll)

    }
  }
}
function addToCart(spID) {
  var loginData = JSON.parse(localStorage.getItem("loginData"));
  if (loginData != null) {
    var userData = JSON.parse(localStorage.getItem(loginData.username));
    var inCart = false;

    for (let index = 0; index < loginData.cart.length; index++) {
      if (loginData.cart[index].id == spID && loginData.cart[index].color == colorIDD) {
        if (loginData.cart[index].size == sz) {
          inCart = true;

          loginData.cart[index].quantity += parseInt(document.getElementById('sl').value);

          localStorage.setItem("loginData", JSON.stringify(loginData));
          localStorage.setItem(loginData.username, JSON.stringify(loginData));

          alert("Sản phẩm đã có trong giỏ hàng");
          // tinh_tienCart();
          break;
        }

      }
    }
    if (!inCart) {
      var cartData = {
        id: spID,
        name: document.getElementById('nname').textContent,
        quantity: parseInt(document.getElementById('sl').value),
        img: imgSrc2,
        size: sz,
        price: prc,
        color: colorIDD
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

