var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
// chart.geodata = am4geodata_region_canada_bcLow;
try {
  chart.geodata = am4geodata_region_canada_bcLow;
}
catch (e) {
  chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
}
// Set projection
chart.projection = new am4maps.projections.Miller();


// zoomout on background click
// chart.chartContainer.background.events.on("hit", function () { zoomOut() });
// var colorSet = new am4core.ColorSet();
// var morphedPolygon;


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
  mapPolygonTemplate.stroke = am4core.color("#03fcc6");
  mapPolygonTemplate.strokeOpacity = .9;
  mapPolygonTemplate.fill = am4core.color(group.color);
  mapPolygonTemplate.fillOpacity = 0.9;
  mapPolygonTemplate.nonScalingStroke = true;
  mapPolygonTemplate.tooltipPosition = "fixed"

  // desaturate filter for countries
  var desaturateFilter = new am4core.DesaturateFilter();
  desaturateFilter.saturation = 0.45;
  mapPolygonTemplate.filters.push(desaturateFilter);

  // set fillOpacity to 1 when hovered
  var hoverState = mapPolygonTemplate.states.create("hover");
  hoverState.properties.fillOpacity = 1;


  // what to do when country is clicked
  mapPolygonTemplate.events.on("hit", function (event) {
    event.target.zIndex = 1000000;
    selectPolygon(event.target);
  })

  // Pie chart
  var pieChart = chart.seriesContainer.createChild(am4charts.PieChart);
  // Set width/heigh of a pie chart for easier positioning only
  pieChart.width = 100;
  pieChart.height = 100;
  pieChart.hidden = true; // can't use visible = false!
  // because defaults are 50, and it's not good with small districts
  pieChart.chartContainer.minHeight = 1;
  pieChart.chartContainer.minWidth = 1;

  var pieSeries = pieChart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "value";
  pieSeries.dataFields.category = "category";
  pieSeries.data = [{ value: 100, category: "First" }, { value: 20, category: "Second" }, { value: 10, category: "Third" }];
  
  var dropShadowFilter = new am4core.DropShadowFilter();
  dropShadowFilter.blur = 4;
  pieSeries.filters.push(dropShadowFilter);

  var sliceTemplate = pieSeries.slices.template;
  sliceTemplate.fillOpacity = 1;
  sliceTemplate.strokeOpacity = 0;

  var activeState = sliceTemplate.states.getKey("active");
  activeState.properties.shiftRadius = 0; // no need to pull on click, as country circle under the pie won't make it good
  
  var sliceHoverState = sliceTemplate.states.getKey("hover");
  sliceHoverState.properties.shiftRadius = 0; // no need to pull on click, as country circle under the pie won't make it good
  
  // we don't need default pie chart animation, so change defaults
  var hiddenState = pieSeries.hiddenState;
  hiddenState.properties.startAngle = pieSeries.startAngle;
  hiddenState.properties.endAngle = pieSeries.endAngle;
  hiddenState.properties.opacity = 0;
  hiddenState.properties.visible = false;

  /* 
  mapPolygonTemplate.events.on("out", function(event) {
    series.mapPolygons.each(function(mapPolygon) {
      mapPolygon.isHover = false;
    })
  })
  
  mapPolygonTemplate.events.on("over", function(event) {
      series.mapPolygons.each(function(mapPolygon) {
        mapPolygon.isHover = true;
      })
      event.target.isHover = false;
      event.target.isHover = true;
    }) */
  // States  
 /*  var hoverState = mapPolygonTemplate.states.create("hover");
  hoverState.properties.fill = am4core.color("#e8115d"); */

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
// mapPolygonTemplate.useGeodata = true;//maybe redundant

console.table(am4geodata_region_canada_bcLow)
// Configure series
// var polygonTemplate = polygonSeries.mapPolygons.template;
// polygonTemplate.tooltipText = "{id}";
// polygonTemplate.fill = am4core.color("#74B266");

// Create hover state and set alternative fill color
// var hs = polygonTemplate.states.create("hover");
// hs.properties.fill = am4core.color("#367B25");