async function fetchAllPosts() {
    try {
        const allOutput = document.getElementById("allOutput");
        const response = await fetch("https://v2.api.noroff.dev/blog/posts/Frankie");
        if (!response.ok) {
            throw new Error("Could not fetch");
        }
        const test = await response.json();

        allOutput.innerHTML = test.data.map(blog => {
            return `
            <div id="blog-element">
            <a href="details.html?id=${blog.id}">
            <h1>${blog.title}</h1>
            <img id="blogImage" src=${blog.media?.url ? blog.media?.url : "images/no-image.jfif" }/>
            </a>
            </div>
            `
        }).join(" ");
    } catch(error) {
        console.error(error);
    }
}

fetchAllPosts();