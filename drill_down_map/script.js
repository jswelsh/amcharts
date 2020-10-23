// Create map instance
am4core.useTheme(am4themes_animated);

// Create map instance
let chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// World series
let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
worldSeries.exclude = ["AQ"];
worldSeries.useGeodata = true;
worldSeries.mapPolygons.template.tooltipText = "{name}";
worldSeries.mapPolygons.template.fill = am4core.color("#74B266");

let worldHover = worldSeries.mapPolygons.template.states.create("hover");
worldHover.properties.fill = am4core.color("#367B25");

// Country series
let countrySeries = chart.series.push(new am4maps.MapPolygonSeries());
countrySeries.mapPolygons.template.tooltipText = "{name}";
countrySeries.mapPolygons.template.fill = am4core.color("#74B266");
countrySeries.hide();

let countryHover = countrySeries.mapPolygons.template.states.create("hover");
countryHover.properties.fill = am4core.color("#367B25");

// Add hit events
worldSeries.mapPolygons.template.events.on("hit", function(ev) {
  
  // Get chart object
  let chart = ev.target.series.chart;
  
  // Zoom to clicked element
  chart.zoomToMapObject(ev.target);
  
  // Transition to state map of it's U.S.
  if (ev.target.dataItem.dataContext.id == "US") {
    worldSeries.hide();
    countrySeries.geodata = am4geodata_usaLow;
    countrySeries.show();
    back.show();

  }
});

let back = chart.createChild(am4core.ZoomOutButton);
back.align = "right";
back.hide();
back.events.on("hit", function(ev) {
  worldSeries.show();
  chart.goHome();
  countrySeries.hide();
  back.hide();
});