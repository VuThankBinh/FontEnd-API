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
// function load_solg(obj, size) {
//   // console.log(size)
//   for (var i = 0; i < obj.size.length; i++) {
//       if (obj.img[i] == size) {
//           document.getElementById('solg').innerHTML = `Còn ${obj.SoLuong[i]} hàng`

//       }
//   }
// }
var product = "";
function chonsize(button) {

  if (button.classList.contains("clicked")) {
    // Nếu đã chọn, hủy chọn
    button.classList.remove("clicked");
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
    var computedStyle = getComputedStyle(button);
    var backgroundImage = computedStyle.getPropertyValue('background-image');

    // Use a regular expression to extract the relative path
    var match = backgroundImage.match(/url\(["']?(.*?)["']?\)/);

    if (match) {
      // match[1] contains the captured relative path
      var relativePath = match[1];

      // Remove any leading and trailing slashes
      relativePath = relativePath.replace(/^\/|\/$/g, '');

      console.log(relativePath);
    }
    // console.log(getComputedStyle(button).getPropertyValue('background-image').match(/url\(["']?(.*?)["']?\)/));

    // console.log(button.getAttribute('background-image').replace(/\\/g, "\\\\"))
    load_solg(product, relativePath);

    document.querySelector(".item-sl").style.opacity = 1;
    document.querySelector(".but-add").style.opacity = 1;
    document.querySelector(".item-sl").style.pointerEvents = 'auto';
    document.querySelector(".but-add").style.pointerEvents = 'auto';
  }

}

// const sanpham = JSON.parse(localStorage.getItem("sanpham"));
// const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });

var allProducts = [];
var loais = ''
function intsertGiay() {
  allProducts.splice(0, allProducts.length);
  if (loais == "all" || loais == '' || loais == 'select') {
    for (var brand in sanpham.PhuKien[0]) {
      for (var id = 0; id < sanpham.PhuKien[0][brand].length; id++) {
        var productName = sanpham.PhuKien[0][brand][id];
        if (productName) {
          allProducts.push(productName);
        }
      }
    }
  }
  if (loais == 'Tat') {
    for (var id = 0; id < sanpham.PhuKien[0].Tat.length; id++) {
      var productName = sanpham.PhuKien[0].Tat[id];
      if (productName) {
        allProducts.push(productName);
      }
    }

  }
  if (loais == 'Balo') {
    for (var id = 0; id < sanpham.PhuKien[0].Balo.length; id++) {
      var productName = sanpham.PhuKien[0].Balo[id];
      if (productName) {
        allProducts.push(productName);
      }
    }
  }
  if (loais == 'BaoHo') {
    for (var id = 0; id < sanpham.PhuKien[0].BaoHo.length; id++) {
      var productName = sanpham.PhuKien[0].BaoHo[id];
      if (productName) {
        allProducts.push(productName);
      }
    }
  }

}

// var productsPerPage = 12; // Số sản phẩm trên mỗi trang
// var currentPage = 0;
// var totalPages = 0;
var sx = '';
function showProducts(page) {
  intsertGiay();
  // console.log(sx)
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
  const start = page * productsPerPage;
  const end = start + productsPerPage;
  totalPages = Math.ceil(allProducts.length / productsPerPage);
  // console.log(totalPages)
  // console.log(allProducts.length-(totalPages-1)*productsPerPage)
  // console.log(allProducts.slice(totalPages,allProducts.length-(totalPages-1)*productsPerPage))
  const productsToDisplay = filteredProducts.slice(start, end);
  var pe = document.getElementById('pe');
  var tol = document.getElementById('total');
  pe.placeholder = currentPage + 1;
  tol.innerHTML = totalPages;
  productsToDisplay.forEach(product => {
    loadPhuKien(product)
  });


}
function chonColor(button, imgID, imgSrc, anhCu) {
  var imgData = document.getElementById(imgID);
  // var anhCu=imgData.getAttribute('src')
  console.log(imgID)
  console.log(anhCu)
  console.log(imgSrc)
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

function chonLoai() {
  var cbb = document.getElementById("loaiSP")
  loais = cbb.value;
  console.log(loais);
  showProducts(0);
}
function backPage() {

  if (currentPage > 0) {
    currentPage--;
    document.getElementById('pe').value = "";
    showProducts(currentPage);
  }

}
function nextPage() {

  // const totalPages = Math.ceil(allProducts.length / productsPerPage);
  if (currentPage < totalPages - 1) {
    currentPage++;
    document.getElementById('pe').value = "";
    showProducts(currentPage);
  }

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
  ArrMin.push(timGiaMin(sanpham.PhuKien[0].Tat))
  ArrMin.push(timGiaMin(sanpham.PhuKien[0].Balo))
  ArrMin.push(timGiaMin(sanpham.PhuKien[0].BaoHo))

  ArrMax.push(timGiaMax(sanpham.PhuKien[0].Tat))
  ArrMax.push(timGiaMax(sanpham.PhuKien[0].Balo))
  ArrMax.push(timGiaMax(sanpham.PhuKien[0].BaoHo))

  Gmin = Math.min.apply(null, ArrMin);
  // Tìm giá trị lớn nhất trong ArrMax
  Gmax = Math.max.apply(null, ArrMax);
  // console.log(ArrMax)
  // console.log(ArrMin)
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
function loadSP() {
  showProducts(0);
}
function chonSX() {
  var cbb = document.getElementById("sxGia")
  sx = cbb.value;
  console.log(sx);
  showProducts(0);
}
function hienSP_loc(obj, min, max) {
  obj.forEach(sanpham => {
    var sizeHTML = "";
    if (sanpham.giaM >= min && sanpham.giaM <= max) {
      for (var i = 0; i < sanpham.size.length; i++) {
        if (sanpham.soLuong[i] != 0) {
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
var sll=0;
function load_solg(obj, img3) {
  // console.log(img3)
  var imagee = img3.split('http://127.0.0.1:3000/')[1].replace(/\//g, '\\');
  // console.log(imagee)
  // console.log(obj.img)
  for (var i = 0; i < obj.img.length; i++) {
    var currentColor = obj.img[i].color;
    // console.log("Color:", currentColor);
  
    // Iterate over the image properties (img1, img2, img3, etc.)
    for (var j = 1; obj.img[i]["img" + j]; j++) {
      var currentImg = obj.img[i]["img" + j];
      if (currentImg == imagee) {
        document.getElementById('solg').innerHTML = `Còn ${obj.SoLuong[i]} hàng`
        sll=obj.SoLuong[i];
      }
      // console.log("Image " + j + ":", currentImg);
    }
  
    // console.log("-------------------");
  }
  // for (var i = 0; i < obj.img.length; i++) {
  // console.log(obj.img[i].img1)
  //   if (obj.img[i].img1 == imagee) {
  //     document.getElementById('solg').innerHTML = `Còn ${obj.SoLuong[i]} hàng`

  //   }
  // }
}
function nhap_sl(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    // Xử lý khi người dùng nhấn Enter ở đây
    event.preventDefault();
    var num = document.getElementById('sl').value;
    if(num>sll){
      alert("Shop không có đủ hàng cho bạn!!! Sorry!!!")
      document.getElementById('sl').value=1;
    }
  }

}
function OnBlur1(event) {
  var num = parseInt(document.getElementById('sl').value, 10);

  if (num > sll) {
    alert("Shop không có đủ hàng cho bạn!!! Sorry!!!");
    document.getElementById('sl').value = 1;
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
  if(sl<=sll){
    document.getElementById("sl").value = sl;
  }
  else{
    alert("Shop không có đủ hàng cho bạn!!! Sorry!!!")
  }

}

function showImgQuickView(imgSrc, color) {
  imgSrc2 = imgSrc;
  var slides = document.getElementsByClassName("silde-div1");
  for (let index = 0; index < slides.length; index++) {
    if (slides[index].style.display == "block") {
      slides[index].src = imgSrc;
    }
  }
  color2 = color;
}
function loadSizeQuanAo(sanphamid, colorIndex) {
  var product;
  for (var i = 0; i < sanpham.QuanAo[0].QuanAo_bo.length; i++) {
    if (sanpham.QuanAo[0].QuanAo_bo[i].id == sanphamid) {
      product = sanpham.QuanAo[0].QuanAo_bo[i];
      break;
    }
  }
  document.getElementById('size-option').innerHTML = '';
  for (let j = 0; j < product.img[colorIndex].size.length; j++) {
    if (product.img[colorIndex].SoLuong[j] > 0) {
      console.log(product.img[colorIndex].SoLuong[j]);
      document.getElementById('size-option').innerHTML += `<option value="${product.img[colorIndex].size[j]}">${product.img[colorIndex].size[j]}</option>`
    }
  }
}

var prc = 0;
function showViewPhuKien(sanphamid) {

  for (const type in sanpham.PhuKien[0]) {
    for (var i = 0; i < sanpham.PhuKien[0][type].length; i++) {
      if (sanpham.PhuKien[0][type][i].id == sanphamid) {
        product = sanpham.PhuKien[0][type][i];
        break;
      }
    }
  }

  console.log(product)

  var sizeHTML = '';
  var hinhAnh = '';
  for (var i = 0; i < product.img.length; i++) {
    color2 = product.img[i].color
    if (product.SoLuong[i] != 0) {
      if (product.img[i].img2 != null) {
        sizeHTML += `<button onclick="chonsize(this),showImgQuickView('${product.img[i].img2.replace(/\\/g, "\\\\")}','${product.img[i].color}');" style="cursor: pointer;background-image: url(${product.img[i].img2.replace(/\\/g, "\\\\")}); background-size: cover; "></button>`;
      }
      else {
        sizeHTML += `<button onclick="chonsize(this),showImgQuickView('${product.img[i].img1.replace(/\\/g, "\\\\")}','${product.img[i].color}');" style="background-image: url(${product.img[i].img1.replace(/\\/g, "\\\\")}); background-size: cover;";></button>`;
      }
    }
    else {
      sizeHTML += `<button class="anButton" onclick="chonsize(this)" style="background-image: url(${product.img[i].img1.replace(/\\/g, "\\\\")}); background-size: cover;"></button>`;
    }
    if (i == 0) {
      hinhAnh +=
        `<img class="silde-div1" style="display: block;" src="${product.img[i].img1}" alt="" width="90%">`
    }
    else {
      hinhAnh +=
        `<img class="silde-div1" style="display: none; id="nimg" src="${product.img[i].img1}" alt="" width="90%">`
    }
  }
  var gia = ``
  if (product.giaC - product.giaM == 0) {
    gia = `<p class="gia-tien">  ${format.format(product.giaM)} ₫</p>`
    prc = product.giaC
  }
  else {
    gia = `<p class="gia-tien"><span>${format.format(product.giaC)} ₫</span>  ${format.format(product.giaM)} ₫</p>`
    prc = product.giaM
  }

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
                <span class="dot" onclick="setIndexSlideBody2(3)"></span>
                <span class="dot" onclick="setIndexSlideBody2(4)"></span>
               
            </div>
        </div>
        <div style="margin-left: 35px; margin-top: 30px;">
            <h3 style="color: orange;" id="nname">${product.name}</h3>
            ${gia}
            <h5>Màu sắc</h5>
            <div class="chon-size ctsp">
                ${sizeHTML}
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
var imgSrc2 = '';
var color2 = '';
function addToCart(spID) {
  var loginData = JSON.parse(localStorage.getItem("loginData"));
  if (loginData != null) {
    var userData = JSON.parse(localStorage.getItem(loginData.username));
    var inCart = false;

    for (let index = 0; index < loginData.cart.length; index++) {
      if (loginData.cart[index].id == spID && loginData.cart[index].color == color2) {

        inCart = true;

        loginData.cart[index].quantity += parseInt(document.getElementById('sl').value);

        localStorage.setItem("loginData", JSON.stringify(loginData));
        localStorage.setItem(loginData.username, JSON.stringify(loginData));

        alert("Sản phẩm đã có trong giỏ hàng");
        // tinh_tienCart();
        break;


      }
    }
    if (!inCart) {
      var cartData = {
        id: spID,
        name: document.getElementById('nname').textContent,
        quantity: parseInt(document.getElementById('sl').value),
        img: imgSrc2,
        size: '',
        price: prc,
        color: color2
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






