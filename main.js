
function openNav() {
  document.getElementById("mobile-nav").style.display = "flex";
}

function closeNav() {
  document.getElementById("mobile-nav").style.display = "none";
}
setTimeout(() => {
  document.getElementById('road1').style.display = "none";
  document.getElementById('road2').style.display = "flex";
  document.getElementById('road2').style.opacity = "1";
  document.getElementById('road2').style.zIndex = "2";
  document.getElementById('road2').style.visibility = "unset";
  document.getElementById('span').innerHTML = "15%"
}, 1500);