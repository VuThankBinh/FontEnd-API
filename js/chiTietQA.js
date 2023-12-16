// const sanpham = JSON.parse(localStorage.getItem("sanpham"));
localStorage.setItem("san-pham-id", window.location.href.split('=')[1]);
var maSP = localStorage.getItem("san-pham-id")
var loai = "";
var spct
function loadSPCT() {
    var checkVar = false
    for (var brand in sanpham.QuanAo[0]) {
        for (var id = 0; id < sanpham.QuanAo[0][brand].length; id++) {
            var productName = sanpham.QuanAo[0][brand][id];

            if (productName.id == maSP) {
                console.log(productName);
                checkVar = true;
                spct = productName;
                loai = sanpham.QuanAo[0][brand];

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
    console.log(spct)
    var link = document.getElementById('link');
    link.innerHTML += `/ <li> <a>${spct.name} </a></li>`;
}
// const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
function loadGia() {
    var gia = ""
    var sale = ""
    if (spct.price - spct.price == 0) {
        sale = ""
        gia = `<p class="gia-tien" id="prrice-sp">${format.format(spct.price)} ₫</p>`
    }
    else {
        sale = `<div class="sale">-${Math.ceil(100 - (spct.price / spct.price) * 100)}%</div>`
        gia = `<p class="gia-tien" ><span>${format.format(spct.price)} ₫</span>  <p id="prrice-sp">${format.format(spct.price)} ₫</p></p>`
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
var list = document.getElementsByClassName("silde-div123");
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
// function load_size() {
//     var sizeHTML = ``;
//     for (var i = 0; i < spct.size.length; i++) {
//         if (spct.SoLuong[i] != 0) {
//             sizeHTML += `<button onclick="chonsize(this)">${spct.size[i]}</button>`;

//         }
//         else {
//             sizeHTML += `<button class="anButton" onclick="chonsize(this)">${spct.size[i]}</button>`;

//         }
//     }
//     return sizeHTML;
// }
var idMau=``;
function load_solg(sanphamid, colorIndex) {
    // console.log(size)
    // for (var i = 0; i < obj.size.length; i++) {
    //   if (obj.size[i] == size) {
    //     document.getElementById('solg').innerHTML = `Còn ${obj.soLuong[i]} hàng`
  
    //   }
    // }
    sanphamid=maSP;
    idMau=colorIndex;
    
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
   
    console.log(product)
    console.log(colorIndex)
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
var sl = 0;
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
        // load_solg(button.textContent);
        document.querySelector(".item-sl").style.opacity = 1;
        document.querySelector(".but-add").style.opacity = 1;
        document.querySelector(".item-sl").style.pointerEvents = 'auto';
        document.querySelector(".but-add").style.pointerEvents = 'auto';
        kthc = button.textContent;
    }

}
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
    var sizeHTML = '';
    var hinhAnh = '';
    for (var i = 0; i < spct.img.length; i++) {
      color2 = spct.img[i].color;
      for (let index = 0; index < spct.img[i].SoLuong.length; index++) {
        if (spct.img[i].SoLuong[index] != 0) {
  
          if (spct.img[i].img2 != null) {
            sizeHTML += `<button onclick="chonsize(this);showImgQuickView('${spct.img[i].img2.replace(/\\/g, "\\\\")}','${spct.img[i].color}'); loadSizeQuanAo('${maSP}', ${index - 1});" style="background-image: url(${spct.img[i].img2.replace(/\\/g, "\\\\")}); background-size: cover;";></button>`;
  
          }
          else {
            sizeHTML += `<button onclick="chonsize(this);showImgQuickView('${spct.img[i].img1.replace(/\\/g, "\\\\")}','${spct.img[i].color}'); loadSizeQuanAo('${maSP}', ${index - 1});" style="background-image: url(${spct.img[i].img1.replace(/\\/g, "\\\\")}); background-size: cover;";></button>`;
  
          }
          break;
        }
        if (index == spct.img[i].SoLuong - 1) {
          sizeHTML += `<button class="anButton" onclick="chonsize(this)" style="background-image: url(${spct.img[i].img1.replace(/\\/g, "\\\\")}); background-size: cover;"></button>`;
        }
      }
      if (i == 0) {
        hinhAnh +=
          `<img class="silde-div123" id="anhgio" style="display: block;" src="${spct.img[i].img1}" alt="" width="90%">`
      }
      else {
        hinhAnh +=
          `<img class="silde-div123" style="display: none;" src="${spct.img[i].img1}" alt="" width="90%">`
      }
    }
    prc = spct.price;
    // console.log(img)
    var ct = document.getElementById("anhCTSP");
    ct.innerHTML += `<div class="silde" style="width: 40%; margin-top: 50px; margin-left: 100px;">
      
    ${hinhAnh}
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
    <h5 id="div_bong4">Màu sắc</h5>
    <div class="chon-size ctsp">
    ${sizeHTML}
    <br>
    <h5> Kích cỡ:</h5>
    <select name="" id="size-option" onchange="chonsizeAo()">
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXXL">XXXL</option>
              <option value="4XL">4XL</option>
            </select>
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
    // document.getElementById('Size').textContent = "";
    // for (var i = 0; i < spct.size.length; i++) {
    //     if (i < spct.size.length - 1) {
    //         document.getElementById('Size').textContent += spct.size[i] + ", "
    //     }
    //     else {
    //         document.getElementById('Size').textContent += spct.size[i]
    //     }
    // }
}

function loadImgInfo() {
    var img = ``;
    document.getElementById('Anh').innerHTML = ""
    // spct.img.forEach((imgObject, i) => {
    //     const imgSrc = imgObject[`img${i + 1}`];
    //     // console.log(imgSrc)
    //     img += `<img style="width: 30% !important;" src="${imgSrc}" alt="">`

    // });
    spct.img.forEach((clothing, index) => {
        
        img += `<img style="width: 30% !important;margin-left: 15px" src="${clothing.img1}" alt="">`
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
function show() {
    var divLogin = document.getElementById("div-quick");
    divLogin.style.display = "block";
}
function closeForm() {
    var divLogin = document.getElementById("div-quick");
    divLogin.style.display = "none";
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
  var htmlSP=""
  sale = ""
  gia = `<p class="gia-tien">${format.format(obj.price)} ₫</p>`
  // if (sanpham.giaC - sanpham.giaM == 0) {
  // }
  // else {
  //   sale = `<div class="sale">-${Math.ceil(100 - (sanpham.giaM / sanpham.giaC) * 100)}%</div>`
  //   gia = `<p class="gia-tien"><span>${format.format(sanpham.giaC)} ₫</span>  ${format.format(sanpham.giaM)} ₫</p>`
  // }
  htmlSP +=
    `<div  class="col-3 col-s-6"><br><div class="sanpham " id="${obj.id}">
          <div class="img-sanpham">
          <div class="box-img">
              ${sale}
              <img src="${obj.img[0].img1}" alt="" id="${obj.id}anh">
          
          <h4 class="ten-sanpham" onclick="showCTSP2('${obj.id}')">${obj.name}</h4>
          ${gia}
          
          <div class="chon-size">
              ${sizeHTML}
          </div>
      </div>`
    document.getElementById('panel').innerHTML += htmlSP;
}

function showCTSP2(spID){
    window.location.href="ChiTietSP_QA.html?id="+spID
  }

// Add to cart
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
          name: document.getElementById('nname-sp').textContent,
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