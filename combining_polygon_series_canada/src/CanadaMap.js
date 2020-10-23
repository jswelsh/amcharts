
import React, { useRef, useLayoutEffect } from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_canadaLow from '@amcharts/amcharts4-geodata/canadaLow';
import am4geodata_region_canada_canadaCountiesLow from '@amcharts/amcharts4-geodata/region/canada/canadaCountiesLow'
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import useWindowDimensions from './useWindowDimensions'

  am4core.useTheme(am4themes_animated);

export default function CanadaMap(props) {
  //used for fixing the map to current viewwindow size
  const { height, width } = useWindowDimensions();
  let heightResized = (height-25)+'px'
  let widthResized = (width-25)+'px'

  const chart = useRef(null);

  useLayoutEffect(() => {
  
  var chart = am4core.create("chartdiv", am4maps.MapChart)
  
  chart.geodata = am4geodata_region_canada_canadaCountiesLow
  chart.projection = new am4maps.projections.Miller();
  
  let districtSeries = chart.series.push(new am4maps.MapPolygonSeries());
  districtSeries.geodata = am4geodata_region_canada_canadaCountiesLow;
  districtSeries.useGeodata = true;

  districtSeries.mapPolygons.template.events.on("over", function(event) {
    event.target.zIndex = Number.MAX_VALUE;
    event.target.toFront();
  });

  let provincialSeries = chart.series.push(new am4maps.MapPolygonSeries());
  provincialSeries.geodata = am4geodata_canadaLow;
  provincialSeries.mapPolygons.template.fillOpacity = 0;
  provincialSeries.mapPolygons.template.strokeWidth = 2;
  provincialSeries.mapPolygons.template.stroke = chart.colors.getIndex(7);
  provincialSeries.mapPolygons.template.interactionsEnabled = false;
  
  
  var polygonTemplate = districtSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill =  chart.colors.getIndex(18);/* am4core.getIndex(10); */

  let hoverState = districtSeries.mapPolygons.template.states.create("hover");
  hoverState.properties.fill = chart.colors.getIndex(4);
  hoverState.properties.stroke =chart.colors.getIndex(25);
  hoverState.properties.strokeWidth = 5;
/*   polygonTemplate
    .states.create("hover")
    .properties
    .fill = chart.colors.getIndex(7) */

  return () => {
      chart.dispose();
    };
  }, []); 

  return(
    <div id="chartdiv" style={{ width: widthResized,height: heightResized}}></div>
  )
}