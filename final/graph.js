
var redraw, g, renderer;

/* only do all this when document has finished loading (needed for RaphaelJS) */
window.onload = function() {

  //var width = $(document).width() - 60;
  //var height = $(document).height() - 60;
  var width = $('#canvas').width();
  var height = $('#canvas').height();


  ////////////////////////////////////////////////////////////
  //////////////////// Rendering Function ////////////////////
  ////////////////////////////////////////////////////////////
  var specrend = function(r, n) {
    var randomColor = function(){
      return Math.floor(Math.random() * 250);
    
      /*return 'rgb('
              + (Math.floor(Math.random() * 256)) + ','
              + (Math.floor(Math.random() * 256)) + ','
              + (Math.floor(Math.random() * 256)) + ')';*/
      //return Math.floor(Math.random()*16777215).toString(16);
    };
    var nodeOpacity = function(){
      return 1;
    };

    var nodeStyle = {
      "fill": "rgb(0," + randomColor() + ", 255)",
      "stroke-width": 1,
      "r" : "18px",
      "opacity": nodeOpacity(),
      "stroke-width": 0
    };

    var labelStyle = {
      "font-size": "12px",
      "font-weight": "bolder",
      "fill": "#000",
      "y": 30
    }

    var set = r.set()
      //.push(r.rect(-30, -13, 62, 40).attr(nodeStyle))
      .push(r.circle(0,0,0).attr(nodeStyle))
      .push(r.text(0,37,n.label).attr(labelStyle));
    return set;
  };

  ////////////////////////////////////////////////////////////

  var randomColor = function(){
    return Math.floor(Math.random() * 256);

    /*return 'rgb('
              + (Math.floor(Math.random() * 256)) + ','
              + (Math.floor(Math.random() * 256)) + ','
              + (Math.floor(Math.random() * 256)) + ')';*/
    //return Math.floor(Math.random()*16777215).toString(16);
  };

  /*var edgeStyle = {
    //directed: true,
    //weight: 5,
    //"fill": 'rgb(' + 0 + ',' + 255 + ',' + 255 + ')'
    //label: "hi lol",
  };*/
  

  g = new Graph();

  g.addNode("1",{
    label: "Ian",
    render: specrend
  });
  g.addNode("2",{
    label: "Sam",
    render: specrend
  });
  g.addNode("3",{
    label: "Deepthi",
    render: specrend
  });
  g.addNode("4",{
    label: "Lukas",
    render: specrend
  });
  g.addNode("5",{
    label: "Jacob",
    render: specrend
  });

  for(var i = 0; i < 5; i++){
    eval('var edgeStyle'+i+'={directed: true, stroke: "rgb(0," + randomColor() + ", 255)"};');
  }

  g.addEdge("1","2",edgeStyle0);
  g.addEdge("2","3",edgeStyle1);
  g.addEdge("3","1",edgeStyle2);
  g.addEdge("4","3",edgeStyle3);
  g.addEdge("5","2",edgeStyle4);


  // layout the graph using the Spring layout implementation
  var layouter = new Graph.Layout.Spring(g);

  // styling edges

  /*for(e in g.edges) {
    //g.edges[e].style.fill = "white";
    g.edges[e].style.stroke = "black";
  }*/


  // draw the graph using the RaphaelJS draw implementation

  renderer = new Graph.Renderer.Raphael('canvas', g, width, height);

  redraw = function() {
    layouter.layout();
    renderer.draw();
  };

};

