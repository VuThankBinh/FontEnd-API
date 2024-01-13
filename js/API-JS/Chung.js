function load_user(){
    var userr=JSON.parse(localStorage.getItem('user')).username;
    if(userr !="")
    {
        document.getElementById('useracc').textContent = userr;
    }

}
function load_userAD(){
    var userr=JSON.parse(localStorage.getItem('user-Admin')).username;
    if(userr !="")
    {
        document.getElementById('useracc').textContent = userr;
    }

}