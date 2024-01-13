var format1 = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
var cart = JSON.parse(localStorage.getItem("cart"))
function load_sum_tt() {
    var sum = 0;
    for (let index = 0; index < cart.length; index++) {
        // console.log(cart[index])
        // console.log(cart[index].tenSanPham);
        sum += parseFloat(cart[index].donGia * cart[index].soLuong)
    }
    console.log(format1.format(sum))
    // document.getElementById('sum-price').textContent = format1.format(sum) + 'đ';
    return sum;
}
var arrSP = [];
function load_sp_gio() {
    var sum = 0;
    document.getElementById('dssp').innerHTML = ``;
    if (cart == null || cart == '' || cart == undefined) {
        document.getElementById('kosp').innerHTML = `
        <h4>Chưa có sản phẩm trong giỏ hàng</h4>
        <br>
        <a  onclick="backHome()" style="color: blue;cursor: pointer; margin-left:10px"> TIẾP TỤC XEM SẢN PHẨM</a>`;
    }
    else {
        for (let index = 0; index < cart.length; index++) {
            // console.log(cart[index])
            //  console.log(cart[index].tenSanPham);
            arrSP.push(cart[index])
            sum += parseInt(cart[index].donGia) * parseInt(cart[index].soLuong)
            document.getElementById('dssp').innerHTML += `<tr>
            <td class="btnDel" onclick="XoaSP('${index}')">x</td>
            <td class="image-sp">
                <img src="${cart[index].img}">
            </td>
            <td class="name-sp" style="margin-left:50px;">
                <p>Mã SP: ${cart[index].maSanPham}</p>
                <a>${cart[index].tenSanPham}</a>
                <p id="color${cart[index].maSanPham}">Màu sắc: ${cart[index].mauSac}</p>
                <p id='szz${cart[index].maSanPham}'>Kích thước: ${cart[index].kichThuoc}</p>
            </td>
            <td class="price-sp">
                <p id="price${index}"> ${format1.format(cart[index].donGia)}đ</p>
            </td>
            <td class="quantity-sp">
                <div style="display: flex;margin-left: -30px;">
                    <button onclick="truCart('${index}')">-</button>
                    <input type="text" value=" ${cart[index].soLuong}" id="sl${index}">
                    <button onclick="congCart('${index}')">+</button>
                </div>
    
            </td>
            <td class="subtotal-sp">
                <p id="tt-price${index}">${format1.format(parseFloat(cart[index].donGia) * parseInt(cart[index].soLuong))}đ</p>
            </td>
        </tr>`
            console.log(cart[index].mauSac)
            console.log(`color${cart[index].maSanPham}`)
            if (cart[index].mauSac == '') {
                document.getElementById(`color${cart[index].maSanPham}`).innerHTML = ``
            }
            if (cart[index].kichThuoc == '') {
                document.getElementById(`szz${cart[index].maSanPham}`).innerHTML = ``
            }
        }
        console.log(format1.format(sum))
        // document.getElementById('sum-price').textContent = format1.format(sum) + 'đ';
        document.getElementById('sum-price').textContent = format1.format(parseInt(sum)) + 'đ';
        TinhSumTien();
        tinh_tienCart();

    }


}
function truCart(id) {
    var sl = parseInt(document.getElementById('sl' + id).value);
    if (sl >= 1) {
        sl -= 1;
        document.getElementById('sl' + id).value = sl;
        var price = parseFloat(document.getElementById('price' + id).textContent.replace(/[^\d]+/g, ''));
        var sum = parseFloat(document.getElementById('sum-price').textContent.replace(/[^\d]+/g, ''));
        // console.log(parseInt(load_sum_tt())-parseInt(tru))   
        document.getElementById('tt-price' + id).textContent = format1.format(price * sl) + 'đ';
        document.getElementById('sum-price').textContent = format1.format(parseInt(sum) - parseInt(price)) + 'đ';
        TinhSumTien();
        arrSP[id].kichThuoc = sl;
        console.log(arrSP)
    }
}
function congCart(id) {
    var sl = parseInt(document.getElementById('sl' + id).value);
    sl += 1;
    document.getElementById('sl' + id).value = sl;
    var price = parseFloat(document.getElementById('price' + id).textContent.replace(/[^\d]+/g, ''));
    var sum = parseFloat(document.getElementById('sum-price').textContent.replace(/[^\d]+/g, ''));
    // console.log(parseInt(load_sum_tt())+parseInt(them))
    document.getElementById('tt-price' + id).textContent = format1.format(price * sl) + 'đ';
    document.getElementById('sum-price').textContent = format1.format(parseInt(sum) + parseInt(price)) + 'đ';
    TinhSumTien();
    arrSP[id].soLuong = sl;
    console.log(arrSP)
}
var kt = false;
function show_dc() {
    if (kt == false) {
        document.getElementById('diaChi').style.display = 'block';
        kt = true;
    }
    else {
        document.getElementById('diaChi').style.display = 'none'
        kt = false
    }
}
function TinhSumTien() {
    var ship = document.getElementById('ship').textContent.replace(/[^\d]+/g, '');
    var tt = document.getElementById('sum-price').textContent.replace(/[^\d]+/g, '');
    var sumTT = format1.format(parseFloat(ship) + parseFloat(tt)) + "đ"
    document.getElementById('sum-price-all').textContent = sumTT;
}

