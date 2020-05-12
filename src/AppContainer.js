import React, { Component } from "react";
import { Route, withRouter, Switch, Link } from "react-router-dom";
import ReactGA from "react-ga";
import {
  HeaderComponent,
  FooterComponent
} from "./components/common-ui-elements";
import {
  Responsive,
  Menu,
  Sidebar,
  Accordion,
  Segment,
  Icon
} from "semantic-ui-react";
import sections from "./routes";

import HomeContainer from "./components/HomeContainer";

class AppContainer extends Component {
  state = { sidebarOpened: true, activeIndex: 0 };

  componentDidMount() {
    const { history } = this.props;

    ReactGA.initialize(process.env.REACT_APP_GA_ID);
    ReactGA.pageview(history.location.pathname);

    history.listen((location) => {
      ReactGA.pageview(location.pathname);
    });

    if (this.getWidth() <= 768) {
      this.setState({ sidebarOpened: false });
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleToggle = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened });

  getWidth = () => {
    const isSSR = typeof window === "undefined";

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
  };

  render() {
    const { sidebarOpened, activeIndex } = this.state;
    const { location } = this.props;
    return (
      <Responsive as={Sidebar.Pushable} getWidth={this.getWidth}>
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          vertical
          visible={sidebarOpened}
        >
          <Menu size="large" className="side-bar-header">
            <Menu.Item as="h2" active></Menu.Item>
          </Menu>

          <Segment inverted className="accordion-segment">
            <Accordion inverted>
              {sections.map((section, i) => {
                return (
                  <React.Fragment key={`${i}-${section.name}`}>
                    <Accordion.Title
                      active={activeIndex === i}
                      index={i}
                      onClick={this.handleClick}
                      className="item"
                    >
                      {section.name}
                      <Icon name="dropdown" />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === i}>
                      {section.routes.map((route, j) => {
                        return (
                          <Menu.Item
                            key={`${j}-${route.path}`}
                            as={Link}
                            to={process.env.PUBLIC_URL + route.path}
                            active={location.pathname.includes(route.path)}
                          >
                            {route.name}
                          </Menu.Item>
                        );
                      })}
                    </Accordion.Content>
                  </React.Fragment>
                );
              })}
            </Accordion>
          </Segment>
        </Sidebar>

        <Sidebar.Pusher>
          <HeaderComponent
            handleToggle={this.handleToggle}
            getWidth={this.getWidth}
          />
          <Segment
            style={
              sidebarOpened && !(this.getWidth() <= 768)
                ? {
                    width: "calc(100% - 260px)"
                  }
                : { marginTop: "61px", width: "100%" }
            }
            className="segmentWrapper"
          >
            <Switch>
              <Route
                exact
                path={
                  process.env.PUBLIC_URL ? process.env.PUBLIC_URL + "/" : "/"
                }
                render={() => <HomeContainer {...this.props} />}
              />

              {sections.map((section) =>
                section.routes.map((route) => (
                  <Route
                    exact
                    path={
                      process.env.PUBLIC_URL
                        ? process.env.PUBLIC_URL + route.path
                        : route.path
                    }
                    render={(props) => route.component(props)}
                  />
                ))
              )}
            </Switch>
          </Segment>
          <FooterComponent />
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

export default withRouter(AppContainer);
