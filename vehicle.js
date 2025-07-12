let danhsachxe = JSON.parse(localStorage.getItem("phuongtien")) || [];

window.addEventListener("load", () => {
  const container = document.querySelector('.boxvehicle');
  const dulieuxe = JSON.parse(localStorage.getItem("phuongtien")) || [];

  container.innerHTML = ""; // Xóa cũ

  dulieuxe.forEach((xe, vitri) => {
    container.innerHTML += `
      <div class="box-top-tours">
        <div class="img-box-top-tours">
          <img src="${xe.image}">
        </div>
        <div class="info-box-top-tours">
          <div class="info-box">
            <div class="name-info-box-top-tours">${xe.title}</div>
            <br>
            <div class="price">$${xe.price}</div>
            <br>
            <div class="more-info" style="margin-top:50px" onclick="moPopupThueXe(${vitri})">
              <div class="info-left">
                <img src="anh/people.png" width="20px" style="padding: 0;"> ${xe.people}
              </div>
              <div class="info-right">
                Thuê ngay <img style="margin-left: 5px;" width="15px" src="anh/right-arrow.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
});

// Hàm mở popup thuê xe
function moPopupThueXe(vitri) {
  const danhsachxe = JSON.parse(localStorage.getItem("phuongtien")) || [];
  const xe = danhsachxe[vitri];

  hopThueXe.innerHTML = `
    <button onclick="document.getElementById('popup-xe').style.display='none'">Đóng</button>
    <h2>${xe.title}</h2>
    <img src="${xe.image}" style="width:100%; border-radius:8px; margin-bottom:10px;">
    <p><strong>Giá mỗi ngày:</strong> $${xe.price}</p>
    <label>Ngày thuê: <input type="date" id="ngayThue" /></label><br/><br/>
    <label>Ngày trả: <input type="date" id="ngayTra" /></label><br/><br/>
    <label>Số lượng xe: <input type="number" id="soLuong" min="1" value="1" /></label><br/><br/>
    <p id="tongTienXe">Tổng tiền: $0</p>
    <br>
    <div onclick='xacNhanThueXe(${vitri})' class="butten-background">Thuê</div>
  `;

  hopThueXe.style.display = "block";

  const capNhatTien = () => {
    const soLuong = parseInt(document.getElementById("soLuong").value) || 1;
    const ngaybd = new Date(document.getElementById("ngayThue").value);
    const ngaykt = new Date(document.getElementById("ngayTra").value);
    const songay = Math.max(1, Math.ceil((ngaykt - ngaybd) / (1000 * 60 * 60 * 24)));
    const tong = soLuong * songay * parseFloat(xe.price);
    document.getElementById("tongTienXe").textContent = `Tổng tiền: $${tong}`;
  };

  document.getElementById("soLuong").addEventListener("input", capNhatTien);
  document.getElementById("ngayThue").addEventListener("change", capNhatTien);
  document.getElementById("ngayTra").addEventListener("change", capNhatTien);
}

// Hàm xác nhận thuê
function xacNhanThueXe(vitri) {
  const dsxe = JSON.parse(localStorage.getItem("phuongtien"));
  const xe = dsxe[vitri];

  const soLuong = parseInt(document.getElementById("soLuong").value);
  const batdau = document.getElementById("ngayThue").value;
  const ketthuc = document.getElementById("ngayTra").value;

  const songay = Math.max(1, Math.ceil((new Date(ketthuc) - new Date(batdau)) / (1000 * 60 * 60 * 24)));
  const tong = soLuong * songay * parseFloat(xe.price);

  const duLieuThue = {
    title: xe.title,
    image: xe.image,
    quantity: soLuong,
    start: batdau,
    end: ketthuc,
    days: songay,
    total: tong
  };

  const username = localStorage.getItem("Userinuse");
  const danhSachDaThue = JSON.parse(localStorage.getItem(`phuongtiendangthuee_${username}`)) || [];
  danhSachDaThue.push(duLieuThue);
  localStorage.setItem(`phuongtiendangthuee_${username}`, JSON.stringify(danhSachDaThue));

  document.getElementById("popup-xe").style.display = "none";
  alert("Thuê xe thành công!");

  capnhatGioHang();
}

// Tạo popup
const hopThueXe = document.createElement("div");
hopThueXe.id = "popup-xe";
hopThueXe.style = `
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
document.body.appendChild(hopThueXe);

// Cập nhật giỏ hàng tổng quát
function capnhatGioHang() {
  const username = localStorage.getItem("Userinuse");
  const tourTuyChon = JSON.parse(localStorage.getItem(`toursCreated_${username}`)) || { route: [] };
  const tourDaDat = JSON.parse(localStorage.getItem(`bookings_${username}`)) || [];
  const xeDaThue = JSON.parse(localStorage.getItem(`phuongtiendangthuee_${username}`)) || [];

  let giohang = JSON.parse(localStorage.getItem("giohang"));

  if (!giohang || giohang.username !== username) {
    giohang = {
      username: username,
      tourTuyChon: [],
      tourDaDat: [],
      xeDaThue: []
    };
  }

  giohang.tourTuyChon.push(...tourTuyChon.route);
  giohang.tourDaDat.push(...tourDaDat);
  giohang.xeDaThue.push(...xeDaThue);

  localStorage.setItem("giohang", JSON.stringify(giohang));
}
