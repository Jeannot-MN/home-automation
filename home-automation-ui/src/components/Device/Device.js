import React, {Component} from "react";
import PropTypes from "prop-types";

import classes from "./Device.module.scss";
import Switch from "./../UI/Switch/Switch";

export default class Device extends Component {
    static propTypes = {
        deviceId: PropTypes.number,
        device: PropTypes.object,
        onToggleDeviceSwitch: PropTypes.func,
        onControlValueChanged: PropTypes.func
    };

    /**
     * Event fired when the value of a control is changed
     */
    onControlValueChangedHandler = (controlId, newValue) => {
        this.props.onControlValueChanged(this.props.deviceId, controlId, newValue);
    };

    render() {
        if (!this.props.device) return;

        return (
            <div className={classes.Device}>
                <div className={classes.Header}>
                    <div>{this.props.device.icon}</div>
                    <div className={classes.Title}>{this.props.device.name}</div>
                    <div className={classes.Switch}>
                        <Switch
                            onChange={this.props.onToggleDeviceSwitch}
                            checked={this.props.device.state}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
