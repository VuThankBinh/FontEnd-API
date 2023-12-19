fetch('./js/SanPham.json') 
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        localStorage.setItem("sanphamAdmin", JSON.stringify(data));
        console.log("saved");
    })
    .catch(function (err) {
        console.log(err);
    })

fetch('./js/loaisp.json')
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        localStorage.setItem("LoaisanphamAdmin", JSON.stringify(data));
        console.log("saved");
    })
    .catch(function (err) {
        console.log(err);
    })

fetch('./js/ncc.json')
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        localStorage.setItem("NhaCungCapAdmin", JSON.stringify(data));
        console.log("saved");
    })
    .catch(function (err) {
        console.log(err);
    })

//thêm sửa xóa sản phẩm
var menuVisible = true;
function showhide() {
    var ulMenu = document.getElementById("menucc");
    var liItems = ulMenu.querySelectorAll("ul li");

    if (menuVisible) {

        for (var i = 0; i < liItems.length; i++) {
            liItems[i].style.display = "none";

        }
    } else {
        for (var i = 0; i < liItems.length; i++) {
            liItems[i].style.display = "block";

        }
    }

    menuVisible = !menuVisible; // Đảo ngược trạng thái hiển th
}
function showHome() {
    location.reload();
}
function showThongke() {
    resetNavItems();
    showView("thongkeview");
}
var menuVisible1 = true;

function showHideInfo() {
    var ulMenu = document.getElementById("thongtinchung");
    var liItems = ulMenu.querySelectorAll("ul li");

    if (menuVisible1) {
        for (var i = 0; i < liItems.length; i++) {
            liItems[i].style.display = "none";

        }
    } else {
        for (var i = 0; i < liItems.length; i++) {
            liItems[i].style.display = "block";

        }
    }

    menuVisible1 = !menuVisible1; // Đảo ngược trạng thái hiển th
}
function showView(viewId) {
    // Hide all div elements
    document.querySelectorAll('#danhmucview > div').forEach(div => {
        div.classList.add('hidden');
    });

    // Show the selected div
    const selectedView = document.getElementById(viewId);
    if (selectedView) {
        selectedView.classList.remove('hidden');
    }
}
function showLoaiSP() {

    resetNavItems();
    document.querySelector('#thongtinchung li:nth-child(1)').classList.add('selected');
    showView("danhmucsp")
}

function showSanPham() {

    resetNavItems();
    document.querySelector('#thongtinchung li:nth-child(2)').classList.add('selected');
    showView("sanpham")
}
function showNhaCungCap() {
    resetNavItems();
    document.querySelector('#thongtinchung li:nth-child(3)').classList.add('selected');
    showView('ncc')
}
function showHDN() {
    resetNavItems();
    document.querySelector('#thongtinchung li:nth-child(4)').classList.add('selected');
    showView('HoaDonNhap')
}
function showCTKM() {
    resetNavItems();
    document.querySelector('#thongtinchung li:nth-child(5)').classList.add('selected');
    showView('ctkm')
}
function resetNavItems() {
    // Remove 'selected' class from all list items
    document.querySelectorAll('#thongtinchung li').forEach(item => {
        item.classList.remove('selected');
    });
    document.querySelectorAll('#thongtindonhang li').forEach(item => {
        item.classList.remove('selected');
    });
}


var menuVisible2 = false;
function showHideDonHang() {
    var ulMenu = document.getElementById("thongtindonhang");
    var liItems = ulMenu.querySelectorAll("ul li");

    if (menuVisible2) {
        for (var i = 0; i < liItems.length; i++) {
            liItems[i].style.display = "none";

        }
    } else {
        for (var i = 0; i < liItems.length; i++) {
            liItems[i].style.display = "block";

        }
    }

    menuVisible2 = !menuVisible2; // Đảo ngược trạng thái hiển th
}
function showDonHangChuaXN() {
    resetNavItems();
    document.querySelector('#thongtindonhang li:nth-child(1)').classList.add('selected');
    showView('donHangChuaXN')
}
function showDonHangDaXN() {
    resetNavItems();
    document.querySelector('#thongtindonhang li:nth-child(2)').classList.add('selected');
    showView('donhangDaXacNhan')
}

function showDonHangDangGiao() {
    resetNavItems();
    document.querySelector('#thongtindonhang li:nth-child(3)').classList.add('selected');
    showView('DonHangDangGiao')
}
function showDonHangDaGiao() {
    resetNavItems();
    document.querySelector('#thongtindonhang li:nth-child(4)').classList.add('selected');
    showView('DonHangDaGiao')
}
function showDonHangHoanTra() {
    resetNavItems();
    document.querySelector('#thongtindonhang li:nth-child(5)').classList.add('selected');
    showView('DonHoanTra')
}
function closeForm() {
    document.getElementById('panelChung').innerHTML = ``;
}


