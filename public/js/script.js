//WINDOW.ONLOAD
window.onload = function() {
	//screen init
	screen.resize();
	//scroll init
	scroll.event_listener();
};






//SCROLLING
var scroll = {
	//scroller position (Top)
	position: 0,
	//vendor prefixes
	vendor: ["-webkit-", "-moz-", "-ms-", "-o-", ""],

	//intro throttle
	ticking: false,

	//intro action
	intro: function() {
		//hooks
		const heading = document.getElementsByClassName("intro-heading")[0];
		const home_color = document.getElementsByClassName("page__home-color")[0];
		const article_body = document.getElementsByClassName("intro-article__body")[0];
		const article_blocker = document.getElementsByClassName("intro-article__body-blocker")[0];
		const article_line = document.getElementsByClassName("intro-article__heading-line")[0];
		const article_heading = document.getElementsByClassName("intro-article__heading-text")[0];
		const scrolldown = document.getElementsByClassName("intro-scrolldown")[0];
		
		//scroll position trigger point
		if(scroll.position < 50) {
			//set styles (with vendor prefixes)
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				heading.style[scroll.vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				home_color.style[scroll.vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				article_body.style[scroll.vendor[i] + "transform"] = "translate(0, 50%) scale(1)";
				article_blocker.style[scroll.vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				scrolldown.style[scroll.vendor[i] + "transform"] = "translate(0, 0) scale(1) rotate(-90deg)"; 
			}
			//padding
			article_line.style.padding = 0;
			//opacity
			article_heading.style.opacity = 0;
			scrolldown.style.opacity = 1;
		}
		//scroll position trigger point
		else if((scroll.position >= 50) && (scroll.position <= screen.height)) {
			//set styles (with vendor prefixes)
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				heading.style[scroll.vendor[i] + "transform"] = "translate(100%, 0) scale(1)";
				home_color.style[scroll.vendor[i] + "transform"] = "translate(100%, 0) scale(1)";
				article_body.style[scroll.vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				article_blocker.style[scroll.vendor[i] + "transform"] = "translate(0, 100%) scale(1)";
				scrolldown.style[scroll.vendor[i] + "transform"] = "translate(0, 100%) scale(1) rotate(-90deg)";
			}
			//padding
			article_line.style.padding = "0.05em 0.5em";
			//opacity
			article_heading.style.opacity = 1;
			scrolldown.style.opacity = 0;
		}
	},


	//parallax effect
	parallax: function() {
		//hooks
		const home = document.getElementsByClassName("page__home")[0];
		const transition = document.getElementsByClassName("page__transition")[0];
		const gap = document.getElementsByClassName("gap-space")[0];
		//scroll speed
		const speed = [0.5, 1];

		//home translate Y offset formula
		let home_y_offset = (transition.offsetTop - screen.height - scroll.position) * speed[0];
		//transition translate Y offset formula
		let transition_y_offset = (screen.height * 1.5/* gap space initial height */ - scroll.position) * speed[0];
		console.log(screen.height);
		console.log("scroll "+scroll.position);
		console.log("g"+transition_y_offset);
		//scroll position trigger point
		if((scroll.position >= transition.offsetTop - screen.height) && (scroll.position <= transition.offsetTop)) {
			//set home page style
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				home.style[scroll.vendor[i] + "transform"] = "translate(0,"+ home_y_offset + "px" +") scale(1)";
			}
		}
		//scroll position trigger point
		if(scroll.position >= transition.offsetTop) {
			transition.style.position = "fixed";
			
			gap.style.height = 250 + "vh";
			//set home page style
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				transition.style[scroll.vendor[i] + "transform"] = "translate(0,"+ transition_y_offset + "px" +") scale(1)";
			}
		}


	

	},



	//event listener
	event_listener: function() {
		//window.scroll event listener
		window.addEventListener("scroll", function(e) {
			//set scroll position
			scroll.position = window.pageYOffset || document.documentElement.scrollTop;
			//throttle
			if (!scroll.ticking) {
			    window.requestAnimationFrame(function() {
			    	//calls
			   		scroll.intro();
			   		scroll.parallax();
			    	//throttle ticker
			    	scroll.ticking = false;
				});
			}
				//throttle ticker
				scroll.ticking = true;
		}, false);
	}




};




//SCREEN DEMINSIONS
var screen = {
	//screen inner height
	height: 0,

	//find screen height
	getHeight: function () {
		//find height
		const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		//set height
		screen.height = height;
	},

	//screen resize handler (debounced)
	resize: function () {
		let timeout = false; // holder for timeout id
	    const delay = 250; // delay after event is "complete" to call function

		// window.resize event listener
		window.addEventListener('resize', function() {
			// clear the timeout
			clearTimeout(timeout);
			// start timing for event "completion"
			timeout = setTimeout(screen.getHeight, delay);
		});
		//call function
		screen.getHeight();
	}




/*	throttle
	//screen resize handler
	resize: function () {
		const delay = 250; //delay between calls
	    let throttled = false; //are we currently throttled?

		//window.resize event listener
		window.addEventListener('resize', function() {
		    //only run if we're not throttled
			if (!throttled) {
		    	//actual callback action
		    	screen.getHeight();
		    	//we're throttled!
		    	throttled = true;
		    	//set a timeout to un-throttle
		    	console.log(screen.height);
		    	setTimeout(function() {
		    		throttled = false;
		    	}, delay);
			}	  
		}, false);
		//call function
		screen.getHeight();
		console.log(screen.height);
	}
*/

};


















