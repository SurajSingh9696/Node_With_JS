const originalUrl = document.querySelector("#origininput");

const shortUrl = document.querySelector("#shortinput");

const but = document.querySelector("#but");

const show = document.querySelector("#result");


but.addEventListener("click", async()=>{
    const post = await fetch("http://localhost:4000/insert" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            originalUrl : originalUrl.value,
            shortUrl : shortUrl.value
        })
    
    });
    show.innerHTML = `<a href="${originalUrl.value}" target="_blank">http://localhost:4000/${shortUrl.value}</a>`;
})