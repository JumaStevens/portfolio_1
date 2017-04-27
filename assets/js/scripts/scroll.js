var scroll = {
	// scroll position (top)
	position: 0,
	// intro throttle
	throttle: false,

	// initialize
	init: function() {
		scroll.event_listener();
	},

	// route events
	router: function() {
		// key: screen.bio[0] === top position
		// key: screen.bio[1] === bottom position
		let y = scroll.position;

		// route home
		if(y < screen.bio[0]) {
			scroll.home(y);
		}
		// route bio
		if(y + screen.height >= screen.bio[0] && y < screen.bio[1]) {
			scroll.bio(y);
		}
		// route portfolio
		if(y + screen.height >= screen.portfolio[0] && y < screen.portfolio[1]) {
			scroll.portfolio(y);
		}

	},

	// handle home events
	home: function(y) {
		let trigger = screen.height*.2;
		const title = document.getElementsByClassName('home-title')[0];
		const color = document.getElementsByClassName('home-color')[0];
		const article = [
			document.getElementsByClassName('home-article__header-line')[0],
			document.getElementsByClassName('home-article__header-copy')[0],
			document.getElementsByClassName('home-article__content-copy')[0],
			document.getElementsByClassName('home-article__content-copy')[1]];

		if(y < trigger) {
			title.classList.remove('hide');
			color.classList.remove('hide');
			for(let i=0;i<article.length;i++) {
				article[i].classList.add('hide');
			}
		}
		else if(y >= trigger) {
			title.classList.add('hide');
			color.classList.add('hide');
			for(let i=0;i<article.length;i++) {
				article[i].classList.remove('hide');
			}
		}
	},

	// handle bio events
	bio: function(y) {

	},

	// handle portfolio events
	portfolio: function(y) {
		const article = document.getElementsByClassName('portfolio-article');
		const composite = document.getElementsByClassName('portfolio-composite');
		// 
		for(let i=0;i<article.length;i++) {
			// key: composite_middle = port.top + comp.top + (comp.bottom - comp.top)/2
			let composite_middle = screen.portfolio[0] + screen.composite[i][0] + ((screen.composite[i][1] - screen.composite[i][0])/2);
			let range = (screen.composite[i][1] - screen.composite[i][0]) *.25; // 25% from the middle
			let range_top = composite_middle - range; 
			let range_bottom = composite_middle + range;
			let y_middle = y + screen.height/2;
			// check range
			if(y_middle >= range_top && y_middle <= range_bottom) {
				// remove hide
				composite[i].classList.remove('hide');
				for(let j=0;j<article[i].children.length;j++) {
					article[i].children[j].classList.remove('hide');
				}
			}
			else {
				composite[i].classList.add('hide');
				for(let j=0;j<article[i].children.length;j++) {
					article[i].children[j].classList.add('hide');
				}
			}
		}




	},

	// add listener
	event_listener: function() {
		window.addEventListener('scroll', function() {
			// throttle
			if(!scroll.throttle) {
			    window.requestAnimationFrame(function() {
			    	// addition timeout (boost performance)
			    	setTimeout(function() {
						scroll.position = window.pageYOffset || document.documentElement.scrollTop;
				    	scroll.throttle = false;
				   		scroll.router();
				   	}, 30);
				});
			}
			scroll.throttle = true;
		}, false);
	}
};