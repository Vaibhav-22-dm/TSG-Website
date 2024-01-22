import React from "react";
import ReactApexChart from "react-apexcharts";
import classes from "./GcGraph.module.css"
function Bar(props) {
  const options = {
    chart: {
      type: "bar",
      height: 600,
      toolbar: {
        show: false
      },
      stacked: true,
      
      zoom: {
        enabled: true,
      },
    },
  
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    labels: props.label,
    legend: {
      position: "right",
      offsetY: 40,
      markers: {
        radius: 50,
      },
    },
    
    yaxis: {
      labels: {
        style: {
          colors: ["#9C9C9C"],
        },
      },
    },
    grid: {
      show: true,
      strokeDashArray: 6,
      borderColor: "#9C9C9C",
    },

    fill: {
      opacity: 1,
    },
    colors: props.colors,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        
      },
    },
    dataLabels: {
      enabled: false,
    },

    xaxis: {
      labels: {
        style: {
          fontFamily: "Poppins",
          colors: [
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
            "#9C9C9C",
          ],
        },
      },
    },
  };

  return (
    <div className={classes.hidden}>
   
    <div className={classes.scroll}>
    <span className={classes.font}>Points Tally General Championship</span>
    <span className={classes.font1} >Year:{props.year}</span>
      <ReactApexChart
        options={options}
        series={props.series}
        type="bar"
        height={600}
      />
    </div>
    </div>
  );
}
export default Bar;
