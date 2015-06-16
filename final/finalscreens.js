$(document).ready(function(){

// CANVAS1 DIMENSIONS

 	/*$(window).bind("resize load", function() {
 		var topHeight = 200;
 		var canvasHeight = $("#graphJS").width() - topHeight;
	 	$('#graphJS').css({
	 		"height": canvasHeight
	 	});

	});
*/

// CANVAS2 DIMENSIONS

	$(window).bind("resize load", function() {
 		var topHeight = 200;
 		var canvasHeight = $(window).height() - topHeight;
	 	$('#canvas').css({
	 		"height": canvasHeight,
	 		"width": canvasHeight
	 	});

	});

});
