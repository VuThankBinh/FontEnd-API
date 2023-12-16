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

const sanpham = JSON.parse(localStorage.getItem("sanpham"));
const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });

const productsPerPage = 12; // Số sản phẩm trên mỗi trang
let currentPage = 0;


var allProducts = [];
function intsert() {
    allProducts.splice(0, allProducts.length);
    for (var brand in sanpham.QuanAo[0]) {
        for (var id = 0; id < sanpham.QuanAo[0][brand].length; id++) {
            var productName = sanpham.QuanAo[0][brand][id];
            if (productName) {
                allProducts.push(productName);
            }
        }
    }
    // console.log(allProducts);
}
// Hiển thị thông tin trang hiện tại và tổng số trang
// pageInfo.textContent = `Trang ${page + 1} / ${totalPages}`;
// productContainer.appendChild(pageInfo);
var totalPages = 0;
function showProducts(page) {
    intsert();
    // var min = $('#slider-range').slider('values', 0);
    // var max = $('#slider-range').slider('values', 1)
    // console.log(allProducts)
    // console.log(allProducts.slice(5 * 12))
    // var sanPhamDiv = document.getElementById("sanpham");
    // sanPhamDiv.innerHTML = ``;
    // var filteredProducts = allProducts.filter(function (product) {
    //     return product.giaM >= 0 && product.giaM <= 1000000;
    // });
    // if (filteredProducts.length == 0) {
        // document.getElementById("sanpham").innerHTML += `<h3>Không có sản phẩm</h3>`;
        // document.getElementById("sanpham").style.display = "flex";
        // document.getElementById("sanpham").style.justifyContent = "center";
    //}
    // if (sx == "Tang") {
    //     filteredProducts.sort(function (a, b) {
    //         return a.giaM - b.giaM;
    //     });
    // }
    // if (sx == "Giam") {
    //     filteredProducts.sort(function (a, b) {
    //         return b.giaM - a.giaM;
    //     });
    // }

    // const start = page * productsPerPage;
    // const end = start + productsPerPage;
    // totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    // console.log(totalPages)
    // console.log(allProducts.length-(totalPages-1)*productsPerPage)
    // console.log(allProducts.slice(totalPages,allProducts.length-(totalPages-1)*productsPerPage))
    //const productsToDisplay = filteredProducts.slice(start, end);
    // var pe = document.getElementById('pe');
    // var tol = document.getElementById('total');
    // pe.placeholder = currentPage + 1;
    // tol.innerHTML = totalPages;
    allProducts.forEach(product => {
        load_size(product)
    });


}

//load sp
//load mota
function load_MoTa(obj){
    var moTaHTML=``;
    obj.moTa.forEach(mt=>{
        moTaHTML += `<li>${mt}</li>` 
    });
    var MoTa =`<ul>`+moTaHTML+`</ul>`
    console.log(MoTa)
    return MoTa;
}
//load size
function load_size(obj){
    var sizeHTML=``;
    obj.img.forEach(ob=>{
        ob.size.forEach(mt=>{
            sizeHTML += `<option value="${mt}">${mt}</option>` 
        });
    });
    var Size=`<select id="ChonSize${obj.id}">`+sizeHTML+`</select>`
    console.log(Size);
    return Size;
}
//load s
function load_QA_bo(obj){
    //chỉ load đc id và name giá
    var sizeHTML = "";
    for (var ii = 0; ii < obj.size.length; ii++) {
        if (obj.soLuong[ii] != 0) {
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
      <h4  class="ten-sanpham" onclick="showCTSP('${obj.id}')">${obj.name}</h4>
      ${gia}
      
      <div class="chon-size">
          ${sizeHTML}
      </div>
  </div>`
}