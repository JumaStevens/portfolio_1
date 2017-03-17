/*
Name:
WIDTH FINDER

Description:
Sorts through all nodes, reporting any node greater than the screen width.

Author:
Juma Stevens
*/


(function findWidths() {
	var all_nodes = document.getElementsByTagName("*");
	var screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	console.log("WIDTH FINDER: INIT");
	console.log("======================================================");
	console.log("======================================================");
	//cycle through children
	for(let i=0;i<all_nodes.length;i++) {
		//filter out text & comments
		if((all_nodes[i].nodeName != "#text") && (all_nodes[i].nodeName != "#comment")) {
			//check which nodes are > screen width
			if(all_nodes[i].clientWidth > screen_width) {
				//report results
				console.log("NODE:");
				console.log(all_nodes[i]);
				console.log("Width:");
				console.log(all_nodes[i].clientWidth);
				console.log("======================================================");
			}
		}
	}
	console.log("======================================================");
	console.log("======================================================");
	console.log("WIDTH FINDER: CLOSE");
})();