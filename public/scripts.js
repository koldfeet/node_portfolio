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

