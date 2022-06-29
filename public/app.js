// ======= sliding nav menu start ==========

//hamburger menu toggle start
const toggle = document.getElementById("toggle");
const sidebar = document.getElementById("sidebar");

document.onclick = function (e) {
    // @ts-ignore
    if (e.target.id !== "sidebar" && e.target.id !== "toggle") {
        toggle.classList.remove("active");
        sidebar.classList.remove("active")
    }
}

toggle.onclick = function () {
    toggle.classList.toggle("active");
    sidebar.classList.toggle("active")
}
//hamburger menu toggle end
// ======= sliding nav menu end ==========


// ===========gallery section start===============
var fullImgBox = document.getElementById("fullImgBox");
var fullImg = document.getElementById("fullImg");

function openFullImg(pic) {
    fullImgBox.style.display = "flex";
    // @ts-ignore
    fullImg.src = pic;
}

function closeFullImg() {
    fullImgBox.style.display = "none";
}
// ===========gallery section end===============

// ====== project section cards start ========
var cards = document.querySelectorAll('.card__inner');
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        cards[i].classList.toggle('is-flipped');
    });
}
// ======= project section cards end ========