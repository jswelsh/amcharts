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
const chart = am4core.create("chartdiv", am4maps.MapChart);
chart.projection = new am4maps.projections.Miller();

// Create map polygon series for world map
const worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
worldSeries.useGeodata = true;
worldSeries.geodata = am4geodata_worldLow;
worldSeries.exclude = ["AQ"];

const  worldPolygon = worldSeries.mapPolygons.template;
worldPolygon.tooltipText = "{name}";
worldPolygon.nonScalingStroke = true;
worldPolygon.strokeOpacity = 0.5;
worldPolygon.fill = am4core.color("#740202");
worldPolygon.propertyFields.fill = "color";

worldPolygon
  .states
  .create("hover")
  .properties
  .fill = chart.colors.getIndex(9);


// Create country specific series (but hide it for now)
const countrySeries = chart.series.push(new am4maps.MapPolygonSeries());
countrySeries.useGeodata = true;
countrySeries.hide();
countrySeries.geodataSource.events.on("done", function(ev) {
  worldSeries.hide();
  countrySeries.show();
});

const countryPolygon = countrySeries.mapPolygons.template;
countryPolygon.tooltipText = "{name}";
countryPolygon.nonScalingStroke = true;
countryPolygon.strokeOpacity = 0.5;
countryPolygon.fill = am4core.color("#eee");

countryPolygon
  .states
  .create("hover")
  .properties
  .fill = chart.colors.getIndex(9);
// Set up click events
worldPolygon.events.on("hit", function(ev) {
  drillDown(ev.target)
});

const drillDown = (target) => {
  target.series.chart.zoomToMapObject(target);
  const map = target.dataItem.dataContext.map;
  if (map) {
    target.isHover = false;
    countrySeries.geodataSource.url = "https://cdn.amcharts.com/lib/4/geodata/json/" + map + ".json";
    countrySeries.geodataSource.load();
    back.show();
  }
}

// Set up data for countries
const data = [];
for(const id in am4geodata_data_countries2) {
  if (am4geodata_data_countries2.hasOwnProperty(id)) {
    const country = am4geodata_data_countries2[id];
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
const back = chart.createChild(am4core.ZoomOutButton);
back.align = "right";
back.hide();
back.events.on("hit", function(ev) {
  worldSeries.show();
  chart.goHome();
  countrySeries.hide();
  back.hide();
});


let currentHover;

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