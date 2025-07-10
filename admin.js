
//them tours
const tours = [
    {
      image: "anh/lan-chau-anh-web-1-min.webp (2).png",
      title: "6 Days Relax At Island Lan Chau Cua Lo Beach",
      price: "265.00",
      people: "12",
      rating: "anh/rating.png",
      destination: "Lan Chau Island",
      peoplejoin: "230",
      lat:"18.820030",
      lng:"105.721232"

    },
    {
      image: "anh/doi-che-thanh-chuong.jpeg",
      title: "Experience River Cruise, Visit Thanh Chuong Tea Island",
      price: "50.00",
      people: "7",
      rating: "anh/rating.png",
      destination:"Thanh Chuong Tea Hill",
      peoplejoin: "230",
      lat:"18.731204",
      lng:"105.281707"

    },
    {
      image: "anh/481819640_953251776989379_5777637315292432491_n.jpg",
      title: "Mountain Climbing Adventure, Visit The Sacred Temple Dai Tue",
      price: "65.00",
      people: "15",
      rating: "anh/rating (1).png",
      destination:"Dai Tue Temple",
      peoplejoin: "230",
      lat:"18.757993",
      lng:"105.535413"
    },
    {
      image: "anh/vuon-quoc-gia-pu-mat-1.jpg",
      title: "7 Days Of Exploration-Survival In PHU MAT National Park",
      price: "150.00",
      people: "12",
      rating: "anh/rating (1).png",
      destination:"PHU MAT National Park",
      peoplejoin: "230",
    },
    
   
  ];
//thêm box dịch vụ
  
