//Begin Initialization
window.onload = function() {
	orientation.initialize();
};



//ORIENTATION
var orientation = {
	screenWidth: "",
	screenHeight: "",
	timeout: "",
	
	//initialize call
	initialize: function() {
		//initial index handler
		navigation.indexHandler("initialize");
		//initial check
		this.check();
		//event listeners
		window.addEventListener("resize", function() {
			//navigation style
			navigation.nav.style.display = "none";
			navigation.nav.style.opacity = 0;
			//clear the timeout
			clearTimeout(orientation.timeout);
			//start the timing for event completion
			orientation.timeout = setTimeout(function() {
				//delete navigation elements
				if(navigation.nav.firstChild != null) {
					navigation.deleteElements();
				}
				//navigation style
				navigation.nav.style.display = "flex";
				navigation.nav.style.opacity = 1;
				//call check
				orientation.check();
			}, 2000);	
		}, false);
	},

	//orientation check
	check: function() {
		//pages
		const section = document.getElementsByTagName("section");
		const orientationPage = document.getElementById("orientation");
		
		//calculate screen width/height
		orientation.screenWidth = window.innerWidth;
		orientation.screenHeight = window.innerHeight;

		//dimension check & implement changes
		if(orientation.screenWidth < orientation.screenHeight) {
			for(let i=0;i<section.length;i++) {
				section[i].style.display = "none";
			}
			if(navigation.nav.firstChild != null) {
				navigation.deleteElements();
			}
			orientationPage.style.display = "flex";			
		} else {
			for(let i=0;i<section.length;i++) {
				section[i].style.display = "flex";
			}
			if(navigation.nav.firstChild == null) {
				navigation.createElements();
			}
			orientationPage.style.display = "none";
		}
	}
};



