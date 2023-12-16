var menuVisible = false;

function clickMenu() {
    var ulMenu = document.getElementById("menu");
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

    menuVisible = !menuVisible; // Đảo ngược trạng thái hiển thị
}
function isValidEmail(email) {
    // Sử dụng biểu thức chính quy để kiểm tra địa chỉ email
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

// Sử dụng hàm isValidEmail để kiểm tra email
function check() {
    var emailInput = document.getElementById("emailInput").value; // Thay "emailInput" bằng id thật của thẻ input
    if (!isValidEmail(emailInput)) {
        alert("Email không hợp lệ.");
    }
}

//đăng ký
function signUp(e) {
    event.preventDefault();
    var tk = document.getElementById("tk").value;
    var email = document.getElementById("emailInput").value;
    var mk = document.getElementById("password").value;
    var mk2 = document.getElementById("password2").value;

    var user = {
        username: tk,
        email: email,
        password: mk,
        SP_daXem: [],
        cart:[],
    }
    if (tk === "" || mk === "" || email === "" || mk2 === "") {
        alert("Bạn chưa nhập đủ thông tin");
    }
    else {
        if (mk == mk2) {
            var json = JSON.stringify(user);
            localStorage.setItem(tk, json);
            alert("đăng ký thành công")
            window.location.href = "login.html";
        }
        else {
            alert("Mật khẩu không trùng khớp")
        }
    }
}
//đăng nhập
function login(e) {
    event.preventDefault();
    var tk = document.getElementById("tk_login").value;
    var mk = document.getElementById("mk_login").value;
    var user = localStorage.getItem(tk);
    var data = JSON.parse(user);
    console.log(data)
    if (tk == null) {
        alter("vui lòng nhập tài khoản của bạn");
    }
    else if (tk == data.username && mk == data.password) 
    {
        alert("Đăng nhập thành công");
         window.location.href = "TrangChu.html ";
         localStorage.setItem("loginData",user);
    }
    else {
        alter("Đăng nhập thất bại")
    }
}
function giohangpage(){
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData != null) {
       window.location.href='Cart.html'
        
    }
    else {
        alert("Vui lòng đăng nhập trước khi mua hàng");
        window.location.href = "login.html";
    }
}