window.addEventListener("load", () => {
  const container = document.querySelector('.boxtours');
  

  const toursFromStorage = JSON.parse(localStorage.getItem("tours")) || [];

toursFromStorage.forEach((tour, index) => {
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
          <div class="price">$${tour.price}</div>
          <br>
         
          <div class="more-info" onclick="showTourPopup(${index})">

            <div class="info-left">
              <img src="anh/people.png" width="20px" style="padding: 0;"> ${tour.people}
            </div>
            <div class="info-right">
              Explore Now <img style="margin-left: 5px;" width="15px" src="anh/right-arrow.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

  
});
if (!localStorage.getItem("tours")) {
  localStorage.setItem("tours", JSON.stringify(tours));
}
//thêm tour
  
function upLoadBox(){
   let locations= JSON.parse(localStorage.getItem("tours"))
   document.getElementById("tour-body").innerHTML = "";
   for (let i=0;i<locations.length;i++){
    let tr= document.createElement("tr")
  let td0 = document.createElement("td");
        td0.textContent = i + 1;
        tr.appendChild(td0);

    let td1 = document.createElement("td");
    td1.textContent = locations[i].image;
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.textContent = locations[i].title;
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.textContent = locations[i].price;
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    td4.textContent = locations[i].people;
    tr.appendChild(td4);
     let td5 = document.createElement("td");
    td5.textContent = locations[i].rating;
    tr.appendChild(td5);
     let td6 = document.createElement("td");
    td6.textContent = locations[i].peoplejoin;
    tr.appendChild(td6);
    let td8 = document.createElement("td");
    td8.textContent = locations[i].destination;
    tr.appendChild(td8);
    let td9 = document.createElement("td");
    td9.textContent = locations[i].lat || "N/A";
    tr.appendChild(td9);

    // ✅ Thêm cột Longitude
    let td10 = document.createElement("td");
    td10.textContent = locations[i].lng || "N/A";
    tr.appendChild(td10);
       let td7 = document.createElement("td");
        td7.innerHTML = `<button onclick="editTour(${i})">Edit</button>
                         <button onclick="deleteTour(${i})">Delete</button>`;
        tr.appendChild(td7);
    document.getElementById("tour-body").appendChild(tr);
   }
   
}
let editingIndex = -1;
function editTour(i) {
  const locations = JSON.parse(localStorage.getItem("tours")) || [];
  if (i < 0 || i >= locations.length) return;

  const tour = locations[i];
  document.getElementById("image").value = tour.image;
  document.getElementById("title").value = tour.title;
  document.getElementById("price").value = tour.price;
  document.getElementById("people").value = tour.people;
  document.getElementById("rating").value = tour.rating;
  document.getElementById("peoplejoin").value = tour.peoplejoin;
  document.getElementById("destination-add").value = tour.destination;
  document.getElementById("lat").value = tour.lat ;
document.getElementById("lng").value = tour.lng ;


  editingIndex = i; 
}

function deleteTour(i) {
  let locations = JSON.parse(localStorage.getItem("tours")) || [];
  if (i < 0 || i >= locations.length) return;

  locations.splice(i, 1);
  localStorage.setItem("tours", JSON.stringify(locations));
  upLoadBox();
}

function saveToLocalStorage() {
  let locations = JSON.parse(localStorage.getItem("tours")) || [];

  const newTour = {
    image: document.getElementById("image").value,
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    people: document.getElementById("people").value,
    rating: document.getElementById("rating").value,
    peoplejoin: document.getElementById("peoplejoin").value,
    destination: document.getElementById("destination-add").value,
    lat: parseFloat(document.getElementById("lat").value),
  lng: parseFloat(document.getElementById("lng").value)
  };

  if (editingIndex >= 0) {
    locations[editingIndex] = newTour;
    editingIndex = -1; 
  } else {

    locations.push(newTour);
  }

  localStorage.setItem("tours", JSON.stringify(locations));
  upLoadBox();

  document.getElementById("image").value = "";
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("people").value = "";
  document.getElementById("rating").value = "";
  document.getElementById("peoplejoin").value = "";
  document.getElementById("destination-add").value=""
 document.getElementById("lat").value = "";  // ✅ thêm reset lat
document.getElementById("lng").value = "";  // ✅ thêm reset lng
}
window.onload = function () {
  upLoadBox();
   upLoadBoxxe();
};

function displayadd(id){
  let hihi= document.getElementById(id)
  let cacbox=document.getElementsByClassName("form-box")

  if (hihi.style.display==="flex"){
    hihi.style.display="none"
  }
  else{hihi.style.display="flex"}

  for (let i=0;i<cacbox.length;i++){
    if (cacbox[i].id!==hihi.id){
      cacbox[i].style.display="none"
    }
  }
}
function saveToLocalStoragexe() {
   let phuongtiens = JSON.parse(localStorage.getItem("phuongtien")) || [];
  const phuongtien = {
    image: document.getElementById("imagexe").value,
    title: document.getElementById("titlexe").value,
    price: document.getElementById("pricexe").value,
    people: document.getElementById("peoplexe").value,
  
    peoplejoin: document.getElementById("peoplejoinxe").value
  };
if (editingIndexxe >= 0) {
    phuongtiens[editingIndexxe] = phuongtien;
    editingIndexxe = -1; 
  } else {

    phuongtiens.push(phuongtien);
  }
  localStorage.setItem("phuongtien", JSON.stringify(phuongtiens));

  alert("Đã lưu phuongtien!");
   upLoadBoxxe()

}
function upLoadBoxxe(){
   let phuongtiens= JSON.parse(localStorage.getItem("phuongtien"))
   document.getElementById("xe-body").innerHTML = "";
   for (let i=0;i<phuongtiens.length;i++){
    let tr= document.createElement("tr")
  let td0 = document.createElement("td");
        td0.textContent = i + 1;
        tr.appendChild(td0);

    let td1 = document.createElement("td");
    td1.textContent = phuongtiens[i].image;
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.textContent = phuongtiens[i].title;
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.textContent = phuongtiens[i].price;
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    td4.textContent = phuongtiens[i].people;
    tr.appendChild(td4);
     let td6 = document.createElement("td");
    td6.textContent = phuongtiens[i].peoplejoin;
    tr.appendChild(td6);
       let td7 = document.createElement("td");
        td7.innerHTML = `<button onclick="editXe(${i})">Edit</button>
                         <button onclick="deleteXe(${i})">Delete</button>`;
        tr.appendChild(td7);
    document.getElementById("xe-body").appendChild(tr);
   }
   
}
let editingIndexxe = -1;
function editXe(i) {
  const phuongtiens = JSON.parse(localStorage.getItem("phuongtien")) || [];
  if (i < 0 || i >= phuongtiens.length) return;

  const xe = phuongtiens[i];
  document.getElementById("imagexe").value = xe.image;
  document.getElementById("titlexe").value = xe.title;
  document.getElementById("pricexe").value = xe.price;
  document.getElementById("peoplexe").value = xe.peoplexe;
  document.getElementById("peoplejoinxe").value = xe.peoplejoinxe;

  editingIndexxe = i; 
}

function deleteXe(i) {
  let phuongtiens = JSON.parse(localStorage.getItem("phuongtien")) || [];
  if (i < 0 || i >= phuongtiens.length) return;

  phuongtiens.splice(i, 1);
  localStorage.setItem("phuongtien", JSON.stringify(phuongtiens));
  upLoadBoxxe();
}
function capnhatGioHang() {
  const username = localStorage.getItem("Userinuse"); // Lấy username

  const thongTinTour = JSON.parse(localStorage.getItem("toursCreated"));
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const xeThue = JSON.parse(localStorage.getItem("phuongtiendangthuee")) || [];

  const giohang = {
    username: username,
    tourTuyChon: thongTinTour || null,
    tourDaDat: bookings,
    xeDaThue: xeThue
  };

  localStorage.setItem("giohang", JSON.stringify(giohang));
 
}
 capnhatGioHang()