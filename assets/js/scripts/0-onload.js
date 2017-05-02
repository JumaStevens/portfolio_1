// window onload
var onload = {
	start_time: false,
	load: false,

	// initialize
	init: function() {
		onload.start_time = performance.now();
		onload.event_listener();
	},

	// handle onload event
	handler: function() {
		// screen
		screen.init();
		// scroll
		scroll.init();
		// menu
		menu.init();
		// contact-form
		contact_form.button_listener();
		// complete call afer min time elapse 
		setTimeout(function() {
			onload.complete();
		}, 1000 - onload.start_time);
	},

	// load complete
	complete: function() {
		if(onload.load) {
			loader.handler(true);
			media_query.handler();
		}
		else if(!onload.load) {
			setTimeout(function() {
				onload.complete();
			}, 250);
		}
	},

	// window event listener
	event_listener: function() {
		window.addEventListener('load', function load() {
			onload.handler();
			window.removeEventListener('load', load, false);
		}, false);
	}
};

// call
onload.init();
