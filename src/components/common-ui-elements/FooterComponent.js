import React, { Component } from "react";
import { Container, Segment, Header } from "semantic-ui-react";

export default class FooterComponent extends Component {
  render() {
    return (
      <Segment
        textAlign="center"
        inverted
        vertical
        style={{ padding: "1em 0em" }}
      >
        <Container>
          <div className="the-guy">
            <Header.Subheader>
              by &nbsp;
              <a
                href="https://github.com/farhankk360"
                target="_blank"
                without="true"
                rel="noopener noreferrer"
              >
                Farhan Ullah
              </a>
            </Header.Subheader>
          </div>
          <Header.Subheader>
            Powered by &nbsp;
            <a
              href="https://reactjs.org/"
              target="_blank"
              without="true"
              rel="noopener noreferrer"
            >
              React
            </a>
            &nbsp;|&nbsp;
            <a
              href="https://d3js.org/"
              target="_blank"
              without="true"
              rel="noopener noreferrer"
            >
              D3
            </a>
            &nbsp;|&nbsp;
            <a
              href="https://react.semantic-ui.com/"
              target="_blank"
              without="true"
              rel="noopener noreferrer"
            >
              Semantic UI
            </a>
          </Header.Subheader>
        </Container>
      </Segment>
    );
  }
}
