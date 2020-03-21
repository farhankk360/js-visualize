import React, { Component } from "react";
import * as d3 from "d3";
import {
  Segment,
  Button,
  Header,
  Message,
  Loader,
  Icon
} from "semantic-ui-react";
import radialChartData from "./radialChartData";

export default class QuickSort extends Component {
  state = {
    width: 1600,
    height: 760,
    innerRadius: 120,
    outerRadius: 780 / 2,
    data: radialChartData
  };

  componentDidMount() {
    this.prepareChart();
  }

  prepareChart = () => {
    let { width, height, data } = this.state;

    const z = d3
      .scaleOrdinal()
      .range([
        "#98abc5",
        "#8a89a6",
        "#7b6888",
        "#6b486b",
        "#a05d56",
        "#d0743c",
        "#ff8c00"
      ]);

    const cols = [
      // "State",
      "Under 5 Years",
      "5 to 13 Years",
      "14 to 17 Years",
      "18 to 24 Years",
      "25 to 44 Years",
      "45 to 64 Years",
      "65 Years and Over"
      // "total"
    ];

    z.domain(cols);

    const groups = this.svg
      .append("g")
      .attr("id", "group")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .append("g")
      .selectAll("g")
      .data(d3.stack().keys(cols)(data), d => d)
      .enter()
      .append("g")
      .attr("class", "quick-sort col")
      .attr("fill", d => z(d.key));

    this.drawRadialChart(data);
  };

  drawRadialChart = data => {
    let { innerRadius, outerRadius } = this.state;

    const x = d3
      .scaleBand()
      .range([0, 2 * Math.PI])
      .align(0);

    x.domain(
      data.map(function(d) {
        return d.State;
      })
    );

    const y = this.scaleRadial(data, innerRadius, outerRadius);

    y.domain([
      0,
      d3.max(data, function(d) {
        return d.total;
      })
    ]);

    const arc = d3
      .arc()
      .innerRadius(d => y(d[0]))
      .outerRadius(d => y(d[1]))
      .startAngle(d => x(d.data.State))
      .endAngle(d => x(d.data.State) + x.bandwidth())
      .padAngle(0.01)
      .padRadius(innerRadius);

    const t = d3
      .transition()
      .duration(500)
      .ease();

    const paths = d3
      .selectAll(".col")
      .selectAll("path")
      .data(d => d)
      .join(
        enter =>
          enter
            .append("path")
            .attr("class", d => d.data.State)
            .attr("d", arc),
        update => update.transition(t).attr("d", arc)
      );
  };

  drawLabels = () => {
    const labels = [
      { label: "Pivote", color: "#fbbd08" },
      { label: "Less then Pivote", color: "#6435c9" },
      { label: "Greater than Pivote", color: "#db2828" },
      { label: "Swaped", color: "#21ba45" }
    ];

    const legend = this.svg
      .select("#group")
      .append("g")
      .attr("id", "labels")
      .selectAll("g")
      .data(labels)
      .enter()
      .append("g")
      .attr("transform", function(d, i) {
        return "translate(-60," + (i - (labels.length - 1) / 1.6) * 30 + ")";
      });

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", d => d.color);

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text(function(d) {
        return d.label;
      });
  };

  scaleRadial = (data, innerRadius, outerRadius) => {
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.total)])
      .range([innerRadius * innerRadius, outerRadius * outerRadius]);

    return Object.assign(d => Math.sqrt(y(d)), y);
  };

  quickSort = async array => {
    const { data, sortedChartData } = this.state;
    let chartData = sortedChartData ? sortedChartData : data;

    if (array.length <= 1) {
      d3.selectAll("path").attr("fill", null);
      return array;
    }

    let pivotVal = array[array.length - 1];
    let arr_1 = [];
    let arr_2 = [];
    let len = array.length - 1;

    d3.selectAll(`.${pivotVal.State}`).attr("fill", "#fbbd08");

    for (let i = 0; i < len; i++) {
      if (array[i].total < pivotVal.total) {
        d3.selectAll(`.${array[i].State}`).attr("fill", "#6435c9");

        arr_1.push(array[i]);
      } else {
        d3.selectAll(`.${array[i].State}`).attr("fill", "#db2828");

        arr_2.push(array[i]);
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    let sortedArr = [
      ...(await this.quickSort(arr_1)),
      pivotVal,
      ...(await this.quickSort(arr_2))
    ];

    //Tag sorted item with color green
    sortedArr.forEach(ele =>
      d3.selectAll(`.${ele.State}`).attr("fill", "#21ba45")
    );

    //Take out sortedArr items from original array
    chartData = chartData.filter(ele => !sortedArr.find(e => e === ele));
    chartData = [...sortedArr, ...chartData];

    //Save it in the state and update chart
    this.setState({ sortedChartData: chartData }, () =>
      this.drawRadialChart(chartData)
    );

    if (sortedArr.length === data.length) {
      //Clear the colors
      d3.selectAll("path").attr("fill", null);

      //Clear lables
      d3.select("#labels").remove();
      this.setState({ inProgress: false });
    }

    await new Promise(resolve => setTimeout(resolve, 400));

    return sortedArr;
  };

  render() {
    let { width, height, inProgress } = this.state;
    return (
      <>
        <Segment vertical>
          <Header as="h3" className="title">
            Quick sort
            <Header.Subheader className="desc">
              Visualize quick sort algorithm in d3 radial chart.
            </Header.Subheader>
          </Header>
          <div className="btns">
            <Button
              disabled={inProgress}
              primary
              onClick={e => {
                if (!inProgress) {
                  this.drawRadialChart(radialChartData);
                  this.setState(
                    { sortedChartData: null, inProgress: true },
                    () => {
                      this.drawLabels();
                      this.quickSort(radialChartData);
                    }
                  );
                }
              }}
            >
              <Icon name="play" />
              Quick Sort
            </Button>
            {inProgress && (
              <Loader active inline style={{ margin: "0 10px 0 10px" }} />
            )}
          </div>

          <div className="responsive-svg-container">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              style={{ font: "10px", maxWidth: width, maxHeight: height }}
              ref={element => (this.svg = d3.select(element))}
            ></svg>
          </div>
        </Segment>
        <Message
          header="Info"
          list={[
            <a
              key="source_code"
              href="https://github.com/farhankk360/js-visualize/blob/master/src/components/SortingAlgos/QuickSort/index.js"
              target="_blank"
              without="true"
              rel="noopener noreferrer"
            >
              Source code
            </a>,
            <p key="wiki_link">
              More information on Quick Sort Algorithm{" "}
              <a
                href="https://en.wikipedia.org/wiki/Quick_sort"
                target="_blank"
                without="true"
                rel="noopener noreferrer"
              >
                Wiki
              </a>
            </p>,
            <p key="ref_link">
              Inspired by Mike Bostock's{" "}
              <a
                href="https://observablehq.com/@d3/radial-stacked-bar-chart"
                target="_blank"
                without="true"
                rel="noopener noreferrer"
              >
                Radial Stacked Bar Chart
              </a>
            </p>
          ]}
        />
      </>
    );
  }
}
