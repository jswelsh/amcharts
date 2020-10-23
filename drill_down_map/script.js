/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

const continents = {
  "AF": 0,
  "AN": 1,
  "AS": 2,
  "EU": 3,
  "NA": 4,
  "OC": 5,
  "SA": 6
}

// Themes begin
am4core.useTheme(am4themes_animated);

/* Create map instance */
let chart = am4core.create("chartdiv", am4maps.MapChart);
chart.projection = new am4maps.projections.Miller();

// Create map polygon series for world map
let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
worldSeries.useGeodata = true;
worldSeries.geodata = am4geodata_worldLow;
worldSeries.exclude = ["AQ"];

let  worldPolygon = worldSeries.mapPolygons.template;
worldPolygon.tooltipText = "{name}";
worldPolygon.nonScalingStroke = true;
worldPolygon.strokeOpacity = 0.5;
worldPolygon.fill = am4core.color("#eee");
worldPolygon.propertyFields.fill = "color";

var hs = worldPolygon.states.create("hover");
hs.properties.fill = chart.colors.getIndex(9);


// Create country specific series (but hide it for now)
let countrySeries = chart.series.push(new am4maps.MapPolygonSeries());
countrySeries.useGeodata = true;
countrySeries.hide();
countrySeries.geodataSource.events.on("done", function(ev) {
  worldSeries.hide();
  countrySeries.show();
});

let countryPolygon = countrySeries.mapPolygons.template;
countryPolygon.tooltipText = "{name}";
countryPolygon.nonScalingStroke = true;
countryPolygon.strokeOpacity = 0.5;
countryPolygon.fill = am4core.color("#eee");

var hs = countryPolygon.states.create("hover");
hs.properties.fill = chart.colors.getIndex(9);
// Set up click events
worldPolygon.events.on("hit", function(ev) {
  drillDown(ev.target)
});

function drillDown(target) {
  target.series.chart.zoomToMapObject(target);
  var map = target.dataItem.dataContext.map;
  if (map) {
    target.isHover = false;
    countrySeries.geodataSource.url = "https://cdn.amcharts.com/lib/4/geodata/json/" + map + ".json";
    countrySeries.geodataSource.load();
    back.show();
  }
}

// Set up data for countries
var data = [];
for(var id in am4geodata_data_countries2) {
  if (am4geodata_data_countries2.hasOwnProperty(id)) {
    var country = am4geodata_data_countries2[id];
    if (country.maps.length) {
      data.push({
        id: id,
        color: chart.colors.getIndex(continents[country.continent_code]),
        map: country.maps[0]
      });
    }
  }
}
worldSeries.data = data;

// Add zoomout button
var back = chart.createChild(am4core.ZoomOutButton);
back.align = "right";
back.hide();
back.events.on("hit", function(ev) {
  worldSeries.show();
  chart.goHome();
  countrySeries.hide();
  back.hide();
});


var currentHover;

worldPolygon.events.on("over", function(ev) {
  currentHover = ev.target;
});

worldPolygon.events.on("out", function(ev) {
  if (currentHover == ev.target) {
    currentHover = undefined;
  }
});


chart.chartContainer.events.on("wheel", function(ev) {
  if ((chart.zoomLevel > 2) && currentHover) {
    drillDown(currentHover);
  }
});;