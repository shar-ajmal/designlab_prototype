var startTogether = document.getElementById("togetherButton");
var hideTogether = document.getElementById("endTogether");
var togetherContainer = document.getElementById("togetherjs-container");
hideTogether.addEventListener('click', hide);

function hide() {
	startTogether.style.display="none";
	hideTogether.style.display="none";
	//togetherContainer.style.display="none";
}
