
import React, { useRef, useLayoutEffect } from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_canadaLow from '@amcharts/amcharts4-geodata/canadaLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import useWindowDimensions from './useWindowDimensions'

/* import am4themes_dark from '@amcharts/amcharts4/themes/dark';
 */ am4core.useTheme(am4themes_animated);

export default function CanadaMap(props) {
  const { height, width } = useWindowDimensions();
  const chart = useRef(null);
  // Themes begin
  useLayoutEffect(() => {
  
  var chart = am4core.create("chartdiv", am4maps.MapChart)
  
  // Set map definition
  chart.geodata = am4geodata_canadaLow
  
  // Set projection
  chart.projection = new am4maps.projections.Miller();
  
  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
/*   polygonSeries.geodata = am4geodata_canadaLow */
  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;
  
  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill =  chart.colors.getIndex(9);/* am4core.getIndex(10); */
  /* 
  usPolygonTemplate.nonScalingStroke = true;
  */
  
  // Create hover state and set alternative fill color
  var hs = polygonTemplate.states.create("hover");
  hs.properties.fill = chart.colors.getIndex(9)

  
  

  return () => {
      chart.dispose();
    };
  }, []); 
    let x = height+'px'
  let y = width+'px'
  console.log(x, width)
  return(
    <div id="chartdiv" style={{ width: y,height: x}}></div>
  )
}