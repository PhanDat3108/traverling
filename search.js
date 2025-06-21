window.addEventListener("load", () => {
  const tourBoxes = document.querySelectorAll(".box-top-tours");
  const filterData = JSON.parse(localStorage.getItem("onsearch"));
  const allTours = JSON.parse(localStorage.getItem("tours")) || [];

  if (filterData) {
    tourBoxes.forEach((box, index) => {
      const tour = allTours[index];

      const matchDestination = !filterData.destination || tour.destination === filterData.destination;
      const matchPrice = isNaN(filterData.price) || tour.price <= filterData.price;
      const matchPeople = isNaN(filterData.people) || tour.people >= filterData.people;

      const show = matchDestination && matchPrice && matchPeople;
      box.style.display = show ? "flex" : "none";
    });

    
    localStorage.removeItem("onsearch");
  }
});