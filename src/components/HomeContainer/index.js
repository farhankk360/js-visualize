import React, { Component } from "react";
import { Grid, Header, Image, Segment, Placeholder } from "semantic-ui-react";
import sections from "../../routes";

export default class HomeContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid stackable columns={2}>
          {sections.map(section =>
            section.routes.map((subSection, i) => (
              <Grid.Column key={i}>
                <Segment
                  textAlign="center"
                  onClick={() =>
                    this.props.history.push(
                      process.env.PUBLIC_URL + subSection.path
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <Header as="h3" className="title">
                    {subSection.title}
                    <Header.Subheader className="desc">
                      {subSection.description}
                    </Header.Subheader>
                  </Header>
                  {subSection.gif ? (
                    <Image src={subSection.gif} className="main-grid-image" />
                  ) : (
                    <Placeholder
                      style={{
                        maxWidth: "630px",
                        maxHeight: "338px",
                        margin: "0 auto"
                      }}
                    >
                      <Placeholder.Image rectangular />
                    </Placeholder>
                  )}
                </Segment>
              </Grid.Column>
            ))
          )}
        </Grid>
      </React.Fragment>
    );
  }
}
