import React, { Component } from "react";
import * as d3 from "d3";
import { Segment, Button, Header, Message } from "semantic-ui-react";

export default class BubbleSort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 1600,
      height: 750,
      forceStrength: 0.03,
      sortedResult: null,
      dataset: [
        { name: "Milk", count: 40 },
        { name: "Olives", count: 20 },
        { name: "Boiled Potatoes", count: 10 },
        { name: "Baked Potatoes", count: 180 },
        { name: "Mashed Potatoes", count: 30 },
        { name: "Chocolate", count: 100 },
        { name: "Stewed Prunes", count: 200 },
        { name: "Vanilla Ice Cream", count: 60 },
        { name: "American Cheese", count: 130 },
        { name: "Chicken Salad", count: 50 },
        { name: "Green Peas", count: 140 },
        { name: "Lettuce Salad", count: 80 },
        { name: "Tea", count: 210 },
        { name: "Cocoa", count: 70 },
        { name: "Orange Juice", count: 120 },
        { name: "Black burgers", count: 220 },
        { name: "Apple Pie", count: 110 },
        { name: "Lobster Salad", count: 90 },
        { name: "French Fried Potatoes", count: 160 },
        { name: "Potato Salad", count: 170 },
        { name: "Assorted Cakes", count: 150 },
        { name: "Roquefort", count: 190 },
        { name: "Chicken Parata", count: 230 }
      ]
    };

    //init force simulation
    const { width, height, forceStrength } = this.state;
    const centre = { x: width / 2, y: height / 2 };

    this.simulation = d3
      .forceSimulation()
      .force("center", d3.forceCenter(centre.x, centre.y))
      .force("charge", d3.forceManyBody().strength(this.charge))
      .force("x", d3.forceX().strength(forceStrength).x(centre.x))
      .force("y", d3.forceY().strength(forceStrength).y(centre.y))
      .force(
        "collision",
        d3.forceCollide().radius((d) => d.radius + 2)
      );

    this.simulation.stop();
  }

  componentDidMount() {
    this.drawBubbleChart(this.state.dataset);
  }

  bubleSort = async (bubbles) => {
    const nodes = bubbles.slice();
    let swap = false;

    for (let i = 1; i < nodes.length; i++) {
      const tempA = nodes[i - 1];
      const tempB = nodes[i];

      if (tempB.count > tempA.count) {
        nodes[i] = tempA;
        nodes[i - 1] = tempB;
        swap = true;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (swap) {
      this.simulation.nodes(nodes);

      let separator = 0;
      // this.simulation.force('y', d3.forceY((d) => 900 / 5).strength(0.2))
      //   .alphaTarget(0.5)
      //   .restart()

      this.simulation
        .force("x", d3.forceX((d) => (separator += 50)).strength(0.3))
        .alphaTarget(0.5)
        .restart();

      this.setState({ sortedResult: nodes });
      return this.bubleSort(nodes);
    } else {
      return nodes;
    }
  };

  charge = (d) => {
    return Math.pow(d.radius, 2.0) * 0.01;
  };

  createNodes = (rawData) => {
    const maxSize = d3.max(rawData, (d) => +d.count);
    const radiusScale = d3.scaleSqrt().domain([0, maxSize]).range([0, 60]);

    const myNodes = rawData.map((d) => ({
      ...d,
      radius: radiusScale(+d.count),
      size: +d.count
    }));
    return myNodes;
  };

  drawBubbleChart = (dataset) => {
    const { width, height } = this.state;
    const fillColour = d3.scaleOrdinal(d3.schemeCategory10);

    let nodes = this.createNodes(dataset);

    let svg = this.bubbleChart
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

    const elements = svg
      .selectAll(".bubble")
      .data(nodes, (d) => d.name)
      .enter()
      .append("g");

    let bubbles = elements
      .append("circle")
      .classed("bubble", true)
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => fillColour(d.count))
      .call(
        d3
          .drag()
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended)
      );

    let labels = elements
      .append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("font-size", 14)
      .style("user-select", "none")
      .text((d) => d.count);

    this.simulation
      .nodes(nodes)
      .on("tick", () => {
        bubbles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
      })
      .restart();

    const bubbleElements = [];
    bubbles.each((bubble) => bubbleElements.push(bubble));

    this.setState({ bubbles: bubbleElements });
  };

  changeBubblePosition = (action) => {
    const { width, height, forceStrength, bubbles, dataset } = this.state;
    const centre = { x: width / 2, y: height / 2 };

    if (action === "split") {
      const maxSize = d3.max(bubbles, (d) => +d.count);
      let random = Math.floor(Math.random() * maxSize) + 1;

      this.simulation
        .force(
          "x",
          d3
            .forceX(function (d) {
              if (d.count < random) {
                return 1200;
              } else {
                return 300;
              }
            })
            .strength(forceStrength)
        )
        .alphaTarget(0.2)
        .restart();
    }

    if (action === "combine") {
      this.simulation
        .force(
          "x",
          d3
            .forceX(width / 2)
            .strength(forceStrength)
            .x(centre.x)
        )
        .alphaTarget(0.2)
        .restart();
    }
  };

  dragstarted = (d) => {
    if (!d3.event.active) this.simulation.alphaTarget(0.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  };
  dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };
  dragended = (d) => {
    if (!d3.event.active) this.simulation.alphaTarget(0.03);
    d.fx = null;
    d.fy = null;
  };

  render() {
    const { bubbles, sortedResult } = this.state;
    const arrVis = sortedResult ? sortedResult : bubbles;
    return (
      <>
        <Segment textAlign="center" vertical>
          <Header as="h3" className="title">
            Bubble sort
            <Header.Subheader className="desc">
              Visualize bubble sort algorithm with d3 force simulation. <br />
              Feel free to move around the bubbles.
            </Header.Subheader>
          </Header>
          <div className="btns">
            <Button onClick={(e) => this.changeBubblePosition("split")}>
              Split
            </Button>
            <Button onClick={(e) => this.changeBubblePosition("combine")}>
              Combine
            </Button>
            <Button primary onClick={(e) => bubbles && this.bubleSort(bubbles)}>
              Bubble Sort
            </Button>
          </div>
          <div
            className="responsive-svg-container"
            ref={(element) => (this.bubbleChart = d3.select(element))}
          />

          {arrVis && (
            <Message floating className="visual-array">
              <pre>
                [
                {arrVis.map((ele, i) => {
                  if (arrVis.length - 1 > i) {
                    return (
                      <React.Fragment key={i}>
                        <span className="array-element">{ele.count}</span>
                        <span>, </span>
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <span key={i} className="array-element">
                        {ele.count}
                      </span>
                    );
                  }
                })}
                ]
              </pre>
            </Message>
          )}
        </Segment>
        <Message
          header="Info"
          list={[
            <a
              key="source_code"
              href="https://github.com/farhankk360/js-visualize/blob/master/src/components/SortingAlgos/BubbleSort/index.js"
              target="_blank"
              without="true"
              rel="noopener noreferrer"
            >
              Source code
            </a>,
            <p key="wiki_link">
              More information on Bubble Sort Algorithm{" "}
              <a
                href="https://en.wikipedia.org/wiki/Bubble_sort"
                target="_blank"
                without="true"
                rel="noopener noreferrer"
              >
                Wiki
              </a>
            </p>
          ]}
        />
      </>
    );
  }
}
