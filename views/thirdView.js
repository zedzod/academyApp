$( () => {
    console.log( "ready!" );
const url = "https://football-academies.herokuapp.com/playersWorth";


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

getJSON( url,  function(err, data3) {
    if (err != null) {
        console.error(err);
    } else {
               data3.map((item)=>{
               	        var text = `_id: ${item._id}
                           content: ${JSON.stringify(item.my_winner[0])}`
        console.log(text);
               })
    }
    console.log(data3);
    dps = new Array ();
	for (var k in data3){
        dps.push({x: data3[k]._id ,
                 y: (parseFloat(data3[k].my_winner[0].MarketValue)/1000000),
                name: data3[k].my_winner[0].Name,
                academy: data3[k].my_winner[0].Academy,
                position: data3[k].my_winner[0].Position,
                current: data3[k].my_winner[0].CurrentClub,
                league: data3[k].my_winner[0].League,
                appearances: data3[k].my_winner[0].Appearances,
                goals: data3[k].my_winner[0].Goals,
                assists: data3[k].my_winner[0].Assists});

//Better to construct options first and then pass it as a parameter
var options = {
    backgroundColor: "#F0F0F0",
	animationEnabled: true,
	zoomEnabled: true,
	colorSet: "colorSet2",
	title:{
		text: "20 Best Players"
	},
	axisX: {
        minimum: 0,
        maximum: 100,
		title:"Effectiveness (in %)",      	
		suffix: "%",
		crosshair: {
			enabled: true,
			snapToDataPoint: true
		}
	},
	axisY:{
        minimum: -5,
		title: "Market Value",
		includeZero: false,
		gridThickness: 0,
		crosshair: {
			enabled: true,
			snapToDataPoint: true
		}
	},
	data: [{
        markerSize: 15,
		type: "scatter",
		toolTipContent: "<b>Name: </b>{name}<br/><b>Academy: </b>{academy}<br/><b>Position: </b>{position}<br/><b>Current Club: </b>{current}<br/><b>League: </b>{league}<br/><b>Appearances: </b>{appearances}<br/><b>Goals: </b>{goals}<br/><b>Assists: </b>{assists}",
		dataPoints: dps
	}]
};

$("#chartContainer3").CanvasJSChart(options);
    }});
})