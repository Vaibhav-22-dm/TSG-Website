import React from "react";
import ReactApexChart from "react-apexcharts";
import classes from "./CdcGraph.module.css";


function Graph(props) {
  const series = [
    {
      name: "B.TECH",
      data: props.data.ar1,
      
    },
    
    {
      name: "M.TECH",
      data: props.data.ar2,
    },
    {
      name: "DUAL",
      data: props.data.ar3,
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false
      }
    },colors: ['#27E0BC', '#FDC0A8','#B6A2EF'],
   
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        borderRadius:4
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "AE",
        "AG",
        "BT",
        "CE",
        "CH",
        "CS",
        "EC",
        "EE",
        "GS",
        "IE",
        "IM",
        "MA",
        "ME",
        "MF",
        "MI",
        "MT",
        "NA",
      ],
      tickPlacement: "on",
      labels: {
        
        style: {
          colors: ['#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C','#9C9C9C']}
    }
    
        
    },grid: {
      show: true,
      strokeDashArray: 6,
      borderColor: '#9C9C9C'},

    yaxis: {
     
      labels: {
        
          style: {
            colors: ['#9C9C9C']}
      }
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: 'right',
      markers: {
        radius:50
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  return (
    
      
      <div className={classes.hidden}>
        <div className={classes.scroll}>
        <h1 className={classes.name}>Chart Name</h1>
          <ReactApexChart className={classes.graph}
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      </div>
   
  );
}
export default Graph;