//NAVIGATION
var navigation = {
	//main navigation unit
	nav: document.getElementById("nav"),
	//menu values
	about: "about",
	journal: "journal",
	color: "white",
	//menu visibility
	visibility: ["visible", "hidden", "visible", "visible", "hidden"],
	//scrolling index
	index: [0, 0],
	indexHolder: [[1,0],[1,0]],
	//scrolling position
	scrollPosition: 0,
	mousedownPosition: 0,
	scrollPositionHolder: [0,0],



	//create navigation elements
	createElements: function() {
		//navigation menu items
		const elements = [[this.about, 0, 2], ["Juma Stevens", 2, 0], [this.journal, 1, 2], ["VIEW PORTFOLIO", 2, 1]];

		//create menu elements
		for(let i=0;i<elements.length;i++) {
			//create child node
			const node = document.createElement("a");
			//assign ID
			node.id = "nav"+i;
			//create innerHTML value
			node.innerHTML = elements[i][0];
			//append node to Nav
			nav.appendChild(node);
			//position node
			node.style.left = (orientation.screenWidth - node.clientWidth) / elements[i][1] + "px";
			node.style.top = (orientation.screenHeight - node.clientHeight) / elements[i][2] + "px";
			//style node
			node.style.color = this.color;
			//visibility
			node.style.visibility = this.visibility[i];
		}

		//create scroll elements
		if(orientation.screenWidth > 1000) {
			//create scroll bar div
			const scrollBar = document.createElement("div");
			//assign ID
			scrollBar.id = "scrollBar";
			//scroll bar width & height
			scrollBar.style.width = orientation.screenWidth/15 + "px";
			scrollBar.style.height = orientation.screenHeight/2 + "px";
			//append scroll bar to Nav
			nav.appendChild(scrollBar);
			//position scroll bar
			scrollBar.style.left = orientation.screenWidth + "px";
			scrollBar.style.top = (orientation.screenHeight - scrollBar.clientHeight) / 2 + "px";
			//visibility
			scrollBar.style.visibility = this.visibility[4];

			//create scroll line
			const line = document.createElement("canvas");
			line.width = scrollBar.clientWidth;
			line.height = scrollBar.clientHeight;
			line.id = "scrollLine";
			scrollBar.appendChild(line);
			//draw scroll line
			const ctxLine = line.getContext("2d");
			ctxLine.beginPath();
			ctxLine.moveTo(line.width/2, 0);
			ctxLine.lineTo(line.width/2, line.height);
			ctxLine.lineWidth = 1;
			ctxLine.strokeStyle = this.color;
			ctxLine.stroke();

			//create scroll head div
			const scrollHead = document.createElement("div");
			//assign ID
			scrollHead.id = "scrollHead";
			//scroll head width & height
			scrollHead.style.width = line.width + "px";
			scrollHead.style.height = line.width + "px";
			//scroll head position
			scrollHead.style.top = navigation.scrollPosition + "px";
			//scroll head background color
			if(navigation.color === "white") {
				scrollHead.style.backgroundColor = "black";
			} else {
				scrollHead.style.backgroundColor = "white";
			}
			//append scroll head to scroll bar
			scrollBar.appendChild(scrollHead);

			//create scroll head indexes
			for(let i=0;i<2;i++) {
				const index = document.createElement("p");
				//assign ID
				index.id = "index"+i;
				//assign value
				index.innerHTML = this.index[i];
				//style
				index.style.color = this.color;
				//append index to scroll head
				scrollHead.appendChild(index);
			}

			//create scroll dash
			const dash = document.createElement("canvas");
			dash.width = line.width/4;
			dash.height = dash.width;
			dash.id = "scrollDash";
			scrollHead.appendChild(dash);
			//position dash
			dash.style.left = (line.width - dash.width) / 2 + "px";
			dash.style.top = (scrollHead.clientHeight - dash.height) / 2 + "px";
			//draw scroll dash
			const ctxDash = dash.getContext("2d");
			ctxDash.beginPath();
			ctxDash.moveTo(0, dash.height/2);
			ctxDash.lineTo(dash.width, dash.height/2);
			ctxDash.lineWidth = ctxLine.lineWidth
			ctxDash.strokeStyle = this.color;
			ctxDash.stroke();

			//create scroll arrows
			for(let i=0;i<2;i++) {
			const scrollArrow = document.createElement("canvas");
			scrollArrow.width = 8;
			scrollArrow.height = scrollArrow.width;
			scrollArrow.id = "scrollArrow"+i;
			scrollHead.appendChild(scrollArrow);
			//position arrow
			scrollArrow.style.left = (line.width - scrollArrow.width) / 2 + "px";
			//draw scroll arrow
			const ctxScrollArrow = scrollArrow.getContext("2d");
			ctxScrollArrow.beginPath();
			ctxScrollArrow.moveTo(0, scrollArrow.height);
			ctxScrollArrow.lineTo(scrollArrow.width/2, 0);
			ctxScrollArrow.lineTo(scrollArrow.width, scrollArrow.height);
			ctxScrollArrow.lineWidth = ctxLine.lineWidth;
			ctxScrollArrow.strokeStyle = this.color;
			ctxScrollArrow.stroke();
			}

			//call scrollHead
			this.scrollHead("initialize");
			//turn on scroll head event listener
			this.eventListeners("add", "scrollHead");
		}
		//turn on menu event listener
		this.eventListeners("add", "menu");
	},




	//scroll head controller
	scrollHead: function(value) {
		//IDs
		const index0 = document.getElementById("index0");
		const index1 = document.getElementById("index1");
		const scrollDash = document.getElementById("scrollDash");
		const arrow0 = document.getElementById("scrollArrow0");
		const arrow1 = document.getElementById("scrollArrow1");
		
		//initialize scroll head children positions
		if(value === "initialize") {
			//index positions
			index0.style.left = (scrollHead.clientWidth - index0.clientWidth) * .20 + "px";
			index0.style.top = (scrollHead.clientHeight - index0.clientHeight) * .20 + "px";
			index1.style.left = (scrollHead.clientWidth - index0.clientWidth) * .80 + "px";
			index1.style.top = (scrollHead.clientHeight - index0.clientHeight) * .80 + "px";
			//dash position
			scrollDash.style.transform = "rotate(-45deg)";
			//arrow positions
			arrow0.style.top = (scrollHead.clientHeight - arrow0.clientHeight) * .25 + "px";
			arrow1.style.top = (scrollHead.clientHeight - arrow1.clientHeight) * .75 + "px";
			//arrow style
			arrow0.style.opacity = 0;
			arrow1.style.opacity = 0;
		}

		//begin animation
		else if(value.type === "mousedown" || value.type === "mouseenter") {
			//set scroll head children positions
			index0.style.top = (scrollHead.clientHeight - index0.clientHeight) / 2 + "px";
			index1.style.top = (scrollHead.clientHeight - index1.clientHeight) / 2 + "px";
			scrollDash.style.transform = "rotate(180deg)";
			arrow0.style.top = 0 + "px";
			arrow1.style.top = (scrollHead.clientHeight - arrow1.clientHeight) + "px";
			arrow0.style.opacity = "1";
			arrow1.style.opacity = "1";
			//engage
			if(value.type === "mousedown") {
				//add event listener for slider()
				scrollHead.addEventListener("mousemove", navigation.scrollHead, false);
				//set mousedown position
				navigation.mousedownPosition = value.clientY;
				//remove transition property
				scrollHead.style.transitionProperty = "none";
				//set portfolio figure scrolling behavior
				portFigure.scrollHandler(value.type);
			}
		}

		//end animation
		else if(value.type === "mouseup" || value.type === "mouseleave") {
			//reset scroll head children positions
			navigation.scrollHead("initialize");
			//disengage
			//remove event listener for slider()
			scrollHead.removeEventListener("mousemove", navigation.scrollHead, false);
			//adjust scrollPosition
			navigation.scrollPosition = (scrollBar.clientHeight - scrollHead.clientHeight) /
			navigation.index[1] * (navigation.index[0] - 1);
			//set transition property
			scrollHead.style.transitionProperty = "top";
			//set scroll head position
			scrollHead.style.top = navigation.scrollPosition + "px";
			//update indexHolder
			navigation.indexHandler("update");
			//update ulPosition
			navigation.ulPosition("transition");
			//set portfolio figure scrolling behavior
			portFigure.scrollHandler(value.type);	
		}

		//scrolling position & adjust index[0] value
		else if(value.type === "mousemove") {
			//value of scrolling movement
			const increment = value.clientY - navigation.mousedownPosition;

			//condition for scrolling range
			if((increment < 0 && navigation.scrollPosition > 0) ||
				(increment > 0 && navigation.scrollPosition < scrollBar.clientHeight - scrollHead.clientHeight)) {			
				//adjust scrollPosition
				navigation.scrollPosition += increment;
				//adjust mousedownPosition
				navigation.mousedownPosition = value.clientY;
				//set scroll head position
				scrollHead.style.top = navigation.scrollPosition + "px";

				//set index[0] value
				for(let i=0;i<navigation.index[1];i++) {
					//condition for index range 
					if(navigation.scrollPosition > (scrollBar.clientHeight - scrollHead.clientHeight)/navigation.index[1]*i &&
						navigation.scrollPosition < (scrollBar.clientHeight - scrollHead.clientHeight)/navigation.index[1]*(i+1)) {					
						//adjust index[0] value
						navigation.index[0] = i + 1;
						index0.innerHTML = navigation.index[0];
					}
				}
				//update ulPosition
				navigation.ulPosition();
			}
		}
	},



	//delete navigation elements
	deleteElements: function() {
		//remove event listeners
		navigation.eventListeners("remove", "menu");
		//check for scroll bar
		if(nav.childNodes.length > 4) {
			navigation.eventListeners("remove", "scrollHead");
		}
		//remove nav child nodes
		while(nav.firstChild) {
			nav.removeChild(nav.firstChild);
		}
	},



	//menu navigation
	menu: function(value) {
		//sections
		const about = document.getElementById("about");
		const home = document.getElementById("home");
		const journal = document.getElementById("journal");
		const portfolio = document.getElementById("portfolio");

		//apply menu changes
		if(this.id === "nav0") {
			//toggle between "about" & "close"
			if(navigation.about === "about") {
				//set about
				navigation.about = "close";
				//style section
				about.style.left = 0 + "vw";
				about.style.zIndex = 6;
				//reset journal
				navigation.journal = "journal";
				//reset journal section
				journal.style.left = 100 + "vw";
				journal.style.zIndex = 5;
			} else {
				//set about
				navigation.about = "about";
				//style section
				about.style.left = -100 + "vw";
				about.style.zIndex = 5;
			}
		}
		else if(this.id === "nav1") {
			//style section
			home.style.top = 0 + "vh";
			home.style.zIndex = 2;
			//reset about & journal
			navigation.about = "about";
			navigation.journal = "journal";
			//reset sections
			about.style.left = -100 + "vw";
			about.style.zIndex = 5;
			journal.style.left = 100 + "vw";
			journal.style.zIndex = 5;
			portfolio.style.top = 100 + "vh";
			portfolio.style.zIndex = 1;
		}
		else if(this.id === "nav2") {
			//toggle between "journal" & "close"
			if(navigation.journal === "journal") {
				//set journal
				navigation.journal = "close";
				//style section
				journal.style.left = 0 + "vw";
				journal.style.zIndex = 6;
				//reset about
				navigation.about = "about";
				//reset about section
				about.style.left = -100 + "vw";
				about.style.zIndex = 5;
			} else {
				//set journal
				navigation.journal = "journal";
				//style section
				journal.style.left = 100 + "vw";
				journal.style.zIndex = 5;
			}
		}
		else if(this.id === "nav3") {
			//style section
			portfolio.style.top = 0 + "vh";
			portfolio.style.zIndex = 2;
			//reset home section
			home.style.top = -100 + "vh";
			home.style.zIndex = 1;
		}	

		//current page
		if(window.getComputedStyle(about).getPropertyValue("Z-Index") === "6") {
			//set menu items
			navigation.visibility[1] = "initial";
			navigation.visibility[3] = "hidden";
			navigation.visibility[4] = "hidden";
			//color
			navigation.color = "white";
		} else if(window.getComputedStyle(journal).getPropertyValue("Z-Index") === "6") {
			//set menu items
			navigation.visibility[1] = "initial";
			navigation.visibility[3] = "hidden";
			navigation.visibility[4] = "initial";
			//color
			navigation.color = "black";
			//set index & scroll position
			navigation.indexHandler("set");
		} else if(window.getComputedStyle(home).getPropertyValue("Z-Index") === "2") {
			//set menu items
			navigation.visibility[1] = "hidden";
			navigation.visibility[3] = "initial";
			navigation.visibility[4] = "hidden";
			//color
			navigation.color = "white";
		} else if(window.getComputedStyle(portfolio).getPropertyValue("Z-Index") === "2") {
			//set menu items
			navigation.visibility[1] = "initial";
			navigation.visibility[3] = "hidden";
			navigation.visibility[4] = "initial";
			//color
			navigation.color = "white";
			//set index & scroll position
			navigation.indexHandler("set");
			//initialize portfolio figures
			portFigure.initialize();
		}

		//implement changes
		navigation.deleteElements();
		navigation.createElements();
	},



	//index handler
	indexHandler: function(value) {
		const portfolioUl = document.getElementById("portfolioUl");
		const journalUl = document.getElementById("journalUl");

		//initialize indexHolder values
		if(value === "initialize") {
			//calculate portfolio li amount
			for(let i=0;i<portfolioUl.childNodes.length;i++) {
				//find li(s)
				if(portfolioUl.childNodes[i].nodeName === "LI") {
					//update portfolio indexHolder
					navigation.indexHolder[0][1] += 1; 
				}
			}
			//calculate journal li amount
			for(let i=0;i<journalUl.childNodes.length;i++) {
				//find li(s)
				if(journalUl.childNodes[i].nodeName === "LI") {
					//update journal indexHolder
					navigation.indexHolder[1][1] += 1; 
				}
			}
		}
		//set index & scroll position
		else if(value === "set") {
			//portfolio index & scroll postion
			if(navigation.journal === "journal") {
				navigation.index = navigation.indexHolder[0];
				navigation.scrollPosition = navigation.scrollPositionHolder[0];
			}
			//journal index & scroll position
			else if(navigation.journal === "close") {
				navigation.index = navigation.indexHolder[1];
				navigation.scrollPosition = navigation.scrollPositionHolder[1];
			}
		}
		//update indexHolder & scrollPositionHolder values
		else if(value === "update") {
			//update indexHolder[0] & scrollPostionHolder[0]
			if(navigation.journal === "journal") {
				navigation.indexHolder[0] = navigation.index;
				navigation.scrollPositionHolder[0] = navigation.scrollPosition;
			}
			//update indexHolder[1] & scrollPostionHolder[1]
			else if(navigation.journal === "close") {
				navigation.indexHolder[1] = navigation.index;
				navigation.scrollPositionHolder[1] = navigation.scrollPosition;
			}
		}
	},



	//section ul position
	ulPosition: function(value) {
		//ul container
		let ul;

		//set ul
		if(navigation.journal === "journal") {
			ul = portfolioUl;
		} else if(navigation.journal === "close") {
			ul = journalUl;
		}
		//ul transition property + nav1 opacity
		if(value === "transition") {
			ul.style.transitionProperty = "top";
			//nav1 opacity
			nav1.style.opacity = 1;
		} else {
			ul.style.transitionProperty = "none";
			//nav1 opacity
			nav1.style.opacity = 0;
		}
		//set ul position
		ul.style.top = ((navigation.scrollPosition * (100 * navigation.index[1])) /
						(scrollBar.clientHeight - scrollHead.clientHeight)) * -1 + "vh";
	},



	//toggle ON or OFF event listeners
	eventListeners: function(addRemove, type) {
		//add or remove menu events
		if(addRemove === "add" && type === "menu") {
			nav0.addEventListener("mousedown", this.menu, false);
			nav1.addEventListener("mousedown", this.menu, false);
			nav2.addEventListener("mousedown", this.menu, false);
			nav3.addEventListener("mousedown", this.menu, false);
		} else if (addRemove === "remove" && type === "menu") {
			nav0.removeEventListener("mousedown", this.menu, false);
			nav1.removeEventListener("mousedown", this.menu, false);
			nav2.removeEventListener("mousedown", this.menu, false);
			nav3.removeEventListener("mousedown", this.menu, false);
		}
		//add or remove scroll head events
		else if(addRemove === "add" && type === "scrollHead") {
			scrollHead.addEventListener("mousedown", this.scrollHead, false);
			scrollHead.addEventListener("mouseup", this.scrollHead, false);
			scrollHead.addEventListener("mouseenter", this.scrollHead, false);
			scrollHead.addEventListener("mouseleave", this.scrollHead, false);
		} else if (addRemove === "remove" && type === "scrollHead") {
			scrollHead.removeEventListener("mousedown", this.scrollHead, false);
			scrollHead.removeEventListener("mouseup", this.scrollHead, false);
			scrollHead.removeEventListener("mouseenter", this.scrollHead, false);
			scrollHead.removeEventListener("mouseleave", this.scrollHead, false);
		}
	}
};




