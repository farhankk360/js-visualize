import React, { Component } from "react";
import { Grid, Header, Image, Segment } from "semantic-ui-react";
import astarScreenShot from "../../assets/astar/astar-algorithm-screenshot.jpg";

export default class HomeContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid stackable columns={2}>
          <Grid.Column>
            <Segment
              textAlign="center"
              onClick={() => this.props.history.push("/astar")}
              style={{ cursor: "pointer" }}
            >
              <Header as="h3" className="title">
                Visualize A* path finding algorithm
                <Header.Subheader className="desc">
                  Create obstacles by drawing on the grid.
                </Header.Subheader>
              </Header>
              <Image src={astarScreenShot} />
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}
