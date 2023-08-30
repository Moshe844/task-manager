const express = require("express");
const os = require("os");
const fs = require("fs");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log("Received a request at:", new Date().toLocaleString());

    const username = os.userInfo().username;
    console.log("Username fetched:", username);

    fs.readFile("task.html", "utf8", (err, htmlContent) => {
        if (err) {
            console.error("Error reading Task.html:", err);
            res.status(500).send("Internal Server error");
            return;
        }

        const modifiedHtml = htmlContent.replace(
            '<span id="taskCreator"></span>',
            '<span id="taskCreator">' + username + '</span>'
        );

        console.log("Sending modified HTML with username:", username);
        res.send(modifiedHtml);
    });
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});