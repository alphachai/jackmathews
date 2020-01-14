// handle loading animation
$(document).ready(function($) {
	$("#player_frame").ready(function($) {
		$("#preloader-wrap").animate({opacity: 0}, 800);
		setTimeout(function() {$("#loading").animate({opacity: 0}, 600);}, 400);
		setTimeout(function() {$("#loading").remove();}, 1200);
	});
});

function showMenu() {
	$("#burger").addClass("cross");
	$("#menu").addClass("open");
	$("#content").css("opacity", "0");
}

function hideMenu() {
	$("#burger").removeClass("cross");
	$("#menu").removeClass("open");
	$("#content").css("opacity", "1");
}

// menu animation
$("#burger").click(function() {
  if(!$(this).hasClass("cross")) {
		showMenu();
	} else {
		hideMenu();
	}
});

// hide menu if user clicks on content? need to improve.
$("#content").click(function() {
  if($("#burger").hasClass("cross")) hideMenu();
});

// hide menu if user scrolls
$(window).scroll(function() {
  if($("#burger").hasClass("cross")) hideMenu();
});

// https://github.com/dixonandmoe/rellax
var rellax = new Rellax('.relax');

// https://github.com/benceg/vanilla-modal
var modal = new VanillaModal.default();

// mobileExp = new RegExp('Android|webOS|iPhone|iPad|' +
// 											 'BlackBerry|Windows Phone|'  +
// 											 'Opera Mini|IEMobile|Mobile' ,
// 											 'i');
//
// if (testExp.test(navigator.userAgent)) {
// 	document.getElementById("device").innerHTML = "Your device is a Mobile Device";
// } else {
// 	document.getElementById("device").innerHTML = "Your device is NOT a Mobile Device";
// }
//
// $(".portfolio-item.youtube").click(function(){
//   var child = document.createElement('div');
// 	child.className = "modal";
// });
