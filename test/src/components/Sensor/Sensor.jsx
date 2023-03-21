import React, {Component} from "react";
import PropTypes from "prop-types";

import classes from "../Device/Device.module.scss";

export default class Sensor extends Component {
    static propTypes = {
        sensor: PropTypes.object
    };

    onClickHandler = (sensorId) => {

    }

    render() {
        if (!this.props.sensor) return;

        return (
            <div className={classes.Device} style={{cursor: "pointer"}}>
                <div className={classes.Header}>
                    <div className={classes.Title}>{this.props.sensor.name}</div>
                </div>
            </div>
        );
    }
}
