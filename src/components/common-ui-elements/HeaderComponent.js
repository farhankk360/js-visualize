import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

export default class HeaderComponent extends Component {
  state = { fixed: true };

  render() {
    const { fixed } = this.state;
    return (
      <Menu
        fixed={fixed ? "top" : null}
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size="small"
      >
        <Menu.Item onClick={this.props.handleToggle}>
          <Icon.Group size="small">
            <Icon name="sidebar" />
          </Icon.Group>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to={process.env.PUBLIC_URL + "/"}
          active
          style={{ marginTop: 0, fontSize: "18px" }}
        >
          <Icon.Group size="large">
            <Icon name="js" />
          </Icon.Group>
          Visualize
        </Menu.Item>
      </Menu>
    );
  }
}

HeaderComponent.propTypes = {
  children: PropTypes.node
};
