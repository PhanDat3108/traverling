function toggleDropdown() {
      let menu = document.getElementsByClassName("drop")[0];
      if (menu.style.display === "flex") {
        menu.style.display = "none";
      } else {
        menu.style.display = "flex";
      }
    }