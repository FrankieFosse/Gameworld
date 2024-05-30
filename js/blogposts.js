const url = `https://v2.api.noroff.dev/blog/posts/Frankie`;
const imageOutput = document.querySelector(".slides");
const allOutput = document.getElementById("allOutput");

async function fetchBlog() {
    try {
        const myOutput = document.getElementById("myOutput");
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Could not fetch blog");
        }
        const test = await response.json();

const latestBlogs = test.data
.sort((a, b) => new Date(b.created) - new Date(a.created))
.slice(0, 3);

const latestTwelveBlogs = test.data
.sort((a, b) => new Date(b.created) - new Date(a.created))
.slice(0, 12);





// Latest 12 posts grid

myOutput.innerHTML = latestTwelveBlogs.map(blog => {
    return `
    <div id="blog-element">
    <a href="/html/post/details.html?id=${blog.id}">
    <h1>${blog.title}</h1>
    <img id="blogImage" src=${blog.media?.url ? blog.media?.url : "images/no-image.jfif" }/>
    </a>
    </div>
    `
}).join(" ")
        




// Carousel

imageOutput.innerHTML = latestBlogs.map((blog, index) => {
let startElementTag = '<li class="slide">';
if (index === 0) { 
    startElementTag = '<li class="slide" data-active>';
}

return `
    
    ${startElementTag}
    <a href="/html/post/details.html?id=${blog.id}">
    <h2>${blog.title}</h2>
    <img id="carouselImage" src="${blog.media.url}" alt="${blog.title}">
    <p id="blogText">${blog.body.slice(0, 120)}...</p>
    </a>
    </li>
    
`;
}).join(" ")

    } catch(error) {
        console.error(error);
    }
}

 await fetchBlog();