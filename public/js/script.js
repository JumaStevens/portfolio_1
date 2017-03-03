//SCROLLING
var scroll = {
	//document scroll position
	position: 0,

	//throttle ticker
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
		//vendor prefixes
		const vendor = ["-webkit-", "-moz-", "-ms-", "-o-", ""];
		
		//scroll position trigger point
		if(scroll.position < 50) {
			//set styles (with vendor prefixes)
			for(let i=0;i<vendor.length;i++) {
				//transform
				heading.style[vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				home_color.style[vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				article_body.style[vendor[i] + "transform"] = "translate(0, 50%) scale(1)";
				article_blocker.style[vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				scrolldown.style[vendor[i] + "transform"] = "translate(0, 0) scale(1) rotate(-90deg)"; 
			}
			//padding
			article_line.style.padding = 0;
			//opacity
			article_heading.style.opacity = 0;
			scrolldown.style.opacity = 1;
		}
		//scroll position trigger point
		if(scroll.position >= 50) {
			//set styles (with vendor prefixes)
			for(let i=0;i<vendor.length;i++) {
				//transform
				heading.style[vendor[i] + "transform"] = "translate(100%, 0) scale(1)";
				home_color.style[vendor[i] + "transform"] = "translate(100%, 0) scale(1)";
				article_body.style[vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				article_blocker.style[vendor[i] + "transform"] = "translate(0, 100%) scale(1)";
				scrolldown.style[vendor[i] + "transform"] = "translate(0, 100%) scale(1) rotate(-90deg)";
			}
			//padding
			article_line.style.padding = "0.05em 0.5em";
			//opacity
			article_heading.style.opacity = 1;
			scrolldown.style.opacity = 0;
		}


	},


	//add event listener
	event_listener: function() {
		window.addEventListener("scroll", function(e) {
			console.log("test");
			//set scroll position
			scroll.position = window.pageYOffset || document.documentElement.scrollTop;
			
			if (!scroll.ticking) {
			    window.requestAnimationFrame(function() {
			   		scroll.intro();
			    	
			    	scroll.ticking = false;
				});
			}
				scroll.ticking = true;

			
		}, false);
	}




};

scroll.event_listener();