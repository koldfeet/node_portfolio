// ===========gallery section start===============
const fullImgBox = document.getElementById("fullImgBox");
const fullImg = document.getElementById("fullImg");

function openFullImg(pic) {
    fullImgBox.style.display = "flex";
    fullImg.src = pic;
}

function closeFullImg() {
    fullImgBox.style.display = "none";
}
// ===========gallery section end===============

// ====== project section cards start ========
const cards = document.querySelectorAll('.card__inner');
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        cards[i].classList.toggle('is-flipped');
    });
}

// ==== project card portfolio live link alert start ====
const alert_btn = document.getElementById("alert_btn")
alert_btn.addEventListener("click", () => {
    alert("This website has already been open.")
})
// ==== project card portfolio live link alert END ====
// ======= project section cards end ========
