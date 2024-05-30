let params = new URL (document.location).searchParams;



let id = params.get("id");
const url = `https://v2.api.noroff.dev/blog/posts/Frankie/`;

const blogTitle = document.getElementById("blog-title");
const blogBody = document.getElementById("blog-body");
const blogMediaUrl = document.getElementById("blog-media-url");
const blogMediaAlt = document.getElementById("blog-media-alt");

const postStatus = document.getElementById("postStatus");

const cancel = document.getElementById("cancelButton");

const editPostButton = document.getElementById("editPostButton");

function cancelEdit() {
    history.back();
}

cancel.addEventListener('click', cancelEdit);

async function editClick() {

    if (!id) {
        return;
    }

    try {
        const res = await fetch((url + id), {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                "title": blogTitle.value,
                "body": blogBody.value,
                "media": {
                    "url": blogMediaUrl.value,
                    "alt": blogMediaAlt.value
                }
            })
        });
        if (!res.ok) {
            postStatus.innerHTML = "Please provide a valid Media-URL";
        } else {
            postStatus.innerHTML = "Post successfully updated!";
        }

        /*window.location.href = "/html/index.html";*/
    } catch(error) {
        console.error(error);
    }
}

editPostButton.addEventListener("click", editClick);

async function getBlogById() {

    if (!id) {
    return;
    }

    try {
        const response = await fetch(url + id);

        const responseData = await response.json();
        document.title = responseData.data.title + " - Gameworld"
        blogTitle.value = responseData.data.title;
        blogBody.value = responseData.data.body;
        blogMediaUrl.value = responseData.data.media.url;
        blogMediaAlt.value = responseData.data.media.alt;

    } catch(error) {
        console.error(error);
    }
}

getBlogById();

