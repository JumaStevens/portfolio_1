const express = require("express");
const app = express();
const path = require("path");

//set the port of application
var port = process.env.PORT || 8080;


//viewed at http://localhost:3000
app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(express.static("public"));

app.listen(port, function () {
	console.log("now listening on port 8080!");
});