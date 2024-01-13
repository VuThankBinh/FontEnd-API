function DangXuat(){
    localStorage.removeItem('user');
    window,location.reload();
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