import React from "react";
import ReactApexChart from "react-apexcharts";
function Area(props) {
  const series = [{ name: "", data: props.data }];

  const options = {
    chart: {
      type: "area",
      height: 270,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      show: true,
      colors: ["#7694FF"],
      width: 1,
    },

    

    labels: ["EX", "A", "B", "C", "D", "P", "F"],

    legend: {
      horizontalAlign: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0,
        opacityTo: 0.4,
        inverseColors: true,
      },
    },
    markers: {
      size: 6,
      colors: "#FFFFFF",

      strokeColors: "#7694FF",
    },

    yaxis: {
      
      labels: {
        style: {
          colors: ["#9C9C9C"],
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: [
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
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={270}
      />
    </div>
  );
}
export default Area;
