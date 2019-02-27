$( () => {
    console.log( "ready!" );
const url = "https://football-academies.herokuapp.com/academiesWorth";

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
const topandbottom= (data,qty=6)=>{
	var newData;
	newData = data.slice(0,qty);
	newData = newData.concat(data.slice(37-qty,37));
	console.log(newData);
	return newData;
}
getJSON( url,  function(err, data1) {
    if (err != null) {
        console.error(err);
    } else {
               data1.map((item)=>{
               	        var text = `_id: ${item._id}
					totalValue: ${item.totalValue}`
               })
	}

dps = new Array ();
	for (var k in data1){
		dps.push({label: data1[k]._id , y: parseFloat(data1[k].totalValue)});
	}
dps.sort(function(a,b){return a.y - b.y});
dps = topandbottom(dps)

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	backgroundColor: "transparent",
	title:{
		text:"Top & Buttom Academies",
		fontColor:"#fff"
	},
	axisX:{
		interval: 1,
		labelFontSize: 16,
		labelFontColor: "#ffffff",
		labelFontWeight: "bold",
		lineThickness: 3,
		tickLength: 15,
		tickColor:"#ffffff",
		tickThickness: 2,
        lineColor: "#000000"
	},
	axisY2:{
		labelFontSize: 16,
		labelFontColor: "#ffffff",
		labelFontWeight: "bold",
		gridColor: "#ffffff",
		lineThickness: 3,
		tickLength: 15,
		tickColor:"#ffffff",
		tickThickness: 2,
        lineColor: "#000000"
	},
	data: [{
		type: "bar",
		name: "academies",
		axisYType: "secondary",
		color: "#d9d9d9",
		toolTipContent: "<b>academies</b>: {label} <br> <b>totalValue</b>: {y}",
		dataPoints: dps
	}]
});
chart.render();
});
});