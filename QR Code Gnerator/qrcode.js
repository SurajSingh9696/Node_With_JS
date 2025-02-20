const text = document.querySelector("#text");

const img = document.querySelector("qrcode");

const but = document.querySelector("#generate");

const image = document.querySelector("#img");

const mainfunction = async () => {
    if (text.value) {
        image.style.visibility = "visible";
        const qr = await fetch("http://localhost:3500/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text.value })
        })
        const url = await qr.text();
        image.setAttribute("src", url);
    }
    else {
        alert("Please enter text");
    }
}

text.addEventListener("input", mainfunction);

but.addEventListener("click" , mainfunction);