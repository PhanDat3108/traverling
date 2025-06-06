//cái ô dky dang nhap
function toggleDropdown() {
      let menu = document.getElementsByClassName("drop")[0];
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
   so = (so + 1) % images.length; 
    document.getElementById("posterImage").src = images[so];
  }

  
  setInterval(changeImage, 3000);
//tour

  const tours = [
    {
      image: "anh/lan-chau-anh-web-1-min.webp (2).png",
      title: "6 Days Relax At Island Lan Chau Cua Lo Beach",
      price: "$265.00",
      people: "12",
      rating: "anh/rating.png",
      destination: "Lan Chau"
    },
    {
      image: "anh/doi-che-thanh-chuong.jpeg",
      title: "Experience River Cruise, Visit Thanh Chuong Tea Island",
      price: "$50.00",
      people: "7",
      rating: "anh/rating.png",
      destination:"Doi Che Thanh Chuong"
    },
    {
      image: "anh/481819640_953251776989379_5777637315292432491_n.jpg",
      title: "Mountain Climbing Adventure, Visit The Sacred Temple Dai Tue",
      price: "$65.00",
      people: "15",
      rating: "anh/rating (1).png"
    },
    {
      image: "anh/vuon-quoc-gia-pu-mat-1.jpg",
      title: "7 Days Of Exploration-Survival In PHU MAT National Park",
      price: "$150.00",
      people: "12",
      rating: "anh/rating (1).png"
    },
    {
      image: "anh/vuon-quoc-gia-pu-mat-1.jpg",
      title: "7 Days Of Exploration-Survival In PHU MAT National Park",
      price: "$150.00",
      people: "12",
      rating: "anh/rating (1).png"
    },
    {
      image: "anh/vuon-quoc-gia-pu-mat-1.jpg",
      title: "7 Days Of Exploration-Survival In PHU MAT National Park",
      price: "$150.00",
      people: "12",
      rating: "anh/rating (1).png"
    },{
      image: "anh/vuon-quoc-gia-pu-mat-1.jpg",
      title: "7 Days Of Exploration-Survival In PHU MAT National Park",
      price: "$150.00",
      people: "12",
      rating: "anh/rating (1).png"
    },{
      image: "anh/vuon-quoc-gia-pu-mat-1.jpg",
      title: "7 Days Of Exploration-Survival In PHU MAT National Park",
      price: "$150.00",
      people: "12",
      rating: "anh/rating (1).png"
    },
    {
      image: "anh/vuon-quoc-gia-pu-mat-1.jpg",
      title: "7 Days Of Exploration-Survival In PHU MAT National Park",
      price: "$150.00",
      people: "12",
      rating: "anh/rating (1).png"
    },
    {
      image: "anh/vuon-quoc-gia-pu-mat-1.jpg",
      title: "7 Days Of Exploration-Survival In PHU MAT National Park",
      price: "$150.00",
      people: "12",
      rating: "anh/rating (1).png"
    },
    {
      image: "anh/vuon-quoc-gia-pu-mat-1.jpg",
      title: "7 Days Of Exploration-Survival In PHU MAT National Park",
      price: "$150.00",
      people: "12",
      rating: "anh/rating (1).png"
    },
    {
      image: "anh/vuon-quoc-gia-pu-mat-1.jpg",
      title: "7 Days Of Exploration-Survival In PHU MAT National Park",
      price: "$150.00",
      people: "12",
      rating: "anh/rating (1).png"
    }
  ];
//thêm box dịch vụ
  window.onload = () => {
    const container = document.querySelector('.boxtours');
    tours.forEach(tour => {
      container.innerHTML += `
        <div class="box-top-tours">
          <div class="img-box-top-tours">
            <img src="${tour.image}">
          </div>
          <div class="info-box-top-tours">
            <div class="info-box">
              <img class="star" src="${tour.rating}">
              <div class="name-info-box-top-tours">${tour.title}</div>
              <br>
              <div class="price">${tour.price}</div>
              <br>
              <div class="more-info">
                <div class="info-left">
                  <img src="anh/people.png" width="20px" style="padding: 0;"> ${tour.people}
                </div>
                <div class="info-right">
                  Explore Now <img style="margin-left: 5px;" width="15px" src="anh/right-arrow.png">
                </div>
              </div>
            </div>
          </div>
        </div>`;
    });
  };
//search
function search(){
  destination=document.getElementsById("destinations").value
  activity= document.getElementsById("activity").value
  day=document.getElementById("day").value
  people=document.getElementById("people").value

  

  
//đăng kí
}
function register(){
  
  const username=document.getElementById("username").value
  const password=document.getElementById("password").value
  const confirmpassword=document.getElementById("confirmPassword").value
  if (!username || !password || !confirmpassword){
    document.getElementById("message").textContent="Vui lòng nhập đầy đủ thông tin";
    return
  } 
  if (password.length<8){
    document.getElementById("message").textContent="Mật khẩu phải từ đủ 8 chữ số"
    return
  }
  
  if (password!==confirmpassword){
    document.getElementById("message").textContent="Mật khẩu xác nhận không khớp"
    return
  }
  const user={
    username:username,
    password:password,
  }
    localStorage.setItem(username, JSON.stringify(user));
    document.getElementById("message").textContent="Đăng kí thành công"
document.getElementById("username").value=""
document.getElementById("password").value=""
document.getElementById("confirmPassword").value=""
}
//dang nhap
function login(){

  const username=document.getElementById("username").value
  const password=document.getElementById("password").value
   if (!username || !password ){
    document.getElementById("message").textContent="Vui lòng nhập đầy đủ thông tin";
    return}
   if (!localStorage.getItem(username)) {

    document.getElementsByClassName("message").textContent="Tài khoản không tồn tại"
    return
   }
     const user = JSON.parse(localStorage.getItem(username));
     if (user.password!=password){
      document.getElementsByClassName("message").textContent="Sai mật khẩu ùi "
      return
     }

hihi=document.querySelector("#loginForm");
hihi.style.display="none"
localStorage.setItem("isLogin","true")
localStorage.setItem("Userinuse",username)
document.querySelector(".sign-icon").style.display="none"
document.querySelector(".search-icon").style.display="none"
document.querySelector(".userbox").style.display="flex"
document.querySelector(".userbox").innerHTML+= " "+username

}
window.onload= function(){
if (localStorage.getItem("isLogin")=="true"){
const username = localStorage.getItem("Userinuse")
  document.querySelector(".sign-icon").style.display="none"
document.querySelector(".search-icon").style.display="none"
document.querySelector(".userbox").style.display="flex"
document.querySelector(".userbox").innerHTML+= " "+username
}




}