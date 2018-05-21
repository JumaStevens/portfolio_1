const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');

// handle translation requests
router.post('/translate', function(req, res) {
	const api_key = process.env.YANDEX_API_KEY;
	const lang = 'en-fr';
	let text = req.body.text;
	let data = '?' + 'key='+api_key + '&lang='+lang + '&text='+text;
	const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

	// handle Yandex API call
	request.post(url+data, function(error, response, body) {
		console.log('error: ', error);
		console.log('status code: ', response && response.statusCode);
		console.log('body: ', body);
		let translation = {text: JSON.parse(body).text[0]};
		res.json(translation);
	});
});

module.exports = router;