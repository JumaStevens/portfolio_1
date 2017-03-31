const express = require('express');
const router = express.Router();
const path = require('path');

//view at http://localhost:8080 || www.jumastevens.com
router.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/../views/main/index.html"));
});

module.exports = router;