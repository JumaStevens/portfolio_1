var screen = {
	width: false,
	height: false,
	bio: ['top','bottom'],
	portfolio: ['top', 'bottom'],
	composite: ['top', 'bottom'],

	// initialize
	init: function() {
		screen.dimensions();
		screen.handler();
		screen.resize();
	},

	// get screen width & height
	dimensions: function() {
		screen.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		screen.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	},

	// set elements position
	handler: function() {
		const bio = document.getElementsByClassName('bio')[0];
		const portfolio = document.getElementsByClassName('portfolio')[0];
		const composite = document.getElementsByClassName('portfolio-composite-container');
		
		// bio
		screen.bio[0] = bio.offsetTop;
		screen.bio[1] = screen.bio[0] + bio.offsetHeight;
		// portfolio
		screen.portfolio[0] = portfolio.offsetTop;
		screen.portfolio[1] = screen.portfolio[0] + portfolio.offsetHeight;
		// portfolio composite container
		screen.composite = []; // clear array
		for(let i=0;i<composite.length;i++) { // -- TEST LATER -- i think it runs once too many
			screen.composite.push(['top', 'bottom']);
			screen.composite[i][0] = composite[i].offsetTop;
			screen.composite[i][1] = composite[i].offsetTop + composite[i].offsetHeight;
		}
	},

	// screen resize (debounced)
	resize: function () {
		let timeout = false; // holder for timeout id
	    const delay = 250; // delay after event is "complete" to call function

		window.addEventListener('resize', function() {
			clearTimeout(timeout);
			// start timing for event "completion"
			timeout = setTimeout(function() {
				screen.dimensions();
				screen.handler();
				media_query.init();
			}, delay);
		});
	}
};