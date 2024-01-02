var value = window.location.href.split('?')[1];
function TimKiemSP(){
    
    const decodedQuery = decodeURIComponent(value);
    $.ajax({
        type: "GET",
        url: "https://localhost:44343/api/SanPham/get-sanpham-by-name/" + decodedQuery,
        dataType: "json",
        contentType: 'application/json'
    }).done(function (data) {
        debugger;
        if (data != null && data.message != null && data.message != 'undefined') {
            alert(data.message);
        } else {
            localStorage.setItem("spTimKiem", JSON.stringify(data));
            
        }

    }).fail(function () {
        alert('lỗi');
    });
}
var app = angular.module('AppBanHang', []);

app.controller("HomeCtrl", function ($scope, $http) {
    var decodedQuery = decodeURIComponent(value);
    console.log(value)
    document.getElementById('kqsearch').textContent="Kết quả của tìm kiếm sản phẩm có chứa: " + decodedQuery 
    $scope.listSanPhamMoi;
    $scope.listDanhMuc;
    
    $scope.LoadSanPhamMoi = function () {
        
        
        $http({
            method: 'GET',
            url:  current_url+"/api/SanPham/get-sanpham-by-name/" + value,
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
    
    // Call the function to load data
    $scope.LoadSanPhamMoi();
});
