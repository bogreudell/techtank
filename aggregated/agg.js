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

// PLACES LIST

	var userSpaces = ['home', 'school', 'boyfriend', 'classmates', 'facebook', 'CYI', 'parents', 'sister', 'chess club', 'band camp', 'code club', 'soccer', 'television', 'music', 'basketball', 'video games', 'shopping', 'teachers', 'photography'];

	var spaceList = $('#spaceList');

	$.each(userSpaces, function(){
		var li = $('<li></li>')
		.text(this)
		.appendTo(spaceList);
	});

	// http://www.onemoretake.com/2009/02/25/sorting-elements-with-jquery/
    var listitems = spaceList.children('li').get();
    listitems.sort(function(a, b) {
       return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
    })
    $.each(listitems, function(idx, itm) { spaceList.append(itm); });
 	


// LIST EMOTIONAL STATES IN DROP DOWN MENU
	var emotionalstates = ['None', 'At Ease', 'Anxious', 'Energized','Drained', 'Confident', 'Unsure', 'Listen to', 'Not Heard', 'Connected', 'Diconnected', 'Free', 'Limited', 'Authentic', 'Inauthentic', 'Independent', 'Collaborative', 'Traditional', 'Nontraditional', 'Fitting In', 'Standing Out'];

	var emDdList = $('.emDdList');
	var emDdUnselected = $('.emDdUnselected');
	var emDdUnselectedLi = $('.emDdUnselected li');
	var emDdSelected = $('.emDdSelected');

    $.each(emotionalstates, function(i){
    	var li = $('<li></li>')
    	.text(this)
	    .appendTo(emDdUnselected);
	    
    });


// DROP DOWN MENU
// http://www.webchief.co.uk/blog/simple-jquery-dropdown-menu/

	emDdList.bind('mouseover', openSubMenu);
	emDdList.bind('mouseout', closeSubMenu);
	
	function openSubMenu() {
		$(this).children('.emDdUnselected').css('display', 'inline');	
	};
	
	function closeSubMenu() {
	 	$(this).children('.emDdUnselected').css('display', 'none');	
	};

	$('.emDdUnselected li').on('click', function(){
		var showOnGraph = $(this).text();
		$(this).parents().siblings('.emDdSelected').remove();
		var parentList = $(this).parents().parents('.emDdList');
		$('<div class="emDdSelected"></div>').text(showOnGraph).prependTo(parentList);
		emDdUnselected.css('display', 'none');
	});

});