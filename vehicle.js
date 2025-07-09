window.addEventListener("load", () => {
  const container = document.querySelector('.boxvehicle');
  const toursFromStorage = JSON.parse(localStorage.getItem("phuongtien")) || [];

  toursFromStorage.forEach((phuongtiens, index) => {
    container.innerHTML += `
      <div class="box-top-tours">
        <div class="img-box-top-tours">
          <img src="${phuongtiens.image}">
        </div>
        <div class="info-box-top-tours">
          <div class="info-box">
            <div class="name-info-box-top-tours">${phuongtiens.title}</div>
            <br>
            <div class="price">$${phuongtiens.price}</div>
            <br>
            <div class="more-info" style="margin-top:50px" onclick="thuexe(${index})">
              <div class="info-left">
                <img src="anh/people.png" width="20px" style="padding: 0;"> ${phuongtiens.people}
              </div>
              <div class="info-right">
                Rent Now <img style="margin-left: 5px;" width="15px" src="anh/right-arrow.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
});

// Nếu dữ liệu chưa có sẵn
if (!localStorage.getItem("phuongtien")) {
  localStorage.setItem("phuongtien", JSON.stringify(phuongtien));
}

// Hàm thêm xe vào danh sách thuê
function thuexe(index) {
  const allvehicles = JSON.parse(localStorage.getItem("phuongtien")) || [];
  const vehicle = allvehicles[index];

  popupXe.innerHTML = `
    <button onclick="document.getElementById('popup-xe').style.display='none'">X Đóng</button>
    <h2>${vehicle.title}</h2>
    <img src="${vehicle.image}" style="width:100%; border-radius:8px; margin-bottom:10px;">
    <p><strong>Giá mỗi ngày:</strong> $${vehicle.price}</p>
    <label>Ngày thuê: <input type="date" id="rentStart" /></label><br/><br/>
    <label>Ngày trả: <input type="date" id="rentEnd" /></label><br/><br/>
    <label>Số lượng xe: <input type="number" id="rentQuantity" min="1" value="1" /></label><br/><br/>
    <p id="xeTotal">Tổng tiền: $0</p>
    <br>
    <div onclick="xacNhanThueXe(${index})" class="butten-background" width="50px">Xác nhận thuê</div>
  `;

  popupXe.style.display = "block";

  const updateTotal = () => {
    const quantity = parseInt(document.getElementById("rentQuantity").value) || 1;
    const start = new Date(document.getElementById("rentStart").value);
    const end = new Date(document.getElementById("rentEnd").value);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    const total = quantity * days * parseFloat(vehicle.price);
    document.getElementById("xeTotal").textContent = `Tổng tiền: $${total}`;
  };

  document.getElementById("rentQuantity").addEventListener("input", updateTotal);
  document.getElementById("rentStart").addEventListener("change", updateTotal);
  document.getElementById("rentEnd").addEventListener("change", updateTotal);
}

function xacNhanThueXe(index) {
  const vehicles = JSON.parse(localStorage.getItem("phuongtien"));
  const vehicle = vehicles[index];

  const quantity = parseInt(document.getElementById("rentQuantity").value);
  const start = document.getElementById("rentStart").value;
  const end = document.getElementById("rentEnd").value;

  const days = Math.max(1, Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)));
  const total = quantity * days * parseFloat(vehicle.price);

  const rentData = {
    title: vehicle.title,
    image: vehicle.image,
    quantity,
    start,
    end,
    days,
    total
  };

  const rented = JSON.parse(localStorage.getItem("phuongtiendangthuee")) || [];
  rented.push(rentData);
  localStorage.setItem("phuongtiendangthuee", JSON.stringify(rented));

  document.getElementById("popup-xe").style.display = "none";
  alert("Thuê xe thành công!");
}

const popupXe = document.createElement("div");
popupXe.id = "popup-xe";
popupXe.style = `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
  padding: 30px;
  z-index: 9999;
  max-width: 500px;
  width: 90%;
  display: none;
`;
document.body.appendChild(popupXe);
