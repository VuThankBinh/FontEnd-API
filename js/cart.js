
// const loginData = JSON.parse(localStorage.getItem("loginData"));
// console.log(loginData.cart)
var format1 = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
function load_sum_tt() {
    var sum = 0;
    for (let index = 0; index < loginData.cart.length; index++) {
        // console.log(loginData.cart[index])
        // console.log(loginData.cart[index].name);
        sum += parseFloat(loginData.cart[index].price.replace(/[^\d]+/g, ''))
    }
    console.log(format1.format(sum))
    // document.getElementById('sum-price').textContent = format1.format(sum) + 'đ';
    return sum;
}
var arrSP = [];
function load_sp_gio() {
    var sum = 0;
    document.getElementById('dssp').innerHTML = ``;
    if (loginData.cart.length == 0) {
        document.getElementById('kosp').innerHTML = `
        <h4>Chưa có sản phẩm trong giỏ hàng</h4>
        <br>
        <a  onclick="backHome()" style="color: blue;cursor: pointer; margin-left:10px"> TIẾP TỤC XEM SẢN PHẨM</a>`;
    }
    else {
        for (let index = 0; index < loginData.cart.length; index++) {
            // console.log(loginData.cart[index])
            //  console.log(loginData.cart[index].name);
            arrSP.push(loginData.cart[index])
            sum += parseInt(loginData.cart[index].price) * parseInt(loginData.cart[index].quantity)
            document.getElementById('dssp').innerHTML += `<tr>
            <td class="btnDel" onclick="XoaSP('${index}')">x</td>
            <td class="image-sp">
                <img src="${loginData.cart[index].img}">
            </td>
            <td class="name-sp" style="margin-left:50px;">
                <p>Mã SP: ${loginData.cart[index].id}</p>
                <a>${loginData.cart[index].name}</a>
                <p id="color${loginData.cart[index].id}">Màu sắc: ${loginData.cart[index].color}</p>
                <p id='szz${loginData.cart[index].id}'>Kích thước: ${loginData.cart[index].size}</p>
            </td>
            <td class="price-sp">
                <p id="price${index}"> ${format1.format(loginData.cart[index].price)}đ</p>
            </td>
            <td class="quantity-sp">
                <div style="display: flex;margin-left: -30px;">
                    <button onclick="truCart('${index}')">-</button>
                    <input type="text" value=" ${loginData.cart[index].quantity}" id="sl${index}">
                    <button onclick="congCart('${index}')">+</button>
                </div>
    
            </td>
            <td class="subtotal-sp">
                <p id="tt-price${index}">${format1.format(parseFloat(loginData.cart[index].price) * parseInt(loginData.cart[index].quantity))}đ</p>
            </td>
        </tr>`
            console.log(loginData.cart[index].color)
            console.log(`color${loginData.cart[index].id}`)
            if (loginData.cart[index].color == '') {
                document.getElementById(`color${loginData.cart[index].id}`).innerHTML = ``
            }
            if (loginData.cart[index].size == '') {
                document.getElementById(`szz${loginData.cart[index].id}`).innerHTML = ``
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
        arrSP[id].quantity = sl;
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
    arrSP[id].quantity = sl;
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
            var us = JSON.parse(localStorage.getItem(loginData.username))
            var cartIn4 = loginData.cart;
            for (let index = 0; index < cartIn4.length; index++) {
                if (index == id) {
                    cartIn4.splice(index, 1);
                    loginData.cart = cartIn4;
                    us.cart = cartIn4;
                    // var sp=loginData.cart[index];
                    // var sp2=loginData.cart[index];
                    localStorage.setItem("loginData", JSON.stringify(loginData));
                    localStorage.setItem(loginData.username, JSON.stringify(loginData));
                    arrSP.splice(id, 1);
                }
            }
            // console.log(id);
            // console.log(loginData.cart)
            // console.log(us.cart)
            load_sp_gio();
        } else {
            // swal("The status has not changed.");
        }
    });

}
function EditCart() {
    loginData.cart = arrSP;
    localStorage.setItem("loginData", JSON.stringify(loginData));
    localStorage.setItem(loginData.username, JSON.stringify(loginData));
    alert("Cập nhật giỏ hàng thành công")
}
function backHome() {
    window.location.href = "TrangChu.html"
}
function tinh_tienCart() {
    // event.defaultPrevented;
    var sum = 0;
    for (let index = 0; index < loginData.cart.length; index++) {
        console.log(loginData.cart[index])
        console.log(loginData.cart[index].name);
        sum += parseFloat(loginData.cart[index].price.replace(/[^\d]+/g, '') * loginData.cart[index].quantity)


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
    if (loginData.cart.length == 0 || loginData.cart == null) {
        document.getElementById('kosp').innerHTML = `
        <h4>Chưa có sản phẩm trong giỏ hàng</h4>
        <br>
        <a  onclick="backHome()" style="color: blue;cursor: pointer; margin-left:10px"> TIẾP TỤC XEM SẢN PHẨM</a>`;
    }
    else {
        for (let index = 0; index < loginData.cart.length; index++) {
            // console.log(loginData.cart[index])
            //  console.log(loginData.cart[index].name);
            arrspc.push(loginData.cart[index])
            sum += parseFloat(loginData.cart[index].price * loginData.cart[index].quantity)
            document.getElementById('dsspmua').innerHTML += `
            <tr><th class="name-sp">
                            <p>${loginData.cart[index].name} | ${loginData.cart[index].color} - ${loginData.cart[index].size}<span>× ${loginData.cart[index].quantity}</span></p>
                        </th>
                        <td class="name-sp-price">
                            <p>${format1.format(loginData.cart[index].price * loginData.cart[index].quantity)}đ</p>
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
var name1, name2;
var sdt1, sdt2;
var tinh1, tinh2;
var huyen1, huyen2;
var xa1, xa2;
var dc1, dc2;
var note1;
var email;
function datHang() {

    name1 = document.getElementById('HoTen').value;
    name2 = document.getElementById('HoTen2').value;

    sdt1 = document.getElementById('sdt').value;
    sdt2 = document.getElementById('sdt2').value;

    tinh1 = document.getElementById('city3').options[document.getElementById('city3').selectedIndex].text;
    tinh2 = document.getElementById('city2').options[document.getElementById('city2').selectedIndex].text;

    huyen1 = document.getElementById('district3').options[document.getElementById('district3').selectedIndex].text;
    huyen2 = document.getElementById('district2').options[document.getElementById('district2').selectedIndex].text;

    xa1 = document.getElementById('ward3').options[document.getElementById('ward3').selectedIndex].text;
    xa2 = document.getElementById('ward2').options[document.getElementById('ward2').selectedIndex].text;

    dc1 = document.getElementById('dccuthe').value;
    dc2 = document.getElementById('dccuthe2').value;

    note1 = document.getElementById('note2').value;
    email = document.getElementById('email').value;

    var chk = document.getElementById('chkKhac');
    console.log(name1 + "12\n" + sdt1 + "\n" + tinh1 + "\n" + huyen1 + "\n" + xa1 + "\n" + dc1)
    if (chk.checked == true) {
        if (name1 == "" || name2 == ""
            || sdt1 == "" || sdt2 == ""
            || tinh1 == "Chọn tỉnh thành" || tinh2 == "Chọn tỉnh thành"
            || huyen1 == "Chọn quận huyện" || huyen2 == "Chọn quận huyện"
            || xa1 == "Chọn phường xã" || xa2 == "Chọn phường xã"
            || dc1 == "" || dc2 == "") {
            alert("Bạn chưa nhập đầy đủ thông tin")
            return;
        }
        else {
            if (isValidPhoneNumber(sdt1) == false) {
                alert("Số điện thoại của bạn không hợp lệ")
                return;
            }
            if (isValidPhoneNumber(sdt2) == false) {
                alert("Số điện thoại của người nhận không hợp lệ")
                return;
            }
            pushToLocalStorage();
        }
    }
    else {
        if (name1 == "" || sdt1 == ""
            || tinh1 == "Chọn tỉnh thành" || huyen1 == "Chọn quận huyện"
            || xa1 == "Chọn phường xã" || dc1 == "") {
            alert("Bạn chưa nhập đầy đủ thông tin")
            return;
        }
        else {
            if (isValidPhoneNumber(sdt1) == false) {
                alert("Số điện thoại không hợp lệ")
                return;
            }
            pushToLocalStorage();
        }
    }
}
function isValidPhoneNumber(phoneNumber) {
    var phoneRegex = /^(\+[0-9]{2}-[0-9]{4}-[0-9]{4}|0[0-9]{9})$/;

    return phoneRegex.test(phoneNumber);
}
function oder() {
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
                color: ''
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
function pushToLocalStorage() {
    // Kiểm tra xem Local Storage có sẵn chưa
    if (!localStorage) {
        console.error("Local Storage is not supported in this browser.");
        return;
    }
    // Lấy thời gian hiện tại
    const currentDate = new Date();

    // Lấy thông tin thời gian
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    // Lấy thông tin ngày tháng
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript đếm từ 0
    const year = currentDate.getFullYear();

    // Tạo chuỗi định dạng
    const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;

    console.log(formattedDate);

    // Lấy dữ liệu hiện tại từ Local Storage (nếu có)
    var existingOrders = JSON.parse(localStorage.getItem("donhang")) || [];
    var currentTime = new Date();

    // Chuyển đối tượng Date thành chuỗi sử dụng toISOString()
    var dateString = currentTime.toISOString();
    // Tạo một đối tượng đơn hàng mới
    var newOrder = {
        nameDat: name1,
        nameNhan: name2,
        sdtDat: sdt1,
        sdtNhan: sdt2,
        dcDat: dc1 + ", " + xa1 + ", " + huyen1 + ", " + tinh1,
        dcNhan: dc2 + ", " + xa2 + ", " + huyen2 + ", " + tinh2,
        note: note1,
        emailDat: email,
        products: arrspc,
        ngayDat: formattedDate
    };

    // Thêm đơn hàng mới vào mảng dữ liệu hiện tại
    existingOrders.push(newOrder);

    // Lưu mảng dữ liệu vào Local Storage
    localStorage.setItem("donhang", JSON.stringify(existingOrders));
    delCart();
    alert("Bạn đã đặt hàng thành công");
    window.location.href = 'TrangChu.html'
}
function delCart() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));

    if (loginData != null) {
        var userData = JSON.parse(localStorage.getItem(loginData.username));

        if (loginData.hasOwnProperty("cart")) {
            // Clear the cart (remove all elements inside "cart")
            loginData.cart = [];
            userData.cart = [];

            // Save the updated data back to Local Storage
            localStorage.setItem("loginData", JSON.stringify(loginData));
            localStorage.setItem(loginData.username, JSON.stringify(userData));
        }
    }

}