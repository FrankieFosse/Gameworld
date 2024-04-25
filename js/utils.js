const api = `https://v2.api.noroff.dev/cat-facts/`;

let collection = [];

async function fetchFact() {
    try {
        const out = document.querySelector("ul#myFact");
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error("Could not fetch fact");
        }
        const obj = await response.json();
        console.log(obj);
        for (let item of obj.data) {
            collection.push(item.text);
        }
        out.innerHTML = collection;
        
    } catch(error) {
        console.error(error);
    }
}

fetchFact();