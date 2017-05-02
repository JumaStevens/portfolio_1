const express = require('express');
const app = express();




// home route
app.use(require('./routes/index.js'));
// about route
app.use(require('./routes/about'));
// contact form route
app.use(require('./routes/contact_form'));
// work example route
app.use(require('./routes/example_0'));
// work example route
app.use(require('./routes/example_1'));


// pointer to assets
app.use(express.static('assets'));


// set server port
var port = process.env.PORT || 8080;
// start server
app.listen(port, function() {
	console.log('Server is now listening!');
});