import React from "react";
import ReactApexChart from "react-apexcharts";
import classes from "./Gradedonut.module.css";
function Chart(props) {
  const series = props.data;

  const options = {
    chart: {
      width: 300,
      type: "donut",
      offsetX: 0,
    },
    labels: ["EX", "A", "B", "C", "D", "P", "F"],

    plotOptions: {
      pie: {
        customScale: 0.7,
        startAngle: 60,
        endAngle: 420,
        donut: {
          size: "90%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "30px",
            },
            value: {
              show: true,
              fontSize: "30px",
            },
            total: {
              show: true,
              fontSize: "30px",
              color: "rgba(118, 148, 255, 1)",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },

    colors: [
      "rgba(118, 148, 255, 1)",
      "rgba(118, 148, 255, 0.85)",
      "rgba(118, 148, 255, 0.7)",
      "rgba(118, 148, 255, 0.5)",
      "rgba(118, 148, 255, 0.3)",
      "rgba(118, 148, 255, 0.2)",
      "rgba(118, 148, 255, 0.11)",
    ],

    legend: {
      show: false,
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },
    title: {
      text: " ",
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            customScale: 0.7,
          },
        },
      },
    ],
  };

  return (
    <div className={classes.container}>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width={300}
      ></ReactApexChart>
    </div>
  );
}
export default Chart;
