const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || process.env.VCAP_APP_PORT || 3030;

//if deployed to cloud instance, root path should server the react build
app.use("/", express.static("./public/"));
app.get("/*", function (req, res) {
    res.set("Cache-Control", "private, max-age=0");
    res.sendFile(path.join(__dirname, "./public/index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
app.listen(port, function () {
    console.info("Listening on port %d", port);
});