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
const sp = JSON.parse(localStorage.getItem('sanpham'));
var format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
function loc() {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 4444440,
        values: [2, 5555],
        slide: function (event, ui) {
            $("#amount").val(format.format(ui.values[0]) + " ₫" + " - " + format.format(ui.values[1]) + " ₫");
        }
    });
    $("#amount").val($("#slider-range").slider("values", 0) + " ₫" + " - " + $("#slider-range").slider("values", 1) + " ₫");

};
//load spBalo vào mảng
var balo = [];
function load_balo() {
    sp.PhuKien[0].Tat.forEach(element => {
        balo.push(element);

    });
}
function hienSP_balo() {
    load_balo();
    var min = $('#slider-range').slider('values', 0);
    var max = $('#slider-range').slider('values', 1);
    var sanPhamDiv = document.getElementById("sanpham");
    sanPhamDiv.innerHTML = ``;
    var filteredProducts = balo.filter(function (product) {
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
    filteredProducts.forEach(product => {
        hienSp(product)
    });
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
          <div class="quick-view" onclick="showView('${obj.id}')"> QUICK VIEW</div>
      </div>
      <h4 class="ten-sanpham" onclick="showCTSP('${obj.id}')">${obj.name}</h4>
      <p class="gia-tien">${format.format(obj.price)} ₫</p>
      
      <div class="chon-size">
          ${sizeHTML}
      </div>
  </div>`
    var ht = `<div class="col-3 col-s-6 box">
  <div class="sanpham">
      <div class="img-sanpham">
          <img src="${obj.img[0].img[0].img1}" alt="" id="anh_ao1">
          <div class="quick-view">QUICK VIEW</div>
      </div>
      <h4 class="ten-sanpham">Bộ quần áo bóng rổ Kobe Bryant</h4>
      <p class="gia-tien">180,000 VND</p>
      <div class="chon-mau" id="div_ao1">
          <button style="background-image: url(img/Ao/ao1.1.jpg);background-size: cover;" id="btchon"
              onclick="chonbtn(this,'anh_ao1','div_ao1')">
          </button>
          <button style="background-image: url(img/Ao/ao1.1.jpg);background-size: cover;" id="btchon"
              onclick="chonbtn(this,'anh_ao1','div_ao1')">
          </button>
          <button style="background-image: url(img/Ao/ao1.1.jpg);background-size: cover;" id="btchon"
              onclick="chonbtn(this,'anh_ao1','div_ao1')">
          </button>
          <button style="background-image: url(img/Ao/ao1.1.jpg);background-size: cover;" id="btchon"
              onclick="chonbtn(this,'anh_ao1','div_ao1')">
          </button>
          <button style="background-image: url(img/Ao/ao1.1.jpg);background-size: cover;" id="btchon"
              onclick="chonbtn(this,'anh_ao1','div_ao1')">
          </button>
          <button style="background-image: url(img/Ao/ao1.1.jpg);background-size: cover;" id="btchon"
              onclick="chonbtn(this,'anh_ao1','div_ao1')">
          </button>
      </div>
      <div class="chon-size">
          <button onclick="chonsize(this, 'anh_ao1')">L</button>
          <button onclick="chonsize(this, 'anh_ao1')">XL</button>
          <button onclick="chonsize(this, 'anh_ao1')">2XL</button>
          <button onclick="chonsize(this, 'anh_ao1')">3XL</button>
          <button onclick="chonsize(this, 'anh_ao1')">4XL</button>
          <button onclick="chonsize(this, 'anh_ao1')">5XL</button>
      </div>
  </div>
</div>`

}

function load_color1(item) {
    // Balo.forEach(item => {
    var img = ``;
    // console.log("Item ID: " + item.id);
    if (item.img.length > 0) {
        const firstColor = item.img[0];
        // console.log("Color: " + firstColor.color);
        if (firstColor.img.length > 0) {
            const firstImage = firstColor.img[0];
            // console.log("Image URL: " + firstImage.img1);
            img = `<img id="${item.id}anh" src="${firstImage.img1}" alt="" >`
        }
    }
    // console.log("====================================");
    return img;
    // });
}
function load_img1_color(item) {
    // Balo.forEach(item => {
    // console.log("Item ID: " + item.id);
    var mau = ``;
    item.img.forEach(colorInfo => {
        // console.log("Màu: " + colorInfo.color);

        for (var i = 0; i < colorInfo.img.length; i++) {
            var image = colorInfo.img[i];
            if (image.img1) {
                var imageUrl = image.img1.replace(/\\/g, "\\\\");
                mau += `<button onclick="chonmau(this, ${item.id}anh, btn${item.id})"
                    style="background-image: url(${imageUrl}); background-size: cover;"></button>`;
                if (item.SoLuong && item.SoLuong[i] === 0) {
                    mau = mau.slice(0, -13); // Loại bỏ nút cuối cùng
                    mau += `<button class="anButton" onclick="chonmau(this)"><img src="${image.img1}" alt="" id="mau${colorInfo.color}"></button>`;
                }
                // console.log("URL Hình Ảnh: " + image.img1);
            }
        }
    });
    // console.log("====================================");
    return mau;

}
function loadimg() {
    // Balo.forEach(item => {
    //     console.log("Item ID: " + item.id);
    //     item.img.forEach(colorInfo => {
    //         console.log("Color: " + colorInfo.color);
    //         console.log(colorInfo)
    //         colorInfo.img.forEach(image => {

    //             // for (const key in image) {
    //             //     console.log(key + ": " + image[key]);
    //             // }
    //         });
    //     });
    //     console.log("====================================");
    // });
    //    load_color1(balo[0])
    document.getElementById('sanpham').innerHTML = ``;
    balo.forEach(bl => {
        document.getElementById('sanpham').innerHTML += `<div  class="col-3 col-s-6"><br><div class="sanpham " id="${bl.id}">
        <div class="img-sanpham">
        <div class="box-img" id="anh${bl.id}">
            
            
            ${load_color1(bl)}
        </div>
            <div class="quick-view" onclick="showView('${bl.id}')"> QUICK VIEW</div>
        </div>
        <h4 class="ten-sanpham" onclick="showCTSP('${bl.id}')">${bl.name}</h4>
        <p class="gia-tien">${format.format(bl.price)} ₫</p>
        
        <div class="chon-mau" id="btn${bl.id}">
        ${load_img1_color(bl)}
        </div>
    </div>`
    })

}

// chọn màu
function chonbtn(button, imageID, divID) {
    var backgroundImage = window.getComputedStyle(button).getPropertyValue("background-image");
    var imagePath = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
    var image = document.getElementById(imageID);
    image.src = imagePath;
    var buttons = document.getElementsByTagName("button");
    button.classList.toggle("clicked")

    var id = document.getElementById(divID);
    var buttons = id.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        if(buttons[i].textContent="✓"){
            buttons[i].classList.remove("clicked");
            buttons[i].textContent = "";
        }
        
    }

    // Thêm lớp "clicked" và nội dung cho button được click
    button.classList.add("clicked");
    button.textContent = "✓";
}