//load danh sách sản phẩm
function loadDSSP() {
    document.getElementById('tbody-sanpham').innerHTML = ``;
    var stt = 0;
    var spAD = JSON.parse(localStorage.getItem('sanphamAdmin'));
    for (var loai in spAD) {
        // console.log(loai)
        if (loai !== 'Bong') {


            for (const brand in spAD[loai][0]) {

                var products = spAD[loai][0][brand];

                for (var i = 0; i < products.length; i++) {

                    var sp = products[i];
                    // console.log(sp);

                    loadttChungSp(stt + 1, sp)
                    // console.log('------------')
                    // console.log(sp);
                    if (loai == 'GiayBongRo') {
                        // load_sp_giay(sp);
                    }
                    if (loai == "QuanAo") {
                        // loadQuanAoBo(sp)
                    }
                    if (loai == "PhuKien") {
                        // loadPhuKien(sp)
                    }
                    stt++;
                }
            }
        } else {
            for (var brand in spAD[loai]) {
                var br = spAD[loai][brand];
                // loadBong(br)
                // console.log(br)
                loadttChungSp(stt + 1, br)
                stt++;
            }
        }
        // console.log('------------')
    }
}
function loadttChungSp(i, obj) {


    var html = `<tr>
    <td>${i}</td>
    <td>${obj.id}</td>
    <td><img src="${obj.img[0].img1}" alt="" style="width: 80px;height: 80px;">
    </td>
    <td style="width: 200px;">${obj.name}
    </td>
    <td style="width: 300px;">
       ${obj.moTa}
    </td>
    <td>
        <i class="fa-regular fa-pen-to-square" onclick="EditSanPham('${obj}')"></i>
        <i class="fa-solid fa-trash" onclick="DelSanPham('${obj.id}')"></i>
    </td>
</tr>`
    document.getElementById('tbody-sanpham').innerHTML += html;
}
function showFormAddSanPham() {
    document.getElementById('panelChung').innerHTML += `<div  style="
    display: block;
line-height: 25.6px;
top: 0;
left: 0;
text-align: left;
width: 100%;
position: fixed;
height: 100%;
z-index: 1000;
background-color: rgba(5, 5, 5, 0.3);
">

    <div style="
    background-color: white;
    width: 60%;
    height: 50%;
    margin-top: 15%;
    margin-left: 20%;
    position: absolute;">
        <div style="    position: fixed;
        
        width: 30px;
        height: 30px;
        margin-left: 58%;
        background-color: #ccc;
        border-radius: 50%;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    " onclick="closeForm()">×</div>
        <table style="border: none !important">
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Mã sản phẩm:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="maloaiview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập mã loại sản phẩm">
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Tên sản phẩm:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="tenloaiview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập tên loại sản phẩm">
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Mô tả:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="moTaloaiview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập mô tả loại sản phẩm">
                </td>
            </tr>
        </table>
        <button style="margin-left: 40%;padding: 5px;color: white;background-color: rgb(34, 34, 34);border-radius: 5px;cursor:pointer" onclick="ThemLoaiSP()">Add</button>
    </div>
</div>`
}
function showFormEditSanPham() {
    document.getElementById('panelChung').innerHTML += `<div  style="
    display: block;
line-height: 25.6px;
top: 0;
left: 0;
text-align: left;
width: 100%;
position: fixed;
height: 100%;
z-index: 1000;
background-color: rgba(5, 5, 5, 0.3);
">

    <div style="
    background-color: white;
    width: 60%;
    height: 50%;
    margin-top: 15%;
    margin-left: 20%;
    position: absolute;">
        <div style="    position: fixed;
        
        width: 30px;
        height: 30px;
        margin-left: 58%;
        background-color: #ccc;
        border-radius: 50%;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    " onclick="closeForm()">×</div>
        <table style="border: none !important">
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Mã sản phẩm:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="maloaiview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập mã loại sản phẩm">
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Tên sản phẩm:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="tenloaiview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập tên loại sản phẩm">
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Mô tả:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="moTaloaiview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập mô tả loại sản phẩm">
                </td>
            </tr>
        </table>
        <button style="margin-left: 40%;padding: 5px;color: white;background-color: rgb(34, 34, 34);border-radius: 5px;cursor:pointer" onclick="ThemLoaiSP()">Add</button>
    </div>
</div>`
}
function EditSanPham(obj) {

}
function AddtSanPham(obj) {

}
function DelSanPham(objID) {

    swal({
        title: "Are you sure?",
        text: "Bạn có muốn xóa sản phẩm này không",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirm) => {
        if (confirm) {
            var spAD = JSON.parse(localStorage.getItem('sanphamAdmin'));

            for (var loai in spAD) {
                if (loai !== 'Bong') {
                    for (const brand in spAD[loai][0]) {
                        var products = spAD[loai][0][brand];
                        for (var i = 0; i < products.length; i++) {
                            var sp = products[i];
                            if (sp.id.toLowerCase() == objID.toLowerCase()) {
                                // Sử dụng filter để tạo danh sách mới không chứa đối tượng cần xóa
                                var updatedProducts = products.filter(obj => obj.id != objID);
                                spAD[loai][0][brand] = updatedProducts;
                                localStorage.setItem('sanphamAdmin', JSON.stringify(spAD));
                                alert("Xóa sản phẩm có mã: " + objID + " thành công")
                                loadDSSP();
                            }
                        }
                    }
                } else {
                    for (var brand in spAD[loai]) {
                        var products = spAD[loai][brand];
                        for (var i = 0; i < products.length; i++) {
                            var sp = products[i];
                            if (sp.id.toLowerCase() == objID.toLowerCase()) {
                                // Sử dụng filter để tạo danh sách mới không chứa đối tượng cần xóa
                                var updatedProducts = products.filter(obj => obj.id != objID);
                                spAD[loai][brand] = updatedProducts;
                                localStorage.setItem('sanphamAdmin', JSON.stringify(spAD));
                                alert("Xóa sản phẩm có mã: " + objID + " thành công")
                                loadDSSP();
                            }
                        }
                    }
                }
            }

            // Lưu trạng thái đã cập nhật vào local storage

        } else {
            // swal("The status has not changed.");
        }
    });
}
function TimKiemSanPham() {
    ma = document.getElementById('masp').value;
    ten = document.getElementById('tensp').value;
    console.log(ma)
    console.log(ten)
    document.getElementById('tbody-sanpham').innerHTML = ``;
    var stt = 0;
    var spAD = JSON.parse(localStorage.getItem('sanphamAdmin'));
    for (var loai in spAD) {
        // console.log(loai)
        if (loai !== 'Bong') {


            for (const brand in spAD[loai][0]) {

                var products = spAD[loai][0][brand];

                for (var i = 0; i < products.length; i++) {

                    var sp = products[i];
                    // console.log(sp);
                    if (ma.trim() != "" && ten.trim() != "") {
                        if (sp.name.toLowerCase().includes(ten.toLowerCase()) && sp.id.toLowerCase().includes(ma.toLowerCase())) {
                            loadttChungSp(stt + 1, sp)
                            // console.log('------------')
                            // console.log(sp);
                            if (loai == 'GiayBongRo') {
                                // load_sp_giay(sp);
                            }
                            if (loai == "QuanAo") {
                                // loadQuanAoBo(sp)
                            }
                            if (loai == "PhuKien") {
                                // loadPhuKien(sp)
                            }
                            stt++;
                        }
                    }
                    if (ma.trim() == "" && ten.trim() == "") {
                        loadDSSP();
                    }
                    if (ma.trim() == "" && ten.trim() != "") {
                        if (sp.name.toLowerCase().includes(ten.toLowerCase())) {
                            loadttChungSp(stt + 1, sp)

                            stt++;
                        }
                    }
                    if (ma.trim() != "" && ten.trim() == "") {
                        if (sp.id.toLowerCase().includes(ma.toLowerCase())) {
                            loadttChungSp(stt + 1, sp)

                            stt++;
                        }
                    }

                }
            }
        } else {
            for (var brand in spAD[loai]) {
                var br = spAD[loai][brand];
                // loadBong(br)
                // console.log(br)
                if (br.name.toLowerCase().includes(ten.toLowerCase()) && br.id.toLowerCase().includes(ma.toLowerCase())) {
                    loadttChungSp(stt + 1, br)
                    stt++;
                }
                if (ma.trim() != "" && ten.trim() != "") {
                    if (br.name.toLowerCase().includes(ten.toLowerCase()) && br.id.toLowerCase().includes(ma.toLowerCase())) {
                        loadttChungSp(stt + 1, sp)

                        stt++;
                    }
                }
                if (ma.trim() == "" && ten.trim() == "") {
                    loadDSSP();
                }
                if (ma.trim() == "" && ten.trim() != "") {
                    if (br.name.toLowerCase().includes(ten.toLowerCase())) {
                        loadttChungSp(stt + 1, sp)

                        stt++;
                    }
                }
                if (ma.trim() != "" && ten.trim() == "") {
                    if (br.id.toLowerCase().includes(ma.toLowerCase())) {
                        loadttChungSp(stt + 1, sp)

                        stt++;
                    }
                }
            }
        }
        // console.log('------------')
    }

}

