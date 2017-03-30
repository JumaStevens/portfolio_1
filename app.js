const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const validator = require('validator');
//'use strict';
const nodemailer = require('nodemailer');

//parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set the port of application
var port = process.env.PORT || 8080;


//view at http://localhost:8080
app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

//handle about me page request
app.get("/about", function(req, res) {
	res.sendFile(path.join(__dirname + "/about.html"));

});


//handle contact form submission
app.post("/contact_form", function(req, res) {

	//honeypot (spam checker)
	if(!validator.isEmpty(req.body.company)) {
		res.json({ msg: "spam detection" });
	} else {
		//validate and process request
		if( validator.isEmail(req.body.email)
/*			&& (validator.isAlpha(req.body.name) || validator.isEmpty(req.body.name))       //can't use multi names//
			&& (validator.isAlpha(req.body.message) || validator.isEmpty(req.body.message)) */ ) {

			//create reusable transporter object using the default SMTP transport
			let transporter = nodemailer.createTransport({
			    service: 'gmail',
			    auth: {
			        user: 'jumastevens.contact@gmail.com',
			        pass: process.env.GMAIL_PASS
			    }
			});

			//setup email data with unicode symbols
			let mailOptions = {
			    from: '"'+ req.body.name +' 💰" <jumastevens.contact@gmail.com>', // sender address
			    to: 'jumastevens@gmail.com', // list of receivers
			    subject: 'Contact Form Sub.', // Subject line
			    html: '<ul><li>From: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>'+req.body.message+'</li></ul>' // html body
			};

			//send mail with defined transport object
			transporter.sendMail(mailOptions, (error, info) => {
			    if (error) {
			        res.json({ msg: error });
			    } else {
			    	res.json({ msg: "success" });
			    }
			});


		} else {
			res.json( { msg: "invalid form field"} );
		}
	}



});


app.use(express.static("public"));


app.listen(port, function () {
	console.log("now listening on port 8080!");
});