var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_region_canada_bcLow;

// Set projection
chart.projection = new am4maps.projections.Miller();



var groupData = [
  {
    "name": "North East/Nechako",
    "color": chart.colors.getIndex(0),
    "data": [
      { id: "5959" },
      { id: "5955" }]
  },
  {
    "name": "North Coast",
    "color": chart.colors.getIndex(1),
    "data": [
      { id: "5957" },
      { id: "5949" },
      { id: "5951" },
      { id: "5947" }, ]
  },
  {
    "name": "Cariboo",
    "color": chart.colors.getIndex(2),
    "data": [
      { id: "5953" }, 
      { id: "5941" }]
  },
  {
    "name": "Thompson-Okanagan",
    "color": chart.colors.getIndex(3),
    "data": [
      { id: "5939" },
      { id: "5937" }, 
      { id: "5935" },
      { id: "5933" },
      { id: "5907" },]
  },  
  {
    "name": "Kootenay",
    "color": chart.colors.getIndex(4),
    "data": [
      { id: "5901" },
      { id: "5903" },
      { id: "5905" },]
  },  
  {
    "name": "Mainland/South West",
    "color": chart.colors.getIndex(5),
    "data": [
      { id: "5909" },
      { id: "5915" },
      { id: "5929" },
      { id: "5931" },]
  },  
  {
    "name": "Vancouver Island/Coast",
    "color": chart.colors.getIndex(6),
    "data": [
      { id: "5945" },
      { id: "5943" },
      { id: "5927" },
      { id: "5926" },
      { id: "5924" },
      { id: "5923" },
      { id: "5921" },
      { id: "5919" },
      { id: "5917" },
    ]
  }
]

groupData.forEach(function(group) {
  var series = chart.series.push(new am4maps.MapPolygonSeries())
  series.name = group.name;
  series.useGeodata = true;
  var includedCountries = [];
  group.data.forEach(function(district) {
    includedCountries.push(district.id);
    // excludedCountries.push(district.id);
  });
  series.include = includedCountries;

  series.fill = am4core.color(group.color);

  series.setStateOnChildren = true;
  series.calculateVisualCenter = true;


  // district shape properties & behaviors
  var mapPolygonTemplate = series.mapPolygons.template;
  // Instead of our custom title, we could also use {name} which comes from geodata  
  mapPolygonTemplate.fill = am4core.color(group.color);
  mapPolygonTemplate.fillOpacity = 0.8;
  mapPolygonTemplate.nonScalingStroke = true;
  mapPolygonTemplate.tooltipPosition = "fixed"

  mapPolygonTemplate.events.on("over", function(event) {
    series.mapPolygons.each(function(mapPolygon) {
      mapPolygon.isHover = true;
    })
    event.target.isHover = false;
    event.target.isHover = true;
  })

  mapPolygonTemplate.events.on("out", function(event) {
    series.mapPolygons.each(function(mapPolygon) {
      mapPolygon.isHover = false;
    })
  })

  // States  
  var hoverState = mapPolygonTemplate.states.create("hover");
  hoverState.properties.fill = am4core.color("#e8115d");

  // Tooltip
  mapPolygonTemplate.tooltipText = "{CDNAME}"; // enables tooltip
  // series.tooltip.getFillFromObject = false; // prevents default colorization, which would make all tooltips red on hover
  // series.tooltip.background.fill = am4core.color(group.color);

  // MapPolygonSeries will mutate the data assigned to it, 
  // we make and provide a copy of the original data array to leave it untouched.
  // (This method of copying works only for simple objects, e.g. it will not work
  //  as predictably for deep copying custom Classes.)
  series.data = JSON.parse(JSON.stringify(group.data));
});




// Create map polygon series
// var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

console.table(am4geodata_region_canada_bcLow)
// Configure series
// var polygonTemplate = polygonSeries.mapPolygons.template;
// polygonTemplate.tooltipText = "{id}";
// polygonTemplate.fill = am4core.color("#74B266");

// Create hover state and set alternative fill color
// var hs = polygonTemplate.states.create("hover");
// hs.properties.fill = am4core.color("#367B25");