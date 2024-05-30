import {ifLoggedIn} from "./utils.js";

let outElement = document.getElementById("detailedBlog");

let params = new URL (document.location).searchParams;

let id = params.get("id");
const url = `https://v2.api.noroff.dev/blog/posts/Frankie/${id}`;





// Show detailed blog post

async function getBlogById() {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Frankie/${id}`);
        const responseData = await response.json();
        document.title = responseData.data.title + " - Gameworld"
        listFullBlog(responseData, outElement);
    } catch(error) {
        console.error(error);
    }
}

getBlogById();

function listFullBlog(blog, out) {
    let newDiv = `<div id="detailedBlog-element">
    <h1>${blog.data.title}</h1>
    <img src=${blog.data.media.url}>
    <p>${blog.data.body}</p>
    <p>Author: ${blog.data.author.name}</p>
    <p>Created: ${blog.data.created}</p>
    <p>Updated: ${blog.data.updated}</p>
    <div>
    <p id="blogURL">URL: https://gameworld-exam.netlify.app/html/post/details.html?id=${id}</p>
    <button id="copyButton"><i class="fa-solid fa-copy"></i> Copy URL</button>
    <div id="copyStatus"><i class="fa-solid fa-check"></i> Copied to clipboard</div>
    </div>
    </div>
    `;
    out.innerHTML = newDiv;
    const buttonCopy = document.getElementById("copyButton");
    const statusCopy = document.getElementById("copyStatus");

function myCopyFunction() {
    navigator.clipboard.writeText(`https://gameworld-exam.netlify.app/html/post/details.html?id=${id}`);
    statusCopy.style.visibility = "visible";
    statusCopy.style.opacity = "0";
    buttonCopy.style.display = "none";
}

buttonCopy.addEventListener('click', myCopyFunction);
}




// Delete function

maybeDelete.addEventListener('click', deleteFunction);

function deleteFunction() {
    if (confirm("Are you sure you want to delete this post?") == true) {
        clickHandler();
    } else {
        console.log("Delete canceled");
    }
}

const clickHandler = async () => {
    try {
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        window.location.href = "/html/index.html";
    } catch(error) {
        console.error(error);
    }
};





// Edit button

const editButton = document.getElementById("editPost");

editButton.addEventListener("click", editPost);

function editPost() {
    window.location.href = `edit.html?id=${id}`
}