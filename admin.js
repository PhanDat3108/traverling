
//them tours
const tours = [
    {
      image: "anh/lan-chau-anh-web-1-min.webp (2).png",
      title: "6 Days Relax At Island Lan Chau Cua Lo Beach",
      price: "265.00",
      people: "12",
      rating: "anh/rating.png",
      destination: "Lan Chau",
      peoplejoin: "230"
    },
    {
      image: "anh/doi-che-thanh-chuong.jpeg",
      title: "Experience River Cruise, Visit Thanh Chuong Tea Island",
      price: "50.00",
      people: "7",
      rating: "anh/rating.png",
      destination:"Doi Che Thanh Chuong",
      peoplejoin: "230"
    },
    {
      image: "anh/481819640_953251776989379_5777637315292432491_n.jpg",
      title: "Mountain Climbing Adventure, Visit The Sacred Temple Dai Tue",
      price: "65.00",
      people: "15",
      rating: "anh/rating (1).png",
      peoplejoin: "230"
    },
    {
      image: "anh/vuon-quoc-gia-pu-mat-1.jpg",
      title: "7 Days Of Exploration-Survival In PHU MAT National Park",
      price: "150.00",
      people: "12",
      rating: "anh/rating (1).png",
      peoplejoin: "230",
    },
    
   
  ];
//thêm box dịch vụ
  
window.addEventListener("load", () => {
  const container = document.querySelector('.boxtours');
  

  const toursFromStorage = JSON.parse(localStorage.getItem("tours")) || [];

  toursFromStorage.forEach(tour => {
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
      </div>
    `;
  });

  
});
if (!localStorage.getItem("tours")) {
  localStorage.setItem("tours", JSON.stringify(tours));
}
//thêm tour
  function saveToLocalStorage() {
  const tour = {
    image: document.getElementById("image").value,
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    people: document.getElementById("people").value,
    rating: document.getElementById("rating").value,
    peoplejoin: document.getElementById("peoplejoin").value
  };

  const currentTours = JSON.parse(localStorage.getItem("tours")) || [];
  currentTours.push(tour);
  localStorage.setItem("tours", JSON.stringify(currentTours));

  alert("Đã lưu tour!");
  location.reload(); 
}
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
}
window.onload = function () {
  upLoadBox();
};

function displayadd(id){
  let hihi= document.getElementById(id)
  if (hihi.style.display==="flex"){
    hihi.style.display="none"
  }
  else{hihi.style.display="flex"}
}
