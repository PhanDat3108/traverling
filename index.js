//cái ô dky dang nhap
function toggleDropdown() {
      let menu = document.querySelector(".drop");
      if (menu.style.display === "flex") {
        menu.style.display = "none";
      } else {
        menu.style.display = "flex";
      }
    }
function logintable(){
  document.querySelector(".drop").style.display="none"
  let hihi=document.querySelector("#loginForm");
  if (hihi.style.display==="flex"){
    hihi.style.display="none";
  }
  else{
    hihi.style.display="flex"}
}


//đổi ảnh poster
  const images = [
    "https://gaviaspreview.com/wp/tevily/wp-content/uploads/2020/12/slider-1.jpg",
    "https://gaviaspreview.com/wp/tevily/wp-content/uploads/2021/10/bg-5.jpg",
    
  ];

  let so = 0;


  function changeImage() {
    const poster = document.getElementById("posterImage");
  if (!poster) return; 
   so = (so + 1) % images.length; 
    document.getElementById("posterImage").src = images[so];
  }

  
  setInterval(changeImage, 3000);
//tour

  
//search
function search(){
  destination=document.getElementsById("destinations").value
  activity= document.getElementsById("activity").value
  day=document.getElementById("day").value
  people=document.getElementById("people").value

  

  
//đăng kí
}
function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirmPassword").value;

  if (!username || !password || !confirmpassword) {
    document.getElementById("message").textContent = "Vui lòng nhập đầy đủ thông tin";
    return;
  }
  if (password.length < 8) {
    document.getElementById("message").textContent = "Mật khẩu phải từ đủ 8 chữ số";
    return;
  }
  if (password !== confirmpassword) {
    document.getElementById("message").textContent = "Mật khẩu xác nhận không khớp";
    return;
  }


  let user = {
    username: username,
    password: password,
    role: username === "admin123" ? "admin" : "user"
  };

  
  let users = JSON.parse(localStorage.getItem("users")) || [];

  
  const exists = users.some(u => u.username === username);
  if (exists) {
    document.getElementById("message").textContent = "Tên đăng nhập đã tồn tại";
    return;
  }

  
  users.push(user);

  
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("message").textContent = "Đăng kí thành công";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirmPassword").value = "";
}

//dang nhap
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    document.getElementById("message").textContent = "Vui lòng nhập đầy đủ thông tin";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username);

  if (!user) {
    document.getElementById("message").textContent = "Tài khoản không tồn tại";
    return;
  }

  if (user.password !== password) {
    document.getElementById("message").textContent = "Sai mật khẩu ùi";
    return;
  }

  if (user.role === "admin") {
    setTimeout(() => {
      window.location.href = "manage.html";
    }, 100);
  }

  document.querySelector("#loginForm").style.display = "none";
  localStorage.setItem("isLogin", "true");
  localStorage.setItem("Userinuse", username);

  document.querySelector(".sign-icon").style.display = "none";
  document.querySelector(".search-icon").style.display = "none";
  document.querySelector(".userbox").style.display = "flex";
  document.querySelector(".userbox").textContent = " " + username;
}

//hiển thị tên vs ẩn đăng nhập
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("isLogin") == "true") {
    const username = localStorage.getItem("Userinuse");
    const userBox = document.querySelector(".userbox");
    if (userBox) {
      document.querySelector(".sign-icon").style.display = "none";
      document.querySelector(".search-icon").style.display = "none";
      userBox.style.display = "flex";
      userBox.textContent = " " + username;
    }
  }
});

// ô đăng xuất vs bôked
function toggleDropdownLogout(){
  let menu1 = document.getElementsByClassName("drop-logout")[0];
      if (menu1.style.display === "flex") {
        menu1.style.display = "none";
      } else {
        menu1.style.display = "flex";
      }
}
//đăng xuất
function logout(){
 
  
  localStorage.removeItem("isLogin");
  localStorage.removeItem("Userinuse");

  document.querySelector(".sign-icon").style.display = "flex";
  document.querySelector(".search-icon").style.display = "flex";
  document.querySelector(".userbox").style.display = "none";
  document.querySelector(".userbox").innerHTML = "";
  document.querySelector(".drop-logout").style.display="none"
  
 setTimeout(() => {
    window.location.href = "home.html"; 
  }, 100);
}

