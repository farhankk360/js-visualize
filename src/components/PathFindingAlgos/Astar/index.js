import React, { Component } from "react";
import {
  Segment,
  Icon,
  Button,
  Header,
  Message,
  Loader
} from "semantic-ui-react";
import * as d3 from "d3";

const rows = 30;
const cols = 65;

export default class Astar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseDown: false,
      obstacleMode: true,
      posChangeMode: "",
      startPosIndex: { row: Math.floor(rows / 2), col: Math.floor(cols / 4) },
      endPosIndex: { row: Math.floor(rows / 2), col: Math.floor(cols / 1.5) },
      startPosition: {},
      endPosition: {},
      begin: false
    };
  }

  removeFromArray = (arr, ele) => {
    let index = arr.length;

    while (index--) {
      if (arr[index] === ele) {
        arr.splice(index, 1);
      }
    }
  };

  heuristic = (a, b) => {
    return Math.hypot(b.x - a.x, b.y - a.y);
  };

  addNeighbors = (row, col, tile, tiles) => {
    // West
    if (tiles[row - 1] && tiles[row - 1][col]) {
      tile.neighbors.push(tiles[row - 1][col]);
    }

    // East
    if (tiles[row + 1] && tiles[row + 1][col]) {
      tile.neighbors.push(tiles[row + 1][col]);
    }

    // South
    if (tiles[row] && tiles[row][col - 1]) {
      tile.neighbors.push(tiles[row][col - 1]);
    }

    // North
    if (tiles[row] && tiles[row][col + 1]) {
      tile.neighbors.push(tiles[row][col + 1]);
    }

    // Southwest
    if (tiles[row - 1] && tiles[row - 1][col - 1]) {
      tile.neighbors.push(tiles[row - 1][col - 1]);
    }

    // Southeast
    if (tiles[row + 1] && tiles[row + 1][col - 1]) {
      tile.neighbors.push(tiles[row + 1][col - 1]);
    }

    // Northwest
    if (tiles[row - 1] && tiles[row - 1][col + 1]) {
      tile.neighbors.push(tiles[row - 1][col + 1]);
    }

    // Northeast
    if (tiles[row + 1] && tiles[row + 1][col + 1]) {
      tile.neighbors.push(tiles[row + 1][col + 1]);
    }
  };

  generateTiles = (rows, cols) => {
    const tiles = [];
    let xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    let ypos = 1;
    let width = 25;
    let height = 25;
    let id = 0;
    // iterate for rows
    for (let row = 0; row < rows; row++) {
      tiles.push([]);

      // iterate for cells/columns inside rows
      for (let col = 0; col < cols; col++) {
        tiles[row].push({
          f: 0,
          g: 0,
          h: 0,
          x: xpos,
          y: ypos,
          width: width,
          height: height,
          neighbors: [],
          previous: undefined,
          isobstacle: false,
          id: `id-${(id += 1)}`,
          col,
          row
        });
        // increment the x position. I.e. move it over by 50 (width variable)
        xpos += width;
      }
      // reset the x position after a row is complete
      xpos = 1;
      // increment the y position for the next row. Move it down 50 (height variable)
      ypos += height;
    }

    //add neighbor tiles
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this.addNeighbors(row, col, tiles[row][col], tiles);
      }
    }

    const { endPosIndex, startPosIndex } = this.state;
    //default from and destination positions
    let endPosition = tiles[endPosIndex.row][endPosIndex.col];
    endPosition.destination = true;

    let startPosition = tiles[startPosIndex.row][startPosIndex.col];
    startPosition.from = true;
    startPosition.h = this.heuristic(startPosition, endPosition);

    this.setState({
      startPosition,
      endPosition
    });

    return tiles;
  };

  prepareTiles = (rows, cols) => {
    let tiles = this.generateTiles(rows, cols);

    this.tilesMap
      //Rows
      .append("svg")
      .attr("viewBox", "0 0 1632 761")
      .selectAll(".row")
      .data(tiles)
      .enter()
      .append("g")
      .attr("class", "row")
      //Cols
      .selectAll(".square")
      .data((tile) => tile)
      .enter()
      .append("rect")
      .attr("class", (tile) => {
        if (tile.from) {
          return "square from";
        }
        if (tile.destination) {
          return "square destination";
        }
        return "square";
      })
      .attr("id", (tile) => tile.id)
      .attr("x", (tile) => tile.x)
      .attr("y", (tile) => tile.y)
      .attr("width", (tile) => tile.width)
      .attr("height", (tile) => tile.height)
      .style("fill", (tile) => {
        if (tile.from) {
          return "#2C93E8";
        }
        if (tile.destination) {
          return "#F56C4E";
        }
        return "#fff";
      })
      .style("stroke", "#222")
      .on("mousedown", (dataPoint, index, elements) => {
        this.setState({ isMouseDown: true });

        if (dataPoint.from || dataPoint.destination) {
          this.setState({
            posChangeMode: dataPoint.from ? "from" : "destination"
          });
        } else {
          if (!dataPoint.isobstacle) {
            this.setState({ obstacleMode: true });
          } else {
            this.setState({ obstacleMode: false });
          }
        }

        this.rectSelect(dataPoint, elements[index]);
      })
      .on("mousemove", (dataPoint, index, elements) =>
        this.rectSelect(dataPoint, elements[index])
      )
      .on("mouseup", () => {
        this.setState({ isMouseDown: false, posChangeMode: "" });
      });
  };

  rectSelect = (dataPoint, element) => {
    const {
      isMouseDown,
      posChangeMode,
      obstacleMode,
      startPosition,
      startPosIndex,
      endPosition,
      endPosIndex
    } = this.state;

    if (isMouseDown) {
      this.setState({ begin: false });

      if (!(dataPoint.from || dataPoint.destination || posChangeMode)) {
        if (!obstacleMode && dataPoint.isobstacle) {
          d3.select(element).style("fill", "#fff");
          dataPoint.isobstacle = false;
        }
        if (obstacleMode && !dataPoint.isobstacle) {
          d3.select(element).style("fill", "#838690");
          dataPoint.isobstacle = true;
        }
      }
      if (
        posChangeMode === "from" &&
        !(dataPoint.isobstacle || dataPoint.destination)
      ) {
        if (
          dataPoint.x !== startPosition.x ||
          dataPoint.y !== startPosition.y
        ) {
          delete startPosition.from;
          dataPoint.from = true;

          this.setState({
            startPosition: dataPoint,
            startPosIndex: {
              ...startPosIndex,
              row: dataPoint.row,
              col: dataPoint.col
            }
          });

          d3.selectAll(".from").classed("from", false).style("fill", "#fff");

          d3.select(element).classed("from", true).style("fill", "#2C93E8");
        }
      }

      if (
        posChangeMode === "destination" &&
        !(dataPoint.isobstacle || dataPoint.from)
      ) {
        if (dataPoint.x !== endPosition.x || dataPoint.y !== endPosition.y) {
          delete endPosition.destination;

          dataPoint.destination = true;
          this.setState({
            endPosition: dataPoint,
            endPosIndex: {
              ...endPosIndex,
              row: dataPoint.row,
              col: dataPoint.col
            }
          });

          d3.selectAll(".destination")
            .classed("destination", false)
            .style("fill", "#fff");

          d3.select(element)
            .classed("destination", true)
            .style("fill", "#F56C4E");
        }
      }
    }
  };

  findPath = async (from, destination) => {
    const openSet = [];
    const closedSet = [];

    openSet.push(from);

    while (this.state.begin) {
      if (openSet.length) {
        let winner = 0;

        for (let i = 0; i < openSet.length; i++) {
          if (openSet[i].f < openSet[winner].f) {
            winner = i;
          }
        }

        let current = openSet[winner];

        if (current === destination) {
          console.log("done");

          let path = [];
          let temp = current;
          path.push(temp);

          while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
          }

          path.forEach((p) => {
            if (p.from || p.destination) {
              return;
            }
            d3.select(`#${p.id}`).style("fill", "#1667aa");
          });

          return this.setState({ begin: false });
        }

        this.removeFromArray(openSet, current);
        closedSet.push(current);

        const { neighbors } = current;

        for (let i = 0; i < neighbors.length; i++) {
          let neighbor = neighbors[i];
          if (!closedSet.includes(neighbor) && !neighbor.isobstacle) {
            const g = current.g + neighbor.g;
            let newPath = false;
            if (openSet.includes(neighbor)) {
              if (g < neighbor.g) {
                neighbor.g = g;
                newPath = true;
              }
            } else {
              neighbor.g = g;
              newPath = true;
              openSet.push(neighbor);
            }
            if (newPath) {
              neighbor.h = this.heuristic(neighbor, destination);
              neighbor.f = neighbor.g + neighbor.h;
              neighbor.previous = current;
            }
          }
        }
      } else {
        //no sol
        console.log("no solution");
        return this.setState({ begin: false });
      }
      for (let i = 0; i < closedSet.length; i++) {
        if (!closedSet[i].from) {
          d3.select(`#${closedSet[i].id}`).style("fill", "#E91E63");
        }
      }

      for (let i = 0; i < openSet.length; i++) {
        if (!openSet[i].destination) {
          d3.select(`#${openSet[i].id}`).style("fill", "#91f795");
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 5));
    }
  };

  reset = () => {
    this.setState({ begin: false });

    this.tilesMap.select("svg").remove();
    this.prepareTiles(rows, cols);
  };

  componentDidMount() {
    this.prepareTiles(rows, cols);
  }

  render() {
    const { startPosition, endPosition, begin } = this.state;

    return (
      <>
        <Segment textAlign="center" vertical>
          <Header as="h3" className="title">
            Visualize A* path finding algorithm
            <Header.Subheader className="desc">
              Create obstacles by drawing on the grid. <br />
              Blue(start) and Orange(end) points can be moved around.{" "}
              <small>
                Have fun{" "}
                <span role="img" aria-label="Smile with glasses">
                  &#128526;
                </span>
              </small>
            </Header.Subheader>
          </Header>
          <div className="btns" style={{ marginBottom: "20px" }}>
            <Button
              icon
              labelPosition="left"
              onClick={() => {
                if (!begin) {
                  this.setState({ begin: true }, () =>
                    this.findPath(startPosition, endPosition)
                  );
                } else {
                  this.setState({ begin: false });
                }
              }}
            >
              <Icon name={begin ? "stop" : "play"} color="blue" />
              {begin ? "Stop" : "Start"}
            </Button>
            {begin && (
              <Loader active inline style={{ margin: "0 10px 0 10px" }} />
            )}
            <Button icon labelPosition="left" onClick={this.reset}>
              <Icon name="refresh" color="orange" />
              Reset
            </Button>
          </div>
          <div
            ref={(element) => (this.tilesMap = d3.select(element))}
            className="responsive-svg-container"
          />
        </Segment>
        <Message
          header="Info"
          list={[
            <a
              key="source_code"
              href="https://github.com/farhankk360/js-visualize/blob/master/src/components/PathFindingAlgos/Astar/index.js"
              target="_blank"
              without="true"
              rel="noopener noreferrer"
            >
              Source code
            </a>,
            <p key="wiki_link">
              More information on Astar Search Algorithm{" "}
              <a
                href="https://en.wikipedia.org/wiki/A*_search_algorithm "
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
