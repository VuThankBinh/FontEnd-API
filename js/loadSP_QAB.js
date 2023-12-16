
function chonsize(button) {

  if (button.classList.contains("clicked")) {
    // Nếu đã chọn, hủy chọn
    button.classList.remove("clicked");
    document.getElementById('solg').innerHTML = ""
    document.querySelector(".item-sl").style.opacity = 0.5;
    document.querySelector(".but-add").style.opacity = 0.5;
    document.querySelector(".item-sl").style.pointerEvents = 'none'
    document.querySelector(".but-add").style.pointerEvents = 'none';
    document.getElementById('size-option').style.pointerEvents='none'
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
    document.getElementById('size-option').style.pointerEvents='auto';
  }

}

// const sanpham = JSON.parse(localStorage.getItem("sanpham"));
// const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });

var allProducts = [];
var loais=''
function chonLoai(){
  var cbb = document.getElementById("loaiSP")
  loais = cbb.value;
  console.log(loais);
  showProducts(0);
}
function intsertGiay() {
  allProducts.splice(0, allProducts.length);
  if (loais == "all" || loais == ''|| loais=='select') {
    for (var brand in sanpham.QuanAo[0]) {
      for (var id = 0; id < sanpham.QuanAo[0][brand].length; id++) {
        var productName = sanpham.QuanAo[0][brand][id];
        if (productName) {
          allProducts.push(productName);
        }
      }
    }
  }
  if (loais == 'QuanAoBo') {
    for (var id = 0; id < sanpham.QuanAo[0].QuanAo_bo.length; id++) {
      var productName = sanpham.QuanAo[0].QuanAo_bo[id];
      if (productName) {
        allProducts.push(productName);
      }
    }

  }
  if (loais == 'Ao') {
    for (var id = 0; id < sanpham.QuanAo[0].Ao.length; id++) {
      var productName = sanpham.QuanAo[0].Ao[id];
      if (productName) {
        allProducts.push(productName);
      }
    }
  }
  if (loais == 'Quan') {
    for (var id = 0; id < sanpham.QuanAo[0].Quan.length; id++) {
      var productName = sanpham.QuanAo[0].Quan[id];
      if (productName) {
        allProducts.push(productName);
      }
    }
  }
  if (loais == 'Pro_Combat') {
    for (var id = 0; id < sanpham.QuanAo[0].Pro_Combat.length; id++) {
      var productName = sanpham.QuanAo[0].Pro_Combat[id];
      if (productName) {
        allProducts.push(productName);
      }
    }
  }
}

 // Số sản phẩm trên mỗi trang
