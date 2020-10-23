// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
polygonSeries.exclude = ["AQ"];

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#74B266");

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");

polygonSeries.mapPolygons.template.events.on("hit", function(ev) {
  
  // Get chart object
  var chart = ev.target.series.chart;
  
  // Zoom to clicked element
  chart.zoomToMapObject(ev.target);
  
  // Transition to state map of it's U.S.
  if (ev.target.dataItem.dataContext.id == "US") {
    setTimeout(function() {
      chart.geodata = am4geodata_usaLow;
      chart.goHome(0);
    }, chart.zoomDuration + 100);
  }
});