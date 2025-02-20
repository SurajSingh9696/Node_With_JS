const text = document.querySelector("#text");

const img = document.querySelector("qrcode");

const but = document.querySelector("#generate");

but.addEventListener("click", async () => {
    if (text.value) {
        const qr = await fetch("http://localhost:3500/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text.value })
        })
        location.reload();
    }
    else {
        alert("Please enter text");
    }
})