
import React, { useRef, useLayoutEffect } from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
/* import am4geodata_canadaLow from '@amcharts/amcharts4-geodata/canadaLow'; */
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
  
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.geodata = am4geodata_region_canada_canadaCountiesLow
  polygonSeries.useGeodata = true;
  
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill =  chart.colors.getIndex(9);/* am4core.getIndex(10); */

  polygonTemplate
    .states.create("hover")
    .properties
    .fill = chart.colors.getIndex(9)

  return () => {
      chart.dispose();
    };
  }, []); 

  return(
    <div id="chartdiv" style={{ width: widthResized,height: heightResized}}></div>
  )
}