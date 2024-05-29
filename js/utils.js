const hButton = document.getElementById("hamburgerButton");
const hMenu = document.getElementById("hamburgerMenu");
const hamburger = document.getElementById("hamburger");
const close = document.getElementById("close");
const closeButton = document.getElementById("closeButton");
const hNewPost = document.getElementById("hamburgerMake");
const hLogOutButton = document.getElementById("hLogoutButton");
const hLogIn = document.getElementById("hamburgerLoginElement");
const hLogOut = document.getElementById("hamburgerLogoutElement");

function openMenu() {
    hMenu.style.opacity = "1";
    close.style.display = "flex";
    hamburger.style.display = "none";
}

hButton.addEventListener('click', openMenu);

function closeMenu() {
    hMenu.style.opacity = "0";
    close.style.display = "none";
    hamburger.style.display = "flex";
}

closeButton.addEventListener('click', closeMenu);

export const ifLoggedIn = () => {
    const deleteElement = document.getElementById("deleteButtonElement");
    const newPost = document.getElementById("make");
    const logOutButton = document.getElementById("logout");
    const logOut = document.getElementById("logoutElement");
    const logIn = document.getElementById("loginElement");

    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");

    if (token && email) {
        console.log("Logged in");
        logIn.style.display = "none";
        hLogIn.style.display = "none";
        logOutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            window.location = "index.html";
        });
        hLogOutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            window.location = "index.html";
        });
    } else {
        console.log("Not logged in");
        newPost.style.display = "none";
        hNewPost.style.display = "none";
        logOut.style.display = "none";
        hLogOut.style.display = "none";
        deleteElement.style.display = "none";
    }
}

window.addEventListener("load", ifLoggedIn);








