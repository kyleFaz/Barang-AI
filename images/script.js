
const dateElement = document.getElementById("current-date");
if (dateElement) {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric"};
    dateElement.textContent = today.toLocaleDateString("en-US", options);
}

const hero = document.querySelector(".hero"); 
const slider = document.querySelector(".hero-slider"); 
const slides = document.querySelectorAll(".slide"); 
if (hero && slider && slides.length >= 4) { 
    const backgrounds = [ 
        "images/dambanang_kawayan.jpg", 
        "images/Plaza.jpg", 
        "images/PlazaStatue1.jpg" ]; 
    let current = 0; 

    slides[0].style.backgroundImage = 
    ` linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.48)), 
    url("${backgrounds[0]}") `; 
    
    slides[1].style.backgroundImage = 
    ` linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.48)), 
    url("${backgrounds[1]}") `; 
    
    slides[2].style.backgroundImage = 
    ` linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.48)), 
    url("${backgrounds[2]}") `;
    
    slides[3].style.backgroundImage = slides[0].style.backgroundImage; 
    
    function changeBackground() { current++; 
        slider.style.transition = "transform 1s ease-in-out"; 
        slider.style.transform = `translateX(-${current * 33.333333}%)`; } 

    slider.addEventListener("transitionend", function () { 
        if (current === 3) { slider.style.transition = "none"; 
            slider.style.transform = "translateX(0)"; current = 0; } }); 
    setInterval(changeBackground, 4000); }


const signupOverlay = document.getElementById("signupOverlay");
const openSignup = document.getElementById("open-signup");
const closeSignup = document.getElementById("closeSignupOverlay");
const cancelSignup = document.getElementById("cancel-signup");

// Open popup
if (signupOverlay && openSignup) {
    openSignup.addEventListener("click", function (event) {
        event.preventDefault();
        signupOverlay.classList.add("active");
    });
}

// Close using X
if (signupOverlay && closeSignup) {
    closeSignup.addEventListener("click", function () {
        signupOverlay.classList.remove("active");
    });
}

// Close using Cancel
if (signupOverlay && cancelSignup) {
    cancelSignup.addEventListener("click", function () {
        signupOverlay.classList.remove("active");
    });
}

// Close when clicking the dark background
if (signupOverlay) {
    signupOverlay.addEventListener("click", function (event) {
        if (event.target === signupOverlay) {
            signupOverlay.classList.remove("active");
        }
    });
}

// Sign In password
    const loginPassword = document.getElementById("password");
    const loginShowPassword = document.getElementById("showPassword");

    loginShowPassword.addEventListener("change", function () {
        loginPassword.type = this.checked ? "text" : "password";
    });

    // Sign Up passwords
    const newPassword = document.getElementById("new-password");
    const confirmPassword = document.getElementById("confirm-password");
    const signupShowPassword = document.getElementById("show-password");

    signupShowPassword.addEventListener("change", function () {
        const type = this.checked ? "text" : "password";

        newPassword.type = type;
        confirmPassword.type = type;
    });

/* === Terms of Services === */
const termsLink = document.getElementById("terms-link");
const termsOverlay = document.getElementById("terms-overlay");
const termsClose = document.getElementById("terms-close");
const termsUnderstood = document.getElementById("terms-understood");
const termsCheckbox = document.getElementById("terms-conditions");
const termsContent = document.querySelector(".terms-content");
const termsReadMessage = document.getElementById("terms-read-message");

function checkTermsScroll() {
    if (!termsContent || !termsCheckbox) return;

    const reachedBottom =
        termsContent.scrollTop + termsContent.clientHeight >=
        termsContent.scrollHeight - 5;

    if (reachedBottom) {
        termsCheckbox.disabled = false;

        if (termsReadMessage) {
            termsReadMessage.textContent =
                "You've reached the bottom. You can now agree to the terms.";
            termsReadMessage.classList.add("read-complete");
        }
    }
}

if (termsContent) {
    termsContent.addEventListener("scroll", checkTermsScroll);
}

function openTerms() {
    termsOverlay.classList.add("active");
    termsOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    checkTermsScroll();
}

function closeTermsModal() {
    termsOverlay.classList.remove("active");
    termsOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (termsLink) {
        termsLink.focus();
    }
}

if (termsLink && termsOverlay && termsClose && termsUnderstood) {
    termsLink.addEventListener("click", function (event) {
        event.preventDefault();
        openTerms();
    });

    termsClose.addEventListener("click", closeTermsModal);
    termsUnderstood.addEventListener("click", closeTermsModal);

    termsOverlay.addEventListener("click", function (event) {
        if (event.target === termsOverlay) {
            closeTermsModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            termsOverlay.classList.contains("active")
        ) {
            closeTermsModal();
        }
    });
} else {
    console.error("Terms modal elements are missing. Check your HTML IDs.");
}

/* === Privacy Policy === */
const policyLink = document.getElementById("policy-link");
const policyOverlay = document.getElementById("policy-overlay");
const policyClose = document.getElementById("policy-close");
const policyUnderstood = document.getElementById("policy-understood");
const policyCheckbox = document.getElementById("privacy-policy");
const policyContent = document.querySelector(".policy-content");
const policyReadMessage = document.getElementById("policy-read-message");

function checkPolicyScroll() {
    if (!policyContent || !policyCheckbox) return;

    const reachedBottom =
        policyContent.scrollTop + policyContent.clientHeight >=
        policyContent.scrollHeight - 5;

    if (reachedBottom) {
        policyCheckbox.disabled = false;

        if (policyReadMessage) {
            policyReadMessage.textContent =
                "You've reached the bottom. You can now agree to the privacy policy.";
            policyReadMessage.classList.add("read-complete");
        }
    }
}

if (policyContent) {
    policyContent.addEventListener("scroll", checkPolicyScroll);
}

function openPolicy() {
    policyOverlay.classList.add("active");
    policyOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    checkPolicyScroll();
}

function closeModal() {
    policyOverlay.classList.remove("active");
    policyOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (policyLink) {
        policyLink.focus();
    }
}

if (policyLink && policyOverlay && policyClose && policyUnderstood) {
    policyLink.addEventListener("click", function (event) {
        event.preventDefault();
        openPolicy();
    });

    policyClose.addEventListener("click", closeModal);
    policyUnderstood.addEventListener("click", closeModal);

    policyOverlay.addEventListener("click", function (event) {
        if (event.target === policyOverlay) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            policyOverlay.classList.contains("active")
        ) {
            closeModal();
        }
    });
} else {
    console.error("Privacy policy modal elements are missing. Check your HTML IDs.");
}