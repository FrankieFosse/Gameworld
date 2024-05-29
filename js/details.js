/*let collection = []
let out = document.getElementById("detailedBlog");

let params = new URL (document.location).searchParams;

let id = params.get("id");

async function getBlogById(itemId) {
    try {
        const api = `https://v2.api.noroff.dev/blog/posts/Frankie/`;
        const response = await fetch (api);
        console.log(response);
        const obj = await response.json();
        console.log("Test", obj.data);
        collection = obj.data;
        console.log("My console log:" + " " + collection);
        out.innerHTML = collection;
    } catch (error) {
        console.error(error);
    }
}

getBlogById(id);*/

/* const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");
console.log(id);

const out = document.querySelector("div#detailedBlog");
let ref = document.referrer;
console.log(ref);

const listData = (blog) => {
    console.log(blog);
    let newDiv = `
    <h1>${id}</h1>
    <p>${blog}</p>
    `;
    out.innerHTML = newDiv;
}

const getAllBlogs = async () => {
    const api = `https://v2.api.noroff.dev/blog/posts/Frankie/?id=${id}`;
    try {
        const response = await fetch(api);
        if (!response.ok) throw response.statusText;
        const data = await response.json();
        console.log(data.blog);
        listData(data.blog);
    } catch (error) {
        console.error("Error message: "+error);
    }
}

getAllBlogs(); */

/*const outElement = document.getElementById("detailedBlog");

let params = new URL(document.location).searchParams;
let id = params.get("id");

async function getBlog() {
    try {
        const api = `https://v2.api.noroff.dev/blog/posts/Frankie/`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }
        const response = await fetch(api);
        console.log(response);
        const obj = await response.json();
        console.log(obj.data);
        outElement.innerHTML = obj.data[4].body;
    } catch(error) {
        outElement.innerHTML = `Could not fetch data...`;
    }
}

getBlog();

function listFullCard(card, out) {
    console.log(card.data[0].title);
    document.title = card.title;
    let newDiv = `<div id="${id}">
    <h1>${card.data[0].title}</h1>
    <p>${body}</p>
    </div>
    `;
    out.innerHTML = newDiv;
} */

import {ifLoggedIn} from "./utils.js";



let outElement = document.getElementById("detailedBlog");

let params = new URL (document.location).searchParams;

let id = params.get("id");
const url = `https://v2.api.noroff.dev/blog/posts/Frankie/${id}`;

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
    </div>
    `;
    out.innerHTML = newDiv;
}

//const deleteBtn = document.getElementById("maybeDelete");
//const deleteBtnElement = document.getElementById("deleteButtonElement").style.display = 'none';

/*const maybeHandler = async () => {
    document.getElementById("deleteButtonElement").style.display = 'flex';
}

deleteBtn.addEventListener('click', maybeHandler);*/

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
        window.location.href = "index.html";
    } catch(error) {
        console.error(error);
    }
};

const editButton = document.getElementById("editPost");

editButton.addEventListener("click", editPost);

function editPost() {
    window.location.href = `edit.html?id=${id}`
}