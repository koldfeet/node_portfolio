// ======= sliding nav menu start ==========

//might have to delete line below
// const { response } = require("express");

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

// ======= Contact page START ==========
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5000/getAll")
        .then(response => response.json())
        .then(data => loadHTMLTable(data["data"]))
})

const addBtn = document.querySelector("#add-name-btn")

addBtn.onclick = function () {
    const nameInput = document.querySelector("#name-input")
    const name = nameInput.value;
    nameInput.value = "";

    fetch("http://localhost:5000/insert", {
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ name: name })
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data["data"]))
}

function insertRowIntoTable(data) {

}

function loadHTMLTable(data) {
    const table = document.querySelector("table tbody")

    console.log(data)

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan = '7'> No Data </td></tr>"
    }
}

// ======= Contact page end ==========