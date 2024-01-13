// var imgGoc
// function anhgoc(){
//     $scope.imgGoc =sanpham.hinhAnhDaiien
//     console.log(imgGoc)
// }
function chonbtn(button) {
    var anhmoi = getBackgroundImageUrl(button.style.backgroundImage); // Extract URL from background-image
    document.getElementById('anhgio').setAttribute('src', anhmoi);
    console.log(anhmoi);
}

function getBackgroundImageUrl(backgroundImage) {
    // Extract the URL from the 'url()' notation
    var matches = backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
    if (matches && matches[1]) {
        return matches[1];
    } else {
        return ''; // Return an empty string if the URL is not found
    }
}
function chonsize2(button, divID) {

    if (button.classList.contains("clicked")) {
        // Nếu đã chọn, hủy chọn
        button.classList.remove("clicked");
        // sz='';
        // console.log(sz)
        document.getElementById('solg').innerHTML = ""
        document.querySelector(".item-sl").style.opacity = 0.5;
        document.querySelector(".but-add").style.opacity = 0.5;
        document.querySelector(".item-sl").style.pointerEvents = 'none'
        document.querySelector(".but-add").style.pointerEvents = 'none';
        document.getElementById('anhgio').setAttribute('src', imgGoc);
    } else {
        // Nếu chưa chọn, hủy chọn tất cả các button khác và chọn button mới
        var buttons = document.getElementsByTagName("button");

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("clicked");
        }

        button.classList.add("clicked");
        // sz=button.textContent;
        // console.log(sz)
        // load_solg(button.textContent);
        document.querySelector(".item-sl").style.opacity = 1;
        document.querySelector(".but-add").style.opacity = 1;
        document.querySelector(".item-sl").style.pointerEvents = 'auto';
        document.querySelector(".but-add").style.pointerEvents = 'auto';
        kthc = button.textContent;
        // chonbtn(button)
    }

}
var kthc;
function chonsize(button, divID) {
    // Get the parent div
    var parentDiv = document.getElementById(divID);
    if (divID == 'sizeDiv') {
        if (button.classList.contains("clicked")) {
            // Nếu đã chọn, hủy chọn
            button.classList.remove("clicked");
            // sz='';
            // console.log(sz)
            document.getElementById('solg').innerHTML = "";
            document.querySelector(".item-sl").style.opacity = 0.5;
            document.querySelector(".but-add").style.opacity = 0.5;
            document.querySelector(".item-sl").style.pointerEvents = 'none';
            document.querySelector(".but-add").style.pointerEvents = 'none';
            document.getElementById('anhgio').setAttribute('src', imgGoc);
        } else {
            // Nếu chưa chọn, hủy chọn tất cả các button khác trong div và chọn button mới
            var buttons = parentDiv.getElementsByTagName("button");

            for (var i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove("clicked");
            }

            button.classList.add("clicked");
            // sz=button.textContent;
            // console.log(sz)
            // load_solg(button.textContent);
            document.querySelector(".item-sl").style.opacity = 1;
            document.querySelector(".but-add").style.opacity = 1;
            document.querySelector(".item-sl").style.pointerEvents = 'auto';
            // document.querySelector(".but-add").style.pointerEvents = 'auto';
            kthc = button.textContent;            // chonbtn(button)
        }
    }
    if (divID == 'mauDiv') {
        if (button.classList.contains("clicked")) {
            // Nếu đã chọn, hủy chọn
            button.classList.remove("clicked");
            // sz='';
            // console.log(sz)
            document.getElementById('anhgio').setAttribute('src', imgGoc);
        } else {
            // Nếu chưa chọn, hủy chọn tất cả các button khác trong div và chọn button mới
            var buttons = parentDiv.getElementsByTagName("button");

            for (var i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove("clicked");
            }

            button.classList.add("clicked");
            // chonbtn(button)
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
    if (sl <= parseInt(document.getElementById('solg').textContent.split('Còn: ')[1]))
        document.getElementById("sl").value = sl;
    else
        alert('Số lượng không đủ')

}
function nhap_SoLuong(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        // Xử lý khi người dùng nhấn Enter ở đây
        event.preventDefault();

        var num = document.getElementById('sl').value;
        if (num <= parseInt(document.getElementById('solg').textContent.split('Còn: ')[1]))
            document.getElementById("sl").value = sl;
        else {
            alert('Số lượng không đủ')
            document.getElementById('sl').value = 1
        }
    }

}
function addToCart2(spID) {
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
    var count = 0;
    // event.defaultPrevented;

    var sum = 0;
    for (let index = 0; index < loginData.cart.length; index++) {
        console.log(loginData.cart[index])
        console.log(loginData.cart[index].name);
        sum += parseFloat(loginData.cart[index].price * loginData.cart[index].quantity)
        count += loginData.cart[index].quantity;

        console.log(format.format(sum))
        // document.getElementById('sum-price').textContent = format1.format(sum) + 'đ';
        document.getElementById('price-cart').textContent = format.format(parseInt(sum)) + 'đ';
        // TinhSumTien();
        document.getElementById('countSP').textContent = count;
    }
}
function giohangpage(){
    var user = JSON.parse(localStorage.getItem("user"));
    if(user ==null){
        alert("Vui lòng đăng nhập trước khi mua hàng");
            window.location.href = "login.html";
    }
    else{
        window.location.href='Cart.html'
    }
}