function XoaSP(id) {
    swal({
        title: "Are you sure?",
        text: "Bạn có muốn xóa sản phâm khỏi giỏ hàng",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirm) => {
        if (confirm) {
            var cartIn4 = cart;
            for (let index = 0; index < cartIn4.length; index++) {
                if (index == id) {
                    cartIn4.splice(index, 1);
                    cart = cartIn4;
                    // var sp=cart[index];
                    // var sp2=cart[index];
                    localStorage.setItem("cart", JSON.stringify(cart));
                    arrSP.splice(id, 1);
                }
            }
            // console.log(id);
            // console.log(cart)
            // console.log(us.cart)

            window.location.reload();
            load_sp_gio();

        } else {
            // swal("The status has not changed.");
        }
    });

}
function EditCart() {
    cart = arrSP;
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Cập nhật giỏ hàng thành công")
    
    window.location.reload();
}
function backHome() {
    window.location.href = "TrangChu.html"
}
function tinh_tienCart() {
    // event.defaultPrevented;
    var sum = 0;
    for (let index = 0; index < cart.length; index++) {
        console.log(cart[index])
        console.log(cart[index].tenSanPham);
        sum += parseFloat(cart[index].donGia * cart[index].soLuong)


        console.log(format1.format(sum))
        // document.getElementById('sum-price').textContent = format1.format(sum) + 'đ';
        document.getElementById('price-cart').textContent = format1.format(parseInt(sum)) + 'đ';
        // TinhSumTien();
    }
}
function CapNhatDC() {
    var xa = document.getElementById("ward").value;
    var huyen = document.getElementById("district").value;
    var tinh = document.getElementById("city").value;
    var cod = Math.floor(Math.random() * (50000 - 22000 + 1)) + 22000;
    if (xa != '') {
        document.getElementById('ship').textContent = format1.format(cod) + "đ"
        document.getElementById('DCship').textContent = xa + ', ' + huyen + ', ' + tinh
        show_dc();
    }
    else {
        alert("Vui lòng chọn địa chỉ giao hàng")
    }
}

function TangQua() {
    var chk = document.getElementById("chkKhac");
    if (chk.checked) {
        document.getElementById('quaTang').style.display = "table"
    }
    else {
        document.getElementById('quaTang').style.display = "none"
    }
}
function thanhToanm() {
    window.location.href = "thanh-toan.html"
}
var arrspc = [];
function showHD() {
    var sum = 0;
    document.getElementById('dsspmua').innerHTML = ``;
    if (cart.length == 0 || cart == null) {
        document.getElementById('kosp').innerHTML = `
        <h4>Chưa có sản phẩm trong giỏ hàng</h4>
        <br>
        <a  onclick="backHome()" style="color: blue;cursor: pointer; margin-left:10px"> TIẾP TỤC XEM SẢN PHẨM</a>`;
    }
    else {
        for (let index = 0; index < cart.length; index++) {
            // console.log(cart[index])
            //  console.log(cart[index].tenSanPham);
            arrspc.push(cart[index])
            sum += parseFloat(cart[index].donGia * cart[index].soLuong)
            document.getElementById('dsspmua').innerHTML += `
            <tr><th class="name-sp">
                            <p>${cart[index].tenSanPham} | ${cart[index].color} - ${cart[index].kichThuoc}<span>× ${cart[index].soLuong}</span></p>
                        </th>
                        <td class="name-sp-price">
                            <p>${format1.format(cart[index].donGia * cart[index].soLuong)}đ</p>
            </td></tr>
            `



        }
        document.getElementById('tongtienhang').textContent = format1.format(sum) + "đ"
        var phiship = document.getElementById('price-ship').textContent.replace(/[^\d]+/g, '');
        var phishipInt = parseInt(phiship, 10);
        console.log(phishipInt);
        console.log(sum);
        document.getElementById('tongg').textContent = format1.format(sum + phishipInt) + "đ";
        // console.log(format1.format(sum))
        // // document.getElementById('sum-price').textContent = format1.format(sum) + 'đ';
        // document.getElementById('sum-price').textContent = format1.format(parseInt(sum)) + 'đ';
        // TinhSumTien();
        // tinh_tienCart();
    }
}
function delCart() {
    var cart = JSON.parse(localStorage.getItem("cart"));

    if (loginData != null) {

        if (loginData.hasOwnProperty("cart")) {
            // Clear the cart (remove all elements inside "cart")
            cart = [];

            // Save the updated data back to Local Storage
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

}
function isValidPhoneNumber(phoneNumber) {
    var phoneRegex = /^(\+[0-9]{2}-[0-9]{4}-[0-9]{4}|0[0-9]{9})$/;

    return phoneRegex.test(phoneNumber);
}