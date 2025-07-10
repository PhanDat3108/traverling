window.addEventListener("load", () => {
  const username = localStorage.getItem("Userinuse");
  const giohang = JSON.parse(localStorage.getItem("giohang") || "{}");

  const tourContainer = document.getElementById("tour-list");
  const comboContainer = document.getElementById("combo-list");
  const vehicleContainer = document.getElementById("vehicle-list");

  // Kiểm tra đúng người dùng
  if (!giohang || giohang.username !== username) {
    tourContainer.innerHTML = "<p>Không có tour nào trong giỏ hàng.</p>";
    comboContainer.innerHTML = "<p>Không có tour tự tạo nào.</p>";
    vehicleContainer.innerHTML = "<p>Không có xe nào được thuê.</p>";
    return;
  }

  // ===== TOUR ĐÃ ĐẶT =====
  const tourDaDat = giohang.tourDaDat || [];
  if (tourDaDat.length > 0) {
    tourDaDat.forEach(tour => {
      tourContainer.innerHTML += `
        <div class="box-top-tours">
          <div class="img-box-top-tours">
            <img src="${tour.image}">
          </div>
          <div class="info-box-top-tours">
            <div class="info-box">
              <div class="name-info-box-top-tours">${tour.title}</div>
              <div class="price">Tổng tiền: $${tour.total || "?"}</div>
              <div class="more-info">
                <div class="info-left">
                  <img src="anh/people.png" width="20px" /> ${tour.numPeople || 1} người
                </div>
                <div class="info-right">Đã đặt</div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  } else {
    tourContainer.innerHTML = "<p>Không có tour nào trong giỏ hàng.</p>";
  }

  // ===== TOUR TỰ TẠO =====
  // ===== TOUR TỰ TẠO =====
const tourTuyChonList = giohang.tourTuyChon || [];
comboContainer.innerHTML = ""; // Xóa cũ trước khi thêm mới

if (tourTuyChonList.length === 0) {
  comboContainer.innerHTML = "<p>Không có tour tự tạo nào.</p>";
} else {
  tourTuyChonList.forEach(tour => {
    const image = tour.route?.[0]?.image || "anh/custom-tour.jpg";
    const soNgay = tour.days || "?";
    const services = tour.services?.join(", ") || "Không có";
    const ghichu = tour.ghichu || "Không có";
    const people = tour.people || "?";
    const totalCost = tour.cost?.total || "?";

    comboContainer.innerHTML += `
      <div class="box-top-tours">
        <div class="img-box-top-tours">
          <img src="${image}">
        </div>
        <div class="info-box-top-tours">
          <div class="info-box">
            <div class="name-info-box-top-tours">${ghichu} </div>
            <div class="price">Tổng tiền: $${totalCost}</div>
            <div style="color: #ff6600">Dịch vụ: ${services}</div>
            <div class="more-info">
              
              <div class="info-right">Số người: ${people}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}



  // ===== XE ĐÃ THUÊ =====
  const xeDaThue = giohang.xeDaThue || [];
  if (xeDaThue.length > 0) {
    xeDaThue.forEach(xe => {
      vehicleContainer.innerHTML += `
        <div class="box-top-tours">
          <div class="img-box-top-tours">
            <img src="${xe.image}">
          </div>
          <div class="info-box-top-tours">
            <div class="info-box">
              <div class="name-info-box-top-tours">${xe.title}</div>
              <div class="price">Tổng tiền: $${xe.total || "?"}</div>
              <div class="more-info">
                <div class="info-left">Ngày thuê: ${xe.rentDate || "?"}</div>
                <div class="info-right">Số lượng: ${xe.quantity || 1}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  } else {
    vehicleContainer.innerHTML = "<p>Không có xe nào được thuê.</p>";
  }
});
