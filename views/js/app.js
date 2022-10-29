require("dotenv").config();

codedUrl1 = encodeURIComponent(`http://localhost:${process.env.PORT}${process.env.GAMES_SECRET}}`)
codedUrl2 = encodeURIComponent(`http://localhost:${process.env.PORT}${process.env.COMP_SECRET}}`)
codedUrl3 = encodeURIComponent(`http://localhost:${process.env.PORT}${process.env.SWAG_SECRET}}`)


document.getElementById("games-btn").onclick = function () {
    location.href =   `${codedUrl1}}`;
};
document.getElementById("comp-btn").onclick = function () {
    location.href = `${codedUrl2}}`;
};
document.getElementById("swag-btn").onclick = function () {
    location.href = `${codedUrl3}}`;
};