//loại sản phẩm
function loaddsLoai() {
    document.getElementById('tbody-loaisanpham').innerHTML = ``;

    var lspAD = JSON.parse(localStorage.getItem('LoaisanphamAdmin'));
    console.log(lspAD)
    for (var i = 0; i < lspAD.loaisp.length; i++) {
        loadttChunglSp(i + 1, lspAD.loaisp[i]);

    }
}
function loadttChunglSp(i, obj) {
    document.getElementById('tbody-loaisanpham').innerHTML += `<tr>
    <td>${i}</td>
    <td>${obj.id}</td>
    <td>${obj.name}</td>
    <td>${obj.moTa}</td>
    <td>
        <i class="fa-regular fa-pen-to-square" onclick="showFormEditLoai('${obj.name}','${obj.id}','${obj.moTa}')"></i>
        <i class="fa-solid fa-trash" onclick="DelLoaiSP('${obj.id}')"></i>
    </td>
</tr>`
}

function showFormEditLoai(name, id, mota) {
    document.getElementById('panelChung').innerHTML += `<div  style="
    display: block;
line-height: 25.6px;
top: 0;
left: 0;
text-align: left;
width: 100%;
position: fixed;
height: 100%;
z-index: 1000;
background-color: rgba(5, 5, 5, 0.3);
">

    <div style="
    background-color: white;
    width: 30%;
    height: 30%;
    margin-top: 18%;
    margin-left: 35%;
    position: absolute;">
        <div style="    position: fixed;
        
        width: 30px;
        height: 30px;
        margin-left: 29%;
        background-color: #ccc;
        border-radius: 50%;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    " onclick="closeForm()">×</div>
        <table style="border: none !important">
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Mã loại sản phẩm:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="maloaiview" style="padding: 5px;border-radius: 5px;" placeholder="${id}" readonly>
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Tên loại sản phẩm:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="tenloaiview" style="padding: 5px;border-radius: 5px;" value="${name}">
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Mô tả:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="moTaloaiview" style="padding: 5px;border-radius: 5px;" value="${mota}">
                </td>
            </tr>
        </table>
        <button style="margin-left: 40%;padding: 5px;color: white;background-color: rgb(34, 34, 34);border-radius: 5px;cursor:pointer" onclick="EditLoaiSP()">Update</button>
    </div>
</div>`
}
function showFormThemLoai() {
    document.getElementById('panelChung').innerHTML += `<div  style="
    display: block;
line-height: 25.6px;
top: 0;
left: 0;
text-align: left;
width: 100%;
position: fixed;
height: 100%;
z-index: 1000;
background-color: rgba(5, 5, 5, 0.3);
">

    <div style="
    background-color: white;
    width: 30%;
    height: 30%;
    margin-top: 18%;
    margin-left: 35%;
    position: absolute;">
        <div style="    position: fixed;
        
        width: 30px;
        height: 30px;
        margin-left: 29%;
        background-color: #ccc;
        border-radius: 50%;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    " onclick="closeForm()">×</div>
        <table style="border: none !important">
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Mã sản phẩm:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="maloaiview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập mã loại sản phẩm">
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Tên sản phẩm:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="tenloaiview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập tên loại sản phẩm">
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Mô tả:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="moTaloaiview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập mô tả loại sản phẩm">
                </td>
            </tr>
        </table>
        <button style="margin-left: 40%;padding: 5px;color: white;background-color: rgb(34, 34, 34);border-radius: 5px;cursor:pointer" onclick="ThemLoaiSP()">Add</button>
    </div>
</div>`
}
function EditLoaiSP() {
    id = document.getElementById('maloaiview').placeholder;

    namel = document.getElementById('tenloaiview').value;
    console.log(document.getElementById('moTaloaiview').value)
    motal = document.getElementById('moTaloaiview').value;

    var lspAD = JSON.parse(localStorage.getItem('LoaisanphamAdmin'));
    console.log(lspAD)
    for (var i = 0; i < lspAD.loaisp.length; i++) {
        if (lspAD.loaisp[i].id === id) {
            lspAD.loaisp[i] = { id, name: namel, moTa: motal };
            localStorage.setItem('LoaisanphamAdmin', JSON.stringify(lspAD));
            alert('Update thành công')
            loaddsLoai();
            closeForm();
            break;
        }

    }
}
function ThemLoaiSP() {
    var lspAD = JSON.parse(localStorage.getItem('LoaisanphamAdmin'));
    id = document.getElementById('maloaiview').value;

    namel = document.getElementById('tenloaiview').value;
    motal = document.getElementById('moTaloaiview').value;
    if (id.trim() == "" || namel.trim() == "") {
        alert("Bạn chưa nhập đầy đủ thông tin")
        return;
    }
    else {
        // Kiểm tra xem id đã tồn tại hay chưa
        var existingLoai = lspAD.loaisp.find(function (loai) {
            return loai.id.toLowerCase() === id.toLowerCase();
        });

        // Nếu id đã tồn tại, thông báo lỗi
        if (existingLoai) {
            alert('ID đã tồn tại. Vui lòng chọn ID khác.');
            return;
        }

        // Thêm loại sản phẩm mới vào mảng loaisp
        lspAD.loaisp.push({ id, name: namel, moTa: motal });

        // Lưu dữ liệu đã cập nhật vào local storage
        localStorage.setItem('LoaisanphamAdmin', JSON.stringify(lspAD));

        // Thông báo thành công và làm mới danh sách loại sản phẩm
        alert('Thêm loại sản phẩm thành công');
        loaddsLoai();
        closeForm();
    }
}
function DelLoaiSP(objID) {
    swal({
        title: "Are you sure?",
        text: "Bạn có muốn xóa loại sản phẩm này không",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirm) => {
        if (confirm) {
            var lspAD = JSON.parse(localStorage.getItem('LoaisanphamAdmin'));
            for (var i = 0; i < lspAD.loaisp.length; i++) {
                console.log(objID)
                console.log(lspAD.loaisp[i].id)
                console.log('-------------------------')
                if (lspAD.loaisp[i].id.toLowerCase() == objID.toLowerCase()) {
                    // Sử dụng filter để tạo danh sách mới không chứa đối tượng cần xóa
                    var updatedProducts = lspAD.loaisp.filter(obj => obj.id != objID);
                    lspAD.loaisp = updatedProducts;
                    localStorage.setItem('LoaisanphamAdmin', JSON.stringify(lspAD));
                    alert("Xóa loại sản phẩm có mã: " + objID + " thành công")
                    loaddsLoai();
                }

            }

        } else {
            // swal("The status has not changed.");
        }
    });
}
function TimKiemLoaiSanPham() {
    ma = document.getElementById('maloai').value;
    ten = document.getElementById('tenloai').value;
    console.log(ma)
    console.log(ten)
    document.getElementById('tbody-loaisanpham').innerHTML = ``;

    var lspAD = JSON.parse(localStorage.getItem('LoaisanphamAdmin'));
    console.log(lspAD)
    for (var i = 0; i < lspAD.loaisp.length; i++) {
        if (ma.trim() != "" && ten.trim() != "") {
            if (lspAD.loaisp[i].name.toLowerCase().includes(ten.toLowerCase()) && lspAD.loaisp[i].id.toLowerCase().includes(ma.toLowerCase())) {
                loadttChunglSp(i + 1, lspAD.loaisp[i]);
            }
        }
        if (ma.trim() == "" && ten.trim() == "") {
            loaddsLoai();
        }
        if (ma.trim() == "" && ten.trim() != "") {
            if (lspAD.loaisp[i].name.toLowerCase().includes(ten.toLowerCase())) {
                lloadttChunglSp(i + 1, lspAD.loaisp[i]);
            }
        }
        if (ma.trim() != "" && ten.trim() == "") {
            if (lspAD.loaisp[i].id.toLowerCase().includes(ma.toLowerCase())) {
                loadttChunglSp(i + 1, lspAD.loaisp[i]);
            }
        }


    }
}


