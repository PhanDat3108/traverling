window.addEventListener("load", () => {
  renderTours();
  renderVehicles();
});

// ======= Hiển thị danh sách tour =======
function renderTours() {
  const container = document.querySelector('.boxtourscreate');
  const tours = JSON.parse(localStorage.getItem("tours")) || [];
  container.innerHTML = "";

  tours.forEach((tour, i) => {
    container.innerHTML += `
      <div class="box-top-tours">
        <div class="img-box-top-tours">
          <img src="${tour.image}" alt="tour">
        </div>
        <div class="info-box-top-tours">
          <div class="info-box">
            <img class="star" src="${tour.rating}">
            <div class="name-info-box-top-tours">${tour.destination}</div>
            <div class="price">$${tour.price / 4}</div>
            <div class="more-info" onclick="selectdestination(${i})">
              <div class="info-left">
                <img src="anh/people.png" width="20px"> ${tour.people}
              </div>
              <div class="info-right">
                Add now <img src="anh/right-arrow.png" width="15px" style="margin-left: 5px;">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// ======= Chọn / bỏ chọn tour =======
function selectdestination(i) {
  const tours = JSON.parse(localStorage.getItem("tours")) || [];
  const selected = JSON.parse(localStorage.getItem("userSelection")) || { tours: [] };
  const tour = tours[i];
  const index = selected.tours.findIndex(t => t.destination === tour.destination);
  const boxes = document.querySelectorAll('.boxtourscreate .box-top-tours');

  if (index === -1) {
    selected.tours.push(tour);
    boxes[i].classList.add("box-selected");
  } else {
    selected.tours.splice(index, 1);
    boxes[i].classList.remove("box-selected");
  }

  localStorage.setItem("userSelection", JSON.stringify(selected));
}

// ======= Sang bước 2: Chọn xe =======
function step2() {
  document.querySelector(".boxtourscreate").style.display = "none";
  document.querySelector(".thuexecreate").style.display = "grid";
  document.querySelector(".buttonstep1").style.display = "none";
  document.querySelector(".buttonstep2").style.display = "flex";


}

// ======= Hiển thị danh sách phương tiện =======
function renderVehicles() {
  const container = document.querySelector('.thuexecreate');
  const vehicles = JSON.parse(localStorage.getItem("phuongtien")) || [];
  container.innerHTML = "";

  vehicles.forEach((vehicle, i) => {
    container.innerHTML += `
      <div class="box-top-tours">
        <div class="img-box-top-tours">
          <img src="${vehicle.image}" alt="${vehicle.title}">
        </div>
        <div class="info-box-top-tours" ">
          <div class="info-box" >
            <div class="name-info-box-top-tours">${vehicle.title}</div>
            <div class="price">$${vehicle.price}</div>
            <div class="more-info" onclick="rentVehicle(${i})">

              <div class="info-left">
                <img src="anh/people.png" width="20px"> ${vehicle.people} people
              </div>
              <div class="info-right">
                Rent Now <img src="anh/right-arrow.png" width="15px" style="margin-left: 5px;">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// ======= Chọn / bỏ chọn xe =======
function selectVehicle(i) {
  const vehicles = JSON.parse(localStorage.getItem("phuongtienthue")) || [];
  const selected = JSON.parse(localStorage.getItem("selectedVehicles")) || [];
  const vehicle = vehicles[i];
  const index = selected.findIndex(v => v.title === vehicle.title);
  const boxes = document.querySelectorAll('.thuexecreate .box-top-tours');

  if (index === -1) {
    selected.push(vehicle);
    boxes[i].classList.add("box-selected");
  } else {
    selected.splice(index, 1);
    boxes[i].classList.remove("box-selected");
  }

  localStorage.setItem("selectedVehicles", JSON.stringify(selected));
}

// ======= Haversine + Lộ trình tối ưu (nếu cần dùng Route) =======
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const rLat1 = lat1 * Math.PI / 180;
  const rLat2 = lat2 * Math.PI / 180;

  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(rLat1) * Math.cos(rLat2) *
            Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function generateDistanceMatrix(locations) {
  const matrix = [];

  for (let i = 0; i < locations.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < locations.length; j++) {
      if (i === j) matrix[i][j] = 0;
      else matrix[i][j] = haversineDistance(
        locations[i].lat, locations[i].lng,
        locations[j].lat, locations[j].lng
      );
    }
  }

  return matrix;
}

function nearestNeighborOrder(matrix) {
  const n = matrix.length;
  const visited = Array(n).fill(false);
  const order = [0];
  visited[0] = true;

  for (let step = 1; step < n; step++) {
    const last = order[order.length - 1];
    let nearest = -1;
    let minDist = Infinity;

    for (let j = 0; j < n; j++) {
      if (!visited[j] && matrix[last][j] < minDist) {
        minDist = matrix[last][j];
        nearest = j;
      }
    }

    visited[nearest] = true;
    order.push(nearest);
  }

  return order;
}

function Route() {
  const selected = JSON.parse(localStorage.getItem("userSelection")) || { tours: [] };
  const destinations = selected.tours;

  if (destinations.length < 2) {
    alert("Bạn cần chọn ít nhất 2 địa điểm để tính lộ trình!");
    return;
  }

  const matrix = generateDistanceMatrix(destinations);
  const order = nearestNeighborOrder(matrix);
  const optimized = order.map(i => destinations[i]);

  localStorage.setItem("optimizedRoute", JSON.stringify(optimized));
  console.log("Lộ trình tối ưu:", optimized);
}

// ======= Clear localStorage khi rời trang =======
window.addEventListener("beforeunload", () => {
  localStorage.removeItem("userSelection");
  localStorage.removeItem("optimizedRoute");
});
function rentVehicle(i) {
  const vehicles = JSON.parse(localStorage.getItem("phuongtien")) || [];
  const vehicle = vehicles[i];

  const rented = JSON.parse(localStorage.getItem("xeDaThue")) || [];
  const isAlreadyAdded = rented.find(v => v.title === vehicle.title);

  const boxes = document.querySelectorAll('.thuexecreate .box-top-tours');

  if (!isAlreadyAdded) {
    rented.push(vehicle);
    localStorage.setItem("xeDaThue", JSON.stringify(rented));

    // ✅ Đổi viền: Thêm class để đổi màu viền
    boxes[i].classList.add("box-selected");

    
  } else {

    const index = rented.findIndex(v => v.title === vehicle.title);
    rented.splice(index, 1);
    localStorage.setItem("xeDaThue", JSON.stringify(rented));


    boxes[i].classList.remove("box-selected");


  }
}

window.addEventListener("load", () => {
  localStorage.removeItem("xeDaThue"); // ✅ Xoá xe đã chọn mỗi khi tải lại trang

  renderTours();
  renderVehicles();
});

function step3() {
  document.querySelector(".thuexecreate").style.display = "none";
  document.querySelector(".formdien").style.display = "block";
  document.querySelector(".buttonstep2").style.display = "none";

  const form = document.querySelector('.formdien');
  form.innerHTML = `
    <h2 style="text-align:center;">Thông tin bổ sung cho tour</h2>
    <form id="tourDetailsForm" class="form-create-tour">
      <div class="form-group">
        <label for="tourPeople">Số người:</label>
        <input type="number" id="tourPeople" name="tourPeople" min="1" required>
      </div>
      <div class="form-group">
        <label for="tourDays">Số ngày:</label>
        <input type="number" id="tourDays" name="tourDays" min="1" required>
      </div>
      <div class="form-group">
        <label>Dịch vụ:</label>
        <div class="checkbox-group">
          <label><input type="checkbox" name="services" value="guide"> Hướng dẫn viên ($30/ngày)</label>
          <label><input type="checkbox" name="services" value="driver"> Lái xe ($25/ngày)</label>
          <label><input type="checkbox" name="services" value="photographer"> Nhiếp ảnh ($20/ngày)</label>
          <label><input type="checkbox" name="services" value="meal"> Buffet ($120/người)</label>
        </div>
      </div>
      <div class="form-group">
        <label for="ghichu">Đặt tên:</label>
        <textarea id="ghichu" rows="3"></textarea>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <button type="submit" class="butten-background">Hoàn tất tạo tour</button>
      </div>
    </form>
  `;

  document.getElementById("tourDetailsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    finishCreateTour();
  });
}
function finishCreateTour() {
  const route = JSON.parse(localStorage.getItem("optimizedRoute")) || [];
  const vehicles = JSON.parse(localStorage.getItem("xeDaThue")) || [];
  const people = +document.getElementById("tourPeople").value;
  const days = +document.getElementById("tourDays").value;
  const ghichu = document.getElementById("ghichu").value || "";

  const selectedServices = [...document.querySelectorAll('input[name="services"]:checked')].map(i => i.value);

  const prices = { guide: 30, driver: 25, photographer: 20, meal: 20 };

  const serviceCost = selectedServices.reduce((sum, s) => {
    if (s === "meal") return sum + prices[s] * people;
    return sum + prices[s] * days;
  }, 0);

  const vehicleCost = vehicles.reduce((sum, v) => sum + v.price * days, 0);
  const tourCost = route.reduce((sum, r) => sum + parseFloat(r.price || 0), 0);
  const buffetCost = selectedServices.includes("meal") ? people * prices.meal : 0;

  const totalCost = vehicleCost + serviceCost + tourCost;

  const box = document.querySelector(".summary-box");
  box.innerHTML = `
    <h2>📋 Thông tin tour đã tạo</h2>
    <p><strong>Lộ trình:</strong> ${route.map(r => r.destination).join(" → ")}</p>
    <p><strong>Phương tiện:</strong> ${vehicles.map(v => v.title).join(", ")}</p>
    <p><strong>Số người:</strong> ${people}</p>
    <p><strong>Số ngày:</strong> ${days}</p>
    <p><strong>Dịch vụ:</strong> ${selectedServices.join(", ") || "Không có"}</p>
    <p><strong>Tên:</strong> ${ghichu || "Không có"}</p>
    <p><strong>Chi phí tour:</strong> $${tourCost.toFixed(2)}</p>
    <p><strong>Chi phí xe:</strong> $${vehicleCost.toFixed(2)}</p>
    <p><strong>Chi phí dịch vụ:</strong> $${serviceCost.toFixed(2)}</p>
    ${selectedServices.includes("meal") ? `<p><strong>Buffet:</strong> ${people} người × $20 = $${buffetCost}</p>` : ""}
    <p><strong>Tổng chi phí:</strong> <span style="color:red;">$${totalCost.toFixed(2)}</span></p>

    <div style="text-align:center; margin-top:20px;">
      <button class="butten-background" onclick="confirmTour()">Xác nhận lưu tour</button>
    </div>
  `;

  document.querySelector(".formdien").style.display = "none";
  box.style.display = "block";

  localStorage.setItem("tourCreateTemp", JSON.stringify({
    route, vehicles, selectedServices, people, days, ghichu,
    vehicleCost, serviceCost, tourCost, totalCost
  }));
}


function confirmTour() {
  const data = JSON.parse(localStorage.getItem("tourCreateTemp")) || {};

  const tour = {
    route: data.route,
    vehicles: data.vehicles,
    people: data.people,
    days: data.days,
    services: data.selectedServices,
    ghichu: data.ghichu,
    cost: {
      vehicle: data.vehicleCost,
      service: data.serviceCost,
      tour: data.tourCost,
      total: data.totalCost
    },
    createdAt: new Date().toISOString()
  };

  const saved = JSON.parse(localStorage.getItem("toursCreated")) || [];
  saved.push(tour);
  localStorage.setItem("toursCreated", JSON.stringify(saved));

  alert("✅ Tour đã được lưu thành công!");

  // Dọn sạch
  localStorage.removeItem("tourCreateTemp");
  document.querySelector(".summary-box").style.display = "none";
  location.reload();

}
