// Toggle Drawer Menu
const toggleDrawerButton = document.getElementById("toggleDrawerButton");
const closeDrawerButton = document.getElementById("closeDrawerButton");
const drawer = document.getElementById("drawer");
const backdrop = document.getElementById("backdrop");
const yearSpan = document.getElementById("year");

toggleDrawerButton.addEventListener("click", () => {
  drawer.classList.toggle("translate-x-full");
  backdrop.classList.toggle("hidden");
});

closeDrawerButton.addEventListener("click", () => {
  drawer.classList.add("translate-x-full");
  backdrop.classList.add("hidden");
});

backdrop.addEventListener("click", () => {
  drawer.classList.add("translate-x-full");
  backdrop.classList.add("hidden");
});

// Set current year
yearSpan.textContent = new Date().getFullYear();
