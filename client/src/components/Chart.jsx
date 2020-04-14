import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Chart extends Component {
  titleStyle = {
    fontSize: "20px"
  };
  render() {
    const {
      title,
      label1,
      label2,
      label3,
      labels,
      data1,
      data2,
      data3,
      position,
      height,
      dType
    } = this.props;
    const config1 = {
      labels: labels,
      datasets: [
        {
          label: label1,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(130, 96, 6)",
          borderColor: "rgb(130, 96, 6)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(130, 96, 6)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(130, 96, 6)",
          pointHoverBorderColor: "rgb(130, 96, 6)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data1
        }
      ]
    };

    const config2 = {
      labels: labels,
      datasets: [
        {
          label: label1,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(234, 178, 25)",
          borderColor: "rgb(234, 178, 25)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(234, 178, 25)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(234, 178, 25)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data1
        },
        {
          label: label2,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(65, 132, 168)",
          borderColor: "rgb(65, 132, 168)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(65, 132, 168)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(65, 132, 168)",
          pointHoverBorderColor: "rgb(65, 132, 168)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data2
        }
      ]
    };

    const config3 = {
      labels: labels,
      datasets: [
        {
          label: label1,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(234, 178, 25)",
          borderColor: "rgb(234, 178, 25)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(234, 178, 25)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(234, 178, 25)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data1
        },
        {
          label: label2,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(65, 132, 168)",
          borderColor: "rgb(65, 132, 168)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(65, 132, 168)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(65, 132, 168)",
          pointHoverBorderColor: "rgb(65, 132, 168)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data2
        },
        {
          label: label3,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(130, 96, 6)",
          borderColor: "rgb(130, 96, 6)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(130, 96, 6)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(130, 96, 6)",
          pointHoverBorderColor: "rgb(130, 96, 6)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data3
        }
      ]
    };

    function dataType(number) {
      if (number === 2) {
        return config2;
      } else if (number === 3) {
        return config3;
      } else {
        return config1;
      }
    }

    function getHeight() {
      if (height) {
        return height;
      } else {
        if (window.matchMedia("(max-width: 700px)").matches) {
          // If media query matches
          return 80;
        } else {
          return 50;
        }
      }
    }

    return (
      <div className={"col " + position}>
        <p className="center" style={this.titleStyle}>
          {title}
        </p>
        <Line data={dataType(dType)} width={100} height={getHeight()} />
      </div>
    );
  }
}

export default Chart;
