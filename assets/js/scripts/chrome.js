function isChrome() {
	let isChromium = window.chrome;
	let winNav = window.navigator;
	let vendorName = winNav.vendor;
	let isOpera = winNav.userAgent.indexOf("OPR") > -1;
	let isIEedge = winNav.userAgent.indexOf("Edge") > -1;
	let isIOSChrome = winNav.userAgent.match("CriOS");

	// elements
	const elem = [
		document.getElementsByClassName('article__copy'),
		document.getElementsByClassName('article__link'),
		document.getElementsByClassName('tech__item'),
		document.getElementsByClassName('menu-button__copy'),
		document.getElementsByClassName('footer-button__copy'),
		document.getElementsByClassName('footer-copyright'),
		document.getElementsByClassName('contact-side__email'),
		document.getElementsByClassName('contact-side__status'),
		document.getElementsByClassName('contact-form__cancel'),
		document.getElementsByClassName('contact-form__submit'),
		document.getElementsByClassName('contact-form__input'),
		document.getElementsByClassName('contact-form__label'),
		document.getElementsByClassName('contact-side__status')
	];

	if(isIOSChrome){
		return true;
	} else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
		return true;
	} else { 
		for(let i=0;i<elem.length;i++) {
			for(let j=0;j<elem[i].length;j++) {
				elem[i][j].style.fontWeight = 500;
			}
		}
		return false;
	}
};

// invocation
isChrome();