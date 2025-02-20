const express = require("express");

const qrcode = require("qrcode");

const cors = require("cors");

const exp = express();

exp.use(cors());
exp.use(express.json());


exp.post("/generate", async (req, resp) => {
    const text = req.body.text;
    if (!text) {
        resp.status(400).send("Please enter the text");
    }
    else {
        try {
            qrcode.toFile("qrcode.svg", text, (err) => {
                if (err) {
                    resp.send("Error in generating the qr code");
                    console.log("Error in generating the qr code");
                }
                else {
                    resp.send("qr code created");
                    console.log("qr created");
                }
            });
        }
        catch (errr) {
            resp.send("Error in generating the qrcode");
        }
    }
});

exp.listen(3500, () => {
    console.log("Server is running");
})