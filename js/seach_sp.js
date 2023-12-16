
// function scrollToTop() {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
// }
// const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });

var value = window.location.href.split('?')[1];

// const sanpham = JSON.parse(localStorage.getItem("sanpham"));
var allProducts=[];
var loaiArr=[];
function timKiem_sp() {
    const decodedQuery = decodeURIComponent(value);
    console.log(decodedQuery)
    var count=0;
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
                
                for (var i = 0; i < products.length; i++) {
                    var sp = products[i];
                    
                    if (sp.name.toLowerCase().includes(decodedQuery.toLowerCase())) {
                        console.log(sp.name);
                        // console.log(sp);
                        if(loai=='GiayBongRo'){
                            load_sp_giay(sp);
                        }
                        if(loai=="QuanAo"){
                            loadQuanAoBo(sp)
                        }
                        if(loai=="PhuKien"){
                            loadPhuKien(sp)
                        }
                        count++;
                    }

                }
            }
        } else {
            for (var brand in sanpham[loai]) {
                var br = sanpham[loai][brand];
                // console.log(br.name)
                if (br.name.toLowerCase().includes(decodedQuery.toLowerCase())) {
                    // console.log(br);
                    loadBong(br)
                    count++
                }
                // console.log(br.name)  
            }
        }

    }
    if(count>0){
        document.getElementById('kqsearch').textContent="Kết quả của tìm kiếm sản phẩm có chứa: " + decodedQuery 
        
    }
    else{
        document.getElementById('kqsearch').textContent="Không tìm thấy sản phẩm có chứa: " + decodedQuery 
        document.getElementById('kqsearch').style.height="210px"
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
// Search products from local storage
function searchProduct(name) {
    name = name.toLowerCase();
    const products = JSON.parse(localStorage.getItem("sanpham"));
    document.getElementById("products").innerHTML = "";
    document.getElementById("showMoreProduct").style.display = "none";
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
        document.getElementById('showMoreProduct').style.display = 'block';
    }
}