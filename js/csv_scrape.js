// Thicket Labs 2014
// Lukas WinklerPrins & Sam Hutch
// CYI Data Graphing Function
// Uses Graph Dracula & CVS Reading Libraries


$(document).ready(function() {

  //var filename = "js/test.txt";
  var filename = $(".hide").text();
  //alert(filename);

  $.ajax({
    type: "GET",
    url: filename,
    dataType: "text",
    success: function(data){graph(data)}
  });
});

function graph(data){
  // Using 'jquery-csv.js' library...
  var csv = $.csv.toArrays(data);
  console.log(csv);

  ////////////////////////////////////////////////////////////

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



  ////////////////////////////////////////////////////////////

  var g = new Graph();

  var width = $(document).width() - 60;
  var height = $(document).height() - 60;

  var randomColor = function(){
    //return Math.floor(Math.random()*16777215).toString(16);
    // Above does hex, below does 0-255
    return Math.floor(Math.random()*255);
  };

  var redColor = function(val){
    val = 1-val;
    var diffRed = 255-128;
    var diffGreen = 255-0;
    var diffBlue = 255-0;

    diffRed = Math.round(128 + diffRed*val);
    diffGreen = Math.round(0 + diffGreen*val);
    diffBlue = Math.round(0 + diffBlue*val);

    return '"rgb('+diffRed+','+diffGreen+','+diffBlue+')"';
  };

  var blueColor = function(val){
    val = 1-val;
    var diffRed = 255-0;
    var diffGreen = 255-0;
    var diffBlue = 255-102;

    diffRed = Math.round(0 + diffRed*val);
    diffGreen = Math.round(0 + diffGreen*val);
    diffBlue = Math.round(102 + diffBlue*val);

    return '"rgb('+diffRed+','+diffGreen+','+diffBlue+')"';
  };

  ////////////////////////////////////////////////////////////
  //////////////////// Rendering Function ////////////////////
  ////////////////////////////////////////////////////////////

  var node_render = function(r, n) {
    var radius = 20+Math.round(20*n.size);
    var transparency = 0.1+n.opac*0.9;

    var nodeStyle = {
      "fill": "rgb(0,50,255)",
      "stroke-width": 1,
      "opacity": transparency
    };

    var labelStyle = {
      "font-size": "12px",
      "font-weight": "bolder",
      "fill": "#000",
      "y": 30
    };

    var set = r.set()
    .push(r.circle(0,0,radius).attr(nodeStyle))
    .push(r.text(0,37,n.label).attr(labelStyle));
    return set;
  };

  // FOR THE IDENTITY NODE ONLY...
  var identity_render = function(r,n){
    var nodeStyle = {
      "fill": "orange",
      "stroke-width": 2,
      "stroke": "red",
      "opacity": 1
    };

    var labelStyle = {
      "font-size": "16px",
      "opacity": 1
    }

    var set = r.set()
    .push(r.circle(0,20,50).attr(nodeStyle))
    .push(r.text(0,37,n.label).attr(labelStyle));
    return set;
  }

  ////////////////////////////////////////////////////////////
  ///////////////////// Generating Nodes /////////////////////
  ////////////////////////////////////////////////////////////

  g.addNode("identity",{label:"You!",render:identity_render});

  for(var i = 0; i < num_places; i++){
    // Pseudo-value is arithmetic mean of relative hours & importance
    var size = rel_hours[i];
    var importance = parseFloat(csv[4][i]);
    var pseudo_value = v1[i];
    eval('g.addNode("p'+i+'",{label:"'+places[i]+'",render:node_render,size:"'+size+'",opac:"'+importance+'",value:"'+pseudo_value+'"});');
  }

  for(var i = 0; i < num_emotions; i++){
    // Pseudo-value is arithmetic mean of frequency & importance
    var size = parseFloat(csv[0][i]);
    var importance = parseFloat(csv[1][i]);
    var pseudo_value = v2[i];
    eval('g.addNode("e'+i+'",{label:"'+emotions[i]+'",render:node_render,size:"'+size+'",opac:"'+importance+'",value:"'+pseudo_value+'"});');
  }

  ////////////////////////////////////////////////////////////
  ///////////////////// Generating Edges /////////////////////
  ////////////////////////////////////////////////////////////

  // Drawing edges between emotions & spaces with values "r"
  for(var i = 0; i < num_places; i++){
    var j = 5+4*i;//

    for(var k = 0; k < num_emotions; k++){
      var r = parseFloat(csv[j][k]);
      var neg = parseInt(csv[j+2][k]); // Get the 1 or 0 from the array just after the selected place

      // Select the color of the edge dependong on negativity & value
      var color = "";
      if(neg){ // Negative edge!
        color = redColor(r);
      }else{ // Non-Negative edge!
        color = blueColor(r);
      }

      if(r){
        eval('g.addEdge("p'+i+'","e'+k+'",{directed: true,value:"'+r+'",stroke:'+color+'});');
      }
    }
  }

  // "e" value calculations
  var e =[];
  for(var i=0; i<num_emotions; i++){
    temp = 0;
    var num_edges = 0;
    for(var j=0; j<num_places; j++){
      var r = parseFloat(csv[j][i]);
      if(r){
        temp = temp + Math.sqrt(r*v1[j])
        num_edges = num_edges + 1;
      }
    }
    temp = temp/num_edges;
    e[i] = temp;
  }

  // Edges to the identity node & value of "a" calculation.
  var a =[];
  for(var i=0; i < num_emotions; i++){
    eval('g.addEdge("e'+i+'","identity",{directed: true,value: "'+e[i]+'",stroke:'+blueColor(e[i])+'});');
    a[i] = e[i]*v2[i];
  }

  var tot_a = 0;
  for(var i=0;i<num_emotions;i++){
    tot_a = tot_a + a[i];
  }
  var rel_a = [];
  for(var i=0;i<num_emotions;i++){
    rel_a[i] = a[i]/tot_a;
  }

  ////////////////////////////////////////////////////////////
  ///////////////////////// End Stuff ////////////////////////
  ////////////////////////////////////////////////////////////

  // layout the graph using the Spring layout implementation
  // needs to come before renderer
  var layouter = new Graph.Layout.Spring(g);

  // draw the graph using the RaphaelJS draw implementation
  var renderer = new Graph.Renderer.Raphael('canvas', g, width, height);

  var redraw = function() {
    layouter.layout();
    renderer.draw();
  };

}; // end function
