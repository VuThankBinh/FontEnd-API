var _user = JSON.parse(localStorage.getItem("user-Admin"));
var app = angular.module('AppBanHang', []);
app.controller("AdminCtrl", function ($scope, $http) {
    $scope.listSanPham;
    $scope.listDanhMuc;
    $scope.listThuongHieu;
    $scope.listDonHangChuaXN;
    $scope.listDonHangDaXN;
    $scope.listDonHangDangGiao;
    $scope.listDonHangDaGiao;
    $scope.LoadDanhMuc = function () {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/LoaiSanPhamControllers/get-loaisp-admin',
        }).then(function (response) {
            $scope.listDanhMuc = response.data;
            console.log(response.data);
        });
    };
    $scope.LoadSanPham = function () {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/SanPhamControllers/get-sp-admin',
        }).then(function (response) {
            $scope.listSanPham = response.data;
            console.log(response.data);
        });
    };
    $scope.LoadThuongHieu = function () {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/ThuongHieuControllers/get-thuonghieu-admin',
        }).then(function (response) {
            $scope.listThuongHieu = response.data;
            console.log(response.data);
        });
    };
    $scope.LoadDonHangDaXN = function () {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/BanHangControllers/get-donhang-daXN',
        }).then(function (response) {
            $scope.listDonHangDaXN = response.data;
            console.log(response.data);
        });
    };
    $scope.LoadDonHangChuaXN = function () {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/BanHangControllers/get-donhang-chuaXN',
        }).then(function (response) {
            $scope.listDonHangchuaXN = response.data;
            console.log(response.data);
        });
    };
    $scope.LoadDonHangDangGiao = function () {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/BanHangControllers/get-donhang-danggiao',
        }).then(function (response) {
            $scope.listDonHangDangGiao = response.data;
            console.log(response.data);
        });
    };
    $scope.LoadDonHangDaGiao = function () {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/BanHangControllers/get-donhang-dagiao',
        }).then(function (response) {
            $scope.listDonHangDaGiao = response.data;
            console.log(response.data);
        });
    };
    $scope.donhang;
    $scope.XemChiTietDon = function (id) {
        $http({
            method: 'POST',
            url: current_urlAdmin + '/api/BanHangControllers/get-chitiet-donhang/' + id,
        }).then(function (response) {
            $scope.donhang = response.data
            document.getElementById('panelchung').style.display = 'block'
            console.log(response.data)

        });
    };
    $scope.LoadDanhMuc();
    $scope.LoadThuongHieu();
    $scope.LoadSanPham();
    $scope.LoadDonHangDaXN();
    $scope.LoadDonHangChuaXN();
    $scope.LoadDonHangDangGiao();
    $scope.LoadDonHangDaGiao();

    $scope.XacNhanDon = function (id) {
        $http({
            method: 'POST',
            url: current_urlAdmin + '/api/BanHangControllers/XacNhandonHang/' + id,
        }).then(function (response) {
            alert(response.data)
            console.log(response.data)
            $scope.LoadDonHangDaXN();
            $scope.LoadDonHangChuaXN();
            $scope.LoadDonHangDangGiao();
            $scope.LoadDonHangDaGiao();

        });
    };
    $scope.XacNhanGui = function (id) {
        $http({
            method: 'POST',
            url: current_urlAdmin + '/api/BanHangControllers/get-xacnhan-gui-donhang/' + id,
        }).then(function (response) {
            alert('Xác nhận thành công')
            console.log(response.data)
            $scope.LoadDonHangDaXN();
            $scope.LoadDonHangChuaXN();
            $scope.LoadDonHangDangGiao();
            $scope.LoadDonHangDaGiao();

        });
    };


    $scope.maThuongHieu;
    $scope.tenThuongHieu;
    $scope.id_loai;
    $scope.btnSubmitThuongHieu = 'Thêm thương hiệu'
    $scope.getThuongHieuID = function (id) {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/ThuongHieuControllers/get-thuonghieu-by-id/' + id,
        }).then(function (response) {
            $scope.maThuongHieu = response.data.id;
            $scope.tenThuongHieu = response.data.name;
            $scope.id_loai = response.data.id_loai;
            console.log(response.data)
            document.getElementById('mathuonghieu1').readOnly = true
            $scope.btnSubmitThuongHieu = 'Cập nhật'
        });
    };
    $scope.DelThuongHieu = function (id) {
        var result = confirm("Bạn có thực sự muốn xóa không?");
        if (result) {
            $http({
                method: 'POST',
                url: current_urlAdmin + '/api/ThuongHieuControllers/delte-thuonghieu/' + id,
            }).then(function (response) {
                $scope.LoadThuongHieu();
                alert('Xóa thương hiệu thành công')
            });
        }
    };
    $scope.SaveThuongHieu = function () {
        let obj = {};
        obj.id = $scope.maThuongHieu;
        obj.name = $scope.tenThuongHieu;
        obj.id_loai = $scope.id_loai;
        if ($scope.btnSubmitThuongHieu == 'Thêm thương hiệu') {
            $http({
                method: 'POST',
                url: current_urlAdmin + '/api/ThuongHieuControllers/create-thuonghieu',
                data: obj
            }).then(function (response) {
                alert('thêm thương hiệu thành công')
                $scope.LoadThuongHieu();
            });
        }
        else {
            $http({
                method: 'POST',
                url: current_urlAdmin + '/api/ThuongHieuControllers/update-thuonghieu',
                data: obj
            }).then(function (response) {
                alert('cập nhât thông tin thành công')
                $scope.LoadThuongHieu();
                $scope.maThuongHieu = '';
                $scope.tenThuongHieu = '';
                $scope.id_loai = 'Chọn loại sản phẩm';
                console.log(response.data)
                document.getElementById('mathuonghieu1').readOnly = false
                $scope.btnSubmitThuongHieu = 'Thêm thương hiệu'
            });
        }
    };
    $scope.btnsubmitLoaiSP = 'Thêm loại sản phẩm'
    $scope.maaLoai;
    $scope.tennLoai;
    $scope.moTaLoai;
    $scope.getLoaiSPbyID = function (id) {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/LoaiSanPhamControllers/get-loaisanpham-by-id/' + id,
        }).then(function (response) {
            $scope.maaLoai = response.data.id;
            $scope.tennLoai = response.data.name;
            $scope.moTaLoai = response.data.description;
            console.log(response.data)
            document.getElementById('maloai').readOnly = true
            $scope.btnsubmitLoaiSP = 'Cập nhật'
        });
    };
    $scope.XoaLoaiSP = function (id) {
        var result = confirm("Bạn có thực sự muốn xóa không?");
        if (result) {
            $http({
                method: 'POST',
                url: current_urlAdmin + '/api/LoaiSanPhamControllers/delete-loaisp/' + id,
            }).then(function (response) {
                $scope.LoadDanhMuc();
                alert('Xóa loại sản phẩm thành công')
            });
        }
    };
    $scope.ThemLoaiSanPham = function () {
        let obj = {};
        obj.id = $scope.maaLoai;
        obj.name = $scope.tennLoai;
        obj.description = $scope.moTaLoai;
        if ($scope.btnsubmitLoaiSP == 'Thêm loại sản phẩm') {
            $http({
                method: 'POST',
                url: current_urlAdmin + '/api/LoaiSanPhamControllers/create-loaisp',
                data: obj
            }).then(function (response) {
                alert('thêm loại thành công')
                $scope.LoadDanhMuc();
            });
        }
        else {
            $http({
                method: 'POST',
                url: current_urlAdmin + '/api/LoaiSanPhamControllers/update-loaisp',
                data: obj
            }).then(function (response) {
                alert('cập nhât thông tin thành công')
                $scope.LoadDanhMuc();
                $scope.maaLoai = '';
                $scope.tennLoai = '';
                $scope.moTaLoai = '';
                console.log(response.data)
                document.getElementById('maloai').readOnly = false
                $scope.btnsubmitLoaiSP = 'Thêm loại sản phẩm'
            });
        }
    };
    $scope.doanhthuhomnay;
    $scope.doanhthuhangthang;
    $scope.getDoanhThuHomNay = function () {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/ThongKeControllers/get-doanh-thu-hom-nay',
        }).then(function (response) {

            $scope.doanhthuhomnay = response.data
        });
    };
    $scope.getDoanhThuTungThang = function () {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/ThongKeControllers/get-doanhthu-thang-trongnam',
        }).then(function (response) {

            $scope.doanhthuhangthang = response.data
            var chartData = {
                labels: $scope.doanhthuhangthang.map(function (item) {
                    return 'tháng ' + item.month; // Thay thế 'thang' bằng tên thuộc tính tháng trong dữ liệu của bạn
                }),
                datasets: [{
                    label: "Doanh thu",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    data: $scope.doanhthuhangthang.map(function (item) {
                        return item.doanhThu; // Thay thế 'doanhThu' bằng tên thuộc tính doanh thu trong dữ liệu của bạn
                    }),
                    fill: false,
                }]
            };
            drawChart(chartData);
        });
    };
    $scope.listSPbanChay;
    $scope.thongkeSanPhamBanChay = function () {
        var today = new Date();

        // Ngày đầu tiên của tháng
        var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

        // Ngày cuối cùng của tháng
        var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        // Chuyển định dạng thành MM/dd/yyyy
        var formattedFirstDay = formatDate(firstDay);
        var formattedLastDay = formatDate(lastDay);
        let obj = {};
        obj.top = 2;
        obj.ngayMin = firstDay;
        obj.ngayMax = lastDay;
        $http({
            method: 'POST',
            url: current_urlAdmin + '/api/ThongKeControllers/get-sanpham-banchay-tgbk',
            data: obj
        }).then(function (response) {
            $scope.listSPbanChay = response.data;
            console.log(response.data)

        });
    };
    $scope.thongkeSanPhamBanChay();
    $scope.getDoanhThuTungThang();
    $scope.getDoanhThuHomNay();

    $scope.listNCC;
    $scope.LoadNCC = function () {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/NhaCungCapControllers/Get-NhaCungCap',
        }).then(function (response) {
            $scope.listNCC = response.data;
            console.log(response.data)

        });
    };
    $scope.LoadNCC();
    $scope.maSanPhamTimKiem = '';
    $scope.tenSanPhamTimKiem = '';
    $scope.TimKiemSanPham = function () {
        if ($scope.maSanPhamTimKiem == '' && $scope.tenSanPhamTimKiem == '') {
            $scope.LoadSanPham();
        }
        else {
            let obj = {};
            obj.name = $scope.tenSanPhamTimKiem;
            obj.id = $scope.maSanPhamTimKiem;
            $http({
                method: 'POST',
                url: current_urlAdmin + '/api/SanPhamControllers/get-sp-admin-timkiem',
                data: obj
            }).then(function (response) {
                $scope.listSanPham = response.data;
                console.log(response.data)

            });
        }
    };
    $scope.SanPhamgetbyID
    $scope.GetSanPhamByID = function (id) {
        $http({
            method: 'GET',
            url: current_urlAdmin + '/api/SanPhamControllers/get-by-id/' + id,
        }).then(function (response) {
            $scope.SanPhamgetbyID = response.data;
            console.log(response.data)
            $scope.maSanPham = $scope.SanPhamgetbyID.maSanPham;
            $scope.tenSanPham=$scope.SanPhamgetbyID.tenSanPham;
            $scope.maThuongHieu1=$scope.SanPhamgetbyID.maThuongHieu;
            console.log($scope.maThuongHieu1)
            $scope.moTaSanPham=$scope.SanPhamgetbyID.mota;
            $scope.mauID = $scope.SanPhamgetbyID.mau[0].id;
            $scope.MaSanPhamID = $scope.SanPhamgetbyID.mau[0].idsp;
            $scope.MauSac=$scope.SanPhamgetbyID.mau[0].mausac;
            $scope.listId = $scope.SanPhamgetbyID.mau[0].list[0].id;
            $scope.listIdmau = $scope.SanPhamgetbyID.mau[0].list[0].idmau;
            $scope.listKichthuoc=$scope.SanPhamgetbyID.mau[0].list[0].kichthuoc.trim();
            $scope.listSoluong = $scope.SanPhamgetbyID.mau[0].list[0].soluong;
            $scope.hinhAnhModelsId = $scope.SanPhamgetbyID.mau[0].hinhAnhModels[0].id;
            $scope.hinhAnhModelsIdMau = $scope.SanPhamgetbyID.mau[0].hinhAnhModels[0].idMau;
            $scope.hinhanh_url=$scope.SanPhamgetbyID.mau[0].hinhAnhModels[0].hinhanh_url;
            if($scope.hinhanh_url.includes('https://firebasestorage.googleapis.com/v0')==true){

            document.getElementById('previewImage1').src=$scope.hinhanh_url
            }
            else
            {
                document.getElementById('previewImage1').src=current_img+'/'+ $scope.hinhanh_url

            }
            $scope.giaBans = $scope.giaBans;
            $scope.submitSanPham = 'Cập nhật'
            document.getElementById('thongtinsanpham').style.display ='block'

        });
    };
    $scope.DelSanPhamByID = function (id) {
        var result = confirm("Bạn có thực sự muốn xóa không?");
        if (result) {
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token },
                url: current_urlAdmin + '/api/SanPhamControllers/delete-sp/' + id,
            }).then(function (response) {
                $scope.LoadSanPham();
                alert('Xóa sản phẩm thành công')
                console.log(response.data)

            });
        }
    };
    $scope.maSanPham = "1";
    $scope.tenSanPham;
    $scope.maThuongHieu1;
    $scope.moTaSanPham;
    $scope.mauID = "1";
    $scope.MaSanPhamID = "1";
    $scope.MauSac;
    $scope.listId = "1";
    $scope.listIdmau = "1";
    $scope.listKichthuoc;
    $scope.listSoluong = 100;
    $scope.hinhAnhModelsId = "1";
    $scope.hinhAnhModelsIdMau = "1";
    $scope.hinhanh_url;
    $scope.giaBans = "10000";
    $scope.submitSanPham = 'Thêm sản phẩm'
    $scope.SaveSanPham = async function () {
        event.preventDefault();
        $scope.hinhanh_url = document.getElementById('fileanh').value;

        var fileInput1 = document.getElementById('anh1');
        var file1 = fileInput1.files[0];
        if (file1) {
            $scope.hinhanh_url = await $scope.uploadFile(file1);
        } else {
            if ($scope.hinhanh_url == null) {

                $scope.hinhanh_url = 'string';
            }
        }
        if ($scope.moTaSanPham === null || $scope.moTaSanPham === '') {
            $scope.moTaSanPham = ''
        }
        if ($scope.maSanPham == null || $scope.tenSanPham == null || $scope.listSoluong == null || $scope.giaBans == null || $scope.maThuongHieu1 == null) {
            alert('Bạn chưa nhập đủ thông tin')
            return;
        }
        else {
            var formData = {
                maSanPham: $scope.maSanPham,
                maThuongHieu: $scope.maThuongHieu1,
                tenSanPham: $scope.tenSanPham,
                mota: $scope.moTaSanPham,
                hinhAnhDaiien: $scope.hinhanh_url,
                mau: [],
                giaBans: $scope.giaBans
            };

            // Create an object for mau
            var mauData = {
                id: $scope.mauID,
                idsp: $scope.MaSanPhamID,
                mausac: $scope.MauSac,
                list: [],
                hinhAnhModels: [],
                status:2,
            };

            // Create an object for list
            var listData = {
                id: $scope.listId,
                idmau: $scope.listIdmau,
                kichthuoc: $scope.listKichthuoc,
                soluong: $scope.listSoluong,
                status:2
            };

            // Push listData into mauData
            mauData.list.push(listData);

            // Create an object for hinhAnhModels
            var hinhAnhModelData = {
                id: $scope.hinhAnhModelsId,
                idMau: $scope.hinhAnhModelsIdMau,
                hinhanh_url: $scope.hinhanh_url,
                status:2,
            };

            // Push hinhAnhModelData into mauData
            mauData.hinhAnhModels.push(hinhAnhModelData);

            // Push mauData into formData.mau as an array
            formData.mau.push(mauData);

            // Log the final data object
            console.log(JSON.stringify(formData, null, 2));

            if ($scope.submitSanPham == "Thêm sản phẩm") {
                // console.log(obj)
                $http({
                    method: 'POST',
                    data: formData,
                    url: current_urlAdmin + '/api/SanPhamControllers/create-sp',
                }).then(function (response) {
                    $scope.LoadSanPham();
                    alert('Thêm sản phẩm thành công!');
                });
            } else {
                $http({
                    method: 'POST',
                    data: formData,
                    url: current_urlAdmin + '/api/SanPhamControllers/update-sp',
                }).then(function (response) {

                    alert('Cập nhật sản phẩm thành công!');
                    $scope.LoadSanPham();
                    $scope.submitSanPham = 'Thêm sản phẩm'
                    closeForm2();
                    $scope.maSanPham = "1";
                    $scope.tenSanPham = '';
                    $scope.maThuongHieu1;
                    $scope.moTaSanPham = '';
                    $scope.mauID = "1";
                    $scope.MaSanPhamID = "1";
                    $scope.MauSac = '';
                    $scope.listId = "1";
                    $scope.listIdmau = "1";
                    $scope.listKichthuoc = '';
                    $scope.listSoluong = 100;
                    $scope.hinhAnhModelsId = "1";
                    $scope.hinhAnhModelsIdMau = "1";
                    $scope.hinhanh_url = '';
                    $scope.giaBans = "10000";
                    $scope.submitSanPham = 'Thêm sản phẩm'
                });
            }
        }

    };
    $scope.uploadFile = function (file) {
        return new Promise(function (resolve, reject) {
            const formData = new FormData();
            formData.append('file', file);

            $http({
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': undefined
                },
                url: current_urlAdmin + '/api/PhiChucNang/upload',
            }).then(function (response) {
                resolve(response.data.filePath);
            }).catch(function (error) {
                reject(error);
            });
        });
    };

});
function closeForm() {
    document.getElementById('panelchung').style.display = 'none';

}
function drawChart(chartData) {
    // Get the canvas element
    var ctx = document.getElementById('myLineChart').getContext('2d');

    // Create a new line chart
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    labels: chartData.labels,
                },
            },
        },
    });
}
function formatDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    var yyyy = date.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
}
function closeForm2() {
    document.getElementById('thongtinsanpham').style.display = 'none'
    document.getElementById('productForm').reset();
}
function displayFileName() {
    var fileInput = document.getElementById('anh1');
    var fileNameDisplay = document.getElementById('fileanh');

    // Check if any file is selected
    if (fileInput.files.length > 0) {
        // Access the first file (in case multiple files are allowed)
        var fileName = fileInput.files[0].name;
        fileNameDisplay.value = fileName;

    } else {
        fileNameDisplay.textContent = 'No file selected';
    }
}
function previewFile(inputId, previewId) {
    var input = document.getElementById(inputId);
    var preview = document.getElementById(previewId);

    var file = input.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
        displayFileName();
    } else {
        preview.src = "";
    }
}
function DangXuat(){
    localStorage.removeItem('user-Admin');
    window,location.reload();
}