// var currentPage = 0;
// var totalPages = 0;
var sx = "";
function showProducts(page) {
  intsertGiay();
  // console.log(allProducts) 
  var min = $('#slider-range').slider('values', 0);
  var max = $('#slider-range').slider('values', 1)
  // console.log(allProducts)
  // console.log(allProducts.slice(5 * 12))
  var sanPhamDiv = document.getElementById("sanpham");
  sanPhamDiv.innerHTML = ``;
  var filteredProducts = allProducts.filter(function (product) {
    return product.price >= min && product.price <= max;
  });
  if (filteredProducts.length == 0) {
    document.getElementById("sanpham").innerHTML += `<h3>Không có sản phẩm</h3>`;
    document.getElementById("sanpham").style.display = "flex";
    document.getElementById("sanpham").style.justifyContent = "center";
  }
  // console.log(sx)
  if (sx == "Tang") {
    filteredProducts.sort(function (a, b) {
      return a.price - b.price;
    });
  }
  if (sx == "Giam") {
    filteredProducts.sort(function (a, b) {
      return b.price - a.price;
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
    loadQuanAoBo(product)
  });


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
          <h4 class="ten-sanpham" onclick="showCTSP2('${obj.id}')">${obj.name}</h4>
          ${gia}
          
          <div class="chon-size">
              ${sizeHTML}
          </div>
      </div>`
  // });
  // }

}
function showCTSP2(spID){
  window.location.href="ChiTietSP_QA.html?id="+spID
}
//tìm giá min, max
function timGiaMin(obj) {

  var minValue = Number.POSITIVE_INFINITY; // Giá trị ban đầu của giá trị nhỏ nhất
  obj.forEach(ob => {
    if (ob.price < minValue)
      minValue = ob.price
  });

  return minValue;

}
function timGiaMax(obj) {

  var maxValue = Number.NEGATIVE_INFINITY; // Giá trị ban đầu của giá trị lớn nhất

  obj.forEach(ob => {
    if (ob.price > maxValue)
      maxValue = ob.price
  });

  return maxValue;

}
var Gmin = 0, Gmax = 0;
//tìm min max
function MinMax() {
  var ArrMin = [];
  var ArrMax = [];
  ArrMin.push(timGiaMin(sanpham.QuanAo[0].QuanAo_bo))
  ArrMin.push(timGiaMin(sanpham.QuanAo[0].Ao))
  ArrMin.push(timGiaMin(sanpham.QuanAo[0].Quan))
  ArrMin.push(timGiaMin(sanpham.QuanAo[0].Pro_Combat))

  ArrMax.push(timGiaMax(sanpham.QuanAo[0].QuanAo_bo))
  ArrMax.push(timGiaMax(sanpham.QuanAo[0].Ao))
  ArrMax.push(timGiaMax(sanpham.QuanAo[0].Quan))
  ArrMax.push(timGiaMax(sanpham.QuanAo[0].Pro_Combat))

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
    <h4 class="ten-sanpham" onclick="showCTSP2('${sanpham.id}')">${sanpham.name}</h4>
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





var product = "";
var idMau='';
var idsp='';
var sll=0;
function load_solg(sanphamid, colorIndex) {
  // console.log(size)
  // for (var i = 0; i < obj.size.length; i++) {
  //   if (obj.size[i] == size) {
  //     document.getElementById('solg').innerHTML = `Còn ${obj.soLuong[i]} hàng`

  //   }
  // }
  idMau=colorIndex;
  idsp=sanphamid;
  var size2= document.getElementById('size-option').value
  // console.log(size2);
  var product;
  for (var brand in sanpham.QuanAo[0]) {
    for (var i = 0; i < sanpham.QuanAo[0][brand].length; i++) {
      if (sanpham.QuanAo[0][brand][i].id == sanphamid) {
        product = sanpham.QuanAo[0][brand][i];
        break;
      }
    }
  }
 
  // console.log(product)
  document.getElementById('solg').innerHTML = '';
  for (let j = 0; j < product.img[colorIndex].size.length; j++) {
    // console.log(product.img[colorIndex].size[j])
    // if (product.img[colorIndex].SoLuong[j] > 0) {
    //   console.log(product.img[colorIndex].SoLuong[j]);
    //   document.getElementById('size-option').innerHTML += `<option value="${product.img[colorIndex].size[j]}">${product.img[colorIndex].size[j]}</option>`
    // }
    if(product.img[colorIndex].size[j]==size2){
        // console.log(product.img[colorIndex].SoLuong[j])
          document.getElementById('solg').innerHTML = `Còn ${product.img[colorIndex].SoLuong[j]} hàng`
          sll=product.img[idMau].SoLuong[j];
          console.log(sll)

    }
  }
}
function chonsizeAo(){
  var size3= document.getElementById('size-option').value
  var product;
  for (var brand in sanpham.QuanAo[0]) {
    for (var i = 0; i < sanpham.QuanAo[0][brand].length; i++) {
      if (sanpham.QuanAo[0][brand][i].id == idsp) {
        product = sanpham.QuanAo[0][brand][i];
        break;
      }
    }
  }
 
  // console.log(product)
  document.getElementById('solg').innerHTML = '';
  for (let j = 0; j < product.img[idMau].size.length; j++) {
    // console.log(product.img[colorIndex].size[j])
    // if (product.img[colorIndex].SoLuong[j] > 0) {
    //   console.log(product.img[colorIndex].SoLuong[j]);
    //   document.getElementById('size-option').innerHTML += `<option value="${product.img[colorIndex].size[j]}">${product.img[colorIndex].size[j]}</option>`
    // }
    if(product.img[idMau].size[j]==size3){
        // console.log(product.img[colorIndex].SoLuong[j])
          document.getElementById('solg').innerHTML = `Còn ${product.img[idMau].SoLuong[j]} hàng`
          sll=product.img[idMau].SoLuong[j];
          console.log(sll)

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
  console.log(sll)
  var sl = parseInt(document.getElementById("sl").value);
  sl += 1;
  if(sl<=sll){
    document.getElementById("sl").value = sl;
  }
  else
  {
    alert("Shop không có đủ hàng cho bạn!!! Sorry!!!")
  }

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
function showImgQuickView(imgSrc,color) {
  imgSrc2 = imgSrc;
  var slides = document.getElementsByClassName("silde-div123");
  for (let index = 0; index < slides.length; index++) {
    if (slides[index].style.display == "block") {
      slides[index].src = imgSrc;
    }
  }
  color2=color;
}
// function load_solg
function loadSizeQuanAo(sanphamid, colorIndex) {
  var product;
  for (var brand in sanpham.QuanAo[0]) {
    for (var i = 0; i < sanpham.QuanAo[0][brand].length; i++) {
      if (sanpham.QuanAo[0][brand][i].id == sanphamid) {
        product = sanpham.QuanAo[0][brand][i];
        break;
      }
    }
  }
  // console.log()
  document.getElementById('size-option').innerHTML = '';
  for (let j = 0; j < product.img[colorIndex].size.length; j++) {
    if (product.img[colorIndex].SoLuong[j] > 0) {
      // console.log(product.img[colorIndex].SoLuong[j]);
      document.getElementById('size-option').innerHTML += `<option value="${product.img[colorIndex].size[j]}">${product.img[colorIndex].size[j]}</option>`
    }
  }
  load_solg(sanphamid,colorIndex);
}
var prc = 0;
var imgSrc2 = '';
var color2 = '';
function showViewQuanAo(sanphamid) {
  var product;
  
  for (var brand in sanpham.QuanAo[0]) {
    for (var i = 0; i < sanpham.QuanAo[0][brand].length; i++) {
      if (sanpham.QuanAo[0][brand][i].id == sanphamid) {
        product = sanpham.QuanAo[0][brand][i];
        break;
      }
    }
  }


  // console.log(product)

  var sizeHTML = '';
  var hinhAnh = '';
  for (var i = 0; i < product.img.length; i++) {
    color2 = product.img[i].color;
    for (let index = 0; index < product.img[i].SoLuong.length; index++) {
      if (product.img[i].SoLuong[index] != 0) {

        if (product.img[i].img2 != null) {
          sizeHTML += `<button onclick="chonsize(this);showImgQuickView('${product.img[i].img2.replace(/\\/g, "\\\\")}','${product.img[i].color}'); loadSizeQuanAo('${sanphamid}', ${index - 1});" style="background-image: url(${product.img[i].img2.replace(/\\/g, "\\\\")}); background-size: cover;";></button>`;

        }
        else {
          sizeHTML += `<button onclick="chonsize(this);showImgQuickView('${product.img[i].img1.replace(/\\/g, "\\\\")}','${product.img[i].color}'); loadSizeQuanAo('${sanphamid}', ${index - 1});" style="background-image: url(${product.img[i].img1.replace(/\\/g, "\\\\")}); background-size: cover;";></button>`;

        }
        break;
      }
      if (index == product.img[i].SoLuong - 1) {
        sizeHTML += `<button class="anButton" onclick="chonsize(this)" style="background-image: url(${product.img[i].img1.replace(/\\/g, "\\\\")}); background-size: cover;"></button>`;
      }
    }
    if (i == 0) {
      hinhAnh +=
        `<img class="silde-div123" style="display: block;" src="${product.img[i].img1}" alt="" width="90%">`
    }
    else {
      hinhAnh +=
        `<img class="silde-div123" style="display: none;" src="${product.img[i].img1}" alt="" width="90%">`
    }
  }
  prc = product.price;
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
            <p class="gia-tien"> ${format.format(product.price)} ₫</p>
            <h5>Kích cỡ</h5>
            <div class="chon-size ctsp">
                ${sizeHTML}
            </div>
            <select name="" id="size-option" onchange="chonsizeAo()">
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXXL">XXXL</option>
              <option value="4XL">4XL</option>
            </select>
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

function dongQuickView() {
  document.getElementById('div-quick').style.display = 'none';
}
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

function loadSP() {
  showProducts(0);
}

function chonSX() {
  var cbb = document.getElementById("sxGia")
  sx = cbb.value;
  console.log(sx);
  showProducts(0);
}
function addToCart(spID) {
  var loginData = JSON.parse(localStorage.getItem("loginData"));
  if (loginData != null) {
    var userData = JSON.parse(localStorage.getItem(loginData.username));
    var inCart = false;

    for (let index = 0; index < loginData.cart.length; index++) {
      if (loginData.cart[index].id == spID && loginData.cart[index].color == color2) {
        if (loginData.cart[index].size == document.getElementById('size-option').value) {
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
    }
    if (!inCart) {
      var cartData = {
        id: spID,
        name: document.getElementById('nname').textContent,
        quantity: parseInt(document.getElementById('sl').value),
        img: imgSrc2,
        size: document.getElementById('size-option').value,
        price: prc,
        color: color2
      };

      loginData.cart.push(cartData);
      userData.cart.push(cartData);

      localStorage.setItem("loginData", JSON.stringify(loginData));
      localStorage.setItem(loginData.username, JSON.stringify(userData));
      tinh_tienCart();
      alert("Sản phẩm đã được thêm vào giỏ hàng");
      location.reload();
    }

  }
  else {
    alert("Vui lòng đăng nhập trước khi mua hàng");
    window.location.href = "login.html";
  }
}
// const loginData = JSON.parse(localStorage.getItem("loginData"));
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


