am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

/**
 * The XYChart for transit schema
 */

// Create chart instance
let chart = am4core.create("chartdiv", am4charts.XYChart);
chart.padding(0, 0, 0, 0);

// Title
let title = chart.tooltipContainer.createChild(am4core.Label);
/* title.text = "BLAHHHHHH"; */
title.fill = am4core.color("#00254b");
title.fontSize = 25;
title.width = am4core.percent(100);
title.textAlign = "middle";
title.x = 10;
title.y = 10;

function createAxis(list) {
  let axis = list.push(new am4charts.ValueAxis());
  axis.min = 0;
  axis.max = 100;
  axis.strictMinMax = true;
  axis.renderer.grid.template.disabled = true;
  axis.renderer.labels.template.disabled = true;
  axis.renderer.baseGrid.disabled = true;
}

// Create axes
createAxis(chart.xAxes);
createAxis(chart.yAxes);

function createLine(name, color, data) {
  // Create series
  var series = chart.series.push(new am4charts.StepLineSeries());
  series.data = data;
  series.name = name;

  // Set up binding to data
  series.dataFields.valueX = "x";
  series.dataFields.valueY = "y";

  // Set up appearance
  series.stroke = color;
  series.strokeWidth = 2;
  series.connect = false;
  //series.tensionX = 0.5;
  //series.tensionY = 0.5;

  // Set up dash
  series.propertyFields.strokeDasharray = "dash";

  // Add bullets (stations)
  var bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.radius = 6;
  bullet.circle.fill = am4core.color("#fff");
  bullet.circle.stroke = am4core.color("#000");
  bullet.circle.strokeWidth = 2;
  bullet.circle.tooltipText = "{station}";

}

function createConnector(data) {
  // Create series
  var series = chart.series.push(new am4charts.LineSeries());
  series.data = data;
  series.hiddenInLegend = true;

  // Set up binding to data
  series.dataFields.valueX = "x";
  series.dataFields.valueY = "y";

  // Set up appearance
  series.stroke = am4core.color("#999");
  series.strokeWidth = 12;
  series.connect = false;

  // Add bullets (stations)
  var bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.radius = 6;
  bullet.circle.fill = am4core.color("#fff");
  bullet.circle.stroke = am4core.color("#000");
  bullet.circle.strokeWidth = 2;

  bullet.zIndex = -10;

}

const lineConstructor = (payload) => {
  for (let index = 0; index < 100; index++) {
    let color = (index % 5 === 0 ) ? '#ad7400': '#0023ad'
    createLine(
      index,
      am4core.color(color),
      [{
        station: index,
        x: 0,
        y: index
      }, {
        station: index,
        x: 100,
        y: index
      }]
    );
    
  }
}
const lineConstructor2 = (payload) => {
  for (let index = 0; index < 100; index++) {
    let color = (index % 5 === 0 ) ? '#ad7400': '#0023ad'
    createLine(
      index,
      am4core.color(color),
      [{
        station: index,
        x: index,
        y: 0
      }, {
        station: index,
        x: index,
        y: 100
      }]
    );
    
  }
}

  /* lineConstructor()
  lineConstructor2()
 */
/* 
20,81...31,81...32,79...42,79

27,22...2763
*/
createLine(
  "canada line ddddddddddds",
  am4core.color("#ed6ea7"),
  [
    { station: 'Bridgeport', x: 8.75, y: 39 },
    { station: 'Bridgeport', x: 12.30, y: 39 },
    { station: 'Bridgeport', x: 16.30, y: 39 },
    { station: 'Bridgeport', x: 22.75, y: 40.50 },
  ]
) ;
createLine(
  "canada line",
  am4core.color("#ed6ea7"),
  [
  { station: 'Brighhouse', x: 22.75, y: 23 }, 
  { station: 'Lansdowne', x: 22.75, y: 29 }, 
  { station: 'Aberdeen', x: 22.75, y: 34.75 },
  { station: 'Bridgeport', x: 22.75, y: 40.50 }, 
  { station: 'olympic', x: 22.75, y: 46 }, 
  { station: 'olympic', x: 22.75, y: 51.5 }, 
  { station: 'olympic', x: 22.75, y: 57.1 }, 
  { station: 'olympic', x: 22.75, y: 62.75 }, 
  { station: 'olympic', x: 22.75, y: 68.5 }, 
  { station: 'olympic', x: 22.75, y: 72.55 }]
);




chart.legend = new am4charts.Legend();
chart.legend.position = "right";

var bg = chart.plotContainer.createChild(am4core.Image);
bg.width = am4core.percent(100);
bg.height = am4core.percent(100);

bg.href = 'routetemplate.png'
}); // end am4core.ready()