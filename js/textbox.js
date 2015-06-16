$(document).ready(function(){

  function nextbtnActive(){
    $('#nextbtn').css({
      'color': '#1AA0F9'
    });
    $('#nextbtn:hover').css({
      'border-bottom': '2px solid #1AA0F9'
    });
    $('#nextbtn').removeClass('disabled');
  }

  function nextbtnInactive(){
    $('#nextbtn').css({
      'color': '#aaa',
      'border-bottom': '0px'
    });
    $('#nextbtn').addClass('disabled');
  }

  nextbtnInactive();

  /********************************************************************************/

  /*---- General Information To Use in CSS and jQuery ----*/

  // Determine the container class's top margin on load and resize of window
  $(window).on('load resize', function(){
   // var topMarCon = $(".btnbar").height() + 35 + 20;
    $(".container").css({"margin-top": topMarCon});
    //console.log(topMarCon);

  });

  // Hide .btnbar on input focus
/*
  $("input").focus(function() {
    $('#question').hide();
  });
   $("input").focusout(function() {
    $('#question').show();
    $('body').scrollTop(0);
    //$("html, body").animate({ scrollTop: 0 }, "slow");
  });
*/

  // SCROLL DOWN TO HIDE #BTNBAR
  // http://jsfiddle.net/mariusc23/s6mLJ/31/ 
  
  $(window).scroll(function(){

      if ($('body').scrollTop() > 0) {
          $("#question").hide();
          $('.btnbar').css({'border-bottom': '1px solid #eee'});
          //$('body').append('<a id="nextbtnbottom" onclick="">NEXT</a>');
      } else {
          $("#question").show();  
          $('.btnbar').css({'border-bottom': 'none'});
          //$('#nextbtnbottom').remove();
      }
  });

  //$('b').hide();


  // Get file name of page loaded
  function getCurrentFileName(){
    var pagePathName= window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
  }

  // Screen Variables
  var screen1 = "index.php";
  var screen2a = "screen_2a.php";
  var screen2b = "screen_2b.php";
  var screen3a = "screen_3a.php";
  var screen3b = "screen_3b.php";
  var screen3c = "screen_3c.php";
  var screen4a = "screen_4a.php";
  var screen4b = "screen_4b.php";
  var screen4c = "screen_4c.php";
  var screen4d = "screen_4d.php";
  var screen4e = "screen_4e.php";
  var screen4f = "screen_4f.php";
  var screen4g = "screen_4g.php";
  var screen4h = "screen_4h.php";
  var screen4i = "screen_4i.php";
  var screen4j = "screen_4j.php";
  var screen5 = "screen_5.html";



  //if (getCurrentFileName() == screen4a || getCurrentFileName() == screen4b || getCurrentFileName() == screen4c || getCurrentFileName() == screen4d || getCurrentFileName() == screen4e || getCurrentFileName() == screen4f || getCurrentFileName() == screen4g || getCurrentFileName() == screen4h || getCurrentFileName() == screen4i || getCurrentFileName() == screen4j){

  //  $("body").append('<div class="btnbar"><p id="qcount"></p><a class="disabled" id="nextbtn" href="" onclick="document.getElementById("myform").submit();">NEXT</a><div id="question"></div></div><div class="container"><div class="datacollection"><ul class="sevenptlistbi"></ul></div></div>');

  //console.log('template this');
  //console.log(getCurrentFileName());
  //}

  /********************************************************************************/

  // SINGLE LABEL SCREEN & MULTI LABEL SCREEN
  // SINGLE user variable: user's name = firstname
  // MULTI user variable: array of concepts = userConceptArray

  /*
  // SINGLE
  // Pull name value of input & test code
  $('#singlein').change(function() {
    // name variable
    var firstName = $('.in').val();

    if (firstName == ""){
      $('#nextbtn').css({
        'color': '#aaa',
        'border-bottom': '0px'
      });
      $('#nextbtn').addClass('disabled');

      console.log("no name");
    } else {
      $('#nextbtn').css({
        'color': '#1AA0F9',
        'border-bottom': '2px solid #1AA0F9'
      });
      $('#nextbtn').removeClass('disabled');
      //$(this).parents('.myform').prepend('<input id="name" class="hoverinput" type="" name="nodes[]" value="' + val + '"/>');
    }
    console.log(firstName);
  });
*/

  // MULTI
  function arrayUpdate(){

    var conceptDiv = $('.textval');

    for(var i = 0; i < conceptDiv.length; i++) {
      // concept array variable
      var userConceptArray = $(conceptDiv[i]).text();
      //console.log(userConceptArray);
    }
  }


  // On submit, check textbox for value and submit typed text
  $('.myform').submit(function(e){
    // multi vals
    var maxNum = 9;
    var halfwayNum = parseInt(maxNum/2);

    conceptNum = $('.list li').length;
    console.log(conceptNum + " list items added.");

    // SINGLE
    if ($('.in').is('#singlein')){
      var val = $(this).children('.in').val();
      if (val == ""){
        //$('#singlein').css('display', 'inline');
      } else {
        $('#form1').append('<input readonly id="name" class="textval" name="username" value="' + val + '"/>');
        $('#singlein').css('display', 'none');
        nextbtnActive();
      }

      // MULTI
    } else {
      var val = $(this).children('.in').val().charAt(0).toUpperCase() + $(this).children('.in').val().slice(1);
      // submit new concept
      if (val == ""){
        //$('#multiin').css('display', 'inline');
      } else {
        /*var valLength = $(this).children('input').val().length;
        console.log(valLength + " size");*/

        $('.list').append('<li><input readonly class="textval" name="nodes[]" size="" value="' + val + '"/></li>');
      }

      // allow user to move forward
      if (conceptNum < halfwayNum){
        $('#multiin').css('display', 'inline');
        //console.log("less than 4");
        nextbtnInactive();
      }
      if (conceptNum >= halfwayNum){
        nextbtnActive();
        //console.log("more than 4");
      }
      if (conceptNum === maxNum){
        $('.in').css('display', 'none');
        //console.log("STOP at 9");
      }

    }


    e.preventDefault();

    $(this).children('.in').val("");

    arrayUpdate();

  });

  // SINGLE
  // On click of submitted word, present delete option and remove if already shown
  $(document).on('click', '.textval', function(){
    $(this).parents().siblings('#delete').remove();
    $(this).parents().siblings().children('#delete').remove();

    if($(this).hasClass('red') || $(this).parents('li').children().hasClass('red')){
      $(this).removeClass('red');
      $(this).siblings('#delete').remove();
    } else {
      $('.textval').removeClass('red');
      $(this).addClass('red');
      $(this).parent().append('<div id="delete">+</div>');
    }

  });

  // On click of delete button, remove name and show textbox again
  $(document).on('click', '#delete', function(){
    // SINGLE
    if ($('input').is('#name')){

      $('#name').remove();
      $('#delete').remove();
      nextbtnActive();

    } else {

      // MULTI
      $(this).parents('li').remove();

      conceptNum = $('.list li').length;
      console.log(conceptNum + " list items added.");

      if (conceptNum < 10){

        $('.in').css('display', 'inline');
      }
      if (conceptNum < 5){

        nextbtnInactive();
      }
      if (conceptNum == 10){

        $('.in').css('display', 'none');
        nextbtnActive();
      }

      console.log(conceptNum + ' concepts after deletion');
    }

    $('.in').css('display', 'inline');

    //console.log(conceptCount + ' after delete');

    arrayUpdate();

  });



  /********************************************************************************/

  // 5 Point Scale & 7 Point Scale
  // 5pt user variable: fiveptarray
  // 7pt user variable: sevenptarray
  // User neg check: .negVal (class applied to form)

  // Height of All Items
  function fiveptscaleHeight(){

    var fiveptRadiobtnTotalH = ((parseInt($('.sevenptscale input').css('margin')) * 2) + (parseInt($('.sevenptscale input').css('margin')) * 2) + (parseInt($('.sevenptscale input').css('border')) * 2)) * 2;
    //console.log(radiobtnTotalH + 'px');
    $('.sevenptscale').css({'height': radiobtnTotalH * 7});

  }

  // List all emotional states
  var emotionalstates = ['At Ease', 'Anxious', 'Energized','Drained', 'Confident', 'Unsure', 'Listened to', 'Not Heard', 'Connected', 'Disconnected', 'Free', 'Limited', 'Authentic', 'Inauthentic', 'Independent', 'Collaborative', 'Traditional', 'Nontraditional', 'Fitting In', 'Standing Out'];
  //var emotionalstates = ['hi','lol','poop','butt'];


  // List all places and spaces - NEED TO BE PULLED FROM USER
  //var spacesPlaces = ['CYI', 'Place 2', 'Place 3','Place 4', 'Place 5', 'Place 6', 'Place 7', 'Place 8', 'Place 9', 'Place 10'];
  var spacesPlaces = ['CYI'];
  //var spacesPlaces = ['hey you','ur face','ur butt','ur mom'];

  // 5 PT SCALE
  // 5 PT LIST NAMES (Emotional concepts or spaces/places)
  var ecList = $('.fiveptlistec');
  var spList = $('.fiveptlistsp');

  // Create list of emotional concepts with radio buttons
  if ($('ul').is(ecList)){
    $.each(emotionalstates, function(i){
      var li = $('<li></li>')
      li.appendTo(ecList);

      var emotionName = $('<h2></h2>')
      .text(this)
      .appendTo(li);

      // 5 PT - TIME
      if ( $('ul').is('#listtime')){
        $('<input type="radio" name="scale' + i + '[]" value="Not at all"><label>Not at all</label><br><input type="radio" name="scale' + i + '[]" value="A little"><label>A little</label><br><input type="radio" name="scale' + i + '[]" value="Sometimes"><label>Sometimes</label><br><input type="radio" name="scale' + i + '[]" value="A lot"><label>A lot</label><br><input type="radio" name="scale' + i + '[]" value="All the time"><label>All the time</label>').appendTo(li);
        // 5 PT - INFLUENCE
      } else if ( $('ul').is('#listinflu')){
        $('<input type="radio" name="scale' + i + '[]" value="Not at all"><label>Not at all</label><br><input type="radio" name="scale' + i + '[]" value="A little"><label>A little</label><br><input type="radio" name="scale' + i + '[]" value="Some"><label>Some</label><br><input type="radio" name="scale' + i + '[]" value="A lot"><label>A lot</label><br><input type="radio" name="scale' + i + '[]" value="Completely"><label>Completely</label>').appendTo(li);
      }

    });
  }

  // 5 PT - SPACES
  // Create list of spaces with radio buttons
  if ($('ul').is(spList))  {
    $.each(spacesPlaces, function(i){
      var li = $('<li></li>')
      li.appendTo(spList);

      var spaceName = $('<h2></h2>')
      .text(this)
      .appendTo(li);

      // 5 PT - TIME
      if ( $('ul').is('#listtime')){
        $('<input type="radio" name="scale' + i + '[]" value="Not at all"><label>Not at all</label><br><input type="radio" name="scale' + i + '[]" value="A little"><label>A little</label><br><input type="radio" name="scale' + i + '[]" value="Sometimes"><label>Sometimes</label><br><input type="radio" name="scale' + i + '[]" value="A lot"><label>A lot</label><br><input type="radio" name="scale' + i + '[]" value="All the time"><label>All the time</label>').appendTo(li);
        // 5 PT - INFLUENCE
      } else if ( $('ul').is('#listinflu')){
        $('<input type="radio" name="scale' + i + '[]" value="Not at all"><label>Not at all</label><br><input type="radio" name="scale' + i + '[]" value="A little"><label>A little</label><br><input type="radio" name="scale' + i + '[]" value="Some"><label>Some</label><br><input type="radio" name="scale' + i + '[]" value="A lot"><label>A lot</label><br><input type="radio" name="scale' + i + '[]" value="Completely"><label>Completely</label>').appendTo(li);
      }

    });

  }

  // 5 PT
  // Add Negative check buttons
  //$('#fiveptlist li').slice(-8).addClass('fivecheckboxAdd');
  //$('<form><input name="checkbox" type="checkbox"><label>Neg</label></form>').appendTo('.fivecheckboxAdd');


  // 7 PT SCALE

  // name of 7 PT emotional concepts list
  var biList = $(".sevenptlistbi");
  var biListli = $(".sevenptlistbi li");

  // Create list of binaries of emotional states
  if ($('ul').is(biList)){
    var li;
    $.each(emotionalstates, function(i, v){
      if (i % 2 == 0){
        biList.append(li);
        li = $('<li>', {'class': 'binaries'});
      }
      var div = $('<div class="biEm">').append(v);
      li.append(div);

      // Add radio buttons to all emotional state ranges

    });
    biList.append(li);

    $('.binaries div:first-child').after('<form class="sevenptscale"><input type="radio" name="scale" value="Completely"><label>Completely</label><input type="radio" name="scale" value="Mostly"><label>Mostly</label><input type="radio" name="scale" value="Somewhat"><label>Somewhat</label><input id="neutral" type="radio" name="scale" value="Neither"><label>Neither</label><input type="radio" name="scale" value="nSomewhat"><label>Somewhat</label><input type="radio" name="scale" value="nMostly"><label>Mostly</label><input type="radio" name="scale" value="nCompletely"><label>Completely</label></form>');

    // added radio button margin, padding and border lengths together to find height of radio sevenptscale class
    var sevRbtnTotalH = ((parseInt($('.sevenptscale input').css('margin')) * 2) + (parseInt($('.sevenptscale input').css('margin')) * 2) + (parseInt($('.sevenptscale input').css('border')) * 2)) * 2;
    //console.log(radiobtnTotalH + 'px');
    $('.sevenptscale').css({'height': sevRbtnTotalH * 7});
  }


  // 7 PT
  // Add Negative check buttons
  $('.sevenptlistbi li').slice(-4).addClass('sevencheckboxAdd');
  $('<form><input name="neg" type="checkbox"><label>Neg</label></form>').appendTo('.sevencheckboxAdd');


  var radiobtn = $('input:radio');
  var boxbtn = $('input:checkbox');
  var radiobtnchecked = $('input:radio:checked');
  var boxbtnchecked = $('input:checkbox:checked');


  // 5 PT — Looking @ Negative Checks & whether "NEXT" button should be active
  if ($('form').is('.fiveptscale')){

    $('input').change(function() {

      $.each(radiobtnchecked, function(i, item) {  //i=index, item=element
        // 5 PT Scale Array Variable
        var fiveptarrayRadio = $(radiobtn[i]).val();
        console.log(fiveptarrayRadio);
      });

      // Apply negative class to forms the user defines as negative
      if (boxbtn.is(':checked')){
        $(boxbtn).siblings('input').addClass('negVal');
      } else {
        $(boxbtn).siblings('input').removeClass('negVal');
      }

      radioChecked = $('input:radio:checked').length;

      /*if (radioChecked === emotionalstates.length){
        nextbtnActive();
      }*/

      var checked = $("body :radio:checked");
      var groups = [];

      $("body :radio").each(function() {
          if (groups.indexOf(this.name) < 0) {
              groups.push(this.name);
          }
      });
      if (groups.length == checked.length) {
          nextbtnActive();
      }

    });

    // 7 PT
  } else {

    $('input').change(function() {


      $.each(radiobtnchecked, function(i, item) {  //i=index, item=element
        // 7 PT Scale Array Variable
        var sevenptarray = $(radiobtnchecked[i]).val();
        //console.log(sevenptarray);
      });

      if (boxbtn.is(':checked')){
        $(boxbtn).siblings('form').addClass('negVal');
      } else {
        $(boxbtn).siblings('form').removeClass('negVal');
      }

      radioChecked = $('input:radio:checked').length;

      if (radioChecked === Math.floor(spacesPlaces.length/2)){
        nextbtnActive();
      }

      //console.log(radioChecked + " radio buttons checked");


    });

  }

  /********************************************************************************/

  // Hours per Day
  // Hours user variable:

  var hrList = $(".hrList");

  //$('.hrList li:first-child').css('margin-bottom', '40px');
  $('.hrList li:last-child').css('margin-bottom', '40px');

  // Create READONLY textbox to show total hours
  var total = $('<div id="totalStuff"><input type="text" READONLY id="total" value="0" size="3"/><label>Total Hours a Week</label></div>')
  .appendTo('#hrTotal');


  $('.hours').change(function() {

    // Loop through all input's and re-calculate the total
    var total = 0;
    $('.hours').each(function(){
      var allHours = parseInt(this.value);
      total += allHours;

      //var isValid;
      if ($(this).val() == "0") {
        nextbtnInactive();

      } else {
        nextbtnActive();
      }

    });

    // Update the total
    $('#total').val(total);

    var hoursArr = $(".hours");
    $.each(hoursArr, function(i, item) {  //i=index, item=element in array
      //console.log($(item).val());

      if ($(item).val() == 0){
        $(this).css({
          'color':'#aaa',
          'background-color': '#eee'
        });
        nextbtnInactive();
      } else {
        $(this).css({
          'color':'#000',
          'background-color': '#fff'
        });
        nextbtnActive();
      }

    })

    for(var i = 0; i < hoursArr.length; i++) {
      var hours = $(hoursArr[i]).val();
      //console.log(hours);
    };

  });

  /*---- QUESTIONS, QUESTION NUMBERS and TEMPLATES for Screens 4a-4j ----*/
  // Writes questions, question count and changes next button href

  // SCREEN 1
  if (getCurrentFileName() == ""){
    //$('#question').append("<h1>Please choose a username for yourself.</h1><p>You will need this username to access your map in the workshop, so remember it! We may also use this username to generate a group map, so if you don't want to be publicly identifiable, use your favorite fake name.</p>");
    $('#qcount').append('1 of 3');
    $("#nextbtn").attr("href", screen2a);

    // SCREEN 2a
  } else if (getCurrentFileName() == screen2a){
    //$('#question').append("<h1>In general, how often do you feel the following emotional states?</h1>");
    $('#qcount').append('2 of 3');
    $("#nextbtn").attr("href", screen2b);

    // SCREEN 2b
  }  else if (getCurrentFileName() == screen2b){
    //$('#question').append("<h1>How much do these emotional states influence you day to day?</h1>");
    $('#qcount').append('3 of 3');
    $("#nextbtn").attr("href", screen3a);


});
