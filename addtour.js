function renderTours() {
  const container = document.querySelector(".boxtours");
  const toursFromStorage = JSON.parse(localStorage.getItem("tours")) || [];
  container.innerHTML = "";

  toursFromStorage.forEach((tour, index) => {
    container.innerHTML += `
      <div class="box-top-tours">
        <div class="img-box-top-tours">
          <img src="${tour.image}" />
        </div>
        <div class="info-box-top-tours">
          <div class="info-box">
            <img class="star" src="${tour.rating}" />
            <div class="name-info-box-top-tours">${tour.title}</div>
            <div class="price">$${tour.price}</div>
            <div class="more-info" onclick="showTourPopup(${index})">
              <div class="info-left">
                <img src="anh/people.png" width="20px" /> ${tour.people}
              </div>
              <div class="info-right">
                Explore Now <img width="15px" src="anh/right-arrow.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// Tạo popup container
const popup = document.createElement("div");
popup.id = "tour-popup";
popup.style = `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  padding: 30px;
  z-index: 9999;
  max-width: 500px;
  width: 90%;
  display: none;
`;
document.body.appendChild(popup);

// Hàm mở popup
window.showTourPopup = function (index) {
  const tour = JSON.parse(localStorage.getItem("tours"))[index];

  popup.innerHTML = `
    <button onclick="document.getElementById('tour-popup').style.display='none'">X Đóng</button>
    <h2>${tour.title}</h2>
    <img src="${tour.image}" style="width:100%; border-radius:8px; margin-bottom:10px;" />
    <p><strong>Destination:</strong> ${tour.destination}</p>
    <p><strong>Price per person:</strong> $${tour.price}</p>
    <p><strong>Max People:</strong> ${tour.people}</p>
    <hr />
    <label>Số người: <input type="number" id="numPeople" min="1" value="1" /></label><br /><br />
    <label>Ngày đi: <input type="date" id="departureDate" /></label><br /><br />
    <label>Thêm dịch vụ:<br/>
      <input type="checkbox" id="guide" /> Hướng dẫn viên ($20/người)<br />
      <input type="checkbox" id="meal" /> Ăn trưa ($15/người)<br />
    </label><br /><br />
    <p id="totalPrice">Tổng tiền: $${tour.price}</p>
    <br>
<div onclick="bookTour(${index}); luuBooking(tours[${index}])" class="butten-background">Đặt tour</div>
  `;
  popup.style.display = "block";
// cập nhật giá 
  const updatePrice = () => {
    const numPeople = parseInt(document.getElementById("numPeople").value) || 0;
    const basePrice = parseFloat(tour.price);
    const guideFee = document.getElementById("guide").checked ? 20 : 0;
    const mealFee = document.getElementById("meal").checked ? 15 : 0;
    const extraFee = guideFee + mealFee;

    const maxPeople = parseInt(tour.people);
    const withinLimit = Math.min(numPeople, maxPeople);
    const overLimit = Math.max(0, numPeople - maxPeople);

    let total = withinLimit * (basePrice + extraFee) + overLimit * ((basePrice + extraFee) * 1.5);
    document.getElementById("totalPrice").textContent = `Tổng tiền: $${total.toFixed(2)}`;
  };

  document.getElementById("numPeople").addEventListener("input", updatePrice);
  document.getElementById("guide").addEventListener("change", updatePrice);
  document.getElementById("meal").addEventListener("change", updatePrice);
};

window.bookTour = function (index) {
  const tours = JSON.parse(localStorage.getItem("tours"));
  const tour = tours[index];

  const numPeople = parseInt(document.getElementById("numPeople").value);
  const date = document.getElementById("departureDate").value;
  const guide = document.getElementById("guide").checked;
  const meal = document.getElementById("meal").checked;

  const basePrice = parseFloat(tour.price);
  const guideFee = guide ? 20 : 0;
  const mealFee = meal ? 15 : 0;
  const extraFee = guideFee + mealFee;

  const maxPeople = parseInt(tour.people);
  const withinLimit = Math.min(numPeople, maxPeople);
  const overLimit = Math.max(0, numPeople - maxPeople);

  const total = withinLimit * (basePrice + extraFee) + overLimit * ((basePrice + extraFee) * 1.5);

  const booking = {
    title: tour.title,
    image: tour.image,
    numPeople,
    date,
    guide,
    meal,
    total: parseFloat(total.toFixed(2))
  };

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("✅ Đã đặt tour thành công!");
  document.getElementById("tour-popup").style.display = "none";
};
