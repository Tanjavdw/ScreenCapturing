var scriptHtml2Canvas = document.createElement('script');
scriptHtml2Canvas.src = browser.extension.getURL("html2canvas/dist/html2canvas.js");
document.head.appendChild(scriptHtml2Canvas); 

var modalOuter = document.createElement("div");
modalOuter.style.width = "100%";
modalOuter.style.height = "100%";
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

var button_shot = document.createElement("button");
button_shot.setAttribute("id", "takeScreenshotButtonID");
button_shot.innerHTML = "Take Screenshot";

modalContent1.appendChild(button_shot);
modalOuter.appendChild(modalContent1);
document.getElementsByTagName('body')[0].appendChild(modalOuter);

var modalContent = document.createElement("div");
modalContent.style.backgroundColor = "#fefefe";
modalContent.style.margin = "auto";
modalContent.style.border = "1px solid #888";
modalContent.style.width = "30%";
modalContent.innerHTML = "Screenshot...";


document.getElementById('takeScreenshotButtonID').addEventListener('click', function() {
	modalContent1.style.display = "none";	
	//screencapturing
	html2canvas(document.getElementsByTagName('body')[0]).then(function(canvas) {
		console.log("Finished with screen capturing...");
		modalContent.appendChild(canvas);
	});
	modalOuter.appendChild(modalContent);
});	
