import React, { Component } from "react";
import { Grid, Header, Image, Segment } from "semantic-ui-react";
import astarScreenShot from "../../assets/astar/astar.gif";
import bubbleSort from "../../assets/bubble-sort/bubble-sort.gif"
// todo: make dynamic cols
// const cards = [
//   {},
//   {}
// ]
export default class HomeContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid stackable columns={2}>
          <Grid.Column>
            <Segment
              textAlign="center"
              onClick={() =>
                this.props.history.push(process.env.PUBLIC_URL + "/astar")
              }
              style={{ cursor: "pointer" }}
            >
              <Header as="h3" className="title">
                Visualize A* path finding algorithm
                <Header.Subheader className="desc">
                  Create obstacles by drawing on the grid.
                </Header.Subheader>
              </Header>
              <Image src={astarScreenShot} className="main-grid-image" />
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment
              textAlign="center"
              onClick={() =>
                this.props.history.push(process.env.PUBLIC_URL + "/bubble-sort")
              }
              style={{ cursor: "pointer" }}
            >
              <Header as="h3" className="title">
                Bubble sort
                <Header.Subheader className="desc">
                  Visualize bubble sort algorithm with d3 force simulation. <br />
                </Header.Subheader>
              </Header>
              <Image src={bubbleSort} className="main-grid-image" />
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}
