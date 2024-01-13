var app = angular.module('AppBanHang', []);
app.controller("TrangChuCtrl", function ($scope, $http) {
    $scope.listSanPhamMoi;
    $scope.listDanhMuc;
    $scope.LoadDanhMuc = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/get-danhmuc',
        }).then(function (response) {
            $scope.listDanhMuc = response.data;
            console.log(response.data);
        });
    };
    $scope.LoadSanPhamPhanTrang = function (loaisp) {
        console.log(loaisp)
        localStorage.setItem('loai',loaisp)
        var parameters = getUrlParametersFromHash(window.location.href);
        console.log(thuonghieu==null)
        var loai = parameters.Maloai;
        var thuonghieu = parameters.MaThuongHieu;
        var pagenum=$scope.pagenum;
        var pagesize=$scope.pagesize=2;
        var value=""
        if(loai!=null){
            value+="loai="+loai
            if(thuonghieu!=null){
                value+="&thuonghieu="+thuonghieu
            }
            value+="&pagenum="+pagenum+"&pagesize="+pagesize
        }
        else
        {
            value+="thuonghieu="+thuonghieu
            value+="&pagenum="+pagenum+"&pagesize="+pagesize
        }
        console.log(current_url + "/api/SanPham/get-sanpham-phantrang?" + value)
        console.log(current_url + "/api/SanPham/get-sanpham-phantrang?loai=1&thuonghieu=1&pagenum=1&pagesize=2")
        $http({
            method: 'GET',
            url: current_url + "/api/SanPham/get-sanpham-phantrang?"+value,
            dataType: "json",
            contentType: 'application/json'
        }).then(function (response) {
            // debugger
            $scope.listSanPhamMoi = response.data;
            // makeScript('js/trangchu.js'); // Assuming makeScript is a valid function
            console.log(response.data); // Move the console.log inside the callback
        }).catch(function (error) {
            console.error('Error loading data:', error);
        });
    };
    $scope.LoadDanhMuc()
    
    
});

function getUrlParametersFromHash(url) {
    var params = {};
    var hashIndex = url.indexOf('#');

    if (hashIndex !== -1) {
        var hashFragment = url.substring(hashIndex + 1);
        var queryString = hashFragment.split('?')[1];

        if (queryString) {
            var keyValuePairs = queryString.split('&');

            keyValuePairs.forEach(function(keyValuePair) {
                var pair = keyValuePair.split('=');
                params[pair[0]] = pair[1];
            });
        }
    }

    return params;
}