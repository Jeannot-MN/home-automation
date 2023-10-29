import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { toggleSideDrawer } from "./../../store/ui/ui.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/UI/Button/Button.jsx";
import Navigation from "../../components/Layout/Navigation/Navigation.jsx";
import NavigationItem from "../../components/Layout/Navigation/NavigationItem/NavigationItem.jsx";

import classes from "./Header.module.scss";

export class Header extends Component {
    static propTypes = {
        toggleSideDrawer: PropTypes.func
    };

    render() {
        return (
            <header>
                <div>
                    <div>Smart Home</div>
                    <div>
                        <Navigation>
                            <NavigationItem>
                                <NavLink to="/">Login</NavLink>
                            </NavigationItem>
                        </Navigation>
                    </div>
                    <div>
                        <Button onClick={this.props.toggleSideDrawer}>
                            <FontAwesomeIcon icon={faBars} />
                        </Button>
                    </div>
                </div>
            </header>
        );
    }
}

const mapDispatchToProps = {
    toggleSideDrawer
};

export default connect(
    null,
    mapDispatchToProps
)(Header);
