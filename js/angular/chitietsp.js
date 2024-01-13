var app = angular.module('AppBanHang', []);
app.controller("ChitietCtrl", function ($scope, $http) {
    $scope.sanpham;
    $scope.listDanhMuc;
    $scope.listSize;
    $scope.LoadSanPhambyID = function () {
        var key = 'id';
        var value = window.location.href.split('=')[1];
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/get-sanpham-by-id/' + value,
        }).then(function (response) {
            $scope.sanpham = response.data;
            console.log(response.data)
        });
    };
    $scope.LoadDanhMuc = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/get-danhmuc',
        }).then(function (response) {
            $scope.listDanhMuc = response.data;
            // console.log(response.data);
        });
    };
    $scope.hiensize = function (valueq, color) {
        console.log(valueq)
        console.log(color)
        var mau = { idMau: valueq, MauSac: color }
        var mauString = JSON.stringify(mau);

        // Store the JSON string in localStorage
        localStorage.setItem('MauDaChon', mauString);
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/get-soluong-by-color/' + valueq,
        }).then(function (response) {
            $scope.listSize = response.data;
            console.log(response.data);
        });
    };
    $scope.sizeSelected = null;
    $scope.selectedSizeQuantity = "";

    $scope.getSL = function (size) {
        // Update selected size
        $scope.sizeSelected = size.kichThuocsp;

        // Update quantity display based on the selected size
        if (size.soLuong <= 0) {
            $scope.selectedSizeQuantity = "Sản phẩm đã hết hàng";
            document.querySelector(".but-add").style.pointerEvents = 'none !important';
            document.querySelector(".but-add").style.opacity = 0.5;
        } else {
            // $scope.isButtonDisabled = false;
            document.querySelector(".but-add").style.pointerEvents = 'auto';
            $scope.selectedSizeQuantity='Còn: '+ size.soLuong
        }

        // Additional logic...
    };
    $scope.addToCart = function (maSP) {
        var user = JSON.parse(localStorage.getItem("user"));
        var storedMau = JSON.parse(localStorage.getItem('MauDaChon'));
        if (user != null) {
            var cart = [];
            var inCart = false;

            if (JSON.parse(localStorage.getItem('cart')) == null) {
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                cart = JSON.parse(localStorage.getItem('cart'));
            }



            if (cart == null) {

                var cartData = {
                    maSanPham: maSP,
                    tenSanPham: document.getElementById('nname-sp').textContent,
                    soLuong: parseInt(document.getElementById('sl').value),
                    img: document.getElementById('anhgio').getAttribute('src'),
                    kichThuoc: kthc.trim(),
                    mauSac: storedMau.MauSac,
                    maMau: storedMau.idMau,
                    tong: parseInt(document.getElementById('sl').value) * parseInt(document.getElementById('prrice-sp').textContent.replace(/\D/g, ''), 10),
                    donGia: parseInt(document.getElementById('prrice-sp').textContent.replace(/\D/g, ''), 10)
                };

                cart.push(cartData);

                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Sản phẩm đã được thêm vào giỏ hàng");
            } else {
                for (let index = 0; index < cart.length; index++) {
                    if (cart[index].maSanPham == maSP && cart[index].kichThuoc == kthc.trim() && cart[index].maMau == storedMau.idMau) {
                        inCart = true;

                        cart[index].soLuong += parseInt(document.getElementById('sl').value);
                        cart[index].tong += parseInt(cart[index].donGia) * parseInt(document.getElementById('sl').value);
                        localStorage.setItem("cart", JSON.stringify(cart));
                        alert("Sản phẩm đã có trong giỏ hàng");
                        break;
                    }
                }

                if (!inCart) {
                    var cartData = {
                        maSanPham: maSP,
                        tenSanPham: document.getElementById('nname-sp').textContent,
                        soLuong: parseInt(document.getElementById('sl').value),
                        img: document.getElementById('anhgio').getAttribute('src'),
                        kichThuoc: kthc.trim(),
                        mauSac: storedMau.MauSac,
                        maMau: storedMau.idMau,
                        tong: parseInt(document.getElementById('sl').value) * parseInt(document.getElementById('prrice-sp').textContent.replace(/\D/g, ''), 10),
                        donGia: parseInt(document.getElementById('prrice-sp').textContent.replace(/\D/g, ''), 10)
                    };


                    cart.push(cartData);

                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert("Sản phẩm đã được thêm vào giỏ hàng");
                }
            }
        } else {
            alert("Vui lòng đăng nhập trước khi mua hàng");
            window.location.href = "login.html";
        }

    };
    $scope.LoadDanhMuc()
    $scope.LoadSanPhambyID()
});

