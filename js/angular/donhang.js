var app = angular.module('AppBanHang', []);
app.controller("DonHangCtrl", function ($scope, $http) {
    $scope.listDanhMuc;
    $scope.listDonChuaXN;
    $scope.listDonDaXacNhan;
    $scope.listDonDangGiao;
    $scope.listDonDaNhan;
    $scope.LoadDanhMuc = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/get-danhmuc',
        }).then(function (response) {
            $scope.listDanhMuc = response.data;
            console.log(response.data);
        });
    };
    $scope.LoadDonChuaXN = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/DonHang/get-donhang-chuaXN/' + JSON.parse(localStorage.getItem('user')).username,
        }).then(function (response) {
            if (response.data.length === 0) {
                document.getElementById('tablechuaxn').style.display = 'none'
            } else {
                $scope.listDonChuaXN = response.data;
                console.log(response.data);
            }

        });
    };
    $scope.LoadDonDaXN = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/DonHang/get-donhang-daXN/' + JSON.parse(localStorage.getItem('user')).username,
        }).then(function (response) {
            if (response.data.length === 0) {
                document.getElementById('tabledaxn').style.display = 'none'
            } else {
                $scope.listDonDaXacNhan = response.data;
                console.log(response.data);
            }

        });
    };
    $scope.LoadDonDangGiao = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/DonHang/get-donhang-danggiao/' + JSON.parse(localStorage.getItem('user')).username,
        }).then(function (response) {
            if (response.data.length === 0) {
                document.getElementById('tabledanggiao').style.display = 'none'
            } else {
                // Gán dữ liệu vào biến $scope.listDonDangGiao
                $scope.listDonDangGiao = response.data;
                console.log(response.data);
            }
        });
    };
    $scope.LoadDonDaGiao = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/DonHang/get-donhang-daNhan/' + JSON.parse(localStorage.getItem('user')).username,
        }).then(function (response) {
            if (response.data.length === 0) {
                document.getElementById('tabledagiao').style.display = 'none'
            } else {
                $scope.listDonDaNhan = response.data;
                console.log(response.data);
            }

        });
    };
    $scope.HuyDon = function (id) {
        var result = confirm("Bạn có thực sự muốn hủy đơn hàng không?");
        if (result) {
            $http({
                method: 'POST',
                url: current_url + '/api/DonHang/XacNhan-huy-donhang/' + id,
            }).then(function (response) {
                console.log(response.data)
                alert('Hủy đơn hàng thành công')

                window.location.reload();

            });
        }

    };
    $scope.donhang;
    $scope.XemChiTietDon = function (id) {
        $http({
            method: 'POST',
            url: current_url + '/api/DonHang/get-donhang-byID/' + id,
        }).then(function (response) {
            $scope.donhang = response.data
            document.getElementById('panelchung').style.display = 'block'
            console.log(response.data)

        });
    };
    $scope.XacNhanNhanHang = function (id) {
        $http({
            method: 'POST',
            url: current_url + '/api/DonHang/XacNhan-donhang-danhan/' + id,
        }).then(function (response) {
            console.log(response.data)
            alert('Xác nhận nhận hàng thành công')
            window.location.reload();
        });
    };
    // $scope.XemChiTietDon(4)
    $scope.LoadDonChuaXN();
    $scope.LoadDonDaXN();
    $scope.LoadDonDangGiao();
    $scope.LoadDonDaGiao();
    $scope.LoadDanhMuc();
});
function closeForm() {
    document.getElementById('panelchung').style.display = 'none';
}