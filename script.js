
const dateElement = document.getElementById("current-date");
const today = new Date();
const options = { year: "numeric", month: "long", day: "numeric"};
dateElement.textContent = today.toLocaleDateString("en-US", options);

const hero = document.querySelector(".hero");
const slider = document.querySelector(".hero-slider");
const slides = document.querySelectorAll(".slide");
const backgrounds = [
    "images/dambanang_kawayan.jpg",
    "images/bg2.jpg"
];
let current = 0;

slides[0].style.backgroundImage = `
    linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.48)),
    url("${backgrounds[0]}")
`;

slides[1].style.backgroundImage = `
    linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.48)),
    url("${backgrounds[1]}")
`;

// Duplicate the first image
slides[2].style.backgroundImage = slides[0].style.backgroundImage;

function changeBackground() {
    current++;

    slider.style.transition = "transform 1s ease-in-out";
    slider.style.transform = `translateX(-${current * 33.333333}%)`;
}

slider.addEventListener("transitionend", () => {
    if (current === 2) {
        slider.style.transition = "none";
        slider.style.transform = "translateX(0)";
        current = 0;
    }
});
setInterval(changeBackground, 4000);    