//nhà cung cấp
function loadDSNCC() {
    document.getElementById('tbody-ncc').innerHTML = ``;
    var nccAD = JSON.parse(localStorage.getItem('NhaCungCapAdmin'));
    for (var i = 0; i < nccAD.length; i++) {
        loadTTchungNCC(i + 1, nccAD[i])
    }
}
function loadTTchungNCC(i, obj) {
    document.getElementById('tbody-ncc').innerHTML += `<tr>
    <td>${i}</td>
    <td>${obj.ID}</td>
    <td>${obj.SupplierName}</td>
    <td style="width: 200px;">${obj.PhoneNumber}</td>
    <td style="width: 300px;">
        ${obj.Address}
    </td>
    <td>
        <i class="fa-regular fa-pen-to-square" onclick="ShowEditNCC('${obj.ID}','${obj.SupplierName}','${obj.PhoneNumber}','${obj.Address}')"></i>
        <i class="fa-solid fa-trash" onclick="DelNCC('${obj.ID}')"></i>
    </td>
</tr>`
}
function TimKiemLoaiSanPham() {
    ma = document.getElementById('mancc').value;
    ten = document.getElementById('tenncc').value;
    console.log(ma)
    console.log(ten)
    document.getElementById('tbody-ncc').innerHTML = ``;

    var lspAD = JSON.parse(localStorage.getItem('NhaCungCapAdmin'));
    console.log(lspAD)
    for (var i = 0; i < lspAD.length; i++) {
        if (ma.trim() != "" && ten.trim() != "") {
            if (lspAD[i].SupplierName.toLowerCase().includes(ten.toLowerCase()) && lspAD[i].ID.toLowerCase().includes(ma.toLowerCase())) {
                loadTTchungNCC(i + 1, lspAD[i]);
            }
        }
        if (ma.trim() == "" && ten.trim() == "") {
            loadTTchungNCC();
        }
        if (ma.trim() == "" && ten.trim() != "") {
            if (lspAD[i].SupplierName.toLowerCase().includes(ten.toLowerCase())) {
                loadTTchungNCC(i + 1, lspAD[i]);
            }
        }
        if (ma.trim() != "" && ten.trim() == "") {
            if (lspAD[i].ID.toLowerCase().includes(ma.toLowerCase())) {
                loadTTchungNCC(i + 1, lspAD[i]);
            }
        }


    }
}
function DelNCC(objID) {
    swal({
        title: "Are you sure?",
        text: "Bạn có muốn xóa nhà cung cấp này không",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirm) => {
        if (confirm) {
            var lspAD = JSON.parse(localStorage.getItem('NhaCungCapAdmin'));
            for (var i = 0; i < lspAD.length; i++) {
                console.log(objID)
                console.log(lspAD[i].ID)
                console.log('-------------------------')
                if (lspAD[i].ID.toLowerCase() == objID.toLowerCase()) {
                    // Sử dụng filter để tạo danh sách mới không chứa đối tượng cần xóa
                    var updatedProducts = lspAD.filter(obj => obj.ID != objID);
                    lspAD = updatedProducts;
                    localStorage.setItem('NhaCungCapAdmin', JSON.stringify(lspAD));
                    alert("Xóa nhà cung cấp có mã: " + objID + " thành công")
                    loadDSNCC();
                }

            }

        } else {
            // swal("The status has not changed.");
        }
    });
}
function ShowEditNCC(id, name, sdt, diachi) {
    document.getElementById('panelChung').innerHTML += `<div  style="
    display: block;
line-height: 25.6px;
top: 0;
left: 0;
text-align: left;
width: 100%;
position: fixed;
height: 100%;
z-index: 1000;
background-color: rgba(5, 5, 5, 0.3);
">

    <div style="
    background-color: white;
    width: 30%;
    height: 33%;
    margin-top: 18%;
    margin-left: 35%;
    position: absolute;">
        <div style="    position: fixed;
        
        width: 30px;
        height: 30px;
        margin-left: 29%;
        background-color: #ccc;
        border-radius: 50%;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    " onclick="closeForm()">×</div>
        <table style="border: none !important">
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Mã nhà cung cấp:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="manccview" style="padding: 5px;border-radius: 5px;" placeholder="${id}" readonly>
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Tên nhà cung cấp:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="tennccview" style="padding: 5px;border-radius: 5px;" value="${name}">
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Số điện thoại:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="sdtview" style="padding: 5px;border-radius: 5px;" value="${sdt}">
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Địa chỉ:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="diachiview" style="padding: 5px;border-radius: 5px;" value="${diachi}">
                </td>
            </tr>
        </table>
        <button style="margin-left: 40%;padding: 5px;color: white;background-color: rgb(34, 34, 34);border-radius: 5px;cursor:pointer" onclick="EditNCC()">Update</button>
    </div>
</div>`
}
function EditNCC() {
    id = document.getElementById('manccview').placeholder;
    namel = document.getElementById('tennccview').value;
    sdtl = document.getElementById('sdtview').value;
    diachil = document.getElementById('diachiview').value;
    console.log(namel)
    var lspAD = JSON.parse(localStorage.getItem('NhaCungCapAdmin'));
    console.log(lspAD)
    for (var i = 0; i < lspAD.length; i++) {
        if (lspAD[i].ID === id) {
            lspAD[i] = { ID: id, SupplierName: namel, PhoneNumber: sdtl, Address: diachil };
            localStorage.setItem('NhaCungCapAdmin', JSON.stringify(lspAD));
            alert('Update thành công')
            loadDSNCC();
            closeForm();
            break;
        }

    }
}
function showFormThemNCC() {
    document.getElementById('panelChung').innerHTML += `<div  style="
    display: block;
line-height: 25.6px;
top: 0;
left: 0;
text-align: left;
width: 100%;
position: fixed;
height: 100%;
z-index: 1000;
background-color: rgba(5, 5, 5, 0.3);
">

    <div style="
    background-color: white;
    width: 30%;
    height: 33%;
    margin-top: 18%;
    margin-left: 35%;
    position: absolute;">
        <div style="    position: fixed;
        
        width: 30px;
        height: 30px;
        margin-left: 29%;
        background-color: #ccc;
        border-radius: 50%;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    " onclick="closeForm()">×</div>
        <table style="border: none !important">
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Mã nhà cung cấp:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="manccview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập mã nhà cung cấp">
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Tên nhà cung cấp:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="tennccview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập tên nhà cung cấp">
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Số điện thoại:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="sdtview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập số điện thoại nhà cung cấp">
                </td>
            </tr>
            <tr style="border: none !important">
                <td style="border: none !important">
                    <h4>Địa chỉ:</h4>
                </td>
                <td style="border: none !important">
                    <input type="text" id="diachiview" style="padding: 5px;border-radius: 5px;" placeholder="Nhập địa chỉ nhà cung cấp">
                </td>
            </tr>
        </table>
        <button style="margin-left: 40%;padding: 5px;color: white;background-color: rgb(34, 34, 34);border-radius: 5px;cursor:pointer" onclick="AddNCC()">Add</button>
    </div>
</div>`
}
function AddNCC() {
    id = document.getElementById('manccview').value;
    namel = document.getElementById('tennccview').value;
    sdtl = document.getElementById('sdtview').value;
    diachil = document.getElementById('diachiview').value;

    var lspAD = JSON.parse(localStorage.getItem('NhaCungCapAdmin'));

    if (id.trim() == "" || namel.trim() == "" || sdtl.trim() == "" || diachil.trim() == "") {
        alert("Bạn chưa nhập đầy đủ thông tin")
        return;
    }
    else {
        // Kiểm tra xem id đã tồn tại hay chưa
        var existingLoai = lspAD.find(function (loai) {
            return loai.ID.toLowerCase() === id.toLowerCase();
        });

        // Nếu id đã tồn tại, thông báo lỗi
        if (existingLoai) {
            alert('ID đã tồn tại. Vui lòng chọn ID khác.');
            return;
        }

        // Thêm loại sản phẩm mới vào mảng loaisp
        lspAD.push({ ID: id, SupplierName: namel, PhoneNumber: sdtl, Address: diachil });

        // Lưu dữ liệu đã cập nhật vào local storage
        localStorage.setItem('NhaCungCapAdmin', JSON.stringify(lspAD));

        // Thông báo thành công và làm mới danh sách loại sản phẩm
        alert('Thêm nhà cung cấp thành công');
        loadDSNCC();
        closeForm();
    }
}
// import jsPDF from 'jspdf';
// const jsPDF = require('jspdf-autotable');

