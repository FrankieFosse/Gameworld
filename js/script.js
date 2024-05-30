function getInput(e) {
    const blogTitleInput = document.getElementById("blog-title");
    const blogBodyInput = document.getElementById("blog-body");
    const blogMediaUrl = document.getElementById("blog-media-url");
    const blogMediaAlt = document.getElementById("blog-media-alt");
    let isValid = true;
    const body = {
        title: blogTitleInput.value,
        body: blogBodyInput.value,
        media: {
            url: blogMediaUrl.value,
            alt: blogMediaAlt.value
        }
    }

    const error = {
        title:"",
        body:"",
        media: {
            url:"",
            alt:""
        }
    }


if(!body.title) error.title ="Please provide a Title"
if(!body.body) error.body ="Please provide a Body"
if(!body.media.url) error.media.url = "Please provide Media-URL"
if(!body.media.alt) error.media.alt = "Please provide Media-Alt-text"

    if(!body.title || !body.body || !body.media.url || !body.media.alt) {
        isValid = false
      return {error: error, isValid: isValid}
    }

    if(isValid) return {body: body, isValid: isValid}

}



const form = document.getElementById('form');

if (form) {
document.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = e.target.name = "title"
    const prePayload = new FormData(form);
    const payload = new URLSearchParams(prePayload);


const blogData = getInput()
console.log(blogData);

const titleError = document.getElementById("titleError");
const bodyError = document.getElementById("bodyError");
const mediaUrlError = document.getElementById("mediaUrlError");
const mediaAltError = document.getElementById("mediaAltError");
const postStatus = document.getElementById("postStatus");

blogData.error?.title? titleError.textContent = blogData.error.title : titleError.textContent = "";
blogData.error?.body? bodyError.textContent = blogData.error.body : bodyError.textContent = "";
blogData.error?.media.url? mediaUrlError.textContent = blogData.error.media.url : mediaUrlError.textContent = "";
blogData.error?.media.alt? mediaAltError.textContent = blogData.error.media.alt : mediaAltError.textContent = "";

if(blogData.isValid) {
    createBlog(blogData.body);
    
} 


})
}


async function createBlog(data) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Frankie`, {
            method: "POST",
            body: JSON.stringify({
                "title": data.title,
                "body": data.body,
                "media": {
                    "url": data.media.url,
                    "alt": data.media.alt
                }
            }),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
            
        })
        const responseData = await response.json();
        console.log(responseData);
        
        if (!response.ok) {
            mediaUrlError.innerHTML = "Please provide a valid Media-URL";
        } else {
            postStatus.innerHTML = "Post successfully created!"
        }
    } catch(error) {
        console.error(error);

    }
}