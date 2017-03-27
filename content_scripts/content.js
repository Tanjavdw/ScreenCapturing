/**
	handle messages from background script: receives hostname from active tab
*/
browser.runtime.onMessage.addListener(request => {
	console.log("content script receives message: " + request.currentUrl);
	handleStudyEventListener();
});

function handleStudyEventListener(){
	document.getElementsByTagName('body')[0].appendChild(modalOuter);
	document.getElementById('buttonID_Ok_study').addEventListener('click', function() {
		modalContent1.style.display = "none";	
		//screencapturing
		html2canvas(document.getElementsByTagName('body')[0]).then(function(canvas) {
			console.log("HATS GEKLAPPT?");
			modalContent2.appendChild(canvas);
		});
		modalOuter.appendChild(modalContent2);
	});	
}

//---------------------create div1------------------------------
var modalOuter = document.createElement("div");
modalOuter.style.width = "100%";
modalOuter.style.height = "100%";
modalOuter.style.paddingTop = "100px";
modalOuter.setAttribute("id", "myModalOuter");
modalOuter.setAttribute("class", "modalOuter");
modalOuter.style.position = "fixed";
modalOuter.style.top = 0;
modalOuter.style.left = 0;
modalOuter.style.paddingright = "60px";
modalOuter.style.zIndex = 1000000;
modalOuter.style.overflow = "auto";

var modalContent1 = document.createElement("div");
modalContent1.style.backgroundColor = "#fefefe";
modalContent1.style.margin = "auto";
modalContent1.style.border = "1px solid #888";
modalContent1.style.width = "30%";
//modalContent1.style.float = "right";
modalContent1.style.cursor = "move";
modalContent1.setAttribute("id", "mymodalContent1");
modalContent1.setAttribute("class", "modal-content");

var button_Ok_study = document.createElement("button");
button_Ok_study.setAttribute("id", "buttonID_Ok_study");
button_Ok_study.innerHTML = "Take Screenshot";

modalContent1.appendChild(button_Ok_study);
modalOuter.appendChild(modalContent1);
//--------------------------------------------------------------

//---------------------create div2------------------------------
var modalContent2 = document.createElement("div");
modalContent2.style.backgroundColor = "#fefefe";
modalContent2.style.margin = "auto";
modalContent2.style.border = "1px solid #888";
modalContent2.style.width = "30%";
modalContent2.style.cursor = "move";
modalContent2.setAttribute("id", "mymodalContent2");
modalContent2.setAttribute("class", "modal-content");


var lbl_scrnsht_study = document.createElement("label");
lbl_scrnsht_study.innerHTML = "Screenshot...";

modalContent2.appendChild(lbl_scrnsht_study);

