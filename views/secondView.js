
$( () => {
    console.log( "ready!" );
const url = "https://football-academies.herokuapp.com/leaguesWorth";


var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};

getJSON( url,  function(err, data2) {
    if (err != null) {
        console.error(err);
    } else {
               data2.map((item)=>{
               	        var text = `_id: ${item._id}
					totalValue: ${item.totalValue}`
        console.log(text);
               })
    }

    dps = new Array ();
	for (var k in data2){
		dps.push({label: data2[k]._id , y: parseFloat(data2[k].totalValue)});
    }
var options = {
 
    backgroundColor: "#F0F0F0",
	title: {
		text: "Best league"
	},
	data: [{
            indexLabelFontSize: 20,
			type: "pie",
			startAngle: 45,
			showInLegend: "true",
			legendText: "{label}",
			indexLabel: "{label} ({y})",
            yValueFormatString:"#,##0.#"%"",
            dataPoints: dps
	}]
};
$("#chartContainer2").CanvasJSChart(options).render();

});
})
