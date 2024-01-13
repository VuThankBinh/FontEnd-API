var app = angular.module('AppBanHang', []);
app.controller("ThanhToanCtrl", function ($scope, $http) {
    $scope.listcart = [];
    $scope.TenKhachHang;
    $scope.DiaChi;
    $scope.SoDienThoai;


    $scope.thanhtoan1 = function () {
        name1 = document.getElementById('HoTen').value;

        sdt1 = document.getElementById('sdt').value;

        tinh1 = document.getElementById('city3').options[document.getElementById('city3').selectedIndex].text;

        huyen1 = document.getElementById('district3').options[document.getElementById('district3').selectedIndex].text;

        xa1 = document.getElementById('ward3').options[document.getElementById('ward3').selectedIndex].text;

        dc1 = document.getElementById('dccuthe').value;

        note1 = document.getElementById('note2').value;
        email = document.getElementById('email').value;


        var chk = document.getElementById('chkKhac');
        console.log(name1 + "12\n" + sdt1 + "\n" + tinh1 + "\n" + huyen1 + "\n" + xa1 + "\n" + dc1)
        if (name1 == "" || sdt1 == ""
            || tinh1 == "Chọn tỉnh thành" || huyen1 == "Chọn quận huyện"
            || xa1 == "Chọn phường xã" || dc1 == "") {
            alert("Bạn chưa nhập đầy đủ thông tin")
            return;
        }
        let obj = {};
        obj.maDonHang= "string";
        obj.tenKhachHang= sdt1;
        obj.soDienThoai= sdt1;
        obj.user= JSON.parse(localStorage.getItem('user')).username;
        obj.diaChi= dc1 + ", " + xa1 + ", " + huyen1 + ", " + tinh1;
        obj.ngayTao= "string";
        obj.duyetDon= true;
        obj.ngayGui= "string";
        obj.ngayNhan= "string";
        obj.tongHoaDon= "string";
        
        obj.ct = [];
        let list = JSON.parse(localStorage.getItem('cart'));
        for (var i = 0; i < list.length; i++) {
            obj.ct.push
                (
                    {
                        maDonHang: "string",
                        maSanPham: list[i].maSanPham.toString(),
                        tenSanPham: list[i].tenSanPham.toString(),
                        mauSac: list[i].mauSac.toString(),
                        kichThuoc: list[i].kichThuoc.toString(),
                        soLuong: list[i].soLuong.toString(),
                        donGia: list[i].donGia.toString(),
                        tong: list[i].tong.toString(),
                        maMau: list[i].maMau.toString()
                    }
                )
        }
        console.log(obj);
        obj2= JSON.stringify(obj);
        console.log(obj2)
        $http({
            method: 'POST',
            data: obj2,
            url: current_url + '/api/DonHang/create-donhang',
        }).then(function (response) {
            alert('Thêm đơn hàng thành công');
            delCart();
        });
    };


});
function delCart() {
    var cart = JSON.parse(localStorage.getItem("cart"));

    if (cart != null) {
        cart=[];
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload();
    }

}