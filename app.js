var express = require("express");
var app = express();
var path = require("path")
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname)));
app.set('view engine', 'ejs');

var isKargo = true;
var isTiklaGelsin = true;
var loggedIn = false;
var isCokSatanlar = false;
var isYeniGelenler = false;
var isFirsatUrunleri = true;
app.get("/", (req, res) => {
    res.render("main", {
        isKargo: isKargo,
        isTiklaGelsin: isTiklaGelsin,
        loggedIn: loggedIn,
        isCokSatanlar: isCokSatanlar,
        isYeniGelenler: isYeniGelenler,
        isFirsatUrunleri: isFirsatUrunleri
    })
})

app.post("/post", function (req, res) {
    res.redirect('back');
    if (req.body.kargo === true) {
        isKargo = true;
        isTiklaGelsin = false;

    } else if (req.body.tiklaGelsin === true) {
        isTiklaGelsin = true;
        isKargo = false;

    } else {
        if (req.body.data) {
            let type = req.body.data;
            if (type === "cokSatanlar") {
                isYeniGelenler = false;
                isCokSatanlar = true;
                isFirsatUrunleri = false;
            } else if (type === "yeniGelenler") {
                isYeniGelenler = true;
                isCokSatanlar = false;
                isFirsatUrunleri = false;
            } else if (type === "firsatUrunleri") {
                isYeniGelenler = false;
                isCokSatanlar = false;
                isFirsatUrunleri = true;
            } else return;
        } else return;
    }
})



app.listen(80);
