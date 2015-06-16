$(document).ready(function() {

  var filename = "js/test.txt";
  //var filename = $(".hide").text();

  $.ajax({
    type: "GET",
    url: filename,
    dataType: "text",
    success: function(data){ajx(data)}
  });
});

function ajx(data){
  // Using 'jquery-csv.js' library...
  var csv = $.csv.toArrays(data);

  /////////////////////////////////////////////////////////

  // LIST EMOTIONAL STATES IN DROP DOWN MENU
  //var emotions = ['At Ease', 'Anxious', 'Energized','Drained', 'Confident', 'Unsure', 'Listen to', 'Not Heard', 'Connected', 'Diconnected', 'Free', 'Limited', 'Authentic', 'Inauthentic', 'Independent', 'Collaborative', 'Traditional', 'Nontraditional', 'Fitting In', 'Standing Out'];

  var emotions = ['Anxious','Cheery','Confident','Derpy']; // TEST TEST TEST
  //var emotions = ['At Ease', 'Anxious', 'Energized','Drained', 'Confident', 'Unsure', 'Listened to', 'Not Heard', 'Connected', 'Disconnected', 'Free', 'Limited', 'Authentic', 'Inauthentic', 'Independent', 'Collaborative', 'Traditional', 'Nontraditional', 'Fitting In', 'Standing Out'];
  var num_emotions = emotions.length;
  var places = csv[2];
  var num_places = csv[2].length;
  // csv[0] is ES frequencies
  // csv[1] is ES influences
  // csv[2] is place names
  // csv[3] are hours per place
  // csv[4] are importance per place
  // csv[5-#] are importance rankings, in blocks of two (paired emotions)
  // csv[7-#] are negativity, in blocks of two (identical rows)

  var tot_hours = 0;
  for(var j = 0; j < num_places; j++){
    var temp = parseFloat(csv[3][j]);
    tot_hours += temp;
  }

  // Calculating the relative proportion of hours spent in each space.
  var rel_hours = [];
  for(var j = 0; j < num_places; j++){
    var temp = parseFloat(csv[3][j]);
    rel_hours[j] = temp/tot_hours;
  }

  var v1 = [];
  for(var i = 0; i < num_places; i++){
    v1[i] = (rel_hours[i]+parseFloat(csv[4][i]))/2;
  }

  var v2 = [];
  for(var i = 0; i < num_emotions; i++){
    v2[i] = (parseFloat(csv[0][i])+parseFloat(csv[1][i]))/2;
  }

  /////////////////////////////////////////////////////////

    // "e" value calculations
  var e =[];
  var space_influences = [];
  for(var i=0; i<num_emotions; i++){
    temp = 0;
    var num_edges = 0;
    space_influences[i] = []; // Measure influence of each v1 value, which leads to e values, so that we can rank spaces within each emotion in terms of influence.
    // space_influences is going to be an array of objects. The ith object is the ith emotion. The array then contains objects of places and their influence.
    for(var j=0; j<num_places; j++){
      var r = parseFloat(csv[j][i]);
      if(r){
        temp = temp + Math.sqrt(r*v1[j])
        //space_influences[i][j] = r*v1[j];
        space_influences[i].push({place: places[j], rel_infl: r*v1[j]});
        num_edges = num_edges + 1;
      }
    }
    temp = temp/num_edges;
    e[i] = temp;
  }

  console.log(space_influences);

  // Edges to the identity node & value of "a" calculation.

  var tot_a = 0;
  var a = [];
  for(var i=0;i<num_emotions;i++){
    a[i] = e[i]*v2[i];
    tot_a = tot_a + a[i];
  }
  var rel_a = [];
  var a_objects = [];
  for(var i=0;i<num_emotions;i++){
    rel_a[i] = a[i]/tot_a;
    var temp = {a: a[i], name: emotions[i], influences: space_influences[i]};
    a_objects.push(temp);
  }

  // Now we'll put them in order of their a values...!
  a_objects.sort(function(a,b){return -1*parseFloat(a.a)+parseFloat(b.a)});

  /////////////////////////////////////////////////////////

  var rankedEms = $('#rankedEms');

  // Write the "name" of each object into a list item
  $.each(a_objects, function(i){
    var li = $('<li></li>');
    rankedEms.append(li);
    var div = $('<div></div>')
    .text(this.name)
    .appendTo(li);
  });

  $('#rankedEms li').append("<ul class='rankedSps'></ul>");

  $('.rankedSps').hide();

  // PLACES LIST

  var rankedSps = $('.rankedSps');

  $.each(places, function(){
    var li = $('<li></li>')
    .text(this)
    .appendTo(rankedSps);
  });

  // DROP DOWN MENU
  // http://www.webchief.co.uk/blog/simple-jquery-dropdown-menu/

  $('#rankedEms li').on('click', function(){

    $(this).children('.rankedSps').toggle();
  });

}// end ajax call function