//FIGURES
var portFigure = {
	//portfolio figure
	fig: document.getElementById("portfolio").getElementsByTagName("figure"),
	//info tag
	infoTag: "Info",

	//
	initialize: function(value) {
		const allFigures = document.getElementById("portfolio").getElementsByTagName("figure");
		
		//check if info tag is present
		if(portFigure.fig[(navigation.index[0])-1].getElementsByTagName("canvas").length < 1) {
			//loop through cover images
			for(let i=0;i<allFigures.length;i++) {
				//
				allFigures[i].getElementsByTagName("img")[0].style.opacity = 1;
				allFigures[i].getElementsByTagName("img")[0].style.zIndex = 2;
			}
			//create info tag
			portFigure.info("create");
			//create figcaption
			portFigure.caption("center");
		}
		//position portfolio images
		for(let i=0;i<allFigures.length;i++) {
			for(let j=0;j<allFigures[i].getElementsByTagName("img").length;j++) {
				allFigures[i].getElementsByTagName("img")[j].style.top = 
				((orientation.screenHeight) - allFigures[i].getElementsByTagName("img")[j].height) / 2 + "px";
			}
		}
	},

	//
	scrollHandler: function(value) {
		//check if on portfolio page
		if(navigation.journal === "journal") {
			//mouse events
			if(value === "mousedown") {
				//check if info tag is present
				if(portFigure.fig[(navigation.index[0])-1].getElementsByTagName("h3").length > 0) {
					//delete info
					portFigure.info("delete");
				} else {
					//delete index
					portFigure.index("delete");
				}
				//reset images
				for(let i=1;i<portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img").length;i++) {
					//img opacity
					portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[i].style.opacity = 0;
				}
				//cover img opacity
				portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].style.opacity = 1;
				//position figcaption
				portFigure.caption("center");
				//mousedown reset if infoTag === Close
				portFigure.info("mousedown reset");
			} 
			else if(value === "mouseup" || value === "mouseleave") {
				//check if canvas is present
				if(portFigure.fig[(navigation.index[0])-1].getElementsByTagName("canvas").length < 1) {
					//create info tag
					portFigure.info("create");
				}
			}
		}
	},



	//caption
	caption: function(value) {
		const figcaption = portFigure.fig[(navigation.index[0])-1].getElementsByTagName("figcaption")[0];
		
		//reset
		figcaption.style.transitionProperty = "none";
		figcaption.style.opacity = 0;
		
		//position center
		if(value === "center") {
			//figcaption styles
			figcaption.style.alignSelf = "center";
			figcaption.style.left = -2 + "rem";
			figcaption.style.top = "initial";
			figcaption.style.fontSize = 4 + "rem";
			figcaption.style.marginTop = 0 + "rem";
			figcaption.getElementsByTagName("span")[0].style.display = "initial";
			figcaption.style.transitionProperty = "opacity";
			figcaption.style.opacity = 1;
		}
		//position upper left corner
		else if(value === "upper") {
			//figcaption styles
			figcaption.style.alignSelf = "flex-start";
			figcaption.style.left = 0 + "rem";
			figcaption.style.top = ((orientation.screenHeight) - (portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].height)) / 2 + "px";
			figcaption.style.marginTop = -1 + "rem";
			figcaption.style.fontSize = 1.2 + "rem";
			figcaption.getElementsByTagName("span")[0].style.display = "none";
			figcaption.style.transitionProperty = "opacity";
			figcaption.style.opacity = 1;
		}
	},


	//info tag
	info: function(value) {
		//create info tag
		if(value === "create") {
			//create div
			const div = document.createElement("div");
			//div position & styles
			div.style.left = 90 + "%";
			div.style.top = ((orientation.screenHeight) - (portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].height)) / 2 +
			(portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].height) + "px";
			div.style.transform = "rotate(-90deg)";
			div.style.marginTop = 2 + "rem";
			//append div to figure
			portFigure.fig[(navigation.index[0])-1].appendChild(div);
			
			//create header
			const header = document.createElement("h3");
			//header innerHTML
			header.innerHTML = portFigure.infoTag;
			//header color
			header.style.color = navigation.color;
			//append header to div
			div.appendChild(header);

			//create canvas
			const line = document.createElement("canvas");
			//line width & height
			line.width = 80;
			line.height = 20;
			//line position
			line.style.position = "absolute";
			line.style.left = getComputedStyle(header).getPropertyValue("width");
			line.style.top = 50 + "%";
			line.style.marginLeft = 0.5 + "rem";
			line.style.zIndex = 3;
			//line opacity
			line.style.opacity = 1;
			//append line to div
			div.appendChild(line);

			//draw line
			const ctxLine = line.getContext("2d");
			ctxLine.beginPath();
			ctxLine.moveTo(0,0);
			ctxLine.lineTo(60,0);
			ctxLine.lineWidth = 2;
			ctxLine.strokeStyle = navigation.color;
			ctxLine.stroke();

			//add event listeners
			portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].addEventListener("mousedown", portFigure.index, false);
			portFigure.fig[(navigation.index[0])-1].getElementsByTagName("div")[0].addEventListener("mousedown", portFigure.info, false);
		}
		//delete info tag
		else if(value === "delete") {
			//remove event listeners
			portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].removeEventListener("mousedown", portFigure.index, false);
			portFigure.fig[(navigation.index[0])-1].getElementsByTagName("div")[0].removeEventListener("mousedown", portFigure.info, false);
			//remove child
			portFigure.fig[(navigation.index[0])-1].removeChild(portFigure.fig[(navigation.index[0])-1].getElementsByTagName("div")[0]);
		}
		//info tag mousedown
		else if(value.type === "mousedown") {
			//img & canvas
			const img = portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img");
			const canvas = portFigure.fig[(navigation.index[0])-1].getElementsByTagName("canvas");
			
			//
			if(portFigure.infoTag === "Info") {
				//
				portFigure.infoTag = "Close";
				portFigure.info("delete");
				portFigure.info("create");
				//
				portFigure.caption("upper");
				//
				portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].style.visibility = "hidden";
				//info paragraph
				portFigure.fig[(navigation.index[0])-1].getElementsByTagName("p")[0].style.visibility = "initial";
				portFigure.fig[(navigation.index[0])-1].getElementsByTagName("p")[0].style.opacity = 1;
			} else {
				portFigure.info("mousedown reset");
				//toggle info and index
				portFigure.info("delete");
				portFigure.index("create");
				//cover image off
				img[0].style.opacity = 0;
				//second image & first line on
				img[1].style.opacity = 1;
				canvas[0].style.opacity = 1;
			}
		}
		//reset info mousedown
		else if(value === "mousedown reset") {
			//
			if(portFigure.infoTag === "Close") {
				//
				portFigure.infoTag = "Info";
				//
				portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].style.visibility = "initial";
				//info paragraph
				portFigure.fig[(navigation.index[0])-1].getElementsByTagName("p")[0].style.visibility = "hidden";
				portFigure.fig[(navigation.index[0])-1].getElementsByTagName("p")[0].style.opacity = 0;
			}
		}
	},



	//index
	index: function(value) {
		//create index
		if(value === "create") {
			//create div
			const div = document.createElement("div");
			//append div to figure
			portFigure.fig[(navigation.index[0])-1].appendChild(div);

			//create canvas equal to img length
			for(let i=1;i<portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img").length;i++) {
				//create canvas
				const line = document.createElement("canvas");
				//line width & height
				line.width = 10;
				line.height = 20;
				//line position
				line.style.marginLeft = line.width + "px";
				//append line to div
				div.appendChild(line);
			
				//draw line
				const ctxLine = line.getContext("2d");
				ctxLine.beginPath();
				ctxLine.moveTo(0,0);
				ctxLine.lineTo(0,line.height);
				ctxLine.lineWidth = 4;
				ctxLine.strokeStyle = navigation.color;
				ctxLine.stroke();
			}

			//div position & styles
			div.style.left = portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].width - div.clientWidth - 20 + "px";
			div.style.top = ((orientation.screenHeight) - (portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].height)) / 2 +
			(portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].height) + "px";
			div.style.transform = "none";
			div.style.marginTop = 1 + "rem";

			//add event listener
			portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].addEventListener("mousedown", portFigure.index, false);
		}
		//delete index
		else if(value === "delete") {
			//remove child
			portFigure.fig[(navigation.index[0])-1].removeChild(portFigure.fig[(navigation.index[0])-1].getElementsByTagName("div")[0]);
			//remove event listener
			portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img")[0].removeEventListener("mousedown", portFigure.index, false);
		}
		//adjust index
		else if(value.type === "mousedown") {
			//img & canvas
			const img = portFigure.fig[(navigation.index[0])-1].getElementsByTagName("img");
			const canvas = portFigure.fig[(navigation.index[0])-1].getElementsByTagName("canvas");
			
			//check if cover image is visible
			if(getComputedStyle(img[0]).getPropertyValue("opacity") == 1) {
				//toggle info and index
				portFigure.info("delete");
				portFigure.index("create");
				//cover image off
				img[0].style.opacity = 0;
				//second image & first line on
				img[1].style.opacity = 1;
				canvas[0].style.opacity = 1;
				//position figcaption
				portFigure.caption("upper");
			}
			//
			else {
				//loop through img length
				for(let i=1;i<img.length;i++) {
					//check which img's opacity == 1
					if(getComputedStyle(img[i]).getPropertyValue("opacity") == 1) {
						//check whether on last image
						if(i === img.length-1) {
							//image off
							img[i].style.opacity = 0;
							//cover image on
							img[0].style.opacity = 1;
							//toggle info & index
							portFigure.index("delete");
							portFigure.info("create");
							//position figcaption
							portFigure.caption("center");
						}
						//proceed if not on the last image
						else {
							//images & index off
							img[i].style.opacity = 0;
							canvas[i-1].style.opacity = 0.5;
							//image & index on
							img[i+1].style.opacity = 1;
							canvas[i].style.opacity = 1;
							//cancel loop
							i = img.length;
						}
					}	
				}
			}
		}
	}
};