// Rest of your code

var format1 = new Intl.NumberFormat({ maximumSignificantDigits: 3 });



function loadTTchungHDchuaXn() {
    var dsDHchuaXN = JSON.parse(localStorage.getItem('donhang'));
    if (dsDHchuaXN.length != 0 && dsDHchuaXN != null) {
        document.getElementById('tbody-dhchuaxn').innerHTML = ``
        for (var i = 0; i < dsDHchuaXN.length; i++) {
            var sum = 0;
            var le = dsDHchuaXN[i].products
            for (var j = 0; j < le.length; j++) {
                le[j].img = ''
                sum += le[j].price * le[j].quantity;
            }
            // console.log("Before stringify:", JSON.stringify(dsDHchuaXN[i].products).replace(/\"/g, "'"));
            // console.log("After stringify:", JSON.stringify(dsDHchuaXN[i].products));

            document.getElementById('tbody-dhchuaxn').innerHTML += `
            <tr>
                                <td>${i + 1}</td>
                                <td>HD00${i + 1}</td>
                                <td>
                                    ${dsDHchuaXN[i].nameDat}
                                </td>
                                <td>${dsDHchuaXN[i].sdtDat}</td>
                                <td style="width: 300px;">${dsDHchuaXN[i].dcDat}</td>
                                <td>${format1.format(sum)}đ</td>
                                <td><a href="">xác nhận</a></td>
                                <td style="border: none !important;">
                                    <i class="fa-regular fa-eye" onclick="loadTTChiTietHD('HD00${i + 1}','${dsDHchuaXN[i].nameDat}','${dsDHchuaXN[i].sdtDat}','${dsDHchuaXN[i].dcDat}','${sum}','${dsDHchuaXN[i].ngayDat}',${JSON.stringify(dsDHchuaXN[i].products).replace(/\"/g, '\'')})"></i>
                                </td>
                            </tr>`
        }
    }

}
function loadTTChiTietHD(mahd, tenkh, sdtkh, dckh, sumbilll,ngayTao, dssp) {
    var trdssp = ``;
    var sumbill = 0;
    // console.log(dssp)
    for(var i=0;i<dssp.length;i++){
        trdssp+=`<tr>
        <td>${i+1}</td>
        <td>${dssp[i].id}</td>
        <td style="width: 250px;">${dssp[i].name + ' '+dssp[i].color}
        </td>
        <td>${dssp[i].size}</td>
        <td>${dssp[i].quantity}</td>
        <td>${format1.format(dssp[i].price)}đ</td>
        <td>${format1.format(dssp[i].price*dssp[i].quantity)}đ</td>
    </tr>`
    // sumbill+=dssp[i].price*dssp[i].quantity;
    }
    document.getElementById('panelChung').innerHTML = `
    <div style="
        display: block;
    line-height: 25.6px;
    top: 0;
    left: 0;
    text-align: left;
    width: 100%;
    position: fixed;
    height: 100%;
    z-index: 1000;
    background-color: rgba(5, 5, 5, 0.3);
    ">

            <div style="
        background-color: white;
        width: 60%;
        height: 80%;
        margin-top: 5%;
        margin-left: 20%;
        position: absolute;">
                <div style="    position: fixed;
            
            width: 30px;
            height: 30px;
            margin-left: 58%;
            background-color: #ccc;
            border-radius: 50%;
            font-size: 20px;
            color: #fff;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
        " onclick="closeForm()">×</div>
                <h2 style="width: 100%; text-align: center; margin-top: 10px;">Thông tin Hóa đơn</h2>

                <!-- Thông tin chung -->
                <div style="margin-left: 30px;margin-top: 20px;">
                    <strong style="font-size: 18px;">Mã hóa đơn: </strong> <span style="font-size: 18px;" id="invoiceCode">${mahd}</span>
                </div>

                <div style="margin-left: 30px;">
                    <strong style="font-size: 18px;">Tên khách hàng: </strong> <span style="font-size: 18px;" id="customerName">${tenkh}</span>
                </div>
                <div style="margin-left: 30px;">
                <strong style="font-size: 18px;">Ngày đặt: </strong> <span style="font-size: 18px;" id="ngayTao">${ngayTao.toLocaleString()}</span>
            </div>
                <div style="margin-left: 30px;">
                    <strong style="font-size: 18px;">Số điện thoại: </strong> <span style="font-size: 18px;" id="phoneNumber">${sdtkh}</span>
                </div>

                <div style="margin-left: 30px;">
                    <strong style="font-size: 18px;">Địa chỉ: </strong> <span style="font-size: 18px;" id="address">${dckh}</span>
                </div>
                

                <!-- Tổng hóa đơn -->
                <div style="margin-left: 30px;">
                    <strong style="font-size: 18px;">Tổng hóa đơn: </strong> <span style="font-size: 18px;" id="totalAmount">${format1.format(sumbilll)}đ</span>
                </div>

                <!-- Danh sách chi tiết hóa đơn -->
                <h3 style="margin-left: 11%;margin-top: 10px;">Danh sách chi tiết hóa đơn</h3>

                <div id="productList" style="margin-left: 10px;display: flex;justify-content: center; max-height: 333px; overflow-y: auto;">
                    <!-- Danh sách sản phẩm sẽ được hiển thị ở đây -->
                    <table id="#tablesanpham">
                        <thead style="position: sticky;">
                            <tr>
                                <th>STT</th>
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Kích thước</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Tổng</th>
                            </tr>
                        </thead>
                        <tbody id="tbody-sanphamHD">
                            <!-- Example rows, you can dynamically generate these based on your data -->
                            
                            ${trdssp}

                            <!-- Add more rows as needed -->
                        </tbody>
                    </table>
                </div>
                <div style="display: flex;justify-content: center;">
                    <button
                    style="padding: 7px;color: white;margin-top: 15px;background-color: rgb(34, 34, 34);border-radius: 5px;cursor:pointer"
                    onclick="XacNhan123()">Xác nhận</button>
                </div>
                
            </div>
        </div>`
}

function XacNhan123() {
    alert('Xác nhận thành công')
    document.getElementById('panelChung').innerHTML=``
//   const content = document.getElementById('panelChung');

//   // Set options for the PDF
//   var options = {
//       margin: 10,
//       filename: 'DonHang.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//   };

//   html2pdf(content, options);
    //là del khỏi đơn hàng và add vào đơn đã xác nhận

}