var radarChartData = {
		labels: ["Deepthi", "Jacob", "Ian", "Lukas", "Sam"],
		datasets: [
			{
				label: "My First dataset",
				fillColor: "rgba(255,140,70,0.5)",
				strokeColor: "rgba(255,140,70,1)",
				pointColor: "rgba(255,140,70,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [1,5,3,2,4]
			},
			{
				label: "My Second dataset",
				fillColor: "rgba(35,35,125,0.2)",
				strokeColor: "rgba(35,35,125,1)",
				pointColor: "rgba(35,35,125,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: [4,4,3,1,5]
			}
		]
	};

$('document').ready(function(){

	window.onload = function(){
		window.myRadar = new Chart(document.getElementById("graphJS").getContext("2d")).Radar(radarChartData, {
			responsive: true
		});
	}

});