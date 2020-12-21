am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create map instance
  var chart = am4core.create("chartdiv", am4maps.MapChart);
  
  // Set map definition
  chart.geodata = am4geodata_worldLow;
  
  // Set projection
  chart.projection = new am4maps.projections.NaturalEarth1();
  
  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.mapPolygons.template.strokeWidth = 0.5;
  /* 
  CAD : 'CA',
  HKD : 'HK',
  ISK : 'IS',
  PHP : 'PH',
  DKK : 'DK',
  HUF : 'HU',
  CZK : 'CZ',
  GBP : 'GB',
  RON : 'RO',
  SEK : 'SE',
  IDR : 'ID',
  INR : 'IN',
  BRL : 'BR',
  RUB : 'RU',
  HRK : 'HR',
  JPY : 'JP',
  THB : 'TH',
  CHF : 'CH',
  EUR : 'EUROPEAN_UNION',
  MYR : 'MY',
  BGN : 'BG',
  TRY : 'TR',
  CNY : 'CN',
  NOK : 'NO',
  NZD : 'NZ',
  ZAR : 'ZA',
  USD : 'US',
  MXN : 'MX',
  SGD : 'SG',
  AUD : 'AU',
  ILS : 'IL',
  KRW : 'KR',
  PLN : 'PL'
}
  */
  // Exclude Antartica
  polygonSeries.include = ['CA',
  'HK',
  'IS',
  'PH',
  'DK',
  'HU',
  'CZ',
  'GB',
  'RO',
  'SE',
  'ID',
  'IN',
  'BR',
  'RU',
  'HR',
  'JP',
  'TH',
  'CH',
  'MY',
  'BG',
  'TR',
  'CN',
  'NO',
  'NZ',
  'ZA',
  'US',
  'MX',
  'SG',
  'AU',
  'IL',
  'KR',
  'PL',
  'EU']
  
  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;
  
  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill = chart.colors.getIndex(0);
  
  // Create hover state and set alternative fill color
  var hs = polygonTemplate.states.create("hover");
  hs.properties.fill = chart.colors.getIndex(2);
  
  // Create active state
  var activeState = polygonTemplate.states.create("active");
  activeState.properties.fill = chart.colors.getIndex(4);
  
  // Create an event to toggle "active" state
  polygonTemplate.events.on("hit", function(ev) {
    ev.target.isActive = !ev.target.isActive;
  })
  
  
  var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
  
  }); // end am4core.ready()