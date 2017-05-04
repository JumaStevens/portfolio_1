const express = require('express');
const router = express.Router();
const path = require('path');


// handle about me page request
router.get('/example_0', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/example_0/index.html'));
});

module.exports = router;