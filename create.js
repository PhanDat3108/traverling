window.addEventListener("load", () => {
  const containers = document.querySelector('.boxtourscreate');
  const toursFromStorage = JSON.parse(localStorage.getItem("tours")) || [];

  toursFromStorage.forEach((tour, i) => {
    containers.innerHTML += `
      <div class="box-top-tours">
        <div class="img-box-top-tours">
          <img src="${tour.image}">
        </div>
        <div class="info-box-top-tours">
          <div class="info-box">
            <img class="star" src="${tour.rating}">
            <div class="name-info-box-top-tours">${tour.destination}</div>
            <br>
            <div class="price">$${tour.price / 4}</div>
            <br>
            <div class="more-info" onclick="selectdestination(${i})">
              <div class="info-left">
                <img src="anh/people.png" width="20px"> ${tour.people}
              </div>
              <div class="info-right">
                Add now <img style="margin-left: 5px;" width="15px" src="anh/right-arrow.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
});

function selectdestination(i) {
  const toursFromStorage = JSON.parse(localStorage.getItem("tours")) || [];
  const selected = JSON.parse(localStorage.getItem("userSelection")) || { tours: [] };
  const selectedTour = toursFromStorage[i];
  const index = selected.tours.findIndex(tour => tour.destination === selectedTour.destination);

  const boxes = document.querySelectorAll('.box-top-tours');

  if (index === -1) {
    selected.tours.push(selectedTour);
    boxes[i].classList.add("box-selected"); // thêm viền cam
  } else {
    selected.tours.splice(index, 1);
    boxes[i].classList.remove("box-selected"); // bỏ viền cam
  }

  localStorage.setItem("userSelection", JSON.stringify(selected));
}


// --------------------- Haversine Distance ---------------------
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

// --------------------- Generate Distance Matrix ---------------------
function generateDistanceMatrix(selectedDestinations) {
  const matrix = [];

  for (let i = 0; i < selectedDestinations.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < selectedDestinations.length; j++) {
      if (i === j) matrix[i][j] = 0;
      else matrix[i][j] = haversineDistance(
        selectedDestinations[i].lat, selectedDestinations[i].lng,
        selectedDestinations[j].lat, selectedDestinations[j].lng
      );
    }
  }

  return matrix;
}

// --------------------- Nearest Neighbor Algorithm ---------------------
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

// --------------------- Tính lộ trình tối ưu ---------------------
function Route() {
  const selected = JSON.parse(localStorage.getItem("userSelection")) || { tours: [] };
  const selectedDestinations = selected.tours;

  if (selectedDestinations.length < 2) {
    alert("Bạn cần chọn ít nhất 2 địa điểm để tính lộ trình!");
    return;
  }

  const matrix = generateDistanceMatrix(selectedDestinations);
  const order = nearestNeighborOrder(matrix);
  const optimizedRoute = order.map(i => selectedDestinations[i]);

  localStorage.setItem("optimizedRoute", JSON.stringify(optimizedRoute));
  console.log("Lộ trình tối ưu:", optimizedRoute);
}
window.addEventListener("beforeunload", () => {
  localStorage.removeItem("userSelection");
  localStorage.removeItem("optimizedRoute");
});