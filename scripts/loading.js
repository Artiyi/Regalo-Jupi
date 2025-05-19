document.addEventListener("DOMContentLoaded", () => {
  const fill = document.getElementById("progress-fill");
  const readyText = document.getElementById("ready-text");
  const loadingText = document.getElementById("loading-text");
  const progressBar = document.getElementById("progress-bar");
  setTimeout(() => { fill.style.width = "100%"; }, 100);
  setTimeout(() => {
    loadingText.style.display = "none";
    progressBar.style.display = "none";
    readyText.classList.add("show");
  }, 6000);
  setTimeout(() => {
    window.location.href = "scenes/room.html";
  }, 8